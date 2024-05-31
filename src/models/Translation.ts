import { APIClient } from "../constants";

export interface Translation {
    namespace: string;
    key: string;
    value: string;
}

const MAPPING = "/lang";

const postTranslation = async (lang: string, translation: Translation): Promise<void> => {
    const request = await APIClient.post(`${MAPPING}/${lang}`, translation);
    return request.data;
};

const getTranslation = async (lang: string, namespace: string): Promise<string> => {
const request = await APIClient.get(`${MAPPING}/${lang}/${namespace}`);
return request.data;
};

export const TranslationAPI = {
    postTranslation,
    getTranslation
};
