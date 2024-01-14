import { Promotion_codes } from "../model/Promotion_codes";
import type { ValidateResponseType } from './restriction.d';

function isDateValid(after: string, before: string): boolean {
    const currentDate = new Date();
    const afterDate = new Date(after);
    const beforeDate = new Date(before);

    return currentDate >= afterDate && currentDate <= beforeDate;
}

function isAgeValid(age: number, condition: { eq?: number; lt?: number; gt?: number; }): boolean {
    if ('eq' in condition) {
        return condition.eq === age;
    } else if ('lt' in condition && 'gt' in condition) {
        return age > condition.gt && age < condition.lt;
    }

    return false;
}

function isWeatherValid(weather: object): boolean {
    // Assume always valid for simplicity
    return Boolean(weather);
}

function isOrValid(age: number, meteo: object, orCondition: object[]): boolean {
    return orCondition.some(condition => {
        if ('@age' in condition) {
            return isAgeValid(age, condition['@age']);
        }
        else if ('@meteo' in condition) {
            return isWeatherValid(meteo);
        }
        else if ('@and' in condition) {
            const andConditions = condition['@and'] as object[];
            return isAndValid(age, meteo, andConditions);
        }
    });

}

function isAndValid(age: number, meteo: object, andConditions: object[]): boolean {
    return andConditions.every(condition => {
        if ('@age' in condition) {
            return isAgeValid(age, condition['@age']);
        } else if ('@meteo' in condition) {
            return isWeatherValid(meteo);
        }
        else if ('@or' in condition) {
            const orConditions = condition['@or'] as object[];
            return isOrValid(age, meteo, orConditions);
        }
        return false;
    });
}

function createDenialReason(promocode_name: string, type: string): ValidateResponseType {
    return {
        promocode_name,
        status: 'denied',
        reasons: { [type]: `Invalid ${type} restriction` }
    };
}

const validatePromoCode = (promoCode: Promotion_codes, args: {
    age?: number;
    meteo?: object;
}): ValidateResponseType => {

    const { name, avantage, restrictions } = promoCode;
    const { age, meteo } = args;


    for (const restriction of restrictions) {
        if ('@date' in restriction) {
            const { after, before } = restriction['@date'];
            if (!isDateValid(after, before)) {
                return createDenialReason(name, 'date');
            }
        } else if ('@age' in restriction) {
            if (!isAgeValid(age, restriction['@age'])) {
                return createDenialReason(name, 'age');
            }
        } else if ('@or' in restriction) {
            const orConditions = restriction['@or'];
            const isValid = isOrValid(age, meteo, orConditions)

            if (!isValid) {
                return createDenialReason(name, 'OR');
            }
        }
        else if ('@and' in restriction) {
            const andConditions = restriction['@and'];
            const isValid = isAndValid(age, meteo, andConditions)

            if (!isValid) {
                return createDenialReason(name, 'AND');
            }
        }
    }

    return {
        promocode_name: name,
        status: 'accepted',
        avantage: avantage
    };
}

export { validatePromoCode, isAgeValid, isDateValid, isWeatherValid };