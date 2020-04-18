import React from 'react'
import './JokeList.css'
import './Loading.css'

const Loading = ()=>(
    <div className = "emojiWrapper">
        <div className = "emojis animate">
<i className="em em-joy" aria-role="presentation" aria-label="FACE WITH TEARS OF JOY"></i>

<i className="em em-neutral_face neutral" aria-role="presentation" aria-label="NEUTRAL FACE"></i>

<i className="em em-angry angry" aria-role="presentation" aria-label="ANGRY FACE"></i>
<h1 className = "loading">Loading...</h1>
</div>
    </div>
)

export default Loading