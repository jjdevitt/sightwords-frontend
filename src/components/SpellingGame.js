
import { useSpeechSynthesis } from 'react-speech-kit';
import { useState, useEffect } from 'react'
import { getRandom } from '../util/util';



const SpellingGame = ({allWords}) => {

  const [word, setWord] = useState(() => getRandom(allWords))
  const [guess, setGuess ] = useState(Array(word.length).fill('_').join(""))
  const { speak } = useSpeechSynthesis()
  const [guessIndex, setGuessIndex] = useState(0)

  useEffect(() => {
    document.addEventListener('keydown', onGuess, true);
  })

  const onGuess = (event) => {
    console.log(`Guess ${event.key} index=${guessIndex} targetWord=${word} currentGuessProgress=${guess}`)
    if(event.key==Array.from(word)[guessIndex]){
      
      if (guessIndex===word.length-1) {
        console.log('Successful full guess, reseting...')
        const newWord = getRandom(allWords)
        setWord(newWord)
        setGuess(Array(word.length).fill('_').join(""))
        setGuessIndex(0)
        speak({text: newWord, rate:0.50});
      } else {
        let tmp = [...guess]
        tmp[guessIndex]=event.key
        setGuess(tmp.join(''))
        setGuessIndex(guessIndex+1)
      }
    } 
  }

  return (
    <div> 
     <p>{guess}</p>
      <p><button onClick={() => speak({text: word, rate:0.65})}>Play word again</button></p>
    </div>
    )
  }
  
 export default SpellingGame