import { APIClient } from "../constants"

const MAPPING = "/lang"

/**
 * Gets the full resource file for a language
 * @param code Language like "en"
 * @returns Promise for the resource file
 */
const getFullLanguage = async (code: string) => {
    const request = await APIClient.get(`${MAPPING}/${code}`);
    return request.data;
}

/**
 * Gets a single namespace within a language
 * @param languageCode Language like "en"
 * @param namespace Namespace like "home"
 * @returns Promise for the namespace's content
 */
const getLanguageNamespace = async (languageCode: string, namespace: string) => {
    const request = await APIClient.get(`${MAPPING}/${languageCode}/${namespace}`);
    return request.data;
}

export const LanguageAPI = {
    getFullLanguage,
    getLanguageNamespace
}