import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is RGB color format?",
    answer:
      "RGB stands for Red, Green, Blue. It is an additive color model where each channel ranges from 0 to 255, representing the intensity of red, green, and blue light. By mixing different amounts of these three primary colors, you can produce over 16.7 million unique colors. In CSS, RGB is written as rgb(255, 87, 51) where each number corresponds to one channel. RGB is the most intuitive format when you need to think about or manipulate individual color channels.",
  },
  {
    question: "What is a HEX color code?",
    answer:
      "A HEX color code is a 6-digit hexadecimal number prefixed with # that represents a color. Each pair of two digits corresponds to the red, green, and blue channels using hexadecimal notation (0-9 and A-F). For example, #FF5733 means red=255 (FF in hex), green=87 (57 in hex), and blue=51 (33 in hex). HEX is the most widely used color format in web development because it is compact and universally supported across all browsers, design tools, and frameworks.",
  },
  {
    question: "How do I convert RGB to HEX manually?",
    answer:
      "To convert RGB to HEX manually, take each channel value (0-255) and convert it from decimal to a 2-digit hexadecimal number. For example, RGB(255, 87, 51): 255 in decimal = FF in hex (red), 87 in decimal = 57 in hex (green), 51 in decimal = 33 in hex (blue). Combine them with a # prefix: #FF5733. You can convert decimal to hex by repeatedly dividing by 16 and reading the remainders, or use the formula: hex digit = Math.floor(value / 16) followed by value % 16.",
  },
  {
    question: "When should I use HEX instead of RGB?",
    answer:
      "Use HEX when you want a compact color representation, when writing standard CSS color values, or when sharing colors across design tools and codebases. HEX is the default format in most design applications like Figma, Sketch, and Adobe products. Use RGB when you need to manipulate individual color channels programmatically, animate colors with JavaScript, or add transparency via rgba(). Both formats represent the exact same color — the choice is about convenience and context.",
  },
  {
    question: "Why do RGB values range from 0 to 255?",
    answer:
      "RGB values range from 0 to 255 because each color channel uses 8 bits of data. In binary, 8 bits can represent 2^8 = 256 distinct values (0 through 255), where 0 means no light for that channel and 255 means maximum intensity. This 8-bit-per-channel system (24 bits total for RGB) can produce 256 × 256 × 256 = 16,777,216 possible colors, often referred to as '16.7 million colors' or 'true color.' This range has been the standard for web colors since the early days of HTML.",
  },
  {
    question: "How do I use HEX color codes in CSS?",
    answer:
      "In CSS, use HEX codes directly as color values: color: #FF5733; or background-color: #FF5733;. HEX works with any CSS property that accepts a color value, including border-color, box-shadow, text-decoration-color, and more. You can also use 3-digit shorthand like #F53 when both digits in each pair match. Modern CSS (Color Level 4) supports 8-digit HEX with alpha: #FF573380 where the last two digits represent opacity (00 = transparent, FF = opaque).",
  },
  {
    question: "Can I convert RGB with alpha (transparency) to HEX?",
    answer:
      "Yes, CSS Color Level 4 supports 8-digit HEX codes that include an alpha channel. The format is #RRGGBBAA where AA is the opacity in hexadecimal (00 = fully transparent, FF = fully opaque). For example, rgba(255, 87, 51, 0.5) converts to #FF573380. Our converter shows the standard 6-digit HEX code and the RGBA equivalent separately, so you can use either depending on your needs. Note that older browsers may not support 8-digit HEX, so RGBA is safer for transparency.",
  },
  {
    question: "What are some common RGB values and their HEX equivalents?",
    answer:
      "Here are widely used colors: Pure Black is rgb(0, 0, 0) = #000000, Pure White is rgb(255, 255, 255) = #FFFFFF, Pure Red is rgb(255, 0, 0) = #FF0000, Pure Green is rgb(0, 255, 0) = #00FF00, Pure Blue is rgb(0, 0, 255) = #0000FF. Popular web colors include rgb(51, 51, 51) = #333333 (dark gray), rgb(102, 102, 102) = #666666 (medium gray), and rgb(255, 193, 7) = #FFC107 (amber). Our tool lets you enter any RGB values to see the HEX equivalent instantly.",
  },
  {
    question: "What is the difference between RGB and HSL color spaces?",
    answer:
      "RGB defines a color by the intensity of red, green, and blue light components. HSL (Hue, Saturation, Lightness) defines a color by its position on the color wheel (hue 0-360°), how vivid it is (saturation 0-100%), and how bright it is (lightness 0-100%). HSL is often more intuitive for designers because you can easily create lighter or darker shades by adjusting only the lightness value. Both map to the same set of 16.7 million colors. Our converter shows both HEX and HSL outputs so you can use whichever format suits your workflow.",
  },
  {
    question: "Is RGB to HEX conversion always accurate?",
    answer:
      "Yes, the mathematical conversion from RGB to HEX is exact and lossless. Both formats represent the same 24-bit color data — they are simply different notations. RGB uses decimal numbers (0-255) for each channel, while HEX uses hexadecimal pairs (00-FF). The conversion involves only base conversion (decimal to hexadecimal) with no rounding, approximation, or color shift. An RGB value and its HEX equivalent will always render identically on any screen, regardless of which format you choose.",
  },
]
