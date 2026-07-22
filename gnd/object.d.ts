import { GndObject, GndRole } from './types.js';
import { TextBuilder } from './text.js';
export interface ObjBuilder {
    id?: string;
    audioref?: string;
    imgref?: string;
    textref?: string;
    videoref?: string;
    text?: TextBuilder;
    role?: GndRole[];
    children?: ObjBuilder[];
    description?: string;
}
export declare function isEmptyObj(o: ObjBuilder): boolean;
/** A node being built up during the tree walk, before its final shape is known. */
export declare class NavObject {
    el?: Element;
    object: ObjBuilder;
    children: NavObject[];
    noText: boolean;
    finalize(): ObjBuilder;
}
export declare function finalizeToGndObject(o: ObjBuilder): GndObject;
export declare function gndObjectToObjBuilder(n: GndObject): ObjBuilder;
