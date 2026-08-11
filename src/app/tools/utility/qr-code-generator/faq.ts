import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is a QR code?",
    answer:
      "A QR code (Quick Response code) is a two-dimensional barcode that can store various types of data including URLs, text, phone numbers, email addresses, Wi-Fi credentials, and more. When scanned with a smartphone camera or QR reader app, the encoded information is instantly retrieved. QR codes were invented in 1994 by Denso Wave, a Japanese company, for tracking automotive parts.",
  },
  {
    question: "What data types can I encode in a QR code?",
    answer:
      "Our QR code generator supports multiple data types: URLs (websites and links), plain text, Wi-Fi credentials (SSID, password, encryption type), email addresses (with subject and body), phone numbers, and SMS messages. Each type is encoded in a standardized format so that scanners automatically recognize the data type and open the appropriate app (browser, phone dialer, email client, etc.).",
  },
  {
    question: "What is error correction level and which should I use?",
    answer:
      "Error correction allows a QR code to be read even when partially damaged or obscured. There are four levels: Low (7% recovery), Medium (15% recovery), Quartile (25% recovery), and High (30% recovery). Use Low for clean, undamaged codes. Use Medium for general purpose (default). Use High when codes may be printed on rough surfaces, partially covered, or placed in environments where they may get damaged.",
  },
  {
    question: "Can I customize the color of my QR code?",
    answer:
      "Yes! You can customize both the foreground (dark) and background (light) colors of your QR code. The dark color should always be darker than the light color for the code to be scannable. While you can use brand colors, very dark and very light color combinations work best. Always test your colored QR codes with multiple devices before distributing them.",
  },
  {
    question: "What size should my QR code be?",
    answer:
      "The general rule is that QR codes should be at least 2cm x 2cm (0.8 x 0.8 inches) for every 10cm (4 inches) of scanning distance. For print materials, 300x300 pixels at minimum is recommended. For digital use on websites and social media, 200x300 pixels is usually sufficient. Our tool supports sizes from 128px to 1024px. Larger codes with more data require higher resolution to remain scannable.",
  },
  {
    question: "What is the difference between PNG and SVG format?",
    answer:
      "PNG is a raster image format made of pixels — it looks good at the size you generate but becomes blurry when scaled up. SVG is a vector format made of paths — it scales perfectly to any size without losing quality. Use PNG for quick digital sharing and social media. Use SVG for print materials, large banners, business cards, or any situation where you might need to resize the QR code.",
  },
  {
    question: "How much data can a QR code hold?",
    answer:
      "A standard QR code can hold up to 4,296 alphanumeric characters, 7,089 numeric characters, or 2,953 bytes of binary data. However, more data means a more complex (denser) QR code that is harder to scan from a distance. For best scanning reliability, keep your data under 300 characters. For URLs, use URL shorteners if the link is very long.",
  },
  {
    question: "Is this QR code generator free to use?",
    answer:
      "Yes, this QR code generator is 100% free with no limits on usage, no subscriptions, no sign-up required, and no watermarks. You can generate as many QR codes as you need, as often as you want. All QR codes are generated in your browser and no data is sent to any server.",
  },
  {
    question: "Are the generated QR codes safe and private?",
    answer:
      "Absolutely. All QR code generation happens entirely in your browser using client-side JavaScript. Your data (URLs, text, Wi-Fi passwords, etc.) is never uploaded to any server, stored, or tracked. The QR codes you generate exist only in your browser. Once you close the tab or navigate away, all data is gone from memory.",
  },
  {
    question: "Can I create a Wi-Fi QR code?",
    answer:
      "Yes! Select the 'Wi-Fi' tab in our generator and enter your network name (SSID), password, and encryption type (WPA/WPA2, WEP, or None). When someone scans the Wi-Fi QR code, their phone will automatically prompt them to connect to your network without manually typing the password. This is perfect for home networks, offices, cafes, and events.",
  },
]
