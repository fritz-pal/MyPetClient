import { APIClient } from "../constants"

const MAPPING = "/lang"

const getFullLanguage = async (code: string) => {
    const request = await APIClient.get(`${MAPPING}/${code}`);
    return request.data;
}

const getLanguageNamespace = async (languageCode: string, namespace: string) => {
    const request = await APIClient.get(`${MAPPING}/${languageCode}/${namespace}`);
    return request.data;
}

export const LanguageAPI = {
    getFullLanguage,
    getLanguageNamespace
}