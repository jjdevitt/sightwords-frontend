
import { useSpeechSynthesis } from 'react-speech-kit';
import { useState } from 'react'
import { getRandom } from '../util/util';

const SightWordGame = ({allWords}) => {

    const { speak } = useSpeechSynthesis()
    const [sightWord, setSightWord] = useState(() => getRandom(allWords))

    const onClick = () => {

      speak({text: sightWord, rate:0.75})
      setTimeout( () => {
          setSightWord(getRandom(allWords))
      }, 1000)
    }
    return (
      <div> 
        <button class="glow-on-hover" onClick={onClick}>{sightWord}</button>
      </div>
    )
  }
  
 export default SightWordGame