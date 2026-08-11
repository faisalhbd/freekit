import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is a HEX color code?",
    answer:
      "A HEX color code is a 6-digit hexadecimal number prefixed with # that represents a color in web design. Each pair of digits corresponds to the red, green, and blue channels on a scale from 00 (0) to FF (255). For example, #FF5733 means red=255, green=87, blue=51. HEX is the most widely used color format in CSS, HTML, and design tools because it is compact and universally supported.",
  },
  {
    question: "What is RGB color format?",
    answer:
      "RGB stands for Red, Green, Blue. It is an additive color model where each channel ranges from 0 to 255, representing the intensity of that light component. By mixing different amounts of red, green, and blue light, you can produce over 16.7 million unique colors. In CSS, RGB is written as rgb(255, 87, 51). RGB is particularly useful when you need to manipulate individual color channels programmatically or apply opacity via RGBA.",
  },
  {
    question: "How do I convert HEX to RGB manually?",
    answer:
      "To convert HEX to RGB manually, remove the # prefix and split the remaining 6 characters into 3 pairs. Convert each pair from hexadecimal (base-16) to decimal (base-10). For #FF5733: FF in hex = 255 in decimal (red), 57 in hex = 87 in decimal (green), 33 in hex = 51 in decimal (blue). So the result is rgb(255, 87, 51). For 3-digit HEX like #F53, double each digit first: FF5533, then convert as usual.",
  },
  {
    question: "What is the difference between 3-digit and 6-digit HEX codes?",
    answer:
      "A 3-digit HEX code like #F53 is a shorthand where each digit is duplicated: #F53 becomes #FF5533. This works only when each pair of digits in the 6-digit form is the same (e.g., #AABBCC can be #ABC, but #AB12CD cannot be shortened). Both formats represent the exact same color. Our converter supports both formats and automatically handles the conversion.",
  },
  {
    question: "When should I use RGB instead of HEX?",
    answer:
      "Use RGB when you need to manipulate individual color channels (e.g., animating opacity on a single channel), when working with canvas or WebGL APIs that expect RGB values, or when you need to add transparency via the alpha channel using rgba(). RGB is also more readable for developers who need to understand the exact contribution of each primary color. HEX is preferred when you want a compact representation or are writing standard CSS color values.",
  },
  {
    question: "Does HEX to RGB conversion support alpha (RGBA)?",
    answer:
      "Standard 6-digit HEX codes do not include an alpha channel, but CSS Color Level 4 supports 8-digit HEX codes like #FF573380 where the last two digits (80 hex = 128 decimal) represent opacity. Our converter displays the equivalent RGBA format alongside RGB, so you can easily get the alpha-ready version. The default alpha value shown is 1 (fully opaque) for standard 6-digit HEX codes.",
  },
  {
    question: "How do I use RGB values in CSS?",
    answer:
      "In CSS, use the rgb() function: color: rgb(255, 87, 51). For transparency, use rgba(): color: rgba(255, 87, 51, 0.8) where the last value is the opacity from 0 (transparent) to 1 (opaque). Modern CSS also supports the space-separated syntax: rgb(255 87 51 / 0.8). You can use RGB values for any CSS property that accepts a color, including background-color, border-color, box-shadow, and more.",
  },
  {
    question: "Which design tools use HEX and which use RGB?",
    answer:
      "Most design tools support both formats. Figma displays colors in HEX by default but shows RGB in the color picker panel. Adobe Photoshop, Illustrator, and XD show RGB values prominently. Sketch uses HEX for web exports. When transferring colors between tools, HEX is the safest universal format. Our converter helps you quickly translate between the two, ensuring color consistency across your design-to-development workflow.",
  },
  {
    question: "What are some common HEX color codes and their RGB values?",
    answer:
      "Here are widely used colors: Black is #000000 or rgb(0, 0, 0), White is #FFFFFF or rgb(255, 255, 255), Pure Red is #FF0000 or rgb(255, 0, 0), Pure Green is #00FF00 or rgb(0, 255, 0), Pure Blue is #0000FF or rgb(0, 0, 255). Popular web colors include #333333 (dark gray), #666666 (medium gray), #999999 (light gray), and #FFC107 (amber). Our tool lets you instantly see the RGB breakdown for any HEX code you enter.",
  },
  {
    question: "Is HEX to RGB conversion always accurate?",
    answer:
      "Yes, the mathematical conversion from HEX to RGB is exact and lossless. A HEX code and its RGB equivalent represent the exact same color value — they are just different notations for the same 24-bit color data. There is no rounding, approximation, or color shift involved. The visual appearance depends on your monitor and color profile, but the underlying value is identical regardless of which format you use.",
  },
]
