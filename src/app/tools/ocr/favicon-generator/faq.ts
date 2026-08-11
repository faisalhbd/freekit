import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is a favicon?",
    answer:
      "A favicon (short for 'favorite icon') is a small image associated with a website that appears in the browser tab, bookmarks bar, and browser history. It helps users quickly identify your site among multiple open tabs. Typically displayed at 16x16 or 32x32 pixels, favicons are essential for brand recognition and professional web presence.",
  },
  {
    question: "What favicon sizes do I need?",
    answer:
      "For comprehensive browser and platform coverage, you need multiple sizes: 16x16 for browser tabs (classic), 32x32 for Windows site icons and bookmarks, 48x48 for Windows site icons, 64x64 for high-DPI Windows taskbar, 128x128 for Chrome Web Store and high-DPI displays, and 256x256 for Apple Touch Icon on iOS devices. This tool generates all six sizes from a single upload.",
  },
  {
    question: "ICO vs PNG — which format should I use?",
    answer:
      "Modern browsers support PNG favicons natively. The ICO format was traditionally required for older browsers, but today PNG is the recommended format because it supports transparency and produces sharper results at small sizes. This tool generates PNG files, which are fully supported by Chrome, Firefox, Safari, and Edge.",
  },
  {
    question: "How do I use the generated favicons on my website?",
    answer:
      "Place the PNG files in your website's root directory or an '/icons' folder. Then add these HTML tags inside the <head> section: <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png'> and <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png'>. For Apple Touch Icon, use: <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png'>.",
  },
  {
    question: "Is my image data private and secure?",
    answer:
      "Yes, all favicon generation happens entirely in your browser using the Canvas API. Your images are never uploaded to any server. The image stays on your device at all times, ensuring complete privacy and data security.",
  },
  {
    question: "Is this favicon generator free to use?",
    answer:
      "Yes, this tool is completely free with no limits. There are no sign-ups, no watermarks, no usage caps, and no hidden fees. You can generate favicons from as many images as you need without any restrictions.",
  },
  {
    question: "What image formats can I upload?",
    answer:
      "The tool accepts all common image formats including JPG, JPEG, PNG, WebP, BMP, GIF, and SVG (rasterized). For best results, use a square PNG or SVG source image with a transparent background. High-resolution source images (at least 512x512 pixels) produce the sharpest favicons.",
  },
  {
    question: "What do the background options do?",
    answer:
      "The background option controls what appears behind your icon. 'Transparent' keeps the original transparency (or adds it). 'Custom Color' fills the background with a color you choose using the color picker. A solid background is recommended for favicons because small transparent icons can be hard to see on light or dark browser tab backgrounds.",
  },
  {
    question: "What does the padding setting do?",
    answer:
      "Padding adds space around your icon within each favicon size. Options range from 0% (icon fills the entire space) to 20% (icon is smaller with more margin). A small padding (5-10%) is recommended to prevent the icon from touching the edges, which looks cleaner at small sizes.",
  },
  {
    question: "What shapes are available?",
    answer:
      "The tool offers three shape options: Square (standard favicon shape), Rounded (square with rounded corners for a modern look), and Circle (circular clipping, popular for app icons and PWA manifests). Choose based on your brand style and where the icon will be displayed.",
  },
  {
    question: "How does the ZIP download work?",
    answer:
      "Clicking 'Download All as ZIP' packages all six favicon sizes into a single ZIP file using JSZip. Each file is named with its size (e.g., favicon-16x16.png, favicon-32x32.png). This makes it easy to download everything at once and upload to your website in one step.",
  },
  {
    question: "Can I generate favicons from a non-square image?",
    answer:
      "Yes. If your source image is not square, the tool will center it and fit it within the largest square that fits inside the canvas, maintaining the original aspect ratio. Any remaining space will be filled with the background color (or be transparent if that option is selected).",
  },
]
