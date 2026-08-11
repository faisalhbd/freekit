import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How many photos can I use in a collage?",
    answer:
      "You can use between 2 and 6 photos in a single collage. The available layouts automatically filter based on how many photos you have uploaded. Simply add your photos first, then choose from the layouts that match your photo count.",
  },
  {
    question: "What layout options are available?",
    answer:
      "We offer 10 layout options across different photo counts. For 2 photos: side by side and top/bottom. For 3 photos: one large plus two right, three in a row, and two top plus one bottom. For 4 photos: 2×2 grid, one large plus three right, and three top plus one bottom. For 6 photos: 2×3 and 3×2 grids.",
  },
  {
    question: "Can I change the order of my photos?",
    answer:
      "Yes! Each photo in your list has move up and move down buttons. Click the up arrow to move a photo earlier in the sequence or the down arrow to move it later. Photos are placed into collage slots in order, so reordering changes which photo appears in which position of the layout.",
  },
  {
    question: "What does the border width control do?",
    answer:
      "The border width adds a colored frame around each photo in the collage. Set it to 0px for no borders, or increase up to 20px for thick frames. Combined with the border color picker, you can create everything from thin white borders to bold colored frames that give your collage a polished, gallery-like appearance.",
  },
  {
    question: "What is the gap/spacing setting?",
    answer:
      "Gap controls the space between photos in your collage. A gap of 0px means photos touch each other, while higher values create visible separation. This works independently from borders — you can have no borders but still have spacing between photos for a clean, modern look.",
  },
  {
    question: "Can I remove a single photo from the collage?",
    answer:
      "Yes, each photo in your list has a trash icon button. Click it to remove that specific photo. The remaining photos will shift to fill the slots, and the layout options will automatically update to match the new photo count.",
  },
  {
    question: "What image formats can I upload?",
    answer:
      "You can upload images in PNG, JPG/JPEG, WebP, and GIF formats. You can select multiple files at once when uploading. All images are processed entirely in your browser and never uploaded to any server. For best results, use high-resolution images so they look crisp in the collage.",
  },
  {
    question: "Is this photo collage maker free?",
    answer:
      "Yes, this photo collage maker is completely free with no watermarks, no sign-up required, and no limits on how many collages you create. Everything runs 100% in your browser, so your photos stay private on your device. Create and download as many collages as you want.",
  },
  {
    question: "What size is the downloaded collage?",
    answer:
      "The collage is exported as a PNG image at 800×600 pixels. This is a versatile size that works well for social media posts, blog headers, presentations, and printing at standard photo sizes. The PNG format ensures lossless quality with sharp edges and accurate colors.",
  },
  {
    question: "How do I use the collage for social media?",
    answer:
      "After downloading your collage, you can share it directly to any social media platform. The 800×600 size works well on Instagram (crop to square if needed), Facebook, Twitter/X, Pinterest, and LinkedIn. For Instagram Stories or TikTok, you may want to use a different aspect ratio, which we may add in future updates.",
  },
]
