import { useSelector, useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";

const App = () => {
  const anecdotes = useSelector((state) => state);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter anecdotes={anecdotes}/>
      <AnecdoteForm anecdotes={anecdotes}/>
      <AnecdoteList />
    </div>
  );
};

export default App;
