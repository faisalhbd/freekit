import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How do WiFi QR codes work?",
    answer: "WiFi QR codes encode network credentials in a standardized format: WIFI:T:WPA;S:NetworkName;P:Password;H:false;. When scanned by a smartphone camera or QR reader, the device automatically parses the SSID, security type, and password, then prompts the user to connect without manual typing."
  },
  {
    question: "Which security types are supported?",
    answer: "This generator supports WPA/WPA2 (the most common and secure option for home and office networks), WEP (older, less secure encryption), and None/Open (no password required, such as public hotspots). WPA3 uses the same QR code format as WPA2 for backward compatibility."
  },
  {
    question: "Is it safe to share my WiFi password as a QR code?",
    answer: "The QR code itself is just an image — it cannot be hacked remotely. However, anyone who scans the code can see your WiFi password in plain text. Only share the QR code with people you trust. For guest networks, consider creating a separate guest network with a different password."
  },
  {
    question: "What is the hidden network option?",
    answer: "Hidden networks do not broadcast their SSID, so devices cannot discover them automatically. When the H:true flag is set in the QR code, the scanning device knows to manually search for and connect to the network by its exact name. This is useful for corporate or privacy-focused setups."
  },
  {
    question: "Can I customize the QR code colors?",
    answer: "Yes, you can change both the foreground (dark) and background (light) colors. Keep in mind that high contrast between the two colors is essential for reliable scanning. Avoid using similar colors or very light foregrounds, as most QR scanners will fail to read the code."
  },
  {
    question: "What size should I choose for the QR code?",
    answer: "256px is ideal for digital sharing (emails, chat, websites). 512px works well for printed materials like business cards, flyers, and menus. 1024px is best for large-format printing like posters, signs, and billboards where the QR code needs to be scanned from a distance."
  },
  {
    question: "Do all smartphones support scanning WiFi QR codes?",
    answer: "Most modern smartphones running Android 10+ and iOS 11+ can scan WiFi QR codes natively through the camera app. On older devices, you may need a third-party QR scanner app. The QR code format follows the standard defined by the ZXing barcode library, ensuring broad compatibility."
  },
  {
    question: "Can I print the QR code and put it on my wall?",
    answer: "Absolutely. Many businesses, cafes, and homes print WiFi QR codes for easy guest access. Use the 512px or 1024px size for printing. Ensure the printed code is at least 2cm × 2cm, placed in a well-lit area, and printed on a flat, non-reflective surface for best scanning results."
  },
  {
    question: "Why does the QR code show a WIFI string instead of my password?",
    answer: "For security, the tool displays only the non-sensitive parts of the encoded string (network name, security type, hidden status) while keeping the password hidden from the display. The password is still embedded in the QR code image itself, so scanning it will still work correctly."
  },
  {
    question: "Does this tool send my WiFi credentials to a server?",
    answer: "No. The QR code is generated entirely in your browser using client-side JavaScript. Your network name, password, and all other data stay on your device. Nothing is transmitted to any server, making it completely safe for sensitive network credentials."
  },
]