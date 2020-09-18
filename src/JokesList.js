import React from 'react'
import Joke from './Joke'
import Loading from './Loading'
import axios from 'axios'
import uuid from 'uuid/v4'
import './JokeList.css'

class JokeList extends React.Component{
constructor(props){
    super(props)
    this.state = {jokesArray:[],
                  canFetch:true,
                  loading:true}
    this.getFavouriteJokes = this.getFavouriteJokes.bind(this)
    this.getMoreJokes = this.getMoreJokes.bind(this)
    this.vote = this.vote.bind(this)
    this.setFavouriteJokes = this.setFavouriteJokes.bind(this)
    this.playAudio = this.playAudio.bind(this)
    
}

static defaultProps = {numJokes:10}


async componentDidMount(){
    
    try{
    const arr = await this.fetchJokes()
        
    this.setState({
        jokesArray:arr,
        canFetch:true,
        loading:false
        })
    }
    catch(e){
      this.setState({canFetch:false,loading:false})
    }
    this.audioLaugh = new Audio('audios/laugh.mp3')
    this.audioNeutral = new Audio('audios/neutral.mp3')
    this.audioAngry = new Audio('audios/angry.mp3')
    this.audioYawn = new Audio('audios/yawn.mp3')
    this.audioLaughHard = new Audio('audios/laughhard.mp3')
    this.audioFurious = new Audio('audios/furious.mp3')
}

async fetchJokes(){

    const arr = []

    while(arr.length < this.props.numJokes){

      let res = await axios.get('https://icanhazdadjoke.com/',{headers:{Accept:'application/json'}})  
       
      let stateDuplicateTest = this.state.jokesArray.every(obj=>obj.joke !== res.data.joke)

      let jokeObj = {joke:res.data.joke,id:uuid(),rating:0,favouriteSet:false}

      if(stateDuplicateTest){

        if(arr.length>0){
            
          let duplicateTest = arr.every(obj=>obj.joke !== res.data.joke)
      
          if(duplicateTest){
            
            arr.push(jokeObj)
        }
       }
        else{
            
          arr.push(jokeObj)
       
     }
        }
    
   }

   return arr
}

getFavouriteJokes(){
    const jokes = JSON.parse(window.localStorage.getItem('jokes'))
    if(jokes.length === 0){
        alert(`No Favourites Jokes set yet;use the star on your favourite joke to set it`)
    return
    }
    this.setState({jokesArray:jokes})
        
}

setFavouriteJokes(id){

const joke = this.state.jokesArray.find(joke=>joke.id === id)
const jokeIndex = this.state.jokesArray.findIndex(joke=>joke.id === id)
const storedJokes = JSON.parse(window.localStorage.getItem('jokes'))|| []
const jokesToStore = storedJokes.filter(jk=>jk.joke === joke.joke)

if(jokesToStore.length === 0){
  joke.favouriteSet = !joke.favouriteSet
  window.localStorage.setItem('jokes',JSON.stringify([...storedJokes,joke]))
}

else{
    joke.favouriteSet = false
    window.localStorage.setItem('jokes',JSON.stringify(storedJokes.filter(jk=>jk.joke !== joke.joke)))  
}
this.setState({jokesArray:[...this.state.jokesArray.slice(0,jokeIndex),joke,...this.state.jokesArray.slice(jokeIndex+1)]})
}

async getMoreJokes(){
    this.setState({loading:true})
    try {
       const arr = await this.fetchJokes()
       this.setState(state=>({
           jokesArray:[...state.jokesArray,...arr],
           canFetch:true,
           loading:false
       }))
        
    } catch (error) {
        this.setState({loading:false,canFetch:false})
    }
}

playAudio(audio){
    audio.play().then(()=>
    //successful play after user interaction    
    console.log('')
        
    )
    .catch(e=>console.log(e.message))
    
}

handleLaughter = ()=>{
    this.playAudio(this.audioLaugh)
}

handleNeutral = ()=>{
    this.playAudio(this.audioNeutral)
}

handleAnger = ()=>{
    this.playAudio(this.audioAngry)
}

handleYawn = ()=>{
    this.playAudio(this.audioYawn)
}

handleLaughHard = ()=>{
    this.playAudio(this.audioLaughHard)
}

handleFurious = ()=>{
    this.playAudio(this.audioFurious)
}

vote(val,id){
  const updatedState = this.state.jokesArray.map(joke=>{
    if(joke.id === id){
        joke.rating +=val
        if(joke.rating>12){
            joke.rating = 12
        }
        else if(joke.rating < -12){
            joke.rating = -12
        }
        return joke
    }
    else{
        return joke
    }
})

this.setState({jokesArray:updatedState})
}

render(){

    return (
        this.state.loading?<Loading />:(
            this.state.canFetch?(
        <div className = "wrapper">
            <h1>Laughter Arena</h1>
            <div className = "emojis">
            <i onMouseOver = {this.handleLaughter} className="em em-joy" aria-role="presentation" aria-label="FACE WITH TEARS OF JOY"></i>

            <i onMouseOver = {this.handleNeutral} className="em em-neutral_face neutral" aria-role="presentation" aria-label="NEUTRAL FACE"></i>

            <i onMouseOver = {this.handleAnger} className="em em-angry angry" aria-role="presentation" aria-label="ANGRY FACE"></i>
            </div>
            

            <div className = "jokes" style = {{height:this.state.jokesArray.length<=10?'':'84.5vh'}}>
               {this.state.jokesArray.map(myjoke=><Joke key = {myjoke.id} joke = {myjoke.joke}
                id = {myjoke.id} rating = {myjoke.rating} favouriteStatus = {myjoke.favouriteSet}
                handleVote = {this.vote} setFavourites = {this.setFavouriteJokes}
                handleAudios = {{handleAnger:this.handleAnger,handleLaughter:this.handleLaughter,
                                handleNeutral:this.handleNeutral, handleFurious:this.handleFurious,
                                handleLaughHard:this.handleLaughHard,handleYawn:this.handleYawn}}
                />)}
            </div>
                <div className = "buttonWrapper"><button onClick = {this.getFavouriteJokes} className = "getFavouritesJokes" value = "Get Saved Favourite Jokes">Get Saved Favourite Jokes 
                <i className="em em-star2" aria-role="presentation" aria-label="GLOWING STAR"></i></button>
                <button onClick = {this.getMoreJokes} className = "getFavouritesJokes moreJokes" value = "Get Even More New Jokes">Get Even More New Jokes <i className="em em-rolling_on_the_floor_laughing" aria-role="presentation" aria-label="ROLLING ON THE FLOOR LAUGHING"></i></button>
                </div>
        </div>):<div className = "status"><h1 style = {{padding:'0px 15px'},{textAlign:'center'}}>Could not fetch jokes, please check your connection</h1></div>
            
    )
    )
        }
}

export default JokeList