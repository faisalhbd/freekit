import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What are HTML entities and why are they needed?",
    answer: `HTML entities are special sequences used to represent reserved characters in HTML documents. Characters like <, >, &, and " have special meaning in HTML syntax \u2014 they define tags, attributes, and entities themselves. If you want to display these characters as literal text (not as HTML markup), you must replace them with entity references. For example, to display a literal < symbol, you write &lt; in your HTML source. This is essential for displaying code snippets, mathematical expressions, and any user-generated content safely.`
  },
  {
    question: "How does HTML entity encoding prevent XSS attacks?",
    answer: `Cross-Site Scripting (XSS) attacks occur when an attacker injects malicious JavaScript into a web page by submitting content like <script>alert('attack')</script>. If this content is rendered as raw HTML, the browser executes the script. HTML entity encoding converts the < and > characters to &lt; and &gt;, so the browser treats the content as plain text instead of executable HTML. This is why encoding user input before rendering it is one of the most fundamental web security practices. Most modern frameworks like React and Angular do this automatically, but understanding and using entity encoding manually is important for raw HTML contexts.`
  },
  {
    question: "What is the difference between named and numeric HTML entities?",
    answer: `Named entities use a descriptive name preceded by & and followed by ;, such as &amp; for &, &lt; for <, and &quot; for ". They are easier to read and remember. Numeric entities use either decimal (&#60; for <) or hexadecimal (&#x3C; for <) representations of the character's Unicode code point. Named entities only exist for a relatively small set of common characters (about 250 named entities in the HTML5 spec), while numeric entities can represent any Unicode character. For maximum compatibility, named entities are preferred for common characters, and numeric entities are used for less common symbols, emojis, or characters without named equivalents.`
  },
  {
    question: "Which characters must always be encoded in HTML?",
    answer: `The five characters that must always be encoded in HTML are: & (as &amp;), < (as &lt;), > (as &gt;), " (as &quot;), and ' (as &#039; or &apos;). The ampersand must be encoded first because it begins all entity references \u2014 an unencoded & could be mistaken for the start of an entity. The < and > characters define HTML tags. Double quotes and single quotes delimit attribute values. While > can technically appear unencoded in many contexts (browsers are lenient), encoding all five characters consistently is the safest practice and prevents ambiguity.`
  },
  {
    question: "Should I use &apos; or &#039; for single quotes?",
    answer: `Both &apos; and &#039; represent the single quote character ('). The named entity &apos; was introduced in the XML specification and is supported in HTML5, but was not part of HTML4. For maximum compatibility with older HTML parsers, &#039; (the decimal numeric reference) is the safest choice. In practice, modern browsers handle both correctly. Our encoder uses &#039; by default for the widest compatibility, but both forms will decode correctly back to a single quote. If you are working specifically with XHTML or XML content, &apos; is the standard choice.`
  },
  {
    question: "Does HTML entity encoding work for non-ASCII characters like emojis?",
    answer: `Yes, any character can be represented as an HTML entity using its Unicode code point in decimal (&#128522; for \u{1F60A}) or hexadecimal (&#x1F60A;) format. Named entities only exist for common Western characters and symbols, so emojis, CJK characters, and other non-ASCII text require numeric entities. Our encoder handles the five critical HTML-unsafe characters (&, <, >, ", ') by default. For full non-ASCII encoding (converting every non-ASCII character to a numeric entity), you would need a more aggressive encoding strategy, which is typically unnecessary since UTF-8 encoding handles these characters natively.`
  },
  {
    question: "What is the difference between HTML entity encoding and URL encoding?",
    answer: `They serve completely different purposes. HTML entity encoding replaces special characters with entity references (like &amp; for &) to safely embed text within HTML documents and prevent markup injection. URL encoding replaces characters with percent-encoded sequences (like %26 for &) to safely transmit data in web addresses. Using HTML entities in a URL would break the URL, and using percent encoding in HTML body text would display literal % sequences. They are context-specific encodings: use HTML entities when inserting text into HTML markup, and use URL encoding when constructing or parsing web addresses and query parameters.`
  },
  {
    question: "Do modern frameworks still need manual HTML entity encoding?",
    answer: `Most modern frontend frameworks \u2014 React, Vue, Angular, Svelte \u2014 automatically escape HTML entities when rendering dynamic content. React's JSX, for example, treats all content between tags as text by default and encodes special characters automatically. You must explicitly use dangerouslySetInnerHTML (React) or v-html (Vue) to render raw HTML. However, manual entity encoding is still important in several scenarios: server-side HTML generation (like email templates), working with innerHTML in vanilla JavaScript, generating RSS feeds, building HTML strings in Node.js, and any context where you are concatenating HTML manually rather than using a framework's templating system.`
  },
  {
    question: "How do I decode HTML entities back to readable text?",
    answer: `In the browser, you can decode HTML entities by creating a temporary text element: create a <textarea>, set its innerHTML to the encoded string, and read its value (the textContent). This works because the browser automatically decodes entities when parsing HTML into the DOM. Our decoder uses this browser-native approach, which correctly handles all named entities, decimal numeric references (&#NNN;), and hexadecimal numeric references (&#xNNN;). In Node.js environments without a DOM, you can use the he library or a custom regex-based decoder for common entities. Our tool performs decoding entirely in your browser for instant, accurate results.`
  },
  {
    question: "What is the correct encoding order and why does & come first?",
    answer: `When encoding text, the ampersand (&) must always be encoded before any other character. This is because the encoding process replaces & with &amp;, and if you encoded other characters first (which also start with &), those entity references would then have their & symbols double-encoded. For example, if you encoded < to &lt; first, then encoded &, the result would be &amp;lt; instead of &lt;. The correct order is: first encode all & to &amp;, then encode the remaining special characters. Our tool handles this ordering automatically, ensuring correct output every time regardless of the input content.`
  },
]
