const Hello = (props) => {
  console.log(props)
  return (    
  <div>      
    Hello {props.name}, you are {props.age} years old
  </div>  
  )
}

const App = () => {
  const name = 'Peter'  
  const age = 10
  const now = new Date()
  const a = 10
  const b = 20
  console.log(now, a+b)

  console.log('Hello from component')
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Maya' age={26 + 10} />      
      <Hello name={name} age={age} />
    </div>
  )
}

export default App