import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What does an XML formatter do?",
    answer: `An XML formatter takes raw, minified, or poorly indented XML and restructures it with consistent indentation, line breaks, and proper formatting. It parses the XML document, understands its hierarchical structure, and outputs a human-readable version where each nested element is visually indented. This makes it much easier to read and debug XML files like API responses, sitemap files, configuration files, and SVG documents. Our formatter also validates the XML structure, so if your input is malformed, it will show you exactly where the error is.`
  },
  {
    question: "How is XML formatting different from JSON formatting?",
    answer: `While both involve adding indentation to structured data, XML and JSON have different syntax rules. XML uses tags with angle brackets (<tag>) that must be properly nested and closed, supports attributes on elements, has a single root element requirement, and allows comments, CDATA sections, and processing instructions. JSON uses curly braces and square brackets with key-value pairs. XML formatting must preserve the document's prolog (<?xml?>), handle self-closing tags, maintain CDATA sections without altering their content, and respect namespace declarations. Our XML formatter handles all these XML-specific concerns that a JSON formatter would not need to address.`
  },
  {
    question: "Does the formatter validate my XML?",
    answer: `Yes. Our XML formatter uses the browser's built-in DOMParser, which performs well-formedness checking on your XML. If the XML is malformed — such as missing closing tags, mismatched tag names, improper nesting, or illegal characters — the parser will fail and the formatter will display a clear error message. Note that well-formedness validation checks syntax (proper tag structure) but does not validate against a DTD or XML Schema (XSD). If you need schema validation, you would need a dedicated XSD validation tool. For most formatting and debugging tasks, well-formedness checking is sufficient.`
  },
  {
    question: "What are CDATA sections and how are they handled?",
    answer: `CDATA (Character Data) sections are XML constructs that allow you to include text that would otherwise be treated as markup. They start with <![CDATA[ and end with ]]>. Inside a CDATA section, characters like <, >, & are treated as literal text, not as XML tags or entities. CDATA is commonly used to embed JavaScript or CSS within XML/XHTML, or to include raw text containing special characters. Our XML formatter preserves CDATA sections exactly as they are — their content is not parsed, modified, or reformatted. When indentation is applied, CDATA sections are placed on their own lines and properly indented within their parent element.`
  },
  {
    question: "How does the formatter handle XML namespaces?",
    answer: `XML namespaces are declared using the xmlns attribute (like xmlns:ns="http://example.com") and are used to avoid element name conflicts. Our formatter preserves all namespace declarations exactly as they appear in the input. Namespace-prefixed elements (like <ns:element>) are recognized as valid XML and formatted normally. The formatter does not modify, reorganize, or optimize namespace declarations — it treats them like any other attribute. When formatting, namespace attributes remain on their original elements, and the prefixed tag names are highlighted and indented correctly in the output.`
  },
  {
    question: "Can the formatter handle very large XML files?",
    answer: `Our XML formatter runs entirely in your browser using the DOMParser API, so performance depends on your device's available memory and the browser's DOM limits. For most practical purposes, it handles files up to several megabytes without issue. Very large XML files (tens of megabytes or more) may cause the browser to become slow or run out of memory. For extremely large files, a streaming or SAX-based parser would be more appropriate, but that typically requires server-side processing. For typical use cases like API responses, sitemaps, and configuration files, our browser-based formatter provides instant results.`
  },
  {
    question: "What is XML minification and when should I use it?",
    answer: `XML minification is the reverse of formatting — it removes all unnecessary whitespace, including indentation, line breaks, and extra spaces between tags, to produce the smallest possible XML output. Minified XML is useful for reducing file size when transmitting XML data over networks, such as in API requests and responses, where every byte matters for performance. It is also used in production environments for configuration files to save disk space. Note that whitespace inside text content and attribute values is preserved during minification — only whitespace between tags is removed. Use the Minify button in our tool to create compact XML output.`
  },
  {
    question: "Does the formatter handle XML comments and processing instructions?",
    answer: `Yes. XML comments (<!-- comment text -->) and processing instructions (<?target instructions?>) are both preserved and properly formatted. Comments are placed on their own lines and indented to match their position in the document hierarchy. Processing instructions, including the XML declaration (<?xml version="1.0" encoding="UTF-8"?>), are kept intact and placed at the appropriate indentation level. The formatter does not strip or modify comments, so all documentation and metadata in your XML is preserved in the formatted output. This is important for configuration files and documentation-heavy XML documents where comments provide essential context.`
  },
  {
    question: "What is the difference between XML and HTML formatting?",
    answer: `While XML and HTML share a similar tag-based syntax, XML is a stricter format. Every XML element must have a closing tag or be self-closing, there must be exactly one root element, attribute values must always be quoted, and tag names are case-sensitive. HTML is more forgiving — many tags can be unclosed, there is no single root requirement, and browsers automatically fix malformed HTML. An XML formatter enforces these stricter rules, so valid HTML may not always be valid XML. Additionally, XML supports features like CDATA sections, processing instructions, and namespaces that HTML does not use. Our XML formatter is specifically designed for well-formed XML documents.`
  },
  {
    question: "Is my XML data safe when using this tool?",
    answer: `Absolutely. All XML parsing, formatting, minification, and syntax highlighting happen entirely within your browser using client-side JavaScript. No data is sent to any server, stored in databases, or tracked in any way. The DOMParser API used for XML parsing is a built-in browser feature that operates locally on your device. This makes our XML formatter safe for sensitive data such as API responses containing authentication tokens, proprietary configuration files, and confidential documents. You can confidently format any XML content knowing it never leaves your browser.`
  },
]
