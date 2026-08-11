import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is a URL QR code?",
    answer: "A URL QR code is a two-dimensional barcode that, when scanned with a smartphone camera or QR reader app, instantly opens the encoded web address in the device's default browser. It eliminates the need for users to manually type long or complex URLs."
  },
  {
    question: "Does the URL need to start with http:// or https://?",
    answer: "Yes, the URL should include the full protocol prefix (http:// or https://). Without it, some QR scanners may treat the content as plain text instead of a clickable link. This tool validates your input and will prompt you if the protocol is missing."
  },
  {
    question: "What is error correction level and which should I use?",
    answer: "Error correction allows a QR code to be read even when partially damaged or obscured. Level L (7% recovery) is smallest but least tolerant. Level M (15%) is the standard balance. Level Q (25%) handles moderate damage. Level H (30%) tolerates the most damage and is ideal if you plan to overlay a logo on the QR code."
  },
  {
    question: "What are the quick size presets for?",
    answer: "The Business Card preset (256px) creates a compact QR code ideal for small printed items. The Poster preset (512px) suits medium-sized prints like flyers, posters, and brochures. The Billboard preset (1024px) generates a high-resolution code for large-format printing where the code will be scanned from a distance."
  },
  {
    question: "Can I change the QR code colors?",
    answer: "Yes, you can customize both the foreground (dark modules) and background (light modules) colors. For reliable scanning, ensure high contrast between the two — dark foreground on a light background works best. Avoid light-on-dark or similar color combinations that scanners struggle to read."
  },
  {
    question: "Is there a limit on URL length for QR codes?",
    answer: "QR codes can hold up to 4,296 alphanumeric characters (Version 40, Level L). A typical URL is well within this limit. However, longer URLs require higher-density QR codes with smaller modules, which can be harder to scan. Use a URL shortener for very long links to keep the QR code simple and scannable."
  },
  {
    question: "Can I use this QR code on printed materials?",
    answer: "Absolutely. Download the PNG file and use it in any design software (Canva, Illustrator, Photoshop) or document. For print, use at least the 512px size and ensure the QR code is printed at a minimum of 2cm × 2cm. Test the printed QR code with your phone before mass printing."
  },
  {
    question: "Will the QR code expire?",
    answer: "No, QR codes generated here are static — they encode the URL directly in the image. As long as the URL itself remains active, the QR code will continue to work forever. Unlike dynamic QR codes from paid services, there are no expiration dates, redirect limits, or tracking."
  },
  {
    question: "Is my URL sent to a server?",
    answer: "No. The QR code is generated entirely in your browser using the qrcode JavaScript library. Your URL is never transmitted to any server. The entire process — encoding, rendering, and downloading — happens client-side."
  },
  {
    question: "Can I add a logo or image in the center of the QR code?",
    answer: "This tool does not support logo overlay natively. To add a logo, generate the QR code with error correction Level H (30%), download the PNG, then use an image editor to place your logo in the center. Level H provides enough redundancy that the QR code remains scannable with up to 30% of the code covered."
  },
]
