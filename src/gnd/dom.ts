const ELEMENT_NODE = 1;

export function nodeLanguage(el: Element | null): string {
  for (let n: Element | null = el; n; n = n.parentElement) {
    const xmlLang = n.getAttribute("xml:lang");
    if (xmlLang) return xmlLang;
    const lang = n.getAttribute("lang");
    if (lang) return lang;
  }
  return "";
}

export function hasElementChild(el: Element): boolean {
  for (let c = el.firstChild; c; c = c.nextSibling) {
    if (c.nodeType === ELEMENT_NODE) return true;
  }
  return false;
}

export function isAncestorOf(anc: Element, n: Element): boolean {
  for (let p: Element | null = n; p; p = p.parentElement) {
    if (p === anc) return true;
  }
  return false;
}

export type GndMediaType = "text/html" | "application/xhtml+xml";

export function sniffMediaType(input: string): GndMediaType {
  const head = input.slice(0, 500);
  if (
    /<\?xml\b/.test(head) ||
    /xmlns:epub=/.test(head) ||
    /DOCTYPE\s+html\s+PUBLIC\s+"-\/\/W3C\/\/DTD XHTML/i.test(head)
  ) {
    return "application/xhtml+xml";
  }
  return "text/html";
}
