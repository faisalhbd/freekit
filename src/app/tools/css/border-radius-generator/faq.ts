import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is CSS border-radius?",
    answer:
      "The CSS border-radius property rounds the corners of an element's outer border edge. It accepts one or more length or percentage values that define the radius of the quarter ellipse that forms each corner. For example, border-radius: 8px; applies an 8px radius to all four corners, giving the element a softly rounded appearance. The property works on any element with a visible background, border, or box-shadow. It is one of the most commonly used CSS properties for modern UI design, enabling everything from subtle rounded cards to fully circular elements.",
  },
  {
    question: "What is the difference between the shorthand and individual corner properties?",
    answer:
      "The border-radius shorthand lets you set all four corners in a single declaration using one to four values. With one value (e.g., border-radius: 10px), all corners are equal. With two values (e.g., 10px 20px), the first applies to top-left and bottom-right, and the second to top-right and bottom-left. With four values (e.g., 10px 20px 30px 40px), they apply clockwise starting from the top-left. Alternatively, you can use individual properties: border-top-left-radius, border-top-right-radius, border-bottom-right-radius, and border-bottom-left-radius for explicit per-corner control.",
  },
  {
    question: "How do I create an elliptical border-radius?",
    answer:
      "To create an elliptical (non-circular) border radius, you provide two values separated by a slash for each corner. The first value is the horizontal radius and the second is the vertical radius. For example, border-radius: 20px / 10px creates corners that are twice as wide as they are tall. You can also apply this per-corner: border-radius: 30px 10px 20px 40px / 40px 20px 10px 30px. This gives you full control over the shape of each corner independently in both axes, enabling organic, flowing shapes.",
  },
  {
    question: "Does border-radius work on all HTML elements?",
    answer:
      "The border-radius property works on all elements, but the visual effect depends on the element's rendering. For elements with a visible background-color, border, or box-shadow, the rounded corners are immediately visible. However, on elements with overflow: visible, child content may extend beyond the rounded corners. For images, border-radius clips the image within the rounded shape. For table elements with border-collapse: collapse, border-radius is ignored in most browsers. Always pair border-radius with overflow: hidden if you need child content to be clipped to the rounded shape.",
  },
  {
    question: "What is the difference between percentage and pixel values for border-radius?",
    answer:
      "Pixel values create a fixed-radius corner regardless of the element's size. Percentage values are calculated relative to the element's dimensions. For a square element, 50% creates a perfect circle. For a rectangle, 50% creates an elliptical shape where the horizontal and vertical radii are proportional to the element's width and height. Percentages are ideal for responsive designs because the rounding scales with the element. Pixel values are better when you need consistent corner sizes across elements of different dimensions, such as a design system with a fixed 8px corner radius.",
  },
  {
    question: "What is the browser support for CSS border-radius?",
    answer:
      "CSS border-radius is supported in all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. It has been supported since Chrome 4, Firefox 4, Safari 5, and IE9. For very old browsers (Safari 4 and earlier, Android 2.1 and earlier), the -webkit- prefix was required, but this is no longer necessary in production code today. Border-radius is one of the most widely supported CSS3 properties and can be used without any vendor prefixes or fallbacks in modern web development.",
  },
  {
    question: "How does border-radius interact with overflow?",
    answer:
      "By default, border-radius only rounds the element's background, border, and box-shadow. Child content can still render in the square corner areas outside the rounded shape. To clip child content to the rounded corners, you must add overflow: hidden (or overflow: auto / scroll) to the element. This is commonly needed for images inside rounded containers, for cards with overflowing content, or for containers with absolutely positioned children. Note that overflow: hidden creates a new stacking context and a new block formatting context, which can affect layout and z-index behavior.",
  },
  {
    question: "Can border-radius be animated with CSS transitions?",
    answer:
      "Yes, border-radius animates smoothly with CSS transitions and keyframe animations because it is an animatable property. You can transition between different radius values for effects like a button morphing from rounded to square on hover. For the best performance, animate between numeric values (e.g., 4px to 20px). Avoid animating between percentage and pixel values in the same transition, as this can cause unexpected results. Border-radius animations are generally well-performing since they only affect the element's shape and don't trigger layout reflows of sibling elements.",
  },
  {
    question: "What are common border-radius values used in modern design?",
    answer:
      "Common border-radius values in modern UI design include: 4px for subtle rounding on small elements like tags and badges, 8px for standard cards and inputs, 12px for medium-sized containers and dialog boxes, 16px for larger panels and feature cards, 9999px or 50% for pill-shaped buttons and fully circular avatars, and mixed values like 16px 4px for a subtle rounded rectangle with only slight rounding on some corners. Design systems like Material Design (4-28px), Apple HIG (varies by element), and Tailwind CSS (rounded-sm: 0.125rem, rounded-lg: 0.5rem, rounded-full: 9999px) provide standardized scales.",
  },
  {
    question: "How do I make border-radius responsive?",
    answer:
      "There are several strategies for responsive border-radius. The simplest is using percentage values that scale with the element. For more control, use CSS custom properties that change at breakpoints: --radius: 8px on mobile and --radius: 16px on desktop. You can also use CSS clamp() for fluid values: border-radius: clamp(4px, 2vw, 16px). For design systems, define radius tokens at multiple breakpoints. Media queries remain the most explicit approach when you need different radius values at specific screen sizes. Always test your border-radius values at multiple viewport widths to ensure they look appropriate at every size.",
  },
]
