import { useState } from 'react'
import wordClient from '../client/wordClient'

const EditWords = ({allWords, setAllWords, returnToMenu}) => {
    const [newWord, setNewWord] = useState('')

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
    let wordList = allWords.map(word=><li key={word.id} class='listitem'>{word.text}<button onClick={()=>removeWord(word.id)}>remove</button></li>)
    return (
      <div>
        <ul>{wordList}</ul>
        <form onSubmit={addWord}>
          <input onChange={wordChange} value={newWord}/>
          <button type='submit'>save</button>
        </form>
        <button onClick={returnToMenu}>Return To Menu</button>
      </div>
    )
  }

  export default EditWords