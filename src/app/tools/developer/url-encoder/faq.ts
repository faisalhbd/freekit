import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is URL encoding (percent encoding)?",
    answer: "URL encoding, also known as percent encoding, is a mechanism to encode special characters in URLs so they can be safely transmitted over the internet. It replaces unsafe ASCII characters with a percent sign (%) followed by two hexadecimal digits. For example, a space becomes %20, a question mark becomes %3F, and an ampersand becomes %26. This ensures that URLs remain valid and unambiguous, since certain characters like ?, &, and / have special meaning in URL syntax."
  },
  {
    question: "What is the difference between encodeURI() and encodeURIComponent()?",
    answer: "encodeURI() is designed to encode a full URL and preserves characters that have special meaning in URLs, such as :, /, ?, #, &, =, and @. It only encodes characters that are truly unsafe in any part of a URL. encodeURIComponent(), on the other hand, encodes all characters except A-Z, a-z, 0-9, -, _, ., ~ — including characters like /, ?, &, and = which are needed as URL structure delimiters. Use encodeURIComponent() when encoding query parameter values or individual segments, and encodeURI() when encoding a complete URL that should remain structurally valid."
  },
  {
    question: "Which characters must be encoded in a URL?",
    answer: "RFC 3986 defines two categories of characters: reserved characters (:, /, ?, #, [, ], @, !, $, &, ', (, ), *, +, ,, ;, =) that have special meaning in URLs, and unreserved characters (A-Z, a-z, 0-9, -, _, ., ~) that are always safe. Any character outside the unreserved set should be percent-encoded when it does not serve a structural purpose. Additionally, non-ASCII characters (like é, 你, emoji) and control characters must always be encoded, typically as UTF-8 byte sequences (e.g., é becomes %C3%A9)."
  },
  {
    question: "Why does my URL-encoded string have %20 for spaces?",
    answer: "The space character is not safe in URLs and must be encoded. There are actually two valid encodings for a space: %20 (percent encoding, recommended by RFC 3986) and + (application/x-www-form-urlencoded format, used in query strings from HTML forms). Our encoder uses %20 as the standard percent-encoding format. If you need the + encoding for form data, you can post-process the result by replacing %20 with +, or use URLSearchParams which follows the form-encoding rules."
  },
  {
    question: "How do I encode query parameters correctly?",
    answer: "When building query strings, each parameter name and value should be individually encoded with encodeURIComponent(). For example, to create the query ?name=John Doe&city=New York, encode the value of each parameter: encodeURIComponent('John Doe') produces 'John%20Doe', and encodeURIComponent('New York') produces 'New%20York'. Never encode the entire URL with the query string assembled, as that would also encode the ?, &, and = delimiters that structure the query. The 'Encode values only' toggle in our tool handles this automatically."
  },
  {
    question: "What does the 'invalid encoded input' error mean when decoding?",
    answer: "This error occurs when the input string contains percent-encoded sequences that are not valid. Common causes include: a % sign not followed by exactly two hexadecimal digits (e.g., %2G instead of %2F), incomplete percent sequences at the end of the string (e.g., trailing %2), or malformed UTF-8 byte sequences (e.g., %C3 alone without a continuation byte). Our tool catches these errors and displays a specific message to help you identify and fix the problematic part of the input."
  },
  {
    question: "What is the difference between URL encoding and HTML entity encoding?",
    answer: "URL encoding replaces characters with %XX hex sequences for safe transmission in URLs. HTML entity encoding replaces characters with named or numeric entities (like &amp; for &, &lt; for <, &gt; for >) for safe rendering in HTML documents. They serve different purposes: URL encoding protects URL structure and transmits data in web addresses, while HTML entity encoding prevents XSS attacks and ensures characters display correctly in web pages. You should use the appropriate encoding for each context."
  },
  {
    question: "How are non-ASCII characters like emojis or Chinese text encoded in URLs?",
    answer: "Non-ASCII characters are first converted to UTF-8 bytes, and then each byte is percent-encoded individually. For example, the emoji 😊 (U+1F60A) becomes the UTF-8 bytes F0 9F 98 8A, which encodes to %F0%9F%98%8A. The Chinese character 你 becomes the UTF-8 bytes E4 BD A0, encoding to %E4%BD%A0. This is why a single non-ASCII character can become a long percent-encoded sequence. Our tool handles this conversion automatically using the built-in encodeURIComponent() function."
  },
  {
    question: "Should I encode the entire URL or just the parameter values?",
    answer: "It depends on your use case. If you have a complete URL like https://example.com/path?key=value, you should encode only the individual parameter values (the parts after =), not the entire URL. Encoding the entire URL would break the ://, ?, and & separators. If you have a fragment of text that you want to safely include in a URL, encode the entire fragment. Our tool provides a toggle to switch between encoding the full input (using encodeURI for full URLs or encodeURIComponent for text) and encoding values only."
  },
  {
    question: "Is URL encoding the same as encryption or hashing?",
    answer: "No, URL encoding is neither encryption nor hashing. It is a reversible encoding that anyone can decode instantly — there is no key, cipher, or one-way transformation involved. Its sole purpose is to make text safe for transmission in URLs by replacing unsafe characters with percent-encoded representations. It provides zero security or obfuscation. If you need to protect data in URLs, use HTTPS for transport security or proper encryption for sensitive parameter values."
  },
]
