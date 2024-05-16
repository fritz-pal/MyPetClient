import { Button, ButtonProps } from "react-aria-components"
import "../css/SVGButton.css"

const AnswerButton = (buttonProps: ButtonProps & React.RefAttributes<HTMLButtonElement>) => {
    return (
        <Button {...buttonProps} className={buttonProps.className ? `svg-button ${buttonProps.className}` : 'svg-button'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
            </svg>
        </Button>
    )
}

export default AnswerButton