import { GuidedNavigationObject, GuidedNavigationText } from '@readium/shared';
import { GndRole } from '@readium/guided-navigation';
export declare function nodeRoles(node: GuidedNavigationObject): GndRole[];
export declare function spokenText(node: GuidedNavigationObject): GuidedNavigationText | undefined;
export declare function descriptionOf(node: GuidedNavigationObject): string | undefined;
