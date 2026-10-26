import sanitizeHtml from "sanitize-html";

// Course rich-text fields come from the college's CMS — sanitise before rendering.
export function sanitizeCourseHtml(html: string | null): string {
  if (!html) return "";
  return sanitizeHtml(html, {
    allowedTags: ["p", "ul", "ol", "li", "strong", "b", "em", "i", "a", "br"],
    allowedAttributes: { a: ["href"] },
  });
}
