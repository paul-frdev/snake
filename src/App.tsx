import { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";



// interface Element {
//   removeEventListener(type: 'keyup' | 'keydown', listener: (event: KeyboardEvent) => any, options?: boolean | EventListenerOptions): void;
//   addEventListener(type: 'keyup' | 'keydown', listener: (event: KeyboardEvent) => any, options?: boolean | EventListenerOptions): void;

// }

function App() {

  // TODO states
  const [speed, setSpeed] = useState(1);
  const [tileCount, setTileCount] = useState(20);
  const [tileSize, setTileSize] = useState(0)

  const [headX, setHeadX] = useState(10);
  const [headY, setHeadY] = useState(10);
  const [xVelocity, setXVelocity] = useState(0)
  const [yVelocity, setYVelocity] = useState(0)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const ctx = canvasRef.current?.getContext('2d')

  // TODO useEffect
  useEffect(() => {
    setTileSize(canvasRef.current!.width / tileCount - 2)
  }, [canvasRef, tileCount])

  useEffect(() => {
    const keyDown = (event: Event) => {
      const keyboardEvent = event as unknown as KeyboardEvent;
      //Up
      if (keyboardEvent.keyCode === 38) {
        setYVelocity(prev => prev - 1)
      }
    }
    document.addEventListener('keydown', keyDown);

    return () => {
      document.removeEventListener("keydown", keyDown)
    }
  }, [])

  const changeSnakePosition = () => {
    setHeadX(prev => prev + xVelocity)
    setHeadY(prev => prev + yVelocity)
  }


  function clearScreen() {
    if (ctx) {
      ctx!.fillStyle = "black";
      ctx?.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height)
    }
  }
  function drawSnake() {
    if (ctx) {
      ctx!.fillStyle = 'orange'
      ctx?.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
    }
  }
  // TODO: it's a game loop
  function gameLoop() {
    console.log('drawgame');

    clearScreen()
    drawSnake()
    changeSnakePosition()
  }

  return (
    <>
      <button onClick={gameLoop}>Start game</button>
      <canvas ref={canvasRef} width={400} height={400} className="game"></canvas>
    </>
  );
}

export default App;
