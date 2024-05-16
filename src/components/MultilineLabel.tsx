import "./css/MultilineLabel.css";

const MultilineLabel = ({text, className}: {text: string, className?: string}) => {
    return (
        <div className={className ? "multiline-label " + className : "multiline-label"}>
            {text.split("\n").map((line) => {
                return line != "" ? (
                    <div className="multiline-label-line">{line}</div>
                ) : (
                    <br />
                );
            })}
        </div>
    );
}

export default MultilineLabel;