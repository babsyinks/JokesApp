import React from 'react'
import './Joke.css'


class Joke extends React.Component{
    constructor(props){
        super(props)
        this.handleAudios = this.props.handleAudios 
        this.mapRatingToEmojiOrColor = this.mapRatingToEmojiOrColor.bind(this)
    }


    componentDidMount(){
       //console.log(this.props.handleAudios)
    }
    mapRatingToEmojiOrColor(rating,handlemyAudios,emoji){
        console.log(handlemyAudios)
        const{handleAnger,handleLaughter,handleNeutral,handleFurious,handleYawn,handleLaughHard} = handlemyAudios
        if(rating>12){
            rating = 12
        }
        else if(rating < -12){
            rating = -12
        }
    switch(rating){
        case 0:
            return emoji?<i onMouseOver = {handleNeutral} className="em em-neutral_face" aria-role="presentation" aria-label="NEUTRAL FACE"></i>:'2px solid rgb(216, 216, 16)'
        case 1:
        case 2:
        case 3:
            return emoji?<i onMouseOver = {handleLaughter} className="em em-smile" aria-role="presentation" aria-label="SMILING FACE WITH OPEN MOUTH AND SMILING EYES"></i>:'2px solid rgb(157, 255, 0)' 
        case 4:
        case 5:
        case 6:
            return emoji?<i onMouseOver = {handleLaughter} className="em em-laughing" aria-role="presentation" aria-label="SMILING FACE WITH OPEN MOUTH AND TIGHTLY-CLOSED EYES"></i>:'2px solid rgb(0, 255, 0)'
        case 7:
        case 8:
        case 9:
            return emoji?<i onMouseOver = {handleLaughHard} className="em em-joy" aria-role="presentation" aria-label="FACE WITH TEARS OF JOY"></i>:'2px solid rgb(7, 168, 7)'
        case 10:
        case 11:
        case 12:
            return emoji?<i onMouseOver = {handleLaughHard} className="em em-rolling_on_the_floor_laughing" aria-role="presentation" aria-label="ROLLING ON THE FLOOR LAUGHING"></i>:'2px solid green'
        case -1:
        case -2:
        case -3:
            return emoji?<i onMouseOver = {handleYawn} className="em em-dizzy_face" aria-role="presentation" aria-label="DIZZY FACE"></i>:'2px solid rgb(255, 174, 0)'
        case -4:
        case -5:
        case -6:
            return emoji?<i onMouseOver = {handleAnger} className="em em-unamused" aria-role="presentation" aria-label="UNAMUSED FACE"></i>:'2px solid rgb(255, 123, 0)'
        case -7:
        case -8:
        case -9:
            return emoji?<i onMouseOver = {handleAnger} className="em em-slightly_frowning_face" aria-role="presentation" aria-label="SLIGHTLY FROWNING FACE"></i>:'2px solid rgb(223, 37, 12)'
        case -10:
        case -11:
        case -12:
            return emoji?<i onMouseOver = {handleFurious} className="em em-angry" aria-role="presentation" aria-label="ANGRY FACE"></i>:'2px solid red'
        default:
            return emoji?<i onMouseOver = {handleNeutral} className="em em-neutral_face" aria-role="presentation" aria-label="NEUTRAL FACE"></i>:'2px solid rgb(255, 255, 0)'
    
    }
    }
    render(){
        console.log(this.props.handleAudios)
        return (
        <div className = "jokeWrapper">
            <i className="em em---1" aria-role="presentation" aria-label="THUMBS UP SIGN"
             onClick = {()=>{this.props.handleVote(1,this.props.id)}}></i>
            <span className = "rating" style = {{border:this.mapRatingToEmojiOrColor(this.props.rating,false)}}>{this.props.rating}</span>
            <i className="em em--1" aria-role="presentation" aria-label="THUMBS DOWN SIGN"
            onClick = {()=>{this.props.handleVote(-1,this.props.id)}}></i>
            <span className = "joke">{this.props.joke}</span> 
            <i onClick = {()=>this.props.setFavourites(this.props.id)} className= {`em ${this.props.favouriteStatus?'em-star2':'em-star'} star`}
             aria-role="presentation" aria-label= {this.props.favouriteStatus?'GLOWING STAR':'WHITE MEDIUM STAR'}></i>
            {this.mapRatingToEmojiOrColor(this.props.rating,this.props.handleAudios,true)}
        </div>
    )
    }
} 









export default Joke
