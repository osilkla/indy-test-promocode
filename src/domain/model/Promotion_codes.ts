import { Avantage } from "./Avantage.js";
import { Restriction } from "./Restriction.js";

export interface Promotion_codes {
    _id?: string;
    name: string;
    avantage: Avantage;
    restrictions: Restriction[];
}