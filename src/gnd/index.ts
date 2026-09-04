export type { GndRole, GndText, GndObject, GndDocument } from "./types.js";
export { makeGnd } from "./makeGnd.js";
export { parseMarkup } from "./converter.js";
export type { GndMediaType } from "./dom.js";
export type { GndGenerationOptions, TextrefOptions } from "./options.js";
export {
  encodeCssSelectorFragment,
  decodeCssSelectorFragment,
  encodeDomRangeFragment,
  decodeDomRangeFragment,
  decodeTextref,
} from "./textrefFragment.js";
export type { DomRangeJSON } from "./textrefFragment.js";
