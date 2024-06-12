import "./css/MultilineLabel.css";

const MultilineLabel = ({text, className}: {text: string, className?: string}) => {
    return (
        <div className={className ? "multiline-label " + className : "multiline-label"}>
            {text.split("\n").map((line, i) => {
                return line != "" ? (
                    <div key={i} className="multiline-label-line">{line}</div>
                ) : (
                    <br key={i}/>
                );
            })}
        </div>
    );
}

export default MultilineLabel;