import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What are UTM parameters?",
    answer:
      "UTM parameters are short text codes added to the end of a URL that help analytics platforms like Google Analytics identify where your website traffic is coming from. They consist of five optional tags — utm_source, utm_medium, utm_campaign, utm_term, and utm_content — that work together to give you a complete picture of how users find and interact with your links across different marketing channels.",
  },
  {
    question: "What is the difference between utm_source, utm_medium, and utm_campaign?",
    answer:
      "utm_source identifies the platform sending traffic (e.g., google, facebook, newsletter). utm_medium describes the marketing medium (e.g., cpc, email, social, referral). utm_campaign names the specific campaign or promotion (e.g., summer-sale-2025, product-launch). Think of it as: Who sent the traffic, how they sent it, and what campaign it belongs to. Together, these three required parameters give you the core attribution data you need.",
  },
  {
    question: "Are utm_source, utm_medium, and utm_campaign required?",
    answer:
      "Yes, these three are considered the required UTM parameters. Without them, your analytics data will be fragmented and difficult to interpret. utm_source and utm_medium are needed for Google Analytics to properly categorize your traffic. utm_campaign lets you compare performance across different marketing initiatives. The other two parameters — utm_term and utm_content — are optional and used for more granular tracking.",
  },
  {
    question: "What is utm_term used for?",
    answer:
      "utm_term is primarily used for tracking paid search keywords. When you run Google Ads or Bing Ads campaigns, you can use utm_term to identify which specific keyword triggered the click. For example, utm_term=running+shoes tells you the user clicked an ad triggered by the keyword 'running shoes'. This helps you understand which keywords drive the most valuable traffic and optimize your ad spend accordingly.",
  },
  {
    question: "What is utm_content used for?",
    answer:
      "utm_content is used to differentiate between different versions of the same ad or link. This is especially useful in A/B testing scenarios. For example, if you have two different banner ads pointing to the same landing page, you can tag them with utm_content=header-banner and utm_content=sidebar-cta to see which placement performs better. It can also be used to differentiate between different links within the same email newsletter.",
  },
  {
    question: "Should I use UTM parameters on internal links?",
    answer:
      "Generally, no. UTM parameters are designed for tracking external traffic sources. Applying them to internal links on your own website can cause self-referral issues in analytics, where your own site appears as a traffic source. This creates confusing data and can inflate referral numbers. Use event tracking or other analytics features for internal link tracking instead. Reserve UTM parameters exclusively for links shared on external platforms.",
  },
  {
    question: "How do I avoid UTM parameter mistakes in my campaigns?",
    answer:
      "The most common mistakes are inconsistent naming conventions, using spaces instead of hyphens, and mixing uppercase and lowercase. Establish a naming convention document for your team — for example, always use lowercase, hyphens instead of spaces, and consistent source names (use 'facebook' not 'Facebook' and 'fb' interchangeably). Use this UTM builder to ensure proper URL encoding. Always test your generated links by clicking them and checking the URL in the browser address bar before deploying.",
  },
  {
    question: "Do UTM parameters affect SEO?",
    answer:
      "UTM parameters themselves do not directly affect your search rankings. However, if UTM-tagged URLs are indexed by search engines, it can create duplicate content issues because the same page appears with different URL parameters. To prevent this, use canonical tags on your landing pages or configure your robots.txt to block crawling of URLs with UTM parameters. Google generally handles UTM parameters well and typically does not index them, but it is good practice to take precautions.",
  },
  {
    question: "Can I shorten a UTM-tagged URL?",
    answer:
      "Yes, and it is recommended for social media sharing where character limits matter. Use a URL shortener like Bitly or your own branded short domain. The shortener preserves the UTM parameters — it simply creates a redirect to your full UTM-tagged URL. This way you get a clean, shareable link without losing any tracking data. Just make sure to test the shortened link to verify that all UTM parameters are preserved in the redirect.",
  },
  {
    question: "How do I view UTM data in Google Analytics?",
    answer:
      "In Google Analytics 4, go to Reports > Acquisition > Traffic acquisition to see your UTM data. The 'Source/Medium' dimension combines utm_source and utm_medium. To see campaign-level data, add the 'Campaign' dimension. For utm_term and utm_content data, use the Explore feature to create custom reports with these dimensions. You can also use secondary dimensions to drill down into specific source-medium-campaign combinations for deeper analysis.",
  },
]
