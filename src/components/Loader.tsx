import "./css/Loader.css"

/**
 * React Component that simply displays a Loading circle
 */
const Loader = () => {
    /* return <div className="loader"/>*/
   return <div className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
    </div>
}

export default Loader