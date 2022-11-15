
import { useSpeechSynthesis } from 'react-speech-kit';
import { useState } from 'react'

const SightWordGame = ({allWords}) => {

    const { speak } = useSpeechSynthesis()
    const getRandom = (words) => {
        let randomWord = words[Math.floor(Math.random() * words.length)]
        console.log(`random word selected => `, randomWord)
        return randomWord.text
    }
    const [sightWord, setSightWord] = useState(getRandom(allWords))

    const onClick = () => {
        speak({text: sightWord, rate:0.75})
        setSightWord(getRandom(allWords))
    }
    return (
      <div> 
        <h2>{sightWord}</h2>
        <button class="glow-on-hover" onClick={onClick}>{sightWord}</button>
      </div>
    )
  }
  
 export default SightWordGame