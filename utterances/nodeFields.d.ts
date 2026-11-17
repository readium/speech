import { GuidedNavigationText, GuidedNavigationObject } from '@readium/shared';
import { GndRole } from '@readium/guided-navigation';
export declare function nodeRoles(node: GuidedNavigationObject): GndRole[];
export declare function nodeText(text: GuidedNavigationText | undefined): GuidedNavigationText | undefined;
export declare function spokenText(node: GuidedNavigationObject): GuidedNavigationText | undefined;
export declare function descriptionOf(node: GuidedNavigationObject): string | undefined;
export declare function descriptionLanguageOf(node: GuidedNavigationObject): string | undefined;
