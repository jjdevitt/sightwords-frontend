import { useSpeechSynthesis } from 'react-speech-kit';
import { useState, useEffect } from 'react'
import { getRandom } from '../util/util';
import getSentence from '../client/sentenceClient'

const SpellingGame = ({allWords}) => {

  const [word, setWord] = useState('')
  const [guess, setGuess ] = useState('')
  const [guessIndex, setGuessIndex] = useState(0)
  const { speak } = useSpeechSynthesis()

  useEffect(()=> {
    console.log('state init')
    const newWord =  getRandom(allWords);
    setWord(newWord)
    setGuess(Array(newWord.length).fill('_').join(""))
    setGuessIndex(0)
    setTimeout( () => {
      speak({text:newWord, rate:0.50})
    }, 1000)
    
  }, [])

  useEffect(() => {
    const onGuess = (event) => {
      console.log(`Guess ${event.key} index=${guessIndex} targetWord=${word} currentGuessProgress=${guess}`)
      if(event.key===Array.from(word)[guessIndex]){
        let tmp = [...guess]
        tmp[guessIndex]=event.key
        console.log('updated guess=>',tmp)
        let guessWord = tmp.join('')
  
        if(guessWord===word){
          console.log('game completed!!!!!!!')
          setGuess(tmp.join(''))
          setTimeout( () => {
            const newWord =  getRandom(allWords);
            setWord(newWord)
            setGuess(Array(newWord.length).fill('_').join(""))
            setGuessIndex(0)
            speak({text: newWord, rate:0.50})
          }, 1000);
        } else {
          console.log('game continues...')
          setGuess(tmp.join(''))
          setGuessIndex(guessIndex+1)
         
        }
      } 
    }
    window.addEventListener('keydown', onGuess);
    return () => {
      window.removeEventListener("keydown", onGuess);
    }
  })

  const generateSentence =  (word) => {
    getSentence(word).then( result => {
      console.log('result =>', result)
      speak({text: result, rate:0.5})
    })
  }
  return (
    <div class='fullscreenDiv'> 
     <div class="center">
      <h1 size="+3">{Array.from(guess).map(c => c + " ").join("")}</h1>
      <br/>
        <p><button onClick={() => speak({text: word, rate:0.65})}>Play word again</button></p>
        <p><button onClick={() => generateSentence(word)}>Use the word in a sentence</button></p>
      </div>
    </div>
    )
  }
  
 export default SpellingGame