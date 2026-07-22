import { GndRole } from '../gnd/types.js';
export type AnnouncementKey = string;
export type Announcement = string | ((params?: Record<string, string>) => string);
export interface AnnouncementPair {
    start: Announcement;
    end: Announcement;
}
export type RoleAnnouncement = Announcement | AnnouncementPair;
export declare function isAnnouncementPair(a: RoleAnnouncement): a is AnnouncementPair;
export type Announcements = Record<AnnouncementKey, RoleAnnouncement>;
export interface ExtractUtterancesOptions {
    format?: "plain" | "ssml";
    announcements?: Announcements;
    skip?: GndRole[];
    language?: "none" | "block-level" | "always";
    interruptSentence?: boolean;
    contextualize?: boolean;
}
