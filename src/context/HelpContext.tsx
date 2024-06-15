import { createContext } from "react"

export enum HelpParagraphType {
    TITLE,
    SECTION_TITLE,
    TEXT,
    IMAGE
}

export interface HelpParagraph {
    type: HelpParagraphType,
    content: string
}

interface HelpContextProps {
    addParagraphs: (paragraphs: HelpParagraph[]) => number,
    removeParagraphs: (key: number) => void,
    getParagraphs: HelpParagraph[]
}

const HelpContext = createContext<HelpContextProps>({
    addParagraphs: () => 0,
    removeParagraphs: () => {},
    getParagraphs: []
});

export default HelpContext