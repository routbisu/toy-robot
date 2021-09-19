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

// Compute new robot position after moving
const getNewPosition = () => {
  const { row: oldRow, col: oldCol } = robotPosition

  let newRow = oldRow,
    newCol = oldCol

  switch (robotPosition.facing) {
    case DIRECTIONS.EAST:
      newCol = oldCol + 1 > 5 ? 1 : oldCol + 1
      // Can not move if there is a wall ahead
      if (gameBoard[oldRow][newCol] === CONTENTS.WALL) return false

      break

    case DIRECTIONS.WEST:
      newCol = oldCol - 1 < 1 ? 5 : oldCol - 1
      // Can not move if there is a wall ahead
      if (gameBoard[oldRow][newCol] === CONTENTS.WALL) return false

      break

    case DIRECTIONS.NORTH:
      newRow = oldRow + 1 > 5 ? 1 : oldRow + 1
      // Can not move if there is a wall ahead
      if (gameBoard[newRow][oldCol] === CONTENTS.WALL) return false

      break

    case DIRECTIONS.SOUTH:
      newRow = oldRow - 1 < 1 ? 5 : oldRow - 1
      // Can not move if there is a wall ahead
      if (gameBoard[newRow][oldCol] === CONTENTS.WALL) return false

      break

    default:
      return false
  }

  return { row: newRow, col: newCol }
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
      // Update robot position
      robotPosition.facing = getNewDirection(robotPosition.facing, command)
      // Update game board
      gameBoard[robotPosition.row][robotPosition.col] = robotPosition.facing

      break

    case COMMANDS.MOVE:
      if (!robotPosition) return

      const newPosition = getNewPosition()
      if (!newPosition) return

      // Move robot to new position
      runCommand({
        command: COMMANDS.PLACE_ROBOT,
        facing: robotPosition.facing,
        ...newPosition,
      })

      break

    case COMMANDS.REPORT:
      // Return current position of robot
      return robotPosition && Object.values(robotPosition).join(',')

    default:
      break
  }
}

const getGameBoard = () => ({ ...gameBoard })

// Clears the game area (matrix) and initialises the game
const initialiseGame = () => {
  robotPosition = null
  gameBoard = getInitialState()
}

const getRobotPosition = () => runCommand({ command: COMMANDS.REPORT })

export { getGameBoard, getRobotPosition, runCommand, initialiseGame }
