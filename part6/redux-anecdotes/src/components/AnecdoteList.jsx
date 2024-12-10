import { useSelector, useDispatch } from "react-redux";

const AnecdoteList = ({ anecdotes }) => {
    const dispatch = useDispatch();

    const vote = (id) => {
      dispatch({
        type: "VOTE",
        payload: { id },
      });
    };


    return (
      anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))
    );
  };
  
  export default AnecdoteList;