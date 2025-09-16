import { useState} from 'react'
import clsx from 'clsx';
import languages from '../index'
import Confetti from 'react-confetti'
/* import confetti from 'canvas-confetti' */
import { getFarewellText, getRandomWords } from '../util';
import './App.css'

function App() {
  const [currentWord, setCurrentWord] = useState(()=> getRandomWords());
  const [guessedWord,setGuessedWord] = useState([])
/*   const [time, setTime] = useState(300)

  useEffect(()=>{
      if (time <= 0) return;
      const validTime = setInterval(() => {
        setTime(prevTime => {
          if (prevTime === 1) {
            clearInterval(validTime);
            return 0
          }
          
          return prevTime - 1
        }
        )}
      , 1000);
         //console.log(validTime) 
    return ()=> clearInterval(validTime)
  },[time]) */
  
  /* const formattedTime = (ms)=>{
    const min =  Math.floor(ms/60000);
    const sec = Math.floor((ms % 60000) / 1000);
    const millisec = ((ms% 1000) / 10);
  } *//* 
const minutes = Math.floor(time / 60).toString().padStart(2, '0'); 
const seconds = Math.floor(time / 5).toString().padStart(2, '0'); 
 */
 /*  console.log(guessedWord)  */
  
  const wrongGuessedCount = guessedWord.filter(letter =>
    !currentWord.includes(letter)
  ).length 

/*   console.log(wrongGuessedCount)  */
  const isGameWon = currentWord.split("").every(letter=> guessedWord.includes(letter))
  const isGameLost = wrongGuessedCount >= languages.length - 1
  const isGameOver = isGameWon || isGameLost
  const lastGuessed = guessedWord[guessedWord.length -1]
  const isLastGuessed = !currentWord.includes(lastGuessed);
/*   console.log(isLastGuessed) */

/*   console.log(isGameWon)
  console.log(isGameLost) */





  function keyboardGuessed(letter){
    setGuessedWord(prevWord =>
      prevWord.includes(letter)? prevWord :
      [...prevWord,letter]
    )
  }


  const alphabets = 'abcdefghijklmnopqrstuvwxyz'

  const alphabetList = alphabets.split('').map(alphabet =>{
    const isGuessed = guessedWord.includes(alphabet)
    const isCorrect  = currentWord.includes(alphabet) && isGuessed
    const isWrong =  !currentWord.includes(alphabet) && isGuessed

    const className = clsx({
      correct : isCorrect,
      wrong : isWrong
    })
    return(
    <button
    className={className}
    onClick={()=>keyboardGuessed(alphabet)}
    disabled = {isGameOver}
    >{alphabet.toUpperCase()}</button>
    )
})




  const wordList = currentWord.split('').map((word,index)=>{
    const showMissingLetters = guessedWord.includes(word) || isGameLost
  return(
    <span 
  className='word'
  key={index}
  >{showMissingLetters ? word.toUpperCase() : ""}</span>
  )}
  )
const languageList = languages.map((language,index) =>{
  const lostLanguages = index < wrongGuessedCount;

  const className = clsx ('chip', lostLanguages ? 'lost' : '')
  const styles = {
    backgroundColor : language.bgColor
  }
  return(
      <span
      key={index} 
      className= {className}
      style={styles}>{language.name}</span>
  )}
)

const gameStatusColor = clsx('result',{
  won : isGameWon,
  lost : isGameLost,
  farewell : !isGameOver && isLastGuessed
})

  function gameStatus(){
    if(isGameWon){
      return  (<>
        <p>You win!</p>
        <p>Well Done 🎉</p>
          </>)
    }if(isGameLost){
      return (  <>
          <p>You lost!</p>
        <p>Try Again Next Time</p>
        </>)
    }
        if(!isGameOver && isLastGuessed){
      return(<p>
        {/*   {getFarewellText(languages[wrongGuessedCount - 1]?.name)} */}
          {wrongGuessedCount > 0 && getFarewellText(languages[wrongGuessedCount - 1]?.name)}
          </p>)
    }
      return null
  }
  function startNewGame(){
    setCurrentWord(getRandomWords())
    setGuessedWord([])
  }
/* console.log(languageList) */

  return (
    <main>
      {isGameWon && <Confetti/>}
        {/*  {isGameLost && isGameOver && confetti({
              particleCount: 80,
              angle: 90,
              spread: 45,
              startVelocity: 30,
              origin: { y: 0, x: 0.5 }, // from top center
              colors: ["#ff0000", "#000000", "#666666"],
          })} */}
      <section className="header">
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempt to keep the programming world safe from Assembly!</p>
      </section>
      <section className={gameStatusColor}>
        {/*  {isGameOver ?(
          isGameWon ?
          <>
        <p>You win!</p>
        <p>Well Done 🎉</p>
          </>:  
          <>
          <p>You lost!</p>
        <p>Well Done 🎉</p>
        </>
          ) : null
        } */}
        {gameStatus()}
      </section>
      <section className="languagesList">
          {languageList}
      </section>
      <section className="languageGuess">
          {wordList}
      </section>
      <section className='alphabetList'>
        {alphabetList}
      </section>
      {isGameOver && <section className='endGame'>
        <button onClick={startNewGame}> New Game</button>
      </section>}
     {/* <p>{minutes} : {seconds}</p> */}
    </main>

  )
}

export default App
