import { useEffect, useRef, useState } from "react";

function App() {

  const [speed, setSpeed] = useState(7);
  const [tileCount, setTileCount] = useState(20);
  const [tileSize, setTileSize] = useState(0)
  const [headX, setHeadX] = useState(10);
  const [headY, setHeadY] = useState(10);
  const [xVelocity, setXVelocity] = useState(0)
  const [yVelocity, setYVelocity] = useState(0)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctx = canvasRef.current?.getContext('2d')

  useEffect(() => {
    setTileSize(canvasRef.current!.width / tileCount - 2)
  }, [canvasRef, tileCount])

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
  function drawGame() {
    clearScreen()
    drawSnake()

    // setTimeout(drawGame, 1000 / speed)
  }

  drawGame()

  return (
    <>
      <canvas ref={canvasRef} width={400} height={400} className="game"></canvas>
    </>
  );
}

export default App;
