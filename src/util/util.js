export const getRandom = (words) => {
    let randomWord = words[Math.floor(Math.random() * words.length)]
    console.log(`random word selected => `, randomWord)
    return randomWord.text
}