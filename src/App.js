import { useState, useEffect } from 'react'
import './App.css'
import wordClient from './client/wordClient'
import EditWords from './components/EditWords';
import SightWordGame from './components/SightWordGame';

const App = () => {
  
  const [allWords, setAllWords] = useState([])
  const [mode, setMode] = useState('Menu')

  // initialize the word list
  useEffect(() => {
    wordClient.getAll().then(returnedWords => {
      setAllWords(returnedWords)
    })
  },[])

  // Main menu
  switch(mode){
    case 'SightWordGame':
      return <SightWordGame allWords={allWords}/>
    case 'Edit':
      return <EditWords allWords={allWords} setAllWords={setAllWords}/>
    default: 
      return (
        <div>
          <button onClick={() => setMode('SightWordGame')}>play</button>
          <button onClick={() => setMode('Edit')}>edit</button>
        </div>
      );
  }
} 

export default App;
