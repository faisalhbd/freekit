import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is HEX color format?",
    answer: "HEX (hexadecimal) is a 6-digit code prefixed with # that represents colors in web design. Each pair of digits represents the red, green, and blue components on a scale from 00 (0) to FF (255). For example, #FF5733 means red=255, green=87, blue=51. It is the most widely used color format in CSS and HTML."
  },
  {
    question: "What is the difference between RGB and HSL?",
    answer: "RGB (Red, Green, Blue) defines a color by mixing three light channels, each from 0 to 255. HSL (Hue, Saturation, Lightness) defines a color by its hue angle (0-360° on the color wheel), saturation (0-100% color intensity), and lightness (0-100% from black to white). HSL is often more intuitive for designers because you can easily adjust brightness and vibrancy."
  },
  {
    question: "What is HSV and how is it different from HSL?",
    answer: "HSV (Hue, Saturation, Value) is similar to HSL but uses 'Value' instead of 'Lightness'. In HSL, 100% lightness is pure white regardless of hue, while in HSV, 100% value means the full, pure color. The difference is most noticeable for saturated colors — HSL's lightness mixes in white, while HSV's value does not. HSV is commonly used in color picker interfaces and image editing software."
  },
  {
    question: "What is CMYK color format used for?",
    answer: "CMYK (Cyan, Magenta, Yellow, Key/Black) is a subtractive color model used primarily in print design. Unlike RGB which is additive (used for screens), CMYK represents the ink percentages applied to paper. Each component ranges from 0% to 100%. When you need to prepare designs for print, converting RGB colors to CMYK helps ensure the printed output matches your screen design as closely as possible."
  },
  {
    question: "How do I convert HEX to RGB?",
    answer: "To convert HEX to RGB, take each pair of hex digits and convert them from base-16 to base-10. For #FF5733: FF → 255 (red), 57 → 87 (green), 33 → 51 (blue), giving rgb(255, 87, 51). Our Color Converter does this instantly — just type or paste any HEX code and all other formats update in real time."
  },
  {
    question: "What color formats are supported in CSS?",
    answer: "Modern CSS supports several color formats: HEX (#FF5733 or #F53 shorthand), RGB (rgb(255, 87, 51) or rgba(255, 87, 51, 0.8)), HSL (hsl(14, 100%, 60%) or hsla()), HSV is not native to CSS but can be converted, and newer formats like oklch(), lch(), and hwb(). CSS Color Level 4 also supports 8-digit HEX with alpha (#FF573380)."
  },
  {
    question: "What is WCAG color contrast and why does it matter?",
    answer: "WCAG (Web Content Accessibility Guidelines) requires a minimum contrast ratio between text and background colors: 4.5:1 for normal text and 3:1 for large text (AA level). AAA level requires 7:1 for normal text. Our tool shows the contrast ratio of your selected color against white and black backgrounds, helping you ensure your designs meet accessibility standards."
  },
  {
    question: "What are color tints, shades, and tones?",
    answer: "Tints are created by adding white to a pure color (making it lighter). Shades are created by adding black (making it darker). Tones are created by adding gray (reducing saturation while keeping similar brightness). Our palette generator creates a range of tints and shades from your selected color, giving you a harmonious set of variations to work with."
  },
  {
    question: "How does the color palette generator work?",
    answer: "Our palette generator takes your selected color and creates a set of 5 variations by adjusting the lightness in HSL space. It generates lighter tints, the original color, and darker shades. This gives you a ready-to-use palette that maintains the same hue and works harmoniously together — perfect for UI design, branding, and web development."
  },
  {
    question: "Can I use alpha/transparency with these color formats?",
    answer: "Yes. RGBA adds an alpha channel to RGB: rgba(255, 87, 51, 0.5) where 0 is fully transparent and 1 is fully opaque. HSLA does the same for HSL: hsla(14, 100%, 60%, 0.5). In HEX, you can use 8-digit codes like #FF573380 where the last two digits represent alpha (80 in hex = 128 in decimal ≈ 50% opacity). CMYK can also include an alpha value for transparency in design tools."
  },
]
