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

    // initial setup of mediapipe face landmarker model

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
                        outputFaceLandmarks: true,
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

    // brightness detection 
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

    //  focus detection logic

    // Runs real-time face focus detection loop
    useEffect(() => {
        if (status !== "ready") return

        let running = true

        // Main detection function that runs every frame
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

            // Run face detection on current video frame
            if (!result.faceBlendshapes?.length || !result.faceLandmarks?.length) {
                setIsFocused(false)
                setAlert("No Face Detected")
                animationRef.current = requestAnimationFrame(detect)
                return
            }

            const blend = result.faceBlendshapes[0].categories
            const landmarks = result.faceLandmarks[0]

            // Gets individual facial feature score
            const get = (name) =>
                blend.find((b) => b.categoryName === name)?.score || 0

            // Eye movement and blink detection values
            const blink = get("eyeBlinkLeft") + get("eyeBlinkRight")
            const lookDown = get("eyeLookDownLeft") + get("eyeLookDownRight")
            const lookUp = get("eyeLookUpLeft") + get("eyeLookUpRight")

            // Calculates horizontal eye movement (left/right gaze)
            const gazeX =
                (get("eyeLookOutLeft") - get("eyeLookInLeft")) +
                (get("eyeLookInRight") - get("eyeLookOutRight"))

            /// Gets eye corner landmarks for head direction detection
            const leftEyeCorner = landmarks[33]
            const rightEyeCorner = landmarks[263]

            // Calculates normalized eye distance for stability
            const eyeDistance = Math.sqrt(
                Math.pow(rightEyeCorner.x - leftEyeCorner.x, 2) +
                Math.pow(rightEyeCorner.y - leftEyeCorner.y, 2)
            )


            // Estimates head rotation (yaw) using depth difference
            const headYaw = (leftEyeCorner.z - rightEyeCorner.z) / eyeDistance

            // Combines eye movement and head movement for final gaze
            const absoluteGazeX = gazeX + (headYaw * 2.0)

            // Measures current frame brightness
            const brightness = getBrightness(video)

            let focused = true
            let alertMsg = "All Good"

            // Checks if lighting is too low
            if (brightness < 35) {
                focused = false
                alertMsg = "Low lighting"

            // Checks if eyes are closed
            } else if (blink > 0.85) {
                focused = false
                alertMsg = "Eyes closed"

             // Checks if user is looking up
            } else if (lookDown > 0.99) {
                focused = false
                alertMsg = "Looking down"

            // Checks if user is looking away from screen
            } else if (lookUp > 0.7) {
                focused = false
                alertMsg = "Looking up"

            // Checks if user is looking left or right
            } else if (Math.abs(absoluteGazeX) > 0.8) {
               
                focused = false
                alertMsg = "Looking away"
            }

            setIsFocused(focused)
            setAlert(alertMsg)

            animationRef.current = requestAnimationFrame(detect)
        }


        // Starts detection when webcam is ready
        const start = () => {
            const video = webcamRef.current?.video

            if (video) {
                detect()
            } else {
                setTimeout(start, 200)
            }
        }

        start()


        // Cleanup function to stop detection loop when component unmounts
        return () => {
            running = false
            cancelAnimationFrame(animationRef.current)
        }
    }, [status, webcamRef])

    // Returns tracking status, focus state, and alert message
    return { status, isFocused, alert }
}