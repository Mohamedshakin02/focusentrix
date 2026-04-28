import { useEffect, useRef, useState } from "react"
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision"

export default function useFaceFocusTracker(webcamRef) {

    // Stores the loaded FaceLandmarker model so we can reuse it without reloading
    const faceLandmarkerRef = useRef(null)

    // Stores the loop ID so we can stop the face detection loop later
    const animationRef = useRef(null)

    // Tracks previous focus state (focused / distracted)
    const lastState = useRef("focused")

    // Tracks time of last state change
    const lastChangeTime = useRef(Date.now())

    // Tracks loading/ready/error status of model
    const [status, setStatus] = useState("loading")

    // Tracks whether user is currently focused
    const [isFocused, setIsFocused] = useState(true)

    // Stores current alert message for UI
    const [alert, setAlert] = useState("Initializing...")

    
    // Initializes MediaPipe FaceLandmarker model
    useEffect(() => {
        const init = async () => {
            try {
                const vision = await FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
                )

                faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(
                    vision,
                    {
                        baseOptions: {
                            modelAssetPath:
                                "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
                        },
                        runningMode: "VIDEO",
                        numFaces: 1,
                        outputFaceBlendshapes: true,
                    }
                )

                setStatus("ready")
            } catch (err) {
                console.log(err)
                setStatus("error")
            }
        }

        init()
    }, [])

    // Calculates frame brightness from webcam feed
    const getBrightness = (video) => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        canvas.width = 80
        canvas.height = 60

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height)
        let total = 0

        for (let i = 0; i < frame.data.length; i += 4) {
            total += (frame.data[i] + frame.data[i + 1] + frame.data[i + 2]) / 3
        }

        return total / (frame.data.length / 4)
    }


    // Runs real-time face focus detection loop
    useEffect(() => {
        if (status !== "ready") return

        let running = true

        const detect = () => {
            const video = webcamRef?.current?.video
            const model = faceLandmarkerRef.current

            if (!webcamRef) return
            
            if (!running) return

            if (!video || video.readyState < 2 || !model) {
                animationRef.current = requestAnimationFrame(detect)
                return
            }

            const result = model.detectForVideo(video, performance.now())

            if (!result.faceBlendshapes?.length) {
                setIsFocused(false)
                setAlert("No Face Detected")
                animationRef.current = requestAnimationFrame(detect)
                return
            }

            const blend = result.faceBlendshapes[0].categories

            // Gets individual facial feature score
            const get = (name) =>
                blend.find((b) => b.categoryName === name)?.score || 0

            const blink =
                get("eyeBlinkLeft") + get("eyeBlinkRight")

            const lookDown =
                get("eyeLookDownLeft") + get("eyeLookDownRight")

            const lookUp =
                get("eyeLookUpLeft") + get("eyeLookUpRight")

            const gazeX =
                (get("eyeLookOutLeft") - get("eyeLookInLeft")) +
                (get("eyeLookInRight") - get("eyeLookOutRight"))

            const brightness = getBrightness(video)

            let focused = true
            let alertMsg = "All Good"

            // Detect low lighting condition
            if (brightness < 35) {
                focused = false
                alertMsg = "Low lighting"

            // Detect if eyes are closed
            } else if (blink > 0.75) {
                focused = false
                alertMsg = "Eyes closed"

            // Detect looking down
            } else if (lookDown > 0.6) {
                focused = false
                alertMsg = "Looking down"

            // Detect looking up
            } else if (lookUp > 0.6) {
                focused = false
                alertMsg = "Looking up"

            // Detect looking away
            } else if (Math.abs(gazeX) > 0.7) {
                focused = false
                alertMsg = "Looking away"
            }

            setIsFocused(focused)
            setAlert(alertMsg)

            animationRef.current = requestAnimationFrame(detect)
        }


        // Starts detection loop when video is ready
        const start = () => {
            const video = webcamRef.current?.video

            if (video) {
                detect()
            } else {
                setTimeout(start, 200)
            }
        }

        start()

        
        // Cleans up animation loop on unmount
        return () => {
            running = false
            cancelAnimationFrame(animationRef.current)
        }
    }, [status, webcamRef])

    // Cleans up animation loop on unmount
    return { status, isFocused, alert }
}