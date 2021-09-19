// Stores a 2D array with co-ordinates and position of the robot & walls
let gameArea = [[], [], [], [], []]
// Stores robot position
let robotPosition = {}

const runCommand = ({ command, row, col, facing }) => {}

const getRobotPosition = () => Object.values(robotPosition).join(',')

// Clears the game area (matrix) and initialises the game
const initialiseGame = () => {
  robotPosition = {}
  gameArea = [[], [], [], [], []]

  return true
}

export { getRobotPosition, runCommand, initialiseGame }
