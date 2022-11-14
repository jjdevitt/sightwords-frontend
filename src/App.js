import { useState, useEffect } from 'react'
import './App.css'
import wordClient from './client/wordClient'
import { useSpeechSynthesis } from 'react-speech-kit';

const App = () => {
  
  const [allWords, setAllWords] = useState([])
  const [sightWord, setSightWord] = useState('Start!')
  const [gameMode, setGameMode] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [newWord, setNewWord] = useState('')
  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    wordClient.getAll().then(returnedWords => {
      setAllWords(returnedWords)
      setSightWord(getRandom(returnedWords))
    })
  },[])

  const gameModeOnClick = () => setGameMode(true)
  const editModeOnClick = () => setEditMode(true)
  const addWord = (event) => {
    event.preventDefault()
    if(allWords.map(word => word.text).includes(newWord)){
      console.log('word already there, skippng...')
      setNewWord('')
    } else {
      wordClient.create({text: newWord}).then( result => {
        console.log('response from create=>', result)
        setAllWords(allWords.concat(result))
        setNewWord('')
      })
    }
  }
  const wordChange =  (event) => setNewWord(event.target.value)

  const removeWord = (id) => {
    console.log('remove =>', id)
    wordClient.remove(id).then( result => {
      console.log('deleted => ', result)
      setAllWords(allWords.filter(word => word.id!==id))
    })
  }

  if(gameMode){
    return <Game sightWord={sightWord} onClick={()=>{speak({text: sightWord, rate:0.75}); setSightWord(getRandom(allWords))}}/>
  } else if(editMode){
    return <EditWords allWords={allWords} gameModeOnClick={gameModeOnClick} 
    addWord={addWord} wordChange={wordChange} newWord={newWord} removeWord={removeWord}/>
  } else {
    return <MainMenu gameModeOnClick={gameModeOnClick} editModeOnClick={editModeOnClick}/>
  }
} 

const Game = ({sightWord, onClick}) => {
  return (
    <div> 
      <h2>{sightWord}</h2>
      <button class="glow-on-hover" onClick={onClick}>{sightWord}</button>
    </div>
  )
}

const EditWords = ({allWords, gameModeOnClick, addWord, wordChange, newWord,removeWord}) => {
  let wordList = allWords.map(word=><li key={word.id} class='listitem'>{word.text}<button onClick={()=>removeWord(word.id)}>remove</button></li>)
  return (
    <div>
      <ul>{wordList}</ul>
      <form onSubmit={addWord}>
        <input onChange={wordChange} value={newWord}/>
        <button type='submit'>save</button>
      </form>
      <button onClick={gameModeOnClick}>play</button>
    </div>
  )
}

const MainMenu = ({gameModeOnClick, editModeOnClick}) =>{
  return (
    <div>
      <button onClick={gameModeOnClick}>play</button>
      <button onClick={editModeOnClick}>edit</button>
    </div>
  )
}

const getRandom = (words) => {
  let randomWord = words[Math.floor(Math.random() * words.length)]
  console.log(`random word selected => `, randomWord)
  return randomWord.text
}

export default App;
