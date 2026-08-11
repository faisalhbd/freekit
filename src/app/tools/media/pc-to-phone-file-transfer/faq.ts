import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How does PC to Phone File Transfer work?",
    answer:
      "This tool uses WebRTC (Web Real-Time Communication) to create a direct peer-to-peer connection between your PC and phone. When you select files on your PC, a QR code is generated. Scan the QR code with your phone's camera to open the same page on your phone. Your phone then connects to the same room, and the WebRTC data channel transfers files directly between the two devices. No files ever pass through any server — the signaling server only helps establish the initial connection.",
  },
  {
    question: "Do I need to install any app on my phone?",
    answer:
      "No. You only need a web browser on your phone (Chrome, Firefox, Safari, or Edge). Just scan the QR code and the file transfer page opens automatically. No app downloads, no account creation, and no sign-up required.",
  },
  {
    question: "Is my data safe during transfer?",
    answer:
      "Yes. Files are transferred using WebRTC's DTLS encryption, which provides end-to-end encryption. Your files never go through any cloud server or third-party storage. The signaling server only helps exchange connection metadata (SDP offers/answers) and does not see your actual file data. Once the transfer is complete, the connection is closed and no data is retained.",
  },
  {
    question: "What file types can I transfer?",
    answer:
      "You can transfer any file type — photos (JPG, PNG, WebP, GIF), videos (MP4, MOV, AVI, MKV), documents (PDF, DOC, XLS, PPT), audio files (MP3, WAV, AAC), archives (ZIP, RAR), code files, and more. There are no file type restrictions.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "There is no hard file size limit since files transfer directly between your devices. However, very large files (over 500MB) may be slow on slower connections. For the best experience with large files, ensure both devices are on the same Wi-Fi network. Files over 2GB are supported but transfer times depend on your connection speed.",
  },
  {
    question: "Do both devices need to be on the same Wi-Fi network?",
    answer:
      "No, but it is recommended for the fastest transfer speeds. WebRTC can establish connections across different networks using STUN/TURN servers, but this may result in slower speeds compared to being on the same local network. For the fastest transfers, keep both devices on the same Wi-Fi.",
  },
  {
    question: "How fast is the file transfer?",
    answer:
      "Transfer speed depends on your network connection. On the same Wi-Fi network, speeds can reach 20-50 MB/s. On different networks, speeds depend on your internet upload and download bandwidth. WebRTC data channels are optimized for high-throughput data transfer.",
  },
  {
    question: "Can I transfer multiple files at once?",
    answer:
      "Yes. You can select multiple files at once on the sender side. Each file is transferred sequentially with individual progress tracking. The tool shows the overall progress and individual file status so you can monitor the entire batch transfer.",
  },
  {
    question: "What happens if the connection drops during transfer?",
    answer:
      "If the connection is interrupted, the transfer will pause and the tool will show a reconnection option. WebRTC has built-in reconnection capabilities. For files that were partially transferred, you may need to restart the transfer for those specific files. Completed files are saved immediately.",
  },
  {
    question: "Is this better than AirDrop or Bluetooth?",
    answer:
      "Each method has advantages. AirDrop is limited to Apple devices. Bluetooth is very slow (typically under 3 MB/s). This WebRTC-based transfer works across all platforms (Windows, Mac, Linux, Android, iOS) through any modern web browser, and on the same Wi-Fi network can achieve speeds of 20-50 MB/s — far faster than Bluetooth and comparable to AirDrop.",
  },
  {
    question: "Can I transfer files from phone to PC too?",
    answer:
      "Yes. The tool supports bidirectional transfer. When you open the page on your phone and scan the QR code from your PC (or enter the room code), you can select files on your phone and send them to your PC. The connection works in both directions once established.",
  },
  {
    question: "Does this work with iPhone/iOS?",
    answer:
      "Yes, this works on iOS Safari and Chrome for iOS. WebRTC data channels are supported on iOS 11 and later. Simply scan the QR code with your iPhone camera, open the link in Safari or Chrome, and the transfer works the same way as on Android.",
  },
]