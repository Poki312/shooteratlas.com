// The foot-of-page questions, rendered as accordions.
//
// One array per page drives both this markup and that page's FAQPage JSON-LD,
// so the structured data and what a reader can open can never disagree. The
// first answer is open, because a page that answers its most-asked question
// only after a click has hidden the answer.

// Answers are single paragraphs and may carry inline links. An answer that
// already supplies its own block markup is left alone rather than nested.
function answerBody(a) {
  return /^\s*<(p|ul|ol|div|blockquote)\b/.test(a) ? a : `<p>${a}</p>`;
}

export function faqList(faqs) {
  return faqs
    .map((f, i) =>
      `<details class="qa"${i === 0 ? " open" : ""}>` +
      `<summary>${f.q}</summary>` +
      `<div class="qa-body">${answerBody(f.a)}</div>` +
      `</details>`,
    )
    .join("\n");
}
