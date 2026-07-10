import type { GndNode, GndRole } from "./types.js";
import { type TextBuilder, textIsEmpty, finalizeText } from "./text.js";

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

export function isEmptyObj(o: ObjBuilder): boolean {
  return (
    !o.audioref &&
    !o.imgref &&
    !o.textref &&
    !o.videoref &&
    (!o.text || textIsEmpty(o.text)) &&
    !(o.children && o.children.length > 0) &&
    !o.description
  );
}

// A transparent wrapper (e.g. a plain <div>) carrying no information of its
// own besides its children — spliced into the parent's children.
function isChildrenOnly(o: ObjBuilder): boolean {
  return (
    !o.audioref &&
    !o.imgref &&
    !o.textref &&
    !o.videoref &&
    (!o.text || textIsEmpty(o.text)) &&
    !!(o.children && o.children.length > 0) &&
    !(o.role && o.role.length > 0) &&
    !o.id
  );
}

// A lone child with no role/id of its own: its text and refs are hoisted into
// the parent object directly, e.g. a paragraph wrapping a single plain link
// becomes {role, text, textref} rather than nesting an anonymous child.
function isHoistable(o: ObjBuilder): boolean {
  return !(o.role && o.role.length > 0) && !o.id;
}

/** A node being built up during the tree walk, before its final shape is known. */
export class NavObject {
  el?: Element;
  object: ObjBuilder = {};
  children: NavObject[] = [];
  noText = false;

  finalize(): ObjBuilder {
    const result = this.object;
    const finalChildren: ObjBuilder[] = [];
    for (const child of this.children) {
      const res = child.finalize();
      if (isEmptyObj(res)) continue;
      if (isChildrenOnly(res)) {
        finalChildren.push(...(res.children ?? []));
        continue;
      }
      finalChildren.push(res);
    }
    if (finalChildren.length > 0) result.children = finalChildren;

    // Hoist a lone child with no role/id into the object itself: its text and
    // refs merge directly into the parent, e.g. a paragraph with a single
    // plain link becomes {role, text, textref} instead of nesting an
    // anonymous child.
    if ((!result.text || textIsEmpty(result.text)) && result.children?.length === 1) {
      const child = result.children[0];
      if (isHoistable(child)) {
        if (child.text) result.text = child.text;
        if (child.textref) result.textref = child.textref;
        if (child.imgref) result.imgref = child.imgref;
        if (child.audioref) result.audioref = child.audioref;
        if (child.videoref) result.videoref = child.videoref;
        result.children = child.children;
      }
    }

    return result;
  }
}

export function finalizeToGndNode(o: ObjBuilder): GndNode {
  const node: GndNode = {};
  if (o.id) node.id = o.id;
  if (o.textref) node.textref = o.textref;
  if (o.imgref) node.imgref = o.imgref;
  if (o.audioref) node.audioref = o.audioref;
  if (o.videoref) node.videoref = o.videoref;
  const text = finalizeText(o.text);
  if (text !== undefined) node.text = text;
  if (o.role && o.role.length > 0) node.role = o.role;
  if (o.children && o.children.length > 0) node.children = o.children.map(finalizeToGndNode);
  if (o.description) node.description = o.description;
  return node;
}

export function gndNodeToObjBuilder(n: GndNode): ObjBuilder {
  const o: ObjBuilder = {};
  if (n.id) o.id = n.id;
  if (n.textref) o.textref = n.textref;
  if (n.imgref) o.imgref = n.imgref;
  if (n.audioref) o.audioref = n.audioref;
  if (n.videoref) o.videoref = n.videoref;
  if (n.role) o.role = n.role;
  if (n.description) o.description = n.description;
  if (typeof n.text === "string") {
    o.text = { plain: n.text, ssml: "", language: "" };
  } else if (n.text) {
    o.text = { plain: n.text.plain ?? "", ssml: n.text.ssml ?? "", language: n.text.language };
  }
  if (n.children) o.children = n.children.map(gndNodeToObjBuilder);
  return o;
}
