import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How do I make a meme?",
    answer:
      "Choose a popular template from our gallery or upload your own image, then type your top and bottom text. Adjust the font size, family, color, and stroke settings to your liking. When you're happy with the preview, click Download PNG to save your meme. The entire process takes just a few seconds and everything happens in your browser.",
  },
  {
    question: "Can I upload my own image as a meme template?",
    answer:
      "Yes! Switch to the Upload tab and click the upload area to select any image from your device. The image will be automatically fitted to the 800×600 canvas using a cover-crop approach so it fills the entire area without distortion. Supported formats include PNG, JPG, WebP, and GIF.",
  },
  {
    question: "What is the classic meme text style?",
    answer:
      "The classic meme style uses Impact font in ALL CAPS with white text and a thick black outline (stroke). This combination ensures the text is readable on virtually any background image, which is why it became the standard format for internet memes. Our tool defaults to this style, but you can customize every aspect.",
  },
  {
    question: "What font size should I use for my meme?",
    answer:
      "The default 42px works well for most memes with short text. If your text is longer, try a smaller size like 30-36px so it fits without wrapping too much. For very short, punchy text (1-3 words), you can go up to 56-72px for maximum impact. Use the slider to find the perfect size in real time.",
  },
  {
    question: "Why is the text stroke/outline important?",
    answer:
      "The stroke (outline) creates a high-contrast border around your text, making it readable against any background — whether it's a bright photo, a dark scene, or a busy pattern. Without the stroke, text can easily blend into the background and become unreadable. The classic meme uses white text with a black stroke, which provides the best universal readability.",
  },
  {
    question: "Can I change the meme canvas size?",
    answer:
      "Currently, the meme generator creates images at 800×600 pixels, which is a versatile size that works well for most social media platforms and messaging apps. This size provides a good balance between quality and file size. Future updates may include customizable canvas dimensions.",
  },
  {
    question: "Is this meme generator free to use?",
    answer:
      "Yes, this meme generator is completely free with no watermarks, no sign-up required, and no limits on how many memes you create. Everything runs 100% in your browser, so your images never leave your device. Create and download as many memes as you want.",
  },
  {
    question: "What image formats can I upload?",
    answer:
      "You can upload images in PNG, JPG/JPEG, WebP, and GIF formats. The uploaded image is processed entirely in your browser using the Canvas API and is never sent to any server. For best results, use a high-resolution image so it looks crisp at the 800×600 output size.",
  },
  {
    question: "Can I use the memes I create commercially?",
    answer:
      "Memes created with your own original images are yours to use however you like, including commercially. However, be mindful that popular meme templates often feature copyrighted images, likenesses, or trademarked content. Always check the usage rights of any template images and respect the original creators' rights.",
  },
  {
    question: "How do I share my meme on social media?",
    answer:
      "After downloading your meme as a PNG file, you can share it directly to any social media platform. Simply open your social media app, create a new post, and select the downloaded meme image from your device. The 800×600 size works well on Twitter/X, Facebook, Instagram, Reddit, and most messaging apps.",
  },
]
