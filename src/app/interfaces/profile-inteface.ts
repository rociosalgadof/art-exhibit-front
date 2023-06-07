import { HomeInterface } from "./home-interface";
import { Contact } from "./contact-interface";
import { About } from "./about-interface";
import { Gallery } from "./gallery-interface";


export interface ProfileInterface {
    id: number;
    home: HomeInterface;
    contact: Contact;
    about: About;
    gallery: Gallery;
    owner: string;
}