import { useEffect, useRef, useState } from "react"
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision"

export default function useFaceFocusTracker(webcamRef) {

    const faceLandmarkerRef = useRef(null)
    const animationRef = useRef(null)
    const lastState = useRef("focused")
    const lastChangeTime = useRef(Date.now())

    const [status, setStatus] = useState("loading")
    const [isFocused, setIsFocused] = useState(true)
    const [alert, setAlert] = useState("Initializing...")

    // initial setup of mediapipe face landmarker model
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

    // brightness detection 
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
                setAlert("No Face")
                animationRef.current = requestAnimationFrame(detect)
                return
            }

            const blend = result.faceBlendshapes[0].categories
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

            // 1. lighting issue
            if (brightness < 35) {
                focused = false
                alertMsg = "Low lighting"

                // 2. eyes closed
            } else if (blink > 0.75) {
                focused = false
                alertMsg = "Eyes closed"

                // 3. looking down
            } else if (lookDown > 0.6) {
                focused = false
                alertMsg = "Looking down"

                // 4. looking up
            } else if (lookUp > 0.6) {
                focused = false
                alertMsg = "Looking up"

                // 5. looking away
            } else if (Math.abs(gazeX) > 0.7) {
                focused = false
                alertMsg = "Looking away"
            }

            setIsFocused(focused)
            setAlert(alertMsg)

            animationRef.current = requestAnimationFrame(detect)
        }

        const start = () => {
            const video = webcamRef.current?.video

            if (video) {
                detect()
            } else {
                setTimeout(start, 200)
            }
        }

        start()

        return () => {
            running = false
            cancelAnimationFrame(animationRef.current)
        }
    }, [status, webcamRef])

    return { status, isFocused, alert }
}