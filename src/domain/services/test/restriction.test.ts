import { validatePromoCode, isAgeValid, isDateValid } from '../restriction';
import getTomorrowDateUsFormatted from './utils'

const pastDatePromoCode = {
    "name": "WeatherCode",
    "avantage": { "percent": 20 },
    "restrictions": [
        {
            "@date": {
                "after": "2019-01-01",
                "before": "2020-06-30"
            }
        },
    ]
}
const valideDatePromoCode = {
    "name": "WeatherCode",
    "avantage": { "percent": 20 },
    "restrictions": [
        {
            "@date": {
                "after": "2021-01-01",
                "before": getTomorrowDateUsFormatted()
            }
        },
    ]
}
const AgeEq40PromoCode = {
    "name": "WeatherCode",
    "avantage": { "percent": 20 },
    "restrictions": [
        {
            "@age": {
                "eq": 40
            }
        }
    ]
}
const AgeLT60GT30PromoCode = {
    "name": "WeatherCode",
    "avantage": { "percent": 20 },
    "restrictions": [
        {
            "@age": {
                "lt": 60,
                "gt": 30
            }
        }
    ]
}
const ORKeywordPastDatePromoCode = {
    "name": "WeatherCode",
    "avantage": { "percent": 20 },
    "restrictions": [
        {
            "@date": {
                "after": getTomorrowDateUsFormatted(),
                "before": getTomorrowDateUsFormatted()
            }
        },
        {
            "@or": [
                {
                    "@age": {
                        "eq": 40
                    }
                },
                {
                    "@and": [
                        {
                            "@age": {
                                "lt": 30,
                                "gt": 15
                            }
                        },
                        {
                            "@meteo": {
                                "is": "clear",
                                "temp": {
                                    "gt": "15"
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
const ORKeywordPromoCode =
{
    "name": "WeatherCode",
    "avantage": { "percent": 20 },
    "restrictions": [
        {
            "@date": {
                "after": "2020-01-01",
                "before": getTomorrowDateUsFormatted()
            }
        },
        {
            "@or": [
                {
                    "@age": {
                        "eq": 40
                    }
                },
                {
                    "@and": [
                        {
                            "@age": {
                                "lt": 30,
                                "gt": 15
                            }
                        },
                        {
                            "@meteo": {
                                "is": "clear",
                                "temp": {
                                    "gt": "15"
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
const ANDKeywordInsideOrKeywordPromoCode = {

    "name": "WeatherCode",
    "avantage": { "percent": 20 },
    "restrictions": [
        {
            "@date": {
                "after": "2019-01-01",
                "before": "2025-06-30"
            }
        },
        {
            "@and": [
                {
                    "@meteo": {
                        "is": "clear",
                        "temp": {
                            "gt": "15"
                        }
                    }
                },
                {
                    "@or": [
                        {
                            "@age": {
                                "eq": 20
                            }
                        },
                        {
                            "@age": {
                                "lt": 99,
                                "gt": 97
                            }
                        }
                    ]
                }
            ]
        }
    ]
}


describe('validatePromoCode', () => {
    it('should accept a valid in date promo code', () => {

        const argumentsForValidation = {
            "age": 25,
            "meteo": { "town": "Lyon" }
        }

        const result = validatePromoCode(valideDatePromoCode, argumentsForValidation);
        expect(result.status).toBe('accepted');
    });

    it('should deny an invalid in date promo code', () => {

        const argumentsForValidation = {
            "age": 25,
            "meteo": { "town": "Lyon" }
        };

        const result = validatePromoCode(pastDatePromoCode, argumentsForValidation);
        expect(result.status).toBe('denied');
    });

    it('should accept a valid in age eq promo code', () => {

        const argumentsForValidation = {
            "age": 40,
        }

        const result = validatePromoCode(AgeEq40PromoCode, argumentsForValidation);
        expect(result.status).toBe('accepted');
    });

    it('should accept a valid in age lt&gt promo code', () => {

        const argumentsForValidation = {
            "age": 40,
        }

        const result = validatePromoCode(AgeLT60GT30PromoCode, argumentsForValidation);
        expect(result.status).toBe('accepted');
    });

    it('should reject an invalid in age lt&gt promo code', () => {

        const argumentsForValidation = {
            "age": 990,
        }

        const result = validatePromoCode(AgeLT60GT30PromoCode, argumentsForValidation);
        expect(result.status).toBe('denied');
    });

    it('should reject an outdated code even if a OR key is present', () => {

        const argumentsForValidation = {
            "age": 40,
        }

        const result = validatePromoCode(ORKeywordPastDatePromoCode, argumentsForValidation);
        expect(result.status).toBe('denied');
    });

    it('should accept code with valid age even if a OR key is present', () => {

        const argumentsForValidation = {
            "age": 40,
        }

        const result = validatePromoCode(ORKeywordPromoCode, argumentsForValidation);
        expect(result.status).toBe('accepted');
    });

    it('should reject code with wrong age even if a OR key is present', () => {

        const argumentsForValidation = {
            "age": 99,
        }

        const result = validatePromoCode(ORKeywordPromoCode, argumentsForValidation);
        expect(result.status).toBe('denied');
    });

    it('should reject code with AND key if meet only one condition', () => {

        const argumentsForValidation = {
            "age": 20,
        }

        const result = validatePromoCode(ORKeywordPromoCode, argumentsForValidation);
        expect(result.status).toBe('denied');
    });

    it('should accept code with AND key if both condition meet', () => {

        const argumentsForValidation = {
            "age": 20,
            "meteo": { "town": "Lyon" }
        }

        const result = validatePromoCode(ORKeywordPromoCode, argumentsForValidation);
        expect(result.status).toBe('accepted');
    });

    it('should handle code with OR key inside AND key if condition meet', () => {
        const argumentsForValidation = {
            "age": 98,
            "meteo": { "town": "Lyon" }
        }

        const result = validatePromoCode(ANDKeywordInsideOrKeywordPromoCode, argumentsForValidation);
        expect(result.status).toBe('accepted');
    });


});

describe('isDateValid', () => {
    it('should return true on valide date', () => {
        const after = "2019-01-01";
        const before = getTomorrowDateUsFormatted()

        const result = isDateValid(after, before);
        expect(result).toBe(true);
    });
    it('should return false on invalide date', () => {
        const after = "2019-01-01";
        const before = "2019-01-02";

        const result = isDateValid(after, before);
        expect(result).toBe(false);
    });

});

describe('isAgeValid', () => {
    it('should return true on valide eq condition', () => {
        const age = 40;
        const condition = {
            "eq": 40
        }

        const result = isAgeValid(age, condition);
        expect(result).toBe(true);
    });

    it('should return false on invalide eq condition', () => {
        const age = 40;
        const condition = {
            "eq": 72
        }

        const result = isAgeValid(age, condition);
        expect(result).toBe(false);
    });

    it('should return true on valide x>gt x<lt condition', () => {
        const age = 40;
        const condition = {
            "gt": 10,
            "lt": 99
        }

        const result = isAgeValid(age, condition);
        expect(result).toBe(true);
    });

    it('should return false on invalide x>gt x<lt condition', () => {
        const age = 40;
        const condition = {
            "gt": 99,
            "lt": 10
        }

        const result = isAgeValid(age, condition);
        expect(result).toBe(false);
    });
});