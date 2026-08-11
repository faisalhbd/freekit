import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is CSS box-shadow?",
    answer:
      "The CSS box-shadow property adds shadow effects around an element's frame. It accepts values for horizontal offset, vertical offset, blur radius, spread radius, and color. For example, box-shadow: 0 4px 6px rgba(0,0,0,0.1); creates a subtle shadow below the element. Box shadows are rendered outside the element's border box by default, but can also be rendered inside using the 'inset' keyword.",
  },
  {
    question: "What is the difference between inset and outer box shadows?",
    answer:
      "An outer box shadow (the default) renders the shadow outside the element, making it appear raised or floating above the background. An inset shadow renders inside the element's border box, creating a pressed-in or carved-out appearance. The inset keyword is placed at the beginning or end of the box-shadow value. You can combine both inset and outer shadows on the same element for complex depth effects.",
  },
  {
    question: "Can I apply multiple box shadows to the same element?",
    answer:
      "Yes, you can apply multiple box shadows by separating them with commas. Each shadow is rendered independently, so they layer on top of each other in the order they are listed. For example: box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.05);. This technique is commonly used to combine a sharp, close shadow for definition with a larger, softer shadow for depth. The first shadow in the list appears on top.",
  },
  {
    question: "Do box shadows affect layout or performance?",
    answer:
      "Box shadows do not affect layout — they do not change the element's dimensions or position in the document flow. However, complex or multiple box shadows can impact rendering performance, especially during animations. Large blur radii and multiple shadow layers force the browser to repaint areas around the element. For best performance, keep blur values reasonable (under 50px) and limit the number of shadow layers. Avoid animating box-shadow on performance-critical elements; instead, use transform and opacity for smoother animations.",
  },
  {
    question: "How does box-shadow interact with z-index and stacking context?",
    answer:
      "Box shadows are part of the element's painting and do not create a new stacking context on their own. However, if an element with a box-shadow is positioned (relative, absolute, fixed, or sticky), it establishes a stacking context. The shadow is painted as part of the element's background, below the element's content and border but above the parent's background. If two overlapping elements both have box shadows, z-index controls which shadow appears on top.",
  },
  {
    question: "What is the browser support for CSS box-shadow?",
    answer:
      "CSS box-shadow is supported in all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. It has been supported since Chrome 10, Firefox 4, Safari 5.1, and IE9. For very old browsers, you may need the -webkit- prefix for older Safari and Chrome versions. Today, box-shadow can be used without any vendor prefixes in production code. It is one of the most widely supported CSS properties.",
  },
  {
    question: "What are common box-shadow values used in modern design?",
    answer:
      "Common box-shadow values include: subtle elevation (0 1px 3px rgba(0,0,0,0.12)), medium elevation (0 4px 6px rgba(0,0,0,0.1)), high elevation (0 10px 25px rgba(0,0,0,0.15)), soft spread (0 0 0 3px rgba(0,0,0,0.05)), inset pressed (inset 0 2px 4px rgba(0,0,0,0.1)), and neon glow (0 0 10px rgba(0,255,136,0.5), 0 0 40px rgba(0,255,136,0.2)). Material Design and Tailwind CSS provide standardized shadow scales for consistent UI depth.",
  },
  {
    question: "What is the difference between box-shadow and the CSS drop-shadow filter?",
    answer:
      "The box-shadow property creates a rectangular shadow based on the element's border box. The drop-shadow() CSS filter function creates a shadow that follows the actual shape of the element, including transparency. This means drop-shadow works on non-rectangular elements like clipped images, SVGs, and elements with border-radius while box-shadow always produces a rectangular shadow. However, drop-shadow is a filter and may affect performance differently. For standard rectangular elements, box-shadow is preferred.",
  },
  {
    question: "Can box-shadow be animated with CSS transitions?",
    answer:
      "Yes, box-shadow can be animated using CSS transitions and keyframe animations. However, animating box-shadow is less performant than animating transform or opacity because it triggers layout recalculations. For smooth hover effects, consider using a pseudo-element with opacity animation instead: create a pseudo-element with the target shadow, set opacity to 0, and transition it to 1 on hover. This approach is GPU-accelerated and significantly smoother, especially on mobile devices and lower-powered hardware.",
  },
  {
    question: "What are best practices for using box shadows in production?",
    answer:
      "Key best practices include: use rgba() colors for shadows to allow easy opacity control, keep shadows subtle for a professional look (low opacity, small blur), use consistent shadow scales across your design system (e.g., sm/md/lg/xl), avoid excessively large blur radii that look unrealistic, combine multiple shadows for realistic depth (one sharp close shadow + one soft distant shadow), use inset shadows sparingly for interactive states like pressed buttons, always test shadows on both light and dark backgrounds, and consider using CSS custom properties to define shadow tokens for your design system.",
  },
]
