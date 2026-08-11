import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is CSS clamp() and when should I use it?",
    answer:
      "CSS clamp() is a function that takes three values — a minimum, a preferred (fluid) value, and a maximum — and returns the preferred value clamped between the min and max. It is ideal for responsive design because it eliminates the need for multiple media query breakpoints. Common use cases include fluid typography, responsive padding and margins, container widths, and any sizing that should scale with the viewport. The syntax is: clamp(min, preferred, max).",
  },
  {
    question: "How does the clamp() math work internally?",
    answer:
      "The browser evaluates clamp(min, preferred, max) by computing three values and returning the middle one. If the preferred value is less than the minimum, the minimum is used. If the preferred value exceeds the maximum, the maximum is used. Otherwise, the preferred value is returned as-is. The preferred value is typically a calculation like: min + (max - min) * (100vw - viewportMin) / (viewportMax - viewportMin). This creates a linear interpolation that smoothly scales between the min and max values across the specified viewport range.",
  },
  {
    question: "How does clamp() compare to media queries for responsive design?",
    answer:
      "Media queries create discrete breakpoints where styles change abruptly at specific viewport widths. clamp() creates a continuous, fluid scaling effect with no jumps. For typography and spacing, clamp() is almost always preferable because it provides smoother transitions and requires far less CSS. However, media queries are still needed for layout changes like switching grid columns, hiding/showing elements, or changing flexbox direction. In practice, the best approach combines clamp() for fluid sizing with a few strategic media queries for structural layout changes.",
  },
  {
    question: "What is fluid typography and how does clamp() enable it?",
    answer:
      "Fluid typography is the practice of making font sizes scale smoothly between a minimum and maximum size based on the viewport width, rather than jumping between fixed sizes at breakpoints. With clamp(), you define the smallest acceptable font size, the ideal preferred size (usually a viewport-relative calculation), and the largest acceptable size. For example, clamp(1rem, 0.5rem + 1.5vw, 2.5rem) ensures the font never goes below 1rem or above 2.5rem, while scaling smoothly between them. This creates a reading experience that feels natural on every device.",
  },
  {
    question: "Can I use clamp() for spacing and margins?",
    answer:
      "Yes, clamp() works perfectly for spacing values like padding, margin, and gap. For example, clamp(1rem, 3vw, 3rem) for section padding creates breathing room that grows proportionally with the screen size. This is especially useful for hero sections, card padding, and container margins. Using clamp() for spacing reduces the number of media queries needed and ensures consistent visual proportions across all devices.",
  },
  {
    question: "How do I use clamp() for layout and container widths?",
    answer:
      "Clamp() is excellent for responsive container widths. Instead of using max-width with media queries, you can write something like width: clamp(320px, 90%, 1200px). This ensures the container is at least 320px wide, takes up 90% of the viewport normally, but never exceeds 1200px. You can also use it for grid column widths, sidebar sizes, and any element that needs to scale within bounds. This approach often eliminates the need for separate container queries or complex media query setups.",
  },
  {
    question: "What is the browser support for CSS clamp()?",
    answer:
      "CSS clamp() has excellent browser support and is supported in all modern browsers including Chrome 79+, Firefox 75+, Safari 13.1+, Edge 79+, and Opera 66+. It is not supported in Internet Explorer, but IE has been officially retired. For most projects, clamp() is safe to use without any fallbacks. If you need to support very old browsers, you can provide a fixed fallback value before the clamp() declaration, as browsers that do not understand clamp() will ignore the entire declaration.",
  },
  {
    question: "What is the difference between clamp(), min(), and max() in CSS?",
    answer:
      "CSS offers three comparison functions: clamp(min, preferred, max) returns the preferred value bounded by min and max. min(a, b) returns the smaller of two values. max(a, b) returns the larger of two values. Notably, clamp(min, preferred, max) is equivalent to max(min, min(preferred, max)). Each function has its use case — use min() for an upper bound only (e.g., max-width), max() for a lower bound only (e.g., min-width), and clamp() when you need both bounds with a fluid preferred value.",
  },
  {
    question: "Does using clamp() affect CSS rendering performance?",
    answer:
      "No, clamp() has no measurable negative impact on rendering performance. The calculation is resolved by the browser's CSS engine during the cascade/compute phase, just like any other CSS value. Since clamp() replaces what would otherwise be multiple media query declarations with JavaScript-like viewport listeners (if using JS-based solutions), it can actually improve performance by reducing the number of style recalculations during resize events. The browser handles the interpolation natively and efficiently.",
  },
  {
    question: "What are some common clamp() patterns and best practices?",
    answer:
      "Common patterns include: Fluid body text (clamp(1rem, 0.5rem + 1vw, 1.5rem)), fluid headings (clamp(1.75rem, 1rem + 2.5vw, 3.5rem)), responsive padding (clamp(1rem, 3vw, 4rem)), and container widths (clamp(300px, 90%, 1200px)). Best practices: always set a sensible minimum so text remains readable on small screens; keep the preferred value as a simple vw-based calculation; use rem for typography minimums and maximums; and test at multiple viewport widths to ensure the scaling feels natural. Avoid setting the min and max too close together, as this defeats the purpose of fluid scaling.",
  },
]
