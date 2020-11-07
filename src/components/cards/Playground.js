import React from "react";
import Card from "./Card";

class PlayGround extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: ['angular2','vue','react','grunt','phantomjs','ember','babel', 'nodejs'],
            duplicated: [],
            randomized: [],
            finalized: [],
            opened: []
        }
    }

    componentDidMount() {
        this.start();
    }

    handleClick(name,index){
        if(this.state.opened.length === 2){
            setTimeout(() => {
            this.check()
            },750)
        } else {
            let card = {
                name,
                index
            }
            let finalized = this.state.finalized;
            let opened = this.state.opened;

            finalized[index].close = false;
            opened.push(card);

            this.setState({
                opened: opened,
                finalized: finalized
            });

            if(this.state.opened.length === 2){
                setTimeout(() => {
                    this.check()
                },750)
            }
        }
    }

    check(){
        let finalized = this.state.finalized
        if((this.state.opened[0].name === this.state.opened[1].name) && 
            (this.state.opened[0].index !== this.state.opened[1].index)){
            finalized[this.state.opened[0].index].complete = true
            finalized[this.state.opened[1].index].complete = true
        } else {
            finalized[this.state.opened[0].index].close = true
            finalized[this.state.opened[1].index].close = true
        }
        this.setState({
            finalized,
            opened: []
        })
    }

    start(){
        let finalized = [];
        let cards = this.state.cards;
        let duplicated = cards.concat(cards);
        let shuffled = this.shuffle(duplicated);
        this.setState({
            duplicated: duplicated,
            randomized: shuffled
        }, () => {
            console.log(this.state.randomized)
            this.state.randomized.map((name,index) => {
                finalized.push({
                    name,
                    close: true,
                    complete: false,
                    fail: false
                })
            });
            
            this.setState({
                finalized: finalized
            });
        });

    }

    shuffle(array){
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    render(){

        return (
            <div className="playground">
                {
                this.state.finalized.map((card, index) => {
                    return <Card card={card.name} click={() => {this.handleClick(card.name,index)}} 
                                    close={card.close} complete={card.complete}/>
                })
                }
            </div>
        )
    }
}

export default PlayGround;