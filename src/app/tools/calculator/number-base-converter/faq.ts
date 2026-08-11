import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is a number base (radix)?",
    answer:
      "A number base, also called a radix, is the number of unique digits used to represent numbers in a positional numeral system. Decimal (base 10) uses digits 0–9, binary (base 2) uses 0–1, octal (base 8) uses 0–7, and hexadecimal (base 16) uses 0–9 and A–F. The base determines the place value of each digit — in base N, each position represents a power of N. For example, in binary, the number 101 means 1×2² + 0×2¹ + 1×2⁰ = 5 in decimal.",
  },
  {
    question: "What is binary and why does it matter?",
    answer:
      "Binary (base 2) is the fundamental language of computers. Every piece of data in a computer — text, images, video, programs — is ultimately stored as sequences of zeros and ones. Each binary digit (bit) represents a power of 2. Binary is used because electronic circuits have two states: on (1) and off (0). Understanding binary is essential for anyone working with low-level programming, networking, or computer architecture.",
  },
  {
    question: "What is hexadecimal used for?",
    answer:
      "Hexadecimal (base 16, or \"hex\") is widely used in computing because it provides a compact, human-readable way to represent binary data. Each hex digit maps to exactly 4 binary bits, making conversions trivial. Common uses include memory addresses, color codes in web design (e.g., #FF5733), MAC addresses, Unicode code points, and debugging output. Developers frequently use hex to inspect raw byte data or configure hardware registers.",
  },
  {
    question: "Why do developers need a base converter?",
    answer:
      "Developers regularly work with multiple number bases in daily tasks. Network engineers deal with subnet masks in binary and hex. Web developers use hex color codes. Systems programmers read memory dumps in hex. Embedded engineers configure hardware registers in binary. Cryptography and security analysts inspect payloads in hex. A base converter saves time and eliminates manual conversion errors when switching between formats during debugging, configuration, or data analysis.",
  },
  {
    question: "Can this converter handle signed (negative) numbers?",
    answer:
      "This converter works with non-negative integer values. For signed numbers, computers use techniques like two's complement representation, which differs between bit lengths (8-bit, 16-bit, 32-bit, 64-bit). Two's complement is not a simple base conversion — it depends on the bit width. For example, the 8-bit two's complement of decimal −1 is 11111111 in binary, which as unsigned is 255. Specialized two's complement calculators handle these signed conversions separately.",
  },
  {
    question: "Does this tool support floating-point or fractional numbers?",
    answer:
      "This converter focuses on integer values only. Floating-point conversion between bases is significantly more complex because the fractional part may not terminate cleanly in certain bases — for example, decimal 0.1 becomes a repeating fraction in binary (0.0001100110011…). Integer conversion is exact and covers the vast majority of use cases including memory addresses, bitwise operations, color codes, and register values. For floating-point conversion, specialized IEEE 754 converters are recommended.",
  },
  {
    question: "How do I use this converter for bitwise operations?",
    answer:
      "First, enter your number and select its current base. The converter shows the binary representation, which is what you need for bitwise operations (AND, OR, XOR, NOT). Copy the binary output, perform your bitwise logic, then enter the result back to convert to your desired base. For example, to find the AND of 0xFF and 0x0F: enter FF in hex, see 11111111 in binary, AND it with 00001111 to get 00001111, then convert back to hex to get 0F.",
  },
  {
    question: "How does binary relate to data sizes (bytes, kilobytes)?",
    answer:
      "A byte consists of 8 bits, meaning it can represent 256 distinct values (2⁸ = 256), from 00000000 to 11111111 in binary or 00 to FF in hex. A kilobyte (KB) is roughly 1,000 bytes (technically 1,024 bytes or 2¹⁰), a megabyte (MB) is about 1 million bytes, and so on. Our converter shows the byte representation of your number — for instance, decimal 255 fits in 1 byte as 0xFF, while decimal 65535 requires 2 bytes as 0xFF FF.",
  },
  {
    question: "How do I convert hex color codes to RGB values?",
    answer:
      "A hex color code like #FF5733 is actually three hexadecimal byte values packed together: FF (red), 57 (green), and 33 (blue). To convert, enter the two-character hex value for each channel separately in our converter with base 16 selected. FF in hex = 255 in decimal (full red), 57 in hex = 87 in decimal, and 33 in hex = 51 in decimal. So #FF5733 equals rgb(255, 87, 51). Our <a href=\"/tools/developer/base64-encoder\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Base64 Encoder</a> and other developer tools can help with further encoding tasks.",
  },
  {
    question: "What are custom bases and when would I use base 36?",
    answer:
      "Custom bases allow you to convert numbers using any radix from 2 to 36. Bases above 10 use letters A–Z as additional digits: A=10, B=11, …, Z=35. Base 36 is the highest standard base and is commonly used for URL shorteners, compact identifiers, and human-friendly codes because it packs the most information per character while remaining readable (using only 0–9 and A–Z). Other notable custom bases include base 32 (used in Base32 encoding) and base 64 (used in Base64 encoding for email attachments).",
  },
]
