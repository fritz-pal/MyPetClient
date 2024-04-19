

    const cards = [
        {
        name: "Dogs",
        total: "21", 
        description: "Total number of pets",
        footer: "footer",
        }];


export const Card = () => (
    <div className="cards">
        {cards.map((card) => (
            <label key={card.name} id={card.name}>
                <input type="checkbox" />
                <div className="card">
                    <div className="front">
                        <header>
                            <h2>{card.name}</h2>
                            <span>more vert</span>
                        </header>
                        <var>
                            {card.total}
                        </var>
                        <h3>{card.description}</h3>
                        <h4>{card.footer}</h4>
                    </div>
                    <div className="back">
                        <header>
                            <h2>{card.name}</h2>
                            <span>close</span>
                        </header>
                        <p>Some more information about the card</p>
                    </div>
                </div>
            </label>
        ))}
    </div>
); 