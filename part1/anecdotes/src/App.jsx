import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {

  const anecdotes = [
    {anecdote: "If it hurts, do it more often.", votes: 0},
    {anecdote: "Adding manpower to a late software project makes it later!", votes: 0},
    {anecdote: "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.", votes: 0},
    {anecdote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", votes: 0},
    {anecdote: "Premature optimization is the root of all evil.", votes: 0},
    {anecdote: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.", votes: 0},
    {anecdote: "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.", votes: 0},
    {anecdote: "The only way to go fast, is to go well.", votes: 0}
  ]
  ;

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({0: 0, 1: 0, 2: 0, 3:0, 4:0, 5:0, 6:0, 7:0});

  const generate = () => {
    let result = Math.floor(Math.random() * 8);
    console.log(result);
    return result;
  };

  const handleVote = () => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [selected]: prevVotes[selected] + 1,
    }));
  };

  const getAnecdoteWithMostVotes = () => {
    const maxVotes = Math.max(...Object.values(votes));
    const maxIndex = Object.keys(votes).find((key) => votes[key] === maxVotes);
    return { anecdote: anecdotes[maxIndex].anecdote, votes: maxVotes }
  }

  const mostVoted = getAnecdoteWithMostVotes();

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>"{anecdotes[selected].anecdote}" has {votes[selected]} votes</p>
      <button onClick={() => setSelected(generate())}>next anecdote</button>
      <button onClick={handleVote}>vote</button>
      <h2>Anecdote with most votes</h2>
      <p>
        "{mostVoted.anecdote}" has {mostVoted.votes} votes
      </p>
    </div>
  );
}

export default App;
