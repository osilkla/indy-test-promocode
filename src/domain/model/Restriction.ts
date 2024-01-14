interface DateRestriction {
    "@date": {
        after: string;
        before: string;
    };
}

interface AgeRestriction {
    "@age": {
        eq?: number;
        lt?: number;
        gt?: number;
    };
}

interface MeteoRestriction {
    "@meteo": {
        is: string;
        temp: {
            gt: string;
        };
    };
}

interface OrCondition {
    "@or": (AgeRestriction | AndCondition | MeteoRestriction)[];
}

interface AndCondition {
    "@and": (AgeRestriction | MeteoRestriction | OrCondition)[];
}

type Restriction = DateRestriction | AgeRestriction | MeteoRestriction | OrCondition | AndCondition;

export { Restriction, AgeRestriction };