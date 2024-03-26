import './css/App.css';

const HeaderBar = ({site}:{site: string}) => {
    return (
        <header className="App-header">
            <div className="menu-icon">
                <div className="menu-line"></div>
                <div className="menu-line"></div>
                <div className="menu-line"></div>
            </div>
            <h1>{site}</h1>
        </header>
    )
}

export default HeaderBar;