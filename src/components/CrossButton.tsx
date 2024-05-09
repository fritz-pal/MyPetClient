import { Button, ButtonProps } from "react-aria-components";
import "./css/CrossButton.css"

const CrossButton = (buttonProps: ButtonProps & React.RefAttributes<HTMLButtonElement>) => {
    return (
        <Button {...buttonProps} className={buttonProps.className ? `${buttonProps.className} cross-button` : 'cross-button'}>
            <div className="cross-button-content">
                <div/>
                <div/>
            </div>
        </Button>
    );
}

export default CrossButton