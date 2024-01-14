import { Avantage } from "../model/Avantage.js";
import { Restriction } from "../model/Restriction.js";
import { Promotion_codes } from "../model/Promotion_codes.js";

const promo_codes_by_id = new Map<string, Promotion_codes>();
const promo_codes_by_name = new Map<string, Promotion_codes>();

const InsertOne = async (name: string, avantage: Avantage, restrictions: Restriction[]): Promise<{ _id: string; } | { err: { code: number; message: string; }; }> => {
    try {
        // TODO: could generate uuid 
        const _id = '1';
        promo_codes_by_id.set(_id, { _id, name, avantage, restrictions });
        promo_codes_by_name.set(name, { _id, name, avantage, restrictions });

        return { _id };

    } catch (error) {
        let message = 'Unknown Error'

        if (error instanceof Error) message = error.message
        console.error(" err orm-promotion_codes.InsertOne = ", error);

        return { err: { code: 9999, message } };

    }
}


const FindOneByID = async (id: string): Promise<Promotion_codes | { err: { code: number; message: string; }; }> => {
    try {

        const promo_code = promo_codes_by_id.get(id);
        if (!promo_code) throw new Error('Promo Code not found');

        return promo_code

    } catch (error) {

        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message
        console.error(" err orm-promotion_codes.FindOneByID = ", error);

        return { err: { code: 9999, message } }

    }
}

const FindOneByName = async (name: string): Promise<Promotion_codes | { err: { code: number; message: string; }; }> => {
    try {

        const promo_code = promo_codes_by_name.get(name);
        if (!promo_code) throw new Error('Promo Code not found');

        return promo_code

    } catch (error) {

        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message
        console.error(" err orm-promotion_codes.FindOneByName = ", error);

        return { err: { code: 9999, message } }

    }
}

export { InsertOne, FindOneByName, FindOneByID };
