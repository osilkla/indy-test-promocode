import { Avantage } from "../model/Avantage";

type Reasons = Record<string, string>;

interface ValidateResponseCommon {
    promocode_name: string;
    status: "accepted" | "denied";
}

interface ValidateReponseSuccessType extends ValidateResponseCommon {
    status: "accepted";
    avantage: Avantage;
}

interface ValidateReponseErrorType extends ValidateResponseCommon {
    status: "denied";
    reasons: Reasons;
}

type ValidateResponseType = ValidateReponseSuccessType | ValidateReponseErrorType;

export { ValidateResponseType };