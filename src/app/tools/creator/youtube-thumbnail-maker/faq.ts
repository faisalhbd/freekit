import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What size should a YouTube thumbnail be?",
    answer:
      "The recommended YouTube thumbnail size is 1280 × 720 pixels with a 16:9 aspect ratio. YouTube displays thumbnails at this resolution on desktop and scales them down on mobile. The minimum acceptable width is 640 pixels, but using the full 1280 × 720 ensures your thumbnail looks crisp and professional across all devices. Our tool outputs at exactly this recommended size.",
  },
  {
    question: "Why are thumbnails important for YouTube videos?",
    answer:
      "Thumbnails are one of the most critical factors in whether someone clicks on your video. YouTube themselves have stated that 90% of the best-performing videos use custom thumbnails. A compelling thumbnail works alongside your video title to communicate your content's value and create curiosity. Videos with eye-catching thumbnails consistently achieve 2-3x higher click-through rates compared to auto-generated ones.",
  },
  {
    question: "What makes a good YouTube thumbnail?",
    answer:
      "A good YouTube thumbnail has several key elements: a high-quality background image or bold color, large and readable text (3-5 words maximum), high contrast between text and background, a clear focal point, and an emotional or curiosity-inducing element. The best thumbnails communicate the video's value instantly, even at small sizes on mobile screens. Avoid cluttering the thumbnail with too much text or small details.",
  },
  {
    question: "Can I use this tool for free?",
    answer:
      "Yes, this YouTube Thumbnail Maker is completely free to use with no watermarks, no sign-up required, and no limits on how many thumbnails you create. Everything runs in your browser so your images are never uploaded to any server. You can create and download as many thumbnails as you need.",
  },
  {
    question: "What file format should YouTube thumbnails be?",
    answer:
      "YouTube accepts thumbnails in JPG, PNG, BMP, and GIF formats. We export as PNG by default because it provides the best quality for text-heavy designs with sharp edges and clean colors. PNG uses lossless compression, so your text remains perfectly crisp. The file size should be under 2MB for reliable uploading, and PNG thumbnails with simple backgrounds typically stay well under this limit.",
  },
  {
    question: "How do text outlines and shadows help thumbnails?",
    answer:
      "Text outlines (strokes) and shadows dramatically improve readability, especially when your thumbnail has a busy or photographic background. The outline creates a clear boundary between the text and whatever is behind it, while shadows add depth and separation. This combination ensures your text is legible even when YouTube compresses the image or viewers are watching on small mobile screens.",
  },
  {
    question: "What overlay effect should I use?",
    answer:
      "It depends on your background. A dark gradient overlay works best when you have a photographic background and want to place text at the bottom — it darkens the lower portion to create a natural text area. A vignette overlay darkens the edges uniformly, drawing attention to the center and working well with any background. Use no overlay when you have a solid or gradient background with sufficient contrast against your text color.",
  },
  {
    question: "Can I upload my own background image?",
    answer:
      "Yes, you can upload any image as your thumbnail background. The image will be automatically cropped to fill the 1280 × 720 canvas using a cover-fit approach (similar to CSS object-fit: cover). This means the image fills the entire thumbnail area without distortion. Supported formats include JPG, PNG, WebP, and GIF. For best results, use a high-resolution image.",
  },
  {
    question: "How do I change my YouTube thumbnail after uploading a video?",
    answer:
      "Go to YouTube Studio (studio.youtube.com), find your video in the Content tab, click on it, and then click the Custom Thumbnail button under the Thumbnail section. Upload the PNG file you downloaded from this tool. You can change thumbnails on existing videos at any time. Note that it may take a few minutes for the new thumbnail to appear across all platforms after uploading.",
  },
  {
    question: "Should I use the same style for all my video thumbnails?",
    answer:
      "Yes, maintaining a consistent thumbnail style helps build channel recognition and brand identity. Use the same color scheme, text placement, font styling, and overlay effects across your thumbnails. This consistency makes your videos instantly recognizable in search results and subscribers' feeds. You can save your settings and reuse them for each new video by keeping the same configuration in this tool.",
  },
]
