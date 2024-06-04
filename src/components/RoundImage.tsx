import "./css/RoundImage.css";

const RoundImage = ({imageSource, placeholder, className}: {imageSource?: string, placeholder: string, className?: string}) => {
    return (
        <div className={className ? "round-image " + className : "round-image"}>
            <img src={imageSource ? imageSource : placeholder}/>
        </div>
    );
}

export default RoundImage;