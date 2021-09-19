import { COMMANDS, CONTENTS, DIRECTIONS } from './enums'

// Initial state for the game board
const getInitialState = () => ({
  1: { 1: null, 2: null, 3: null, 4: null, 5: null },
  2: { 1: null, 2: null, 3: null, 4: null, 5: null },
  3: { 1: null, 2: null, 3: null, 4: null, 5: null },
  4: { 1: null, 2: null, 3: null, 4: null, 5: null },
  5: { 1: null, 2: null, 3: null, 4: null, 5: null },
})

let gameBoard = getInitialState()

// Stores robot position
let robotPosition = null

// Helper functions
const validatePosition = ({ row, col, facing }) =>
  !(row < 1 || row > 5 || col < 1 || col > 5 || (facing ? !Object.values(DIRECTIONS).includes(facing) : false))

// Helper function: get next direction on turning left / right
const getNewDirection = (current, command) => {
  switch (current) {
    case DIRECTIONS.NORTH:
      return command === COMMANDS.LEFT ? DIRECTIONS.WEST : DIRECTIONS.EAST

    case DIRECTIONS.EAST:
      return command === COMMANDS.LEFT ? DIRECTIONS.NORTH : DIRECTIONS.SOUTH

    case DIRECTIONS.SOUTH:
      return command === COMMANDS.LEFT ? DIRECTIONS.EAST : DIRECTIONS.WEST

    case DIRECTIONS.WEST:
      return command === COMMANDS.LEFT ? DIRECTIONS.SOUTH : DIRECTIONS.NORTH
  }
}

const runCommand = ({ command, row, col, facing }) => {
  switch (command) {
    // Handle the place robot command
    case COMMANDS.PLACE_ROBOT:
      // Check for valid co-ordinates
      if (!validatePosition({ row, col, facing })) return

      // Remove robot from old position
      if (robotPosition) gameBoard[robotPosition.row][robotPosition.col] = null

      // Place robot in new position
      gameBoard[row][col] = facing

      robotPosition = { row, col, facing }

      break

    case COMMANDS.PLACE_WALL:
      // Check for valid co-ordinates
      if (!validatePosition({ row, col })) return

      if (!gameBoard[row][col]) gameBoard[row][col] = CONTENTS.WALL

      break

    case COMMANDS.LEFT:
    case COMMANDS.RIGHT:
      if (!robotPosition) return
      robotPosition.facing = getNewDirection(robotPosition.facing, command)

      break

    case COMMANDS.MOVE:
      break

    case COMMANDS.REPORT:
      // Return current position of robot
      return robotPosition && Object.values(robotPosition).join(',')

    default:
      break
  }
}

const getGameBoard = () => gameBoard

// Clears the game area (matrix) and initialises the game
const initialiseGame = () => {
  robotPosition = null
  gameBoard = getInitialState()
}

const getRobotPosition = () => runCommand({ command: COMMANDS.REPORT })

export { getGameBoard, getRobotPosition, runCommand, initialiseGame }
