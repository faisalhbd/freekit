import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is Base64 encoding and how does it work?",
    answer: "Base64 is a binary-to-text encoding scheme that converts binary data into a string of 64 ASCII characters (A–Z, a–z, 0–9, +, /). It works by dividing the input data into 24-bit groups (3 bytes), then splitting each group into four 6-bit values, which map to characters in the Base64 alphabet. If the input length is not a multiple of 3, padding characters (=) are added. The result is approximately 33% larger than the original data because 3 bytes become 4 characters."
  },
  {
    question: "How is UTF-8 handled differently from plain ASCII in Base64?",
    answer: "Plain ASCII text can be encoded directly with btoa() since every character fits in a single byte. However, UTF-8 text with characters outside the ASCII range (like emojis, accented letters, CJK characters) uses multiple bytes per character. If you pass these directly to btoa(), it will throw an error. Our tool handles this correctly by first encoding the string to UTF-8 bytes using TextEncoder, then converting those bytes to Base64. During decoding, it reverses the process using TextDecoder to correctly reconstruct the original Unicode string."
  },
  {
    question: "What are data URIs and how do they relate to Base64?",
    answer: "A data URI is a URI scheme that allows you to embed small files directly in HTML, CSS, or JavaScript using the format data:[<mediatype>][;base64],<data>. For example, an image can be embedded as data:image/png;base64,iVBORw0KGgo... This eliminates the need for separate HTTP requests for small assets like icons, which can improve page load performance. Our file encoding feature generates complete data URIs so you can copy and paste them directly into your code."
  },
  {
    question: "Why is Base64 used in HTTP Basic Authentication headers?",
    answer: "HTTP Basic Authentication sends credentials in the Authorization header using the format Basic <base64(user:password)>. The username and password are concatenated with a colon, then Base64-encoded. Note that this is encoding, not encryption — Base64 is easily reversible and provides zero security on its own. It is only safe when used over HTTPS, which encrypts the entire HTTP request including headers. Never use Basic Auth over plain HTTP, as credentials can be intercepted in transit."
  },
  {
    question: "Can I encode files to Base64, and what are the size limits?",
    answer: "Yes, our tool supports file encoding via drag-and-drop or file picker. The file is read entirely in your browser and converted to a Base64 data URI. Since processing happens in your browser's memory, the practical limit depends on your device's available RAM — most modern browsers can handle files up to several hundred megabytes. Remember that Base64 increases file size by about 33%, so a 10 MB file becomes roughly 13.3 MB when encoded."
  },
  {
    question: "Is Base64 encryption? Is my data secure after encoding?",
    answer: "No, Base64 is absolutely not encryption. It is a reversible encoding scheme with no secret key or mathematical transformation that hides data. Anyone can decode Base64 instantly. You should never use Base64 as a security measure. If you need to protect sensitive data, use proper encryption algorithms like AES-256. Base64 is commonly used alongside encryption to safely transmit encrypted binary data through text-only channels like JSON, XML, or email."
  },
  {
    question: "What does the \"invalid Base64\" error mean when decoding?",
    answer: "This error appears when the input string is not valid Base64. Common causes include: containing characters outside the Base64 alphabet (anything other than A–Z, a–z, 0–9, +, /, =), incorrect padding (the length must be a multiple of 4 after removing whitespace), having padding characters (=) in the middle of the string, or being a plain text string that was never Base64-encoded. Our tool validates the input and provides a clear error message to help you identify the issue."
  },
  {
    question: "What is the difference between Base64 and URL encoding?",
    answer: "Base64 converts arbitrary binary data into a safe ASCII representation using a 64-character alphabet. URL encoding (percent encoding) replaces unsafe ASCII characters with %XX hex sequences and is designed to make text safe for use in URLs. They serve different purposes: Base64 is for representing binary data as text, while URL encoding is for making text safe for URI transmission. However, standard Base64 includes + and / characters that are not URL-safe, which is why Base64URL (replacing + with - and / with _) exists. Try our URL Encoder for proper URL encoding needs."
  },
  {
    question: "Why does Base64 output always end with \"=\" sometimes?",
    answer: "The equals sign (=) is the Base64 padding character. Since Base64 encodes 3 bytes of input into 4 characters of output, when the input length is not a multiple of 3, padding is needed. If there is 1 byte remaining (2 bits short), two = characters are appended. If there are 2 bytes remaining (4 bits short), one = character is appended. If the input is a perfect multiple of 3, no padding is added. Some implementations omit padding for compactness, but our encoder always includes it for standards compliance."
  },
  {
    question: "Can I use Base64 encoding for images in HTML and CSS?",
    answer: "Yes, embedding images as Base64 data URIs is a common technique. In HTML, use <img src=\"data:image/png;base64,...\"> and in CSS, use background-image: url('data:image/png;base64,...'). This is useful for small icons, logos, or placeholder images where eliminating an extra HTTP request improves performance. However, for larger images, this approach increases the HTML/CSS file size and prevents browser caching of the image separately, so it is best used for images under roughly 10 KB."
  },
]
