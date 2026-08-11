import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is the difference between linear, radial, and conic gradients?",
    answer:
      "Linear gradients transition colors along a straight line defined by an angle or direction (e.g., top to bottom). Radial gradients transition colors outward from a center point in a circular or elliptical shape. Conic gradients transition colors around a center point in a sweeping arc, similar to a color wheel or pie chart. Each type serves different design purposes — linear for backgrounds and overlays, radial for spotlights and vignettes, and conic for charts and creative effects.",
  },
  {
    question: "What are color stops in CSS gradients?",
    answer:
      "Color stops define where a color should appear along the gradient path. Each stop has a color and an optional position (specified as a percentage or length). For example, in linear-gradient(90deg, red 0%, blue 100%), red is at the start (0%) and blue is at the end (100%). You can have two or more color stops to create multi-color gradients, and stops can overlap to create sharp transitions.",
  },
  {
    question: "Can I create repeating gradients?",
    answer:
      "Yes. CSS provides repeating-linear-gradient(), repeating-radial-gradient(), and repeating-conic-gradient() functions. These repeat the gradient pattern infinitely. The key is to define a color pattern that doesn't span the full range — for example, repeating-linear-gradient(45deg, red 0px, blue 10px) creates diagonal stripes. Repeating gradients are useful for creating patterns like stripes, checkerboards, and geometric backgrounds without images.",
  },
  {
    question: "How do gradient angles work in CSS?",
    answer:
      "Gradient angles are specified in degrees (0deg to 360deg) or using directional keywords (to top, to right, to bottom-right, etc.). The angle defines the direction the gradient flows toward. For example, 0deg goes from bottom to top, 90deg goes from left to right, and 180deg goes from top to bottom (the default). You can also use keyword combinations like 'to top right' for diagonal gradients.",
  },
  {
    question: "Do CSS gradients work in all browsers?",
    answer:
      "Modern CSS gradients are supported in all major browsers including Chrome, Firefox, Safari, Edge, and Opera. The basic linear-gradient() and radial-gradient() functions have been supported since IE10 (with vendor prefixes). Conic gradients are supported in Chrome 69+, Firefox 83+, Safari 12.1+, and Edge 79+. For maximum compatibility, always include a solid background-color fallback before the gradient declaration.",
  },
  {
    question: "How do I use gradients as background-image?",
    answer:
      "CSS gradients are applied using the background-image property. For example: background-image: linear-gradient(to right, #ff6b6b, #feca57);. You can also use the shorthand background property. Gradients can be combined with other backgrounds by listing them comma-separated. You can also use background-size, background-position, and other background properties to control how the gradient renders within the element.",
  },
  {
    question: "How do I create gradient text effects?",
    answer:
      "To create gradient text, apply a gradient to the background-image and then use background-clip: text with -webkit-background-clip: text for WebKit browsers, combined with color: transparent. For example: background: linear-gradient(to right, #ff6b6b, #feca57); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: transparent;. This technique clips the gradient to the text shape, creating vibrant multicolor text.",
  },
  {
    question: "Are CSS gradients performant compared to image backgrounds?",
    answer:
      "Yes, CSS gradients are highly performant. They are generated mathematically by the browser rather than requiring image file downloads, which reduces page load time and bandwidth. Gradients scale infinitely without pixelation and can be animated. They also require no extra HTTP requests. For simple patterns, CSS gradients are significantly more efficient than loading background images, and they respond instantly to media queries and state changes.",
  },
  {
    question: "What are common mistakes when using CSS gradients?",
    answer:
      "Common mistakes include: forgetting to add a fallback solid background-color for older browsers, using too many color stops which can create muddy transitions, not specifying positions for color stops leading to uneven spacing, applying gradients to large areas without considering mobile data usage (though CSS gradients are lightweight), and forgetting that gradient syntax has changed over the years — the modern syntax uses 'to [direction]' for angles instead of the legacy direction-based syntax.",
  },
  {
    question: "How can I make gradients accessible?",
    answer:
      "For accessibility, always ensure there is sufficient contrast between text and gradient backgrounds. Use a contrast checker against the darkest and lightest points of the gradient. Provide a fallback solid background-color that also meets contrast requirements. Avoid using gradient text as the only way to convey important information — ensure the text remains readable if the gradient fails to render. Consider users with color vision deficiencies by avoiding gradients that rely solely on color to distinguish sections.",
  },
]
