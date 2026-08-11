import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is a link-in-bio page?",
    answer:
      "A link-in-bio page is a single webpage that houses multiple links, designed to be shared from your social media profile where you can only place one URL. Platforms like Instagram, TikTok, and Twitter limit you to one clickable link in your bio, so a link-in-bio page acts as a hub that lets your followers access all your important content, products, social profiles, and resources from that single link.",
  },
  {
    question: "How is this different from Linktree?",
    answer:
      "Our link-in-bio generator gives you full control over your page design without requiring an account, subscription, or hosted service. You get the generated HTML file that you can host anywhere — your own website, GitHub Pages, Netlify, or any static hosting. There are no monthly fees, no branding limitations, and no analytics restrictions. You own 100% of the code and can customize every aspect of the page.",
  },
  {
    question: "Where can I host my link-in-bio page?",
    answer:
      "You can host it anywhere that serves static HTML files. Popular free options include GitHub Pages, Netlify, Vercel, and Cloudflare Pages. Simply save the generated HTML as an index.html file, upload it to your chosen hosting platform, and use the resulting URL in your social media bio. If you already have a website, you can upload it to a subdirectory like yourdomain.com/links.",
  },
  {
    question: "Can I add a custom domain to my link-in-bio page?",
    answer:
      "Yes. Once you host your generated HTML file on a platform like Netlify or Vercel, you can connect a custom domain in that platform's settings. For example, you could set up links.yourdomain.com to point to your bio page. Most hosting platforms provide free SSL certificates, so your custom domain will be served over HTTPS automatically.",
  },
  {
    question: "How do I update the links on my page after publishing?",
    answer:
      "Come back to this generator, make your changes, copy the updated HTML, and replace the file on your hosting platform. The update will be live as soon as the new file is deployed. Some hosting platforms like Netlify and Vercel offer Git-based deployments, so you can push changes via a repository for version control and automatic deployments.",
  },
  {
    question: "Can I track clicks on my bio links?",
    answer:
      "The generated HTML page itself does not include analytics by default. However, you can add tracking in several ways: use UTM parameters on each link (use our UTM Builder tool), add Google Analytics or Plausible tracking scripts to the HTML, or use a link shortener with built-in analytics like Bitly. Each approach gives you different levels of insight into which links your audience clicks most.",
  },
  {
    question: "What image formats are supported for the profile picture?",
    answer:
      "Our generator accepts any image format that your browser supports, including JPEG, PNG, WebP, GIF, and SVG. The image is embedded as a base64 data URL in the generated HTML, which means it travels with the file and does not depend on an external server. Keep your profile image square and around 200x200 to 400x400 pixels for optimal display quality and file size.",
  },
  {
    question: "Can I customize the look of my bio page beyond the provided options?",
    answer:
      "The generator provides theme color, button style, and background style options. For further customization, you can edit the generated HTML directly. The code is clean, well-structured, and uses inline styles that are easy to modify. You can change fonts, spacing, add custom CSS, embed a background image, or add additional HTML elements like social media icons and a logo.",
  },
  {
    question: "Is there a limit to how many links I can add?",
    answer:
      "There is no hard limit in our generator. However, for the best user experience on mobile devices, we recommend keeping your link-in-bio page to 5 to 10 links. Too many links can overwhelm visitors and make it harder for them to find what they are looking for. Focus on your most important links and consider grouping related links under descriptive titles.",
  },
  {
    question: "Will my link-in-bio page work on all devices?",
    answer:
      "Yes. The generated HTML uses responsive design principles and a max-width container that centers the content on larger screens while fitting perfectly on mobile devices. The page is designed mobile-first since most visitors will come from social media apps on their phones. It renders correctly in all modern browsers including Chrome, Safari, Firefox, and Edge on both iOS and Android.",
  },
]
