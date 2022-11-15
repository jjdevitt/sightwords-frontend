import { useState, useEffect } from 'react'
import './App.css'
import wordClient from './client/wordClient'
import EditWords from './components/EditWords';
import SightWordGame from './components/SightWordGame';
import SpellingGame from './components/SpellingGame';

const App = () => {
  
  const [allWords, setAllWords] = useState([])
  const [mode, setMode] = useState('Menu')

  // initialize the word list
  useEffect(() => {
    wordClient.getAll().then(returnedWords => {
      setAllWords(returnedWords)
    })
  },[])

  const returnToMenu = () => {
    setMode('Menu')
  }

  // Main menu
  switch(mode){
    case 'SightWordGame':
      return <SightWordGame allWords={allWords}/>
    case 'SpellingGame':
      return <SpellingGame allWords={allWords}/>
    case 'Edit':
      return <EditWords allWords={allWords} setAllWords={setAllWords} returnToMenu={returnToMenu}/>
    default: 
      return (
        <div>

          <h2>Main Menu</h2>
          <table align='center'>
            <tbody>
              <tr><td><button onClick={() => setMode('SightWordGame')}>Sight Word Game</button></td></tr>
              <tr><td><button onClick={() => setMode('SpellingGame')}>Spelling Game</button></td></tr>
              <tr><td><button onClick={() => setMode('Edit')}>Edit Word List</button></td></tr>
            </tbody>
          </table>
        </div>
      );
  }
} 

export default App;
