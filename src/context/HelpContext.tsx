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
    paragraphs: HelpParagraph[]
}

const HelpContext = createContext<HelpContextProps>({
    addParagraphs: () => 0,
    removeParagraphs: () => {},
    paragraphs: []
});

export default HelpContext