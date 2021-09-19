import React from 'react'
import './GameBoard.scss'

const GameBoard = ({ positions }) => {
  if (!positions) return null

  console.log('positions', positions)

  return (
    <div className="gameboard-container">
      {Object.values(positions).map((rowData, idx) => (
        <div key={idx} className="row">
          {Object.values(rowData).map((colData, jdx) => (
            <div
              className={`col ${colData && colData !== 'WALL' && 'robot'} ${colData && colData.toLowerCase()}`}
              key={jdx}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default GameBoard
