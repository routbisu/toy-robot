import React, { useEffect, useState } from 'react'
import './App.scss'
import Controls from './components/Controls/Controls'
import GameBoard from './components/GameBoard/GameBoard'
import { getGameBoard } from './services/robotEngine'

const App = () => {
  const [positions, setPositions] = useState(null)

  const updatePositions = () => {
    setPositions(getGameBoard())
  }

  useEffect(() => {
    updatePositions()
  }, [])

  return (
    <div className="app-container">
      <Controls onSubmit={updatePositions} />
      <GameBoard positions={positions} />
    </div>
  )
}

export default App
