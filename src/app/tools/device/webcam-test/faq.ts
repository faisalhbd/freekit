import type { FAQItem } from "@/types"
export const faqs: FAQItem[] = [
  { question: "How do I test my webcam?", answer: "Click 'Start Camera' to grant camera permission. You will see a live video preview along with resolution information. You can toggle the mirror view and take a screenshot." },
  { question: "Why is my webcam not showing?", answer: "Check that your camera is not in use by another application, that browser permission has been granted, and that the camera is not physically covered or disabled in your OS settings." },
  { question: "What resolution is my webcam?", answer: "The tool displays the actual resolution and frame rate of your camera stream as reported by the browser. Common resolutions include 640x480, 1280x720, and 1920x1080." },
  { question: "What does mirror mode do?", answer: "Mirror mode flips the video horizontally using CSS transform, creating a mirror-like view. This is how most video chat applications display your self-view by default." },
  { question: "Is my video data sent to a server?", answer: "No. All video processing happens locally in your browser. The getUserMedia API accesses your camera directly and the video stream never leaves your device." },
  { question: "How does the screenshot feature work?", answer: "The screenshot feature draws the current video frame onto a hidden Canvas element, then converts it to a PNG image and triggers a download. The image is generated entirely in your browser." },
  { question: "Can I test multiple cameras?", answer: "The browser typically uses the default system camera. You can change the default camera in your OS settings, then restart the test. Some browsers also allow camera selection in the permission dialog." },
  { question: "Does this work on mobile devices?", answer: "Yes, this tool works on mobile devices. It will access the front-facing camera by default. On some devices you may be able to select the rear camera." },
  { question: "Why is my video laggy?", answer: "Video lag can be caused by high resolution settings, other applications using the camera, or insufficient system resources. Closing other camera-using apps may help." },
  { question: "What video format is the screenshot?", answer: "Screenshots are saved as PNG files, which provide lossless quality. The image resolution matches the actual camera stream resolution." },
]