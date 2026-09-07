import { JSDOM } from "jsdom";

// ava runs tests under Node, which has no native DOM — polyfill the pieces
// src/gnd/* (and the vendored text-fragments-polyfill code) need for tests
// only. src/gnd/* must never import jsdom directly; it targets the browser's
// native DOM.
const { window } = new JSDOM("", { url: "http://localhost/" });

if (typeof globalThis.DOMParser === "undefined") {
  (globalThis as any).DOMParser = window.DOMParser;
}
if (typeof globalThis.Node === "undefined") {
  (globalThis as any).Node = window.Node;
}
if (typeof globalThis.NodeFilter === "undefined") {
  (globalThis as any).NodeFilter = window.NodeFilter;
}
if (typeof globalThis.Range === "undefined") {
  (globalThis as any).Range = window.Range;
}
if (typeof globalThis.HTMLElement === "undefined") {
  (globalThis as any).HTMLElement = window.HTMLElement;
}
if (typeof globalThis.NodeList === "undefined") {
  (globalThis as any).NodeList = window.NodeList;
}
if (typeof globalThis.HTMLCollection === "undefined") {
  (globalThis as any).HTMLCollection = window.HTMLCollection;
}
if (typeof globalThis.CSS === "undefined") {
  (globalThis as any).CSS = window.CSS;
}
