import React from "react";

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    clicked(card){
        this.props.click(card)
    }

    render(){
        return (
        <div className={"card" + (!this.props.close ? ' opened' : '') + 
                (this.props.complete ? ' matched' : '')} 
            onClick={() => this.clicked(this.props.framework)}>
            <div className="front">
            </div>
            <div className="back">
            <img src={"https://raw.githubusercontent.com/samiheikki/javascript-guessing-game/master/static/logos/" + this.props.card + ".png"}/>
            </div>
        </div>
        )
    }
}

export default Card;