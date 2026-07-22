export type GndRole = string;
export interface GndText {
    language: string;
    plain?: string;
    ssml?: string;
}
export interface GndObject {
    role?: GndRole[];
    text?: string | GndText;
    description?: string;
    imgref?: string;
    audioref?: string;
    videoref?: string;
    textref?: string;
    id?: string;
    children?: GndObject[];
}
export interface GndDocument {
    links?: unknown[];
    guided: GndObject[];
}
