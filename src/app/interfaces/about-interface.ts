import { AboutSection } from "./about-section-interface";
import { MiddleSection } from "./middle-section-interface";

export interface About {
    description: AboutSection[];
    middleSection: MiddleSection[];
    linkedIn: string;
    contactInfoBackgroundImg: string;
    headerBackgroundImg: string;
}