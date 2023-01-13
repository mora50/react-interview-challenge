import { useState } from 'react'
import './App.css'

type Circle = {
  positionX: string
  positionY: string
  id: number
}

function App() {
  const [circles, setCircles] = useState<Circle[]>([])

  const [historic, setHistoric] = useState<Circle[]>([])

  const handleTheCircles = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const newCircle = {
      id: event.timeStamp + event.pageX,
      positionX: String(event.pageX),
      positionY: String(event.pageY),
    }

    setCircles((prev) => [...prev, newCircle])
  }

  const undo = () => {
    const copyHistoric = [...circles]

    const lastCircleOnHistoric = copyHistoric.pop()

    if (lastCircleOnHistoric) {
      setCircles(copyHistoric)

      setHistoric((prev) => [...prev, lastCircleOnHistoric])
    }
  }

  const reundo = () => {
    const copyHistoric = [...historic]

    const lastCircleOnHistoric = copyHistoric.pop()

    if (lastCircleOnHistoric) {
      setCircles((prev) => [...prev, lastCircleOnHistoric])

      setHistoric(copyHistoric)
    }
  }

  return (
    <main>
      <div className="flex-buttons">
        <button onClick={circles.length > 0 ? undo : undefined}>undo</button>
        <button onClick={historic.length > 0 ? reundo : undefined}>
          reundo
        </button>
      </div>

      <div onClick={handleTheCircles} className="App" />

      {circles.map((circle) => (
        <div
          key={circle.id}
          style={{
            top: `${circle.positionY}px`,
            left: `${circle.positionX}px`,
          }}
          className="circle"
        />
      ))}
    </main>
  )
}

export default App
