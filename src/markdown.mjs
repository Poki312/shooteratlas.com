// HTML -> Markdown, used to answer `Accept: text/markdown` from the same page
// source the HTML build uses. Deliberately small: it covers the tag set this
// site actually renders (headings, paragraphs, lists, tables, figures, quotes,
// inline links, code, the ad aside). Anything it does not recognise is left as
// text rather than dropped, so a markdown answer can never claim less than the
// page says.

const ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  mdash: "\u2014",
  ndash: "\u2013",
  hellip: "\u2026",
  rarr: "\u2192",
  larr: "\u2190",
  times: "\u00d7",
  euro: "\u20ac",
  pound: "\u00a3",
  yen: "\u00a5",
  won: "\u20a9",
  copy: "\u00a9",
};

const decode = (s) =>
  s.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (whole, name) => {
    if (name[0] === "#") {
      const code = name[1] === "x" || name[1] === "X" ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : whole;
    }
    return ENTITIES[name.toLowerCase()] ?? whole;
  });

function attrs(tag) {
  const out = {};
  const re = /([a-zA-Z-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
  let m;
  while ((m = re.exec(tag))) out[m[1].toLowerCase()] = m[2] ?? m[3] ?? "";
  return out;
}

// Inline-level conversion. Runs after block structure is in place.
function inline(s) {
  let out = s;
  out = out.replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, (whole, text) => {
    const href = attrs(whole).href;
    const label = decode(text.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
    if (!href) return label;
    return `[${label}](${href})`;
  });
  out = out.replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_m, _t, text) => `**${text.trim()}**`);
  out = out.replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_m, _t, text) => `*${text.trim()}*`);
  out = out.replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, (_m, text) => "`" + text.trim() + "`");
  out = out.replace(/<br\s*\/?>/gi, "\n");
  out = out.replace(/<[^>]+>/g, "");
  return decode(out)
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .trim();
}

function tableToMarkdown(table) {
  const rows = [...table.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].map((m) => {
    const cells = [...m[1].matchAll(/<(th|td)\b[^>]*>([\s\S]*?)<\/\1>/gi)];
    return cells.map((c) => inline(c[2]).replace(/\n+/g, " ").trim());
  });
  if (!rows.length) return "";
  const caption = table.match(/<caption\b[^>]*>([\s\S]*?)<\/caption>/i);
  const head = rows[0];
  const body = rows.slice(1);
  const lines = [];
  if (caption) lines.push(inline(caption[1]), "");
  lines.push("| " + head.join(" | ") + " |");
  lines.push("| " + head.map(() => "---").join(" | ") + " |");
  for (const row of body) {
    const padded = [...row];
    while (padded.length < head.length) padded.push("");
    lines.push("| " + padded.join(" | ") + " |");
  }
  return lines.join("\n");
}

function figureToMarkdown(figure) {
  const image = figure.match(/<img\b[^>]*>/i);
  const caption = figure.match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i);
  const lines = [];
  if (image) {
    const a = attrs(image[0]);
    lines.push(`![${decode(a.alt || "")}](${a.src || ""})`);
  }
  if (caption) lines.push("", "*" + inline(caption[1]) + "*");
  return lines.join("\n");
}

export function htmlToMarkdown(html) {
  let s = html
    .replace(/<!doctype[^>]*>/gi, "")
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/<head\b[\s\S]*?<\/head>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");

  s = s.replace(/<figure\b[^>]*>[\s\S]*?<\/figure>/gi, (m) => "\n\n" + figureToMarkdown(m) + "\n\n");
  s = s.replace(/<table\b[^>]*>[\s\S]*?<\/table>/gi, (m) => "\n\n" + tableToMarkdown(m) + "\n\n");
  // The contents rail only repeats headings the markdown already carries, and
  // its anchors mean nothing in a text answer, so it is the one thing dropped.
  s = s.replace(/<nav\b[^>]*class="[^"]*\btoc\b[^"]*"[^>]*>[\s\S]*?<\/nav>/gi, "");
  // Navigation becomes a link list: the page's own links are part of what the
  // markdown answer has to preserve.
  s = s.replace(/<nav\b[^>]*>([\s\S]*?)<\/nav>/gi, (_m, inner) => {
    const links = [...inner.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)].map((a) => inline(a[0]));
    return links.length ? "\n\n" + links.map((l) => "- " + l).join("\n") + "\n\n" : "";
  });
  s = s.replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, (_m, inner) =>
    "\n\n" +
    inline(inner)
      .split("\n")
      .map((line) => "> " + line)
      .join("\n") +
    "\n\n",
  );
  s = s.replace(/<aside\b[^>]*>([\s\S]*?)<\/aside>/gi, (_m, inner) =>
    "\n\n" +
    inline(inner)
      .split("\n")
      .map((line) => "> " + line)
      .join("\n") +
    "\n\n",
  );
  // Lists first, so their items keep the list marker when <li> is unwrapped.
  s = s.replace(/<ul\b[^>]*>([\s\S]*?)<\/ul>/gi, (_m, inner) => {
    const items = [...inner.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map((li) => inline(li[1]).replace(/\n+/g, " "));
    return "\n\n" + items.map((i) => "- " + i).join("\n") + "\n\n";
  });
  s = s.replace(/<ol\b[^>]*>([\s\S]*?)<\/ol>/gi, (_m, inner) => {
    const items = [...inner.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map((li) => inline(li[1]).replace(/\n+/g, " "));
    return "\n\n" + items.map((i, n) => `${n + 1}. ${i}`).join("\n") + "\n\n";
  });
  for (let level = 1; level <= 6; level++) {
    s = s.replace(new RegExp(`<h${level}\\b[^>]*>([\\s\\S]*?)</h${level}>`, "gi"), (_m, text) =>
      `\n\n${"#".repeat(level)} ${inline(text).replace(/\n+/g, " ")}\n\n`,
    );
  }
  s = s.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (_m, text) => `\n\n${inline(text)}\n\n`);
  // Links left outside any block element still have to keep their target.
  s = s.replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, (m) => inline(m));
  // Remaining wrappers (nav, div, span) only carry structure we already used.
  s = s.replace(/<[^>]+>/g, "\n");
  s = decode(s);
  return s
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/, ""))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Rough token count for the x-markdown-tokens header: ~4 characters per token.
export function tokenCount(markdown) {
  return Math.max(1, Math.round(markdown.length / 4));
}
