import React, { useState } from 'react'
import { COMMANDS, DIRECTIONS } from '../../services/enums'
import { runCommand } from '../../services/robotEngine'
import './Controls.scss'

const Controls = ({ onSubmit }) => {
  const [command, setCommand] = useState(-1)
  const [row, setRow] = useState('')
  const [col, setCol] = useState('')
  const [facing, setFacing] = useState(-1)

  const submitHandler = (evt) => {
    evt.preventDefault()

    // Run command
    if (runCommand({ command, row: Number(row), col: Number(col), facing })) {
      // Update gameboard
      if (onSubmit) onSubmit()
    }
  }

  return (
    <form className="controls-container" onSubmit={submitHandler}>
      <select value={command} onChange={(evt) => setCommand(evt.target.value)}>
        <option value="-1">Select Command</option>
        {Object.values(COMMANDS).map((command) => (
          <option key={command} value={command}>
            {command}
          </option>
        ))}
      </select>
      {(command === COMMANDS.PLACE_ROBOT || command === COMMANDS.PLACE_WALL) && (
        <>
          <input type="number" placeholder="Row" value={row} onChange={(evt) => setRow(evt.target.value)} />
          <input type="number" placeholder="Col" value={col} onChange={(evt) => setCol(evt.target.value)} />
        </>
      )}
      {command === COMMANDS.PLACE_ROBOT && (
        <select value={facing} onChange={(evt) => setFacing(evt.target.value)}>
          <option value="-1">Select Facing</option>
          {Object.values(DIRECTIONS).map((direction) => (
            <option key={direction} value={direction}>
              {direction}
            </option>
          ))}
        </select>
      )}
      <button type="submit">Send Command</button>
    </form>
  )
}

export default Controls
