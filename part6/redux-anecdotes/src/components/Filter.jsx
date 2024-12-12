import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'
import AnecdoteList from './AnecdoteList'

const Filter = ({anecdotes}) => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
      // input-field value is in variable event.target.value
      const filter = event.target.value
      dispatch(filterChange(filter))  
    }
  
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter