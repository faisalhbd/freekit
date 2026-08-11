import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is SVG to PNG conversion?",
    answer:
      "SVG to PNG conversion transforms a Scalable Vector Graphics (SVG) file into a Portable Network Graphics (PNG) raster image. SVG files use mathematical paths and shapes to define graphics, while PNG files use a grid of pixels. The conversion process renders the vector graphic at a specific resolution into a pixel-based image.",
  },
  {
    question: "Why would I need to convert SVG to PNG?",
    answer:
      "While SVG is excellent for scalable graphics, many platforms and applications require raster formats. Common reasons include uploading profile pictures or avatars that only accept PNG/JPG, embedding icons in email templates, preparing graphics for social media, creating favicon files, and ensuring consistent rendering across older browsers or apps that do not support SVG.",
  },
  {
    question: "Will I lose quality when converting SVG to PNG?",
    answer:
      "Since SVG is a vector format, the output quality of the PNG depends entirely on the resolution you choose. At 1x scale (the SVG's native dimensions), you get the baseline quality. At 2x, 3x, or 4x scale, the output is sharper and more detailed. The key advantage of SVG is that you can render it at any size without losing quality — so choose a high enough scale factor for your needs.",
  },
  {
    question: "Can I set a custom output size?",
    answer:
      "Yes, this tool offers several output size options: 1x (original SVG dimensions), 2x, 3x, 4x, or a fully custom size where you can specify exact width and height in pixels. For custom sizes, you can choose to maintain the aspect ratio or set independent dimensions.",
  },
  {
    question: "What background options are available?",
    answer:
      "You can choose between transparent background (preserves any transparency in the SVG), white background (useful for avatars and icons), or a custom color background. When outputting as JPG, transparent areas are automatically filled with white since the JPG format does not support transparency.",
  },
  {
    question: "Can I convert SVG to JPG instead of PNG?",
    answer:
      "Yes, this tool supports both PNG and JPG output formats. PNG supports transparency and is generally preferred for graphics with sharp edges like icons and logos. JPG is better suited for complex illustrations with gradients and many colors where file size matters more than pixel-perfect edges.",
  },
  {
    question: "How does the SVG code paste mode work?",
    answer:
      "In addition to uploading SVG files, you can switch to the 'Paste SVG Code' tab and paste raw SVG markup directly. This is useful when you have SVG code from a website, design tool, or code editor. The tool will render it, show a preview, and let you convert it just like an uploaded file.",
  },
  {
    question: "Is my SVG data private and secure?",
    answer:
      "Yes, all conversion processing happens entirely in your browser using the Canvas API. Your SVG files and pasted code are never uploaded to any server. Everything stays on your device, ensuring complete privacy.",
  },
  {
    question: "Can I convert multiple SVG files at once?",
    answer:
      "Yes, the file upload mode supports batch conversion. You can drag and drop or select multiple SVG files, and they will all be listed with individual previews. Clicking 'Convert All' processes every file with the same settings, and you can download them individually or all at once.",
  },
  {
    question: "Is this SVG to PNG converter free to use?",
    answer:
      "Yes, this tool is completely free with no limitations. There are no sign-ups required, no watermarks added, no usage caps, and no hidden fees. You can convert as many SVG files as you need.",
  },
  {
    question: "What happens if my SVG has no explicit width or height?",
    answer:
      "If the SVG does not specify width and height attributes but has a viewBox, the tool will use the viewBox dimensions as the base size. If neither is present, the tool will attempt to render the SVG at a default size of 300x150 pixels. You can always override this with a custom output size.",
  },
  {
    question: "Does this tool work on mobile devices?",
    answer:
      "Yes, the tool is fully responsive and works on smartphones and tablets. You can upload SVG files from your device or paste SVG code on any screen size. The interface adapts to all devices for a comfortable experience.",
  },
]
