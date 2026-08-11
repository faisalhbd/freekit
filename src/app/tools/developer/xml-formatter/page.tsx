import type { Metadata } from "next"
import { ToolHeader } from "@/components/tool/tool-header"
import { ToolFooter } from "@/components/tool/tool-footer"
import { ToolPageCTA } from "@/components/tool/tool-page-cta"
import { FAQSection } from "@/components/shared/faq-section"
import { toolConfig } from "./config"
import { faqs } from "./faq"
import { getSchemas } from "./schema"
import { XmlFormatterTool } from "./tool"
import { generateToolMetadata } from "@/lib/tool-metadata"

export const metadata: Metadata = generateToolMetadata(toolConfig)

const LINK_CLASS = "font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"

const tipsData = [
  { html: `When working with APIs that return XML responses, you can copy the raw response and format it here for readability. If the API also supports JSON, use <a href="/tools/developer/json-formatter" class="${LINK_CLASS}">our JSON Formatter</a> to beautify JSON responses with syntax highlighting and key counting.` },
  { html: `If you need to verify that your XML is structurally sound before formatting, paste it into <a href="/tools/developer/json-validator" class="${LINK_CLASS}">our JSON Validator</a> first to check the general structure — or simply click Format and let our built-in DOMParser catch any well-formedness errors instantly.` },
  { html: `When preparing XML content for web pages, remember that special characters within XML text content (like &amp;, &lt;, &gt;) are already handled by XML parsing. But if you need to embed XML inside HTML attributes, use <a href="/tools/developer/html-encoder" class="${LINK_CLASS}">our HTML Entity Encoder</a> to properly escape the angle brackets.` },
  { html: "Use the Minify button to reduce XML file size before transmitting it over the network. Minified XML removes all unnecessary whitespace between tags, which can reduce file size by 20-40% for deeply nested documents, improving API response times and bandwidth usage." },
  { html: "The element and attribute counts in the stats bar help you quickly assess document complexity. A high element-to-attribute ratio suggests a data-heavy structure, while many attributes per element indicate a metadata-rich format common in configuration files and SOAP APIs." },
  { html: "XML sitemaps for SEO must be valid XML. Use the Format button to check that your sitemap is well-formed, verify the namespace declarations are intact, and ensure all URL entries are properly nested within &lt;urlset&gt; and &lt;url&gt; tags." },
  { html: "The depth stat shows the maximum nesting level of your XML document. Deeply nested XML (depth > 10) can be harder to maintain and process. Consider flattening your structure if the depth becomes excessive." },
  { html: "When switching between 2-space, 4-space, and tab indentation, click Format again to re-render the output with the new indent style. This is useful for matching your project's coding style guidelines or team conventions." },
]

