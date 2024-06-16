import { useMemo, useRef, useState } from "react"
import HelpContext, { HelpParagraph } from "../context/HelpContext"

const HelpContextProvider = ({children}: {children: JSX.Element}) => {
    const [paragraphMap, setParagraphMap] = useState(new Map<number, HelpParagraph[]>());
    const nextID = useRef(1);
    
    const paragraphs = useMemo<HelpParagraph[]>(() => {
        const values = [...paragraphMap.values()];
        return values.flat();
    }, [paragraphMap]);

    const addParagraphs = (paragraphs: HelpParagraph[]) => {
        setParagraphMap((prevParagraphs) => {
            const newParagraphs = new Map(prevParagraphs);
            newParagraphs.set(nextID.current, paragraphs);
            return newParagraphs;
        });
        console.log("Added Paragraphs id " + nextID.current)
        return nextID.current++;
    }

    const removeParagraphs = (key: number) => {
        setParagraphMap((prevParagraphs) => {
            const newParagraphs = new Map(prevParagraphs);
            newParagraphs.delete(key);
            return newParagraphs;
        })
    }

    return (
        <HelpContext.Provider value={{
            addParagraphs: addParagraphs,
            removeParagraphs: removeParagraphs,
            paragraphs: paragraphs,
        }}>
            {children}
        </HelpContext.Provider>
    )
}

export default HelpContextProvider