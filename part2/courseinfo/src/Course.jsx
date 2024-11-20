const Header = ({ courseName }) => <h1>{courseName}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part part={part}/>)}  
  </>

const Course = ({course}) => {
    const sum = course.parts.reduce((sum, part) => sum + part.exercises, 0);
    return(<>
    <Header courseName={course.name} />
    <Content parts={course.parts} />
    <Total sum={sum} />
    </>)
}
  
  export default Course