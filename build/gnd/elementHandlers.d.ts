import { GndRole, GndText } from './types.js';
import { Converter } from './converter.js';
export declare function pagebreak(converter: Converter, el: Element, aria: GndText | null, roles: GndRole[]): boolean;
export declare function noteref(converter: Converter, el: Element, roles: GndRole[]): void;
export declare function link(converter: Converter, el: Element, roles: GndRole[], aria: GndText | null): void;