export default function XmlFormatterPage() {
  const schemas = getSchemas()
  return (
    <>
      {/* 1. JSON-LD Schemas */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* 2. Tool Header */}
        <ToolHeader tool={toolConfig} />

        {/* 3. Tool Component */}
        <section className="mt-8" aria-label="XML Formatter">
          <XmlFormatterTool />
        </section>

        {/* 4. How to Use */}
        <section className="mt-16 space-y-4" aria-label="How to use">
          <h2 className="text-2xl font-bold tracking-tight">How to Use the XML Formatter</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li><span className="text-foreground font-medium">Paste your XML</span> — Type or paste your XML document into the input textarea on the left. This can be a minified API response, a configuration file, a sitemap, SVG markup, or any well-formed XML content.</li>
            <li><span className="text-foreground font-medium">Choose your indentation</span> — Select 2 spaces, 4 spaces, or tab indentation from the toolbar to match your project's coding style. The default is 2 spaces.</li>
            <li><span className="text-foreground font-medium">Click Format</span> — Press the Format button to parse and beautify your XML. The tool validates the XML structure using the browser's DOMParser and displays the formatted result with syntax highlighting on the right.</li>
            <li><span className="text-foreground font-medium">Review stats and errors</span> — Check the stats bar for element count, attribute count, max depth, and byte sizes. If your XML is malformed, a red error card will appear with details about what went wrong.</li>
            <li><span className="text-foreground font-medium">Copy or minify</span> — Click Copy Output to copy the formatted XML to your clipboard, or click Minify to produce a compact version with all whitespace removed for network transmission.</li>
          </ol>
        </section>

        {/* 5. Features */}
        <section className="mt-16 space-y-4" aria-label="Features">
          <h2 className="text-2xl font-bold tracking-tight">Features</h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-muted-foreground">
            {[
              "Format XML with proper indentation and line breaks using browser-native DOMParser",
              "Minify XML by removing all unnecessary whitespace for reduced file size",
              "Syntax highlighting: tag names in blue, attributes in amber, attribute values in green",
              "Handles XML declarations, comments, CDATA sections, and processing instructions",
              "Supports XML namespaces and namespace-prefixed element names",
              "Configurable indentation: 2 spaces, 4 spaces, or tab characters",
              "Real-time stats: element count, attribute count, max nesting depth, and byte sizes",
              "Clear error display for malformed XML with parser error details",
              "Side-by-side layout on desktop, stacked layout on mobile for comfortable editing",
              "100% client-side processing — your XML data never leaves your browser",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Explanation Cards (2x2) */}
        <section className="mt-16 space-y-4" aria-label="Key concepts">
          <h2 className="text-2xl font-bold tracking-tight">Understanding XML Formatting</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: "XML Document Structure",
                d: "Every XML document must have exactly one root element that contains all other elements. Elements are defined by opening and closing tags (like &lt;book&gt;...&lt;/book&gt;) or self-closing tags (like &lt;br /&gt;). Elements can contain text content, child elements, attributes, comments, and CDATA sections. XML is case-sensitive, meaning &lt;Book&gt; and &lt;book&gt; are different elements. Attribute values must always be enclosed in quotes, either single or double.",
              },
              {
                t: "CDATA Sections and Escaping",
                d: "When XML text content contains characters like &lt; and &amp; that would normally be interpreted as markup, you have two options: escape them as entities (&amp;lt; and &amp;amp;) or wrap them in a CDATA section with &lt;![CDATA[...]]&gt;. CDATA sections are commonly used to embed JavaScript, CSS, or SQL within XML documents. Inside CDATA, all characters except the closing ]]&gt; sequence are treated as literal text. Our formatter preserves CDATA sections exactly as they appear in the input.",
              },
              {
                t: "XML Namespaces",
                d: "Namespaces prevent element name collisions when combining XML from different sources. A namespace is declared with the xmlns attribute (e.g., xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\") and used as a prefix on elements (e.g., &lt;soap:Body&gt;). The default namespace omits the prefix (xmlns=\"...\"). Namespaces are essential in SOAP APIs, RSS feeds, SVG, and XSLT stylesheets. Our formatter preserves all namespace declarations and properly formats prefixed element names.",
              },
              {
                t: "XML vs JSON for Data Exchange",
                d: "XML and JSON are both used for data exchange but have different strengths. XML supports attributes, namespaces, mixed content (text interleaved with elements), and schema validation (XSD). JSON is more compact, easier to parse in JavaScript, and has become the dominant format for REST APIs. XML remains essential for SOAP services, configuration files (Maven pom.xml, Spring beans.xml), sitemaps, RSS/Atom feeds, and document formats (SVG, XHTML, DOCX). Choose XML when you need validation, namespaces, or mixed content.",
              },
            ].map((item) => (
              <div key={item.t} className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold">{item.t}</h3>
                <p className="text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Use Cases (2-col) */}
        <section className="mt-16 space-y-4" aria-label="Use cases">
          <h2 className="text-2xl font-bold tracking-tight">Common Use Cases</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { t: "Debugging API Responses", d: "Format XML responses from SOAP APIs and XML-based web services to quickly understand the data structure, find specific elements, and identify issues with the response payload." },
              { t: "Reading Configuration Files", d: "Many build tools, application servers, and frameworks use XML for configuration (Maven, Log4j, Tomcat, Spring). Formatting these files makes them much easier to read and modify." },
              { t: "Validating XML Sitemaps", d: "Check that your XML sitemap for search engines is well-formed with proper namespace declarations, correct URL entry nesting, and valid XML syntax before submitting it." },
              { t: "Inspecting SVG Files", d: "SVG images are XML documents. Format SVG markup to understand the vector graphic structure, find specific paths or elements, and debug rendering issues." },
              { t: "Working with RSS/Atom Feeds", d: "RSS and Atom feeds are XML documents. Format feed XML to verify channel structure, inspect entry contents, and debug feed validation issues." },
              { t: "Minifying XML for Production", d: "Reduce the file size of XML documents transmitted over the network by removing unnecessary whitespace, improving load times for XML-heavy applications and APIs." },
              { t: "Reviewing XSLT Stylesheets", d: "XSLT files are XML documents. Format them to understand template rules, match patterns, and debug transformation logic in your stylesheets." },
              { t: "Analyzing Android Layouts", d: "Android XML layout files define UI components. Format them to understand view hierarchies, verify layout parameters, and debug UI rendering issues." },
            ].map((item) => (
              <div key={item.t} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-sm font-semibold">{item.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Tips with Internal Links */}
        <section className="mt-16 space-y-4" aria-label="Tips">
          <h2 className="text-2xl font-bold tracking-tight">XML Formatter Tips</h2>
          <ul className="space-y-2 text-muted-foreground">
            {tipsData.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span dangerouslySetInnerHTML={{ __html: tip.html }} />
              </li>
            ))}
          </ul>
        </section>

        {/* 9. FAQ Section */}
        <section className="mt-16" aria-label="FAQ">
          <FAQSection items={faqs} />
        </section>

        {/* 10. Related Tools + CTA */}
        <section className="mt-16" aria-label="Related tools">
          <ToolFooter tool={toolConfig} />
        </section>

        <ToolPageCTA />
      </div>
    </>
  )
}
