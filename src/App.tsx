import { useEffect, useState } from "react";
import './App.css';
import Quiz from "./components/Quiz";
import {nanoid} from "nanoid";


function App() {

  const [startQuiz, setStartQuiz] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [finalScore, setFinalScore] = useState(0);
  const [revealScore, setRevealScore] = useState(false);
  const [gameCount, setGameCount] = useState(0);
  const [loading, setLoading] = useState(false);

  function beginGame() {
    setStartQuiz(true);
    setRevealScore(false);
    setFinalScore(0);
    setGameCount((prev:any) => prev + 1);
  }

  useEffect(() => {
      setLoading(true);
     fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
     .then(res => res.json())
     .then(response => setQuestions(response.results.map((ques:any) => {
      setLoading(false);
      return {
        question: ques.question,
        options: [...ques.incorrect_answers, ques.correct_answer].sort(() => 0.5 - Math.random()),
        id: nanoid(),
        answer: ques.correct_answer,
        selected: null
      }
     })));
  },[gameCount]);

  function setIsHeld(id:any, option:any){
    setQuestions((prevQuestion:any) => {
      return prevQuestion.map((qs:any) => {
        if(qs.id === id) {
          return {...qs, selected: option}
        } else {
          return qs;
        }
      });
    });
  }

  const quizElements = questions.map((ques:any) => {
    return (<Quiz question={ques.question} options={ques.options} key={ques.id} id={ques.id} setIsHeld={setIsHeld} selected={ques.selected} answer={ques.answer} reveal={revealScore} />)
  });

  function startNewGame(){
    if(revealScore){
      beginGame();
    } else {
      checkAnswers();
    } 
  }


  function checkAnswers() {
    let x = questions.reduce((total,qes:any) => {
      if(qes.selected === qes.answer){
        return total + 1;
      }
      return total;
    }, 0); 
    console.log("Final Score ", x);
    setFinalScore(x); 
    setRevealScore(true);
    
  }

  return (
    <div className="App">          
            { !loading && !startQuiz && 
            <div className="home">
              <h1 className="title">Quizzical</h1>
              <p className="link">by <a href="https://subtlecrypto.substack.com/">Subtle_Crypto</a></p>
              <p className="sub-title">Fun trivia quiz for everyone!</p>
              <input className="btn" type="button" onClick={beginGame} value={"Start Quiz"} />
            </div>
            }
            {loading && <div className="loader">
              <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
              </div>}
            { !loading && startQuiz &&
            <div> 
              {quizElements}
              <div className="footer">
              {revealScore && <p className="score-details">{`You scored ${finalScore} out of 5`}</p>}
              <input className="submit-btn" type="button" value={revealScore ? "Start New Game" :"Check Answers"} onClick={startNewGame}/>
              </div>
              
            </div>
            }
    </div>
  )
}

export default App
