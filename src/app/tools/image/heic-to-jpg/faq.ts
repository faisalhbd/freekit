import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is a HEIC file?",
    answer:
      "HEIC (High Efficiency Image Container) is Apple's default photo format on iOS 11 and later. It uses HEVC (H.265) compression to store photos at roughly half the file size of equivalent JPG images while maintaining similar or better quality. HEIF (High Efficiency Image Format) is the underlying standard.",
  },
  {
    question: "Why can't I open HEIC files on my computer?",
    answer:
      "HEIC files are not natively supported by many older operating systems, web browsers, and image editing software. Windows requires the HEIF Image Extensions from the Microsoft Store, and many Linux distributions lack HEIC support entirely. Converting to JPG ensures your photos can be opened anywhere.",
  },
  {
    question: "Will converting HEIC to JPG reduce quality?",
    answer:
      "The quality slider lets you control this. At 90-100% quality, the JPG output will be virtually indistinguishable from the original HEIC. At lower quality settings, you can achieve smaller file sizes at the cost of some detail. For most purposes, 85-90% quality provides an excellent balance.",
  },
  {
    question: "Can I convert multiple HEIC files at once?",
    answer:
      "Yes, this tool supports batch conversion. Drag and drop multiple HEIC or HEIF files at once, and they will all be converted to JPG simultaneously. You can download each file individually or use the 'Download All' button to save everything at once.",
  },
  {
    question: "Does this tool preserve EXIF data (date, location, camera info)?",
    answer:
      "The heic2any library preserves most EXIF metadata during conversion, including camera model, date taken, and GPS coordinates. The converted JPG files will retain this information, so your photo library organization is maintained.",
  },
  {
    question: "Are my photos uploaded to a server?",
    answer:
      "No. All conversion happens entirely in your browser using the heic2any JavaScript library. Your HEIC photos are never uploaded to any server. The conversion runs locally on your device, making it completely safe for private and sensitive photos.",
  },
  {
    question: "What is the maximum file size for HEIC conversion?",
    answer:
      "Each HEIC file can be up to 50MB. Most iPhone photos are between 1-5MB in HEIC format, so this limit accommodates even the highest resolution iPhone photos including ProRAW and 48MP shots.",
  },
  {
    question: "Does this work with HEIF files too?",
    answer:
      "Yes, HEIF (High Efficiency Image Format) is supported alongside HEIC. Both formats use the same underlying HEVC compression. If your files have a .heif extension, they will be converted to JPG just like .heic files.",
  },
  {
    question: "Why are the converted JPG files larger than the HEIC originals?",
    answer:
      "This is normal and expected. HEIC uses more efficient compression (HEVC/H.265) than JPG (DCT-based JPEG compression). A typical HEIC photo from an iPhone might be 2-3MB, while the equivalent JPG at high quality could be 4-8MB. You can use the quality slider to reduce JPG file size.",
  },
  {
    question: "Is this HEIC to JPG converter free?",
    answer:
      "Yes, this tool is 100% free with no usage limits, no subscriptions, no sign-ups, and no hidden fees. Convert as many HEIC photos as you need. There are no watermarks added to your converted images.",
  },
]
