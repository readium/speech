import type { GndObject, GndRole } from "./types.js";
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
  // `math` has no ref field of its own (unlike audio/image/video, it names
  // no external resource) — without this, an unlabelled `<math>` has
  // nothing else to survive on and would be dropped like a truly empty node.
  if (o.role?.includes("math")) return false;
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

// A lone child with no role/id/ref of its own: its text is hoisted into the
// parent object directly, e.g. a paragraph wrapping plain emphasis becomes
// {role, text} rather than nesting an anonymous child. A child carrying its
// own ref (e.g. an <a href>'s textref) is never hoisted — refs identify a
// distinct target and merging them into the parent would silently discard
// whichever of the two textrefs isn't kept.
function isHoistable(o: ObjBuilder): boolean {
  return (
    !(o.role && o.role.length > 0) &&
    !o.id &&
    !o.textref &&
    !o.imgref &&
    !o.audioref &&
    !o.videoref
  );
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

    // Hoist a lone child with no role/id/ref into the object itself: its text
    // merges directly into the parent, e.g. a paragraph wrapping plain
    // emphasis becomes {role, text} instead of nesting an anonymous child.
    if ((!result.text || textIsEmpty(result.text)) && result.children?.length === 1) {
      const child = result.children[0];
      if (isHoistable(child)) {
        if (child.text) result.text = child.text;
        result.children = child.children;
      }
    }

    return result;
  }
}

export function finalizeToGndObject(o: ObjBuilder): GndObject {
  const node: GndObject = {};
  if (o.id) node.id = o.id;
  if (o.textref) node.textref = o.textref;
  if (o.imgref) node.imgref = o.imgref;
  if (o.audioref) node.audioref = o.audioref;
  if (o.videoref) node.videoref = o.videoref;
  const text = finalizeText(o.text);
  if (text !== undefined) node.text = text;
  if (o.role && o.role.length > 0) node.role = o.role;
  if (o.children && o.children.length > 0) node.children = o.children.map(finalizeToGndObject);
  if (o.description) node.description = o.description;
  return node;
}

export function gndObjectToObjBuilder(n: GndObject): ObjBuilder {
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
  if (n.children) o.children = n.children.map(gndObjectToObjBuilder);
  return o;
}
