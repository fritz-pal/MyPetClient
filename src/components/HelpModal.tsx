import { useContext } from "react"
import HelpContext, { HelpParagraphType } from "../context/HelpContext"
import { Button, Dialog, DialogTrigger, Modal } from "react-aria-components";
import { useTranslation } from "react-i18next";
import MultilineLabel from "./MultilineLabel";
import "./css/HelpModal.css"
import CrossButton from "./buttons/CrossButton";
import HelpButton from "./buttons/HelpButton";
import EditButton from "./buttons/EditButton";

const HelpModal = () => {
    const [t] = useTranslation("help");
    const {paragraphs} = useContext(HelpContext);
    
    return (
        <DialogTrigger>
            <HelpButton className="help-modal-button"/>
            <Modal className="react-aria-Modal help-modal-dialog">
                <Dialog>
                    {({close}) => (
                        <div className="help-modal-content">
                            {paragraphs.map((paragraph) => {
                                switch (paragraph.type) {
                                    case HelpParagraphType.TITLE:
                                        return <h2 key={paragraph.content}>{t(paragraph.content)}</h2>;
                                    case HelpParagraphType.SECTION_TITLE:
                                        return <h3 key={paragraph.content}>{t(paragraph.content)}</h3>;
                                    case HelpParagraphType.TEXT:
                                        return <MultilineLabel key={paragraph.content} text={t(paragraph.content)}/>;
                                    case HelpParagraphType.IMAGE:
                                        return <img key={paragraph.content} src={paragraph.content}/>;
                                }
                            })}
                            <Button onPress={() => close()} className="help-modal-close-button">{t("close")}</Button>
                        </div>
                    )}
                </Dialog>
            </Modal>
        </DialogTrigger>
    )
}

export default HelpModal