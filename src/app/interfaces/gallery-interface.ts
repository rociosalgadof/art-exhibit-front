import { GalleryImage } from "./gallery-image-interface";
export interface Gallery {
    headerBackgroundImg: string;
    listOfImages: GalleryImage[];
    footerImage: string;
}