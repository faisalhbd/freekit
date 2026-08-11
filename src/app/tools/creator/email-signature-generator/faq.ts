import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How do I install an HTML email signature?",
    answer:
      "Copy the generated HTML code, then paste it into your email client's signature settings. In Gmail, go to Settings > See All Settings > Signature, click 'Create new', switch to the HTML editor (or paste directly in some clients). In Outlook, go to File > Options > Mail > Signatures, and paste the HTML. In Apple Mail, open Preferences > Signatures and paste. Some clients require you to paste into a rich text editor while others accept raw HTML — our generated code uses table-based layouts for maximum compatibility.",
  },
  {
    question: "Will my email signature look the same in all email clients?",
    answer:
      "Our generator uses table-based HTML layouts and inline CSS, which is the most reliable approach for cross-client compatibility. The signature will look consistent in Gmail, Outlook, Apple Mail, Yahoo Mail, Thunderbird, and most webmail clients. However, some email clients may slightly modify rendering — for example, Outlook desktop may render some CSS differently. The signature is designed to degrade gracefully, so even if a minor style is lost, the content remains fully readable.",
  },
  {
    question: "Why use table-based HTML for email signatures?",
    answer:
      "Email clients have very limited CSS support compared to web browsers. Many clients (especially Outlook) do not support modern CSS features like flexbox, grid, or even some basic properties. Table-based layouts are the industry standard for email HTML because they are supported by virtually every email client. Inline styles are used because many clients strip out <style> tags. This approach ensures your signature renders correctly everywhere.",
  },
  {
    question: "Can I use my own profile image in the signature?",
    answer:
      "Yes. Our generator lets you upload a profile image that gets embedded as a base64 data URL in the HTML. This means the image travels with the signature and does not depend on an external server. However, be aware that base64 images increase the size of every email you send. For a cleaner approach, upload your photo to a public URL and replace the base64 string in the HTML with that URL. Keep images small (around 80×80 pixels) for optimal display.",
  },
  {
    question: "What information should I include in my email signature?",
    answer:
      "The essential elements are your full name, job title, company name, and email address. Optionally include your phone number, website, and relevant social media links. Keep it concise — a good email signature should be 3-5 lines maximum. Avoid including too many social links, promotional banners, legal disclaimers (unless required), or large images. The goal is to provide recipients with the key information they need to contact you, nothing more.",
  },
  {
    question: "Are inline SVG social icons supported in email?",
    answer:
      "Inline SVG has good support in most modern email clients including Gmail, Apple Mail, and Outlook for Mac. However, some older clients (especially older versions of Outlook for Windows) may not render SVG correctly. Our generator includes inline SVG icons because they offer the best quality at any size and avoid external image dependencies. If you encounter rendering issues in specific clients, you can replace the SVG icons with small PNG images hosted on a public server.",
  },
  {
    question: "How do I change the accent color to match my brand?",
    answer:
      "Use the color picker in the Styling section to choose your brand color. You can either use the visual color picker, enter a hex code directly, or click one of the preset color swatches for quick selection. The accent color is applied to your name (in some layouts), job title, links, social icons, and decorative elements. Choose a color that has good contrast against white backgrounds for readability in email clients.",
  },
  {
    question: "What is the difference between the layout styles?",
    answer:
      "Professional layout places your profile image on the left with a traditional name-title-company-contact arrangement. Modern layout adds an accent-colored left border for a contemporary feel. Minimal layout removes the profile image and decorative elements for a clean, text-only approach. Bold layout uses a colored header banner for your name and title, creating a strong visual impact. Choose the style that best matches your personal brand and industry.",
  },
  {
    question: "Can I use this signature on mobile devices?",
    answer:
      "Yes. The generated HTML signature works on mobile email apps including Gmail for iOS/Android, Outlook Mobile, Apple Mail for iOS, and others. Table-based layouts render well on small screens because they naturally adapt to the available width. However, mobile email clients often display signatures below the compose area or in a collapsed view, so keep your signature concise. Profile images that are 80×80 pixels display well on both desktop and mobile.",
  },
  {
    question: "How do I update my signature after I have installed it?",
    answer:
      "To update your signature, simply come back to this generator, make your changes, copy the new HTML, and paste it in your email client's signature settings to replace the old one. There is no way to automatically push updates to signatures already sent in emails. For team-wide signature management, consider saving your generated HTML and distributing it to team members. Some organizations use centralized signature management tools for automatic updates across all employees.",
  },
]
