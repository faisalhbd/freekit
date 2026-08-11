import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is a device mockup?",
    answer:
      "A device mockup is a visual representation of a design displayed within a realistic device frame, such as a phone, tablet, laptop, or desktop monitor. Instead of showing a raw screenshot, mockups present your work in context — as it would appear on an actual device. This makes designs look more professional and helps stakeholders visualize the final product.",
  },
  {
    question: "Why should I use device mockups?",
    answer:
      "Device mockups dramatically improve how your designs are perceived. A raw screenshot can look flat and uncontextualized, while a device mockup gives it depth, realism, and professionalism. Mockups are essential for portfolio presentations, client pitches, marketing materials, app store listings, and social media posts. Studies show that designs presented in device mockups receive more positive engagement than plain screenshots.",
  },
  {
    question: "What device frames are available?",
    answer:
      "Our generator offers six device frames: iPhone (with Dynamic Island), Samsung Galaxy, iPad, Laptop, Desktop Monitor, and Browser Window. Each frame is drawn with realistic details — phones include notches, camera dots, and home indicator bars; laptops include keyboard bases and trackpads; desktops include monitor stands; and the browser window includes traffic light buttons and an address bar.",
  },
  {
    question: "Can I change the frame color?",
    answer:
      "Yes, we offer four frame color options: Black, White, Space Gray, and Rose Gold. These cover the most common device finishes on the market. Black is the universal choice that works with any design. White frames create a clean, minimal look. Space Gray mimics Apple's popular mid-tone finish. Rose Gold adds a warm, premium feel.",
  },
  {
    question: "What resolution are the exported mockups?",
    answer:
      "All mockups are exported at 2x resolution for crisp, high-quality output. For example, if you choose the iPhone frame with a 375×812 screen, the exported PNG will have a screen area of 750×1624 pixels with appropriate frame padding. This 2x scaling ensures your mockups look sharp in presentations, on retina displays, and in print materials.",
  },
  {
    question: "Can I use a transparent background?",
    answer:
      "Yes, you can toggle the transparent background option. When enabled, the exported PNG will have a transparent background around the device, making it easy to place the mockup on any background in your design tools like Figma, Photoshop, or Canva. The checkerboard pattern in the preview indicates the transparent area.",
  },
  {
    question: "What image formats can I upload?",
    answer:
      "You can upload any standard image format including JPG, PNG, WebP, GIF, BMP, and SVG. The image will be automatically scaled and cropped to fit the device screen area using a cover-fit approach — this means the image fills the entire screen without distortion, and any excess is cropped from the edges. For best results, use high-resolution screenshots.",
  },
  {
    question: "How do I take a screenshot for the mockup?",
    answer:
      "For the best results, take a screenshot at the highest resolution possible. On Mac, use Cmd+Shift+4 for a selection or Cmd+Shift+3 for the full screen. On Windows, use Win+Shift+S for the Snipping Tool. For mobile app mockups, use the device's built-in screenshot function. For websites, browser extensions like GoFullPage can capture the entire page. Higher resolution input images produce sharper mockup outputs.",
  },
  {
    question: "Is this tool free to use?",
    answer:
      "Yes, this Device Mockup Generator is completely free with no watermarks, no sign-up required, and no download limits. All processing happens entirely in your browser — your images are never uploaded to any server. You can create as many mockups as you need for personal or commercial projects.",
  },
  {
    question: "Can I use the mockups for commercial projects?",
    answer:
      "Absolutely. The device frames we generate are stylized representations, not replicas of branded hardware. You can use the exported mockups for client presentations, marketing materials, website hero images, social media posts, app store listings, pitch decks, and any other commercial purpose. There are no usage restrictions on the output.",
  },
]
