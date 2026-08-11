import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is EXIF data in photos?",
    answer:
      "EXIF (Exchangeable Image File Format) is a standard that specifies the formats for images, sound, and ancillary tags used by digital cameras, smartphones, and other devices. When you take a photo, your camera or phone automatically embeds this metadata into the image file, recording details about how, when, and where the photo was taken.",
  },
  {
    question: "What kind of information is stored in EXIF metadata?",
    answer:
      "EXIF metadata can contain a wide range of information including: GPS coordinates (latitude and longitude) showing exactly where the photo was taken, camera make and model, lens information, shutter speed, aperture, ISO, focal length, date and time the photo was captured, software used for editing, thumbnail previews, and sometimes even the photographer's name and copyright information.",
  },
  {
    question: "Can EXIF data reveal my location?",
    answer:
      "Yes, this is one of the most significant privacy concerns. Most smartphones automatically embed GPS coordinates into photos. When you share these photos online, anyone who downloads the image can extract the exact location where it was taken, potentially revealing your home address, workplace, or places you frequently visit.",
  },
  {
    question: "What are the privacy risks of sharing photos with EXIF data?",
    answer:
      "Sharing photos with intact EXIF data can expose your GPS location, reveal personal routines and habits, disclose what camera equipment you own, show the original unedited version of a photo (if a thumbnail is embedded), and potentially allow strangers to track your movements over time. Stalkers, burglars, and data collectors can exploit this information.",
  },
  {
    question: "How does this EXIF removal tool work?",
    answer:
      "This tool uses the HTML5 Canvas API to strip metadata. It loads your image onto a canvas element at its original dimensions and then exports it as a new image blob. The canvas re-encoding process does not preserve any EXIF or other metadata from the original file, so the resulting image is visually identical but completely clean of all embedded data.",
  },
  {
    question: "Which image formats contain EXIF data?",
    answer:
      "EXIF metadata is primarily found in JPEG (JPG) files, which are the most common format for photos. TIFF files also commonly contain EXIF data. WebP files can include EXIF metadata as well. These formats were designed to support embedded metadata, making them the primary targets for EXIF removal.",
  },
  {
    question: "Does PNG format have EXIF data?",
    answer:
      "PNG files do not natively use the EXIF standard for metadata. Instead, PNG uses its own metadata format called tEXt, iTXt, and zTXt chunks. However, some software may embed EXIF data into PNG files as raw binary data. This tool handles all of these cases by re-encoding the image through the canvas, which strips all metadata regardless of format.",
  },
  {
    question: "Will removing EXIF data affect my image quality?",
    answer:
      "For most purposes, no. The visual quality of the image remains identical. However, if the original is a JPEG, the canvas re-encoding process applies a new compression cycle, which can cause a very slight quality loss. This is usually imperceptible to the human eye. If you need lossless results, consider using lossless PNG output.",
  },
  {
    question: "Is this EXIF remover free to use?",
    answer:
      "Yes, this tool is completely free with no limitations. There are no sign-ups required, no watermarks added, no usage caps, and no hidden fees. You can remove metadata from as many images as you need, as often as you want.",
  },
  {
    question: "Are my images uploaded to a server?",
    answer:
      "No, all processing happens entirely in your browser using the Canvas API. Your images never leave your device and are never uploaded to any server. This ensures complete privacy — even we cannot see your photos.",
  },
  {
    question: "Can I process multiple images at once?",
    answer:
      "Yes, this tool supports batch processing. You can drag and drop or select multiple images at once, and they will all be listed with their metadata status. You can then remove metadata from all files with a single click and download them all at once.",
  },
  {
    question: "Does social media automatically strip EXIF data?",
    answer:
      "It depends on the platform. Major platforms like Facebook, Instagram, Twitter/X, and WhatsApp do strip most EXIF data including GPS coordinates when you upload photos. However, this is not guaranteed for all platforms, and some smaller or specialized sites may preserve the original metadata. It is always safer to strip metadata yourself before sharing anywhere.",
  },
]
