import { Button, ButtonProps } from "react-aria-components"
import "./css/ImageSelectButton.css"

const ImageSelectButton = (buttonProps: ButtonProps & React.RefAttributes<HTMLButtonElement>) => {
    return (
        <Button {...buttonProps} className={buttonProps.className ? `${buttonProps.className} image-select-button` : 'image-select-button'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" width="1em" height="1em">
                <path fillRule="evenodd" d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm10.5 5.707a.5.5 0 0 0-.146-.353l-1-1a.5.5 0 0 0-.708 0L9.354 9.646a.5.5 0 0 1-.708 0L6.354 7.354a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0-.146.353V12a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V9.707ZM12 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clipRule="evenodd" />
            </svg>
      </Button>
    )
}

export default ImageSelectButton