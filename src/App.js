import { useState, useEffect } from 'react'
import './App.css'
import wordClient from './client/wordClient'

const App = () => {
  
  const [allWords, setAllWords] = useState([])
  const [sightWord, setSightWord] = useState('Start!')
  const [gameMode, setGameMode] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [newWord, setNewWord] = useState('')

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
    wordClient.create({text: newWord}).then( result => {
      console.log('response from create=>', result)
      setAllWords(allWords.concat(result))
      setNewWord('')
    })
  }
  const wordChange =  (event)=> setNewWord(event.target.value)

  if(gameMode){
    return <Game sightWord={sightWord} onClick={()=>setSightWord(getRandom(allWords))}/>
  } else if(editMode){
    return <EditWords allWords={allWords} gameModeOnClick={gameModeOnClick} 
    addWord={addWord} wordChange={wordChange} newWord={newWord}/>
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

const EditWords = ({allWords, gameModeOnClick, addWord, wordChange, newWord}) => {
  let wordList = allWords.map(word=><li key={word.id} class='listitem'>{word.text}</li>)
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
