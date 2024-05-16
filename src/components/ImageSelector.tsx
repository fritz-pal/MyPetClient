import { FileTrigger } from "react-aria-components";
import { FileHook } from "../hooks/useFile";
import EditButton from "./buttons/EditButton";
import "./css/ImageSelector.css"

const ImageSelector = ({fileHook, placeHolderImage, className}: {fileHook: FileHook, placeHolderImage: string, className?: string}) => {
    return (
        <div className={className ? "image-selector " + className : "image-selector"}>
            <FileTrigger onSelect={(e) => {
                    let image: null | File = null;
                    if (e) {
                        const item = e.item(0);
                        if (item)
                            image = item;
                    }
                    fileHook.setFile(image);
                }} acceptedFileTypes={["image/png", "image/jpeg"]}>
                <EditButton className="image-selector-overlay-button"/>
            </FileTrigger>
            {fileHook.data ?
                <img className="image-selector-image" src={fileHook.data}/> :
                <img className="image-selector-image" src={placeHolderImage}/>
            }
        </div>
    );
}

export default ImageSelector;