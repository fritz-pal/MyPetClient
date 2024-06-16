import { useContext, useEffect, useRef } from "react";
import HelpContext, { HelpParagraph } from "../context/HelpContext";

const useHelp = (paragraphs: HelpParagraph[]) => {
    const {addParagraphs, removeParagraphs} = useContext(HelpContext);
    const id = useRef(0);

    useEffect(() => {
        id.current = addParagraphs(paragraphs);
        return () => removeParagraphs(id.current);
    }, []);
}

export default useHelp