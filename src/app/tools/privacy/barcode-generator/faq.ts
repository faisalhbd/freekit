import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What barcode formats are supported?",
    answer:
      "This tool supports three formats: Code 128B (encodes full ASCII printable characters, codes 32-127), EAN-13 (13-digit European Article Number, used globally for product identification), and UPC-A (12-digit Universal Product Code, used primarily in North America).",
  },
  {
    question: "What is Code 128?",
    answer:
      "Code 128 is a high-density linear barcode symbology that can encode all 128 ASCII characters. Code 128B specifically encodes the full set of printable ASCII characters (space through tilde, codes 32-127). It is widely used in shipping, packaging, and inventory management because of its compact size and versatility.",
  },
  {
    question: "What is EAN-13?",
    answer:
      "EAN-13 is a 13-digit barcode standard used worldwide for marking products sold at retail. The first 12 digits identify the manufacturer and product. The 13th digit is a check digit calculated from the first 12. You can find EAN-13 barcodes on virtually all retail products outside North America.",
  },
  {
    question: "What is UPC-A?",
    answer:
      "UPC-A is a 12-digit barcode used primarily in the United States and Canada for retail products. It consists of 11 data digits plus a check digit. The first 6 digits identify the manufacturer, the next 5 identify the product, and the last is the check digit. UPC-A is a subset of EAN-13 (prepend a 0 to a UPC-A code to get an EAN-13).",
  },
  {
    question: "How do I get an EAN-13 or UPC-A number?",
    answer:
      "Official EAN/UPC numbers must be obtained from GS1 (the global standards organization). Each company registers and receives a unique prefix. However, for internal use, testing, or personal projects, you can use any valid number. Many barcode generators, including this one, will calculate the check digit for you if you omit it.",
  },
  {
    question: "Is the barcode generated in my browser?",
    answer:
      "Yes. The barcode is rendered on an HTML5 Canvas element entirely in your browser using JavaScript. No data is sent to any server. The PNG download is generated client-side using canvas.toDataURL().",
  },
  {
    question: "What image format is the download?",
    answer:
      "The barcode is downloaded as a PNG image. PNG is preferred for barcodes because it uses lossless compression, ensuring the barcode bars remain crisp and scannable. JPEG compression can blur the edges of bars and make the barcode harder to scan.",
  },
  {
    question: "Can I customize the barcode size?",
    answer:
      "Yes. You can adjust the width (number of modules) and height (in pixels) of the barcode. The default width of 2 pixels per module and height of 100 pixels produces a standard-sized barcode suitable for most applications.",
  },
  {
    question: "Will the barcode scan correctly?",
    answer:
      "Yes, the encoding follows the official specifications for each format. Code 128 uses the standard encoding table with proper start/stop codes and checksum. EAN-13 and UPC-A use the correct digit patterns and guard bars. The generated barcodes will scan with any standard barcode reader or scanner app.",
  },
  {
    question: "Can I use these barcodes commercially?",
    answer:
      "The barcode image format is free to use. However, if you are selling products through retail channels, you need officially registered EAN/UPC numbers from GS1. Using random or made-up EAN-13/UPC-A numbers for retail products can cause conflicts. For personal use, internal tracking, or non-retail applications, any valid number works.",
  },
]
