import { useState } from "react";
import { useTranslation } from "react-i18next"
import "./css/Settings.css"
import { SUPPORTED_LANGS } from "../constants";
import { Button } from "react-aria-components"


/**
 * React Component that displays a settings page
 * 
 * Needs:
 *  - Translation
 */
const Settings = () => {
    const [settingsT, i18n] = useTranslation("settings");
    const [langT,] = useTranslation("language");
    const [lang, setLang] = useState(i18n.language);
    const [langChanged, setLangChanged] = useState(false);
    const changeLanguage = (langCode: string) => {
        setLang(langCode);
        setLangChanged(lang == i18n.language);
    }

    const hasChanges = () => {
        return langChanged; // || ...Changed || ...
    }
    const applySettings = () => {
        console.log("current: " + i18n.language + " settings: " + lang + " change: " + langChanged);
        if (langChanged) {
            console.log("Changed Language to " + lang);
            i18n.changeLanguage(lang);
        }
    }
    return (
        <div className="settings-page">
            <h1 className="settings-title">{settingsT("settings")}</h1>
            <div className="settings-nav">{/* Navigation to setting-category-title elements */}</div>
            <div className="settings-options">
                <h2 className="settings-category-title">{settingsT("language")}</h2>
                <div className={"settings-label " + (langChanged ? "settings-changed" : "")}>{settingsT("language")}:</div>
                <select value={lang} name="lang" onChange={e => changeLanguage(e.target.value)}>
                    {SUPPORTED_LANGS.map(element => 
                        <option value={element} key={element}>{langT(element)}</option>
                    )}
                </select>
            </div>
            <Button className="settings-submit-button" onPress={applySettings} isDisabled={!hasChanges()}>{settingsT("apply")}</Button>
        </div>
    )
}

export default Settings;