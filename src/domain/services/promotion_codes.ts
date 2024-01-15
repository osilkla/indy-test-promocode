import { Request, Response } from 'express';
import { Promotion_codes } from '../model/Promotion_codes.js';
import { InsertOne, FindOneByName, FindOneByID } from '../orm/promotion_codes.js';
import { validatePromoCode } from "../services/restriction.js"

const Save = async (req: Request<unknown, unknown, Promotion_codes>, res: Response) => {
    let status: string = 'Success',
        errorCode: number | null = null,
        message: string = '',
        data: unknown = '',
        statusCode: number = 0
    try {
        const { name, avantage, restrictions } = req.body;

        if (name && avantage && restrictions) {
            const ormResponse = await InsertOne(name, avantage, restrictions);
            if ('err' in ormResponse) {
                status = 'Failure', errorCode = ormResponse.err.code, message = ormResponse.err.message, statusCode = 400;
            } else {
                message = 'Promotion code created';
                statusCode = 201;
                data = ormResponse;
            }

        } else {
            status = 'Failure', errorCode = 400, message = 'All fields are required', statusCode = 400;
        }

        return res.status(statusCode).send({ status: status, Resp: { Error: errorCode, message: message, data: data } });

    } catch (err) {
        console.error("err = ", err);
        return res.status(500).send();
    }
}

const GetByID = async (req: Request, res: Response) => {
    let status: string = 'Success',
        errorCode: number | null = null,
        message: string = '',
        data: unknown = '',
        statusCode: number = 0
    try {
        const id = req.params.id;
        if (id) {
            const ormResponse = await FindOneByID(id);
            if (ormResponse && 'err' in ormResponse) {
                status = 'Failure', errorCode = ormResponse.err.code, message = ormResponse.err.message, statusCode = 400;
            }
            else {
                if (ormResponse) {
                    message = 'Success Response';
                    statusCode = 201;
                    data = ormResponse;
                } else {
                    status = 'Failure', errorCode = 404, message = 'ID NOT FOUND', statusCode = 404;
                }
            }

        } else {
            status = 'Failure', errorCode = 400, message = 'Bad or missing parameters', statusCode = 400;
        }

        return res.status(statusCode).send({ status: status, Resp: { Error: errorCode, message: message, data: data } });

    } catch (err) {
        console.error("err = ", err);
        return res.status(500).send();
    }
}

const ValidateByName = async (req: Request, res: Response) => {
    let status: string = 'Success',
        errorCode: number | null = null,
        message: string = '',
        data: unknown = '',
        statusCode: number = 0
    try {
        const requestBody = req.body;
        if (requestBody.promocode_name) {
            const promo_code = await FindOneByName(requestBody.promocode_name);
            if (promo_code && 'err' in promo_code) {
                status = 'Failure', errorCode = promo_code.err.code, message = promo_code.err.message, statusCode = 400;
            }
            else {
                if (promo_code) {
                    const promoCodeValidityResponse = validatePromoCode(promo_code as Promotion_codes, requestBody.arguments)

                    message = 'Success Response';
                    statusCode = 201;
                    data = promoCodeValidityResponse;

                } else {
                    status = 'Failure', errorCode = 404, message = 'ID NOT FOUND', statusCode = 404;
                }
            }

        } else {
            status = 'Failure', errorCode = 400, message = 'Bad or missing parameters', statusCode = 400;
        }

        return res.status(statusCode).send({ status: status, Resp: { Error: errorCode, message: message, data: data } });

    } catch (err) {
        console.error("err = ", err);
        return res.status(500).send();
    }
};
export { Save, GetByID, ValidateByName };