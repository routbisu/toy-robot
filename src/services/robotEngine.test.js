import { COMMANDS, CONTENTS, DIRECTIONS } from './enums'
import { getGameBoard, runCommand, getRobotPosition } from './robotEngine'

it('place a robot', () => {
  // When no robot are on the board
  expect(getRobotPosition()).toEqual(null)

  // Test placing of a robot
  runCommand({
    command: COMMANDS.PLACE_ROBOT,
    row: 1,
    col: 1,
    facing: DIRECTIONS.EAST,
  })

  expect(getRobotPosition()).toEqual('1,1,EAST')

  // Move existing robot to another place
  runCommand({
    command: COMMANDS.PLACE_ROBOT,
    row: 1,
    col: 3,
    facing: DIRECTIONS.EAST,
  })

  expect(getRobotPosition()).toEqual('1,3,EAST')

  // Move existing robot to another place - change direction
  runCommand({
    command: COMMANDS.PLACE_ROBOT,
    row: 1,
    col: 3,
    facing: DIRECTIONS.WEST,
  })

  expect(getRobotPosition()).toEqual('1,3,WEST')

  // Place robot on invalid co-ordinates
  runCommand({
    command: COMMANDS.PLACE_ROBOT,
    row: 7,
    col: 6,
    facing: DIRECTIONS.WEST,
  })

  expect(getRobotPosition()).toEqual('1,3,WEST')

  // Place robot with invalid facing
  runCommand({
    command: COMMANDS.PLACE_ROBOT,
    row: 2,
    col: 2,
    facing: 'INVALID',
  })

  expect(getRobotPosition()).toEqual('1,3,WEST')
})

it('place a wall', () => {
  // Test placing of a wall
  runCommand({ command: COMMANDS.PLACE_WALL, row: 3, col: 3 })
  expect(getGameBoard()[3][3]).toEqual(CONTENTS.WALL)

  // If target is occupied by wall already
  runCommand({ command: COMMANDS.PLACE_WALL, row: 3, col: 3 })
  expect(getGameBoard()[3][3]).toEqual(CONTENTS.WALL)

  // If target is occupied by a robot, make sure it is not replaced by a wall
  runCommand({ command: COMMANDS.PLACE_WALL, row: 1, col: 3 })
  expect(getGameBoard()[1][3]).toEqual(DIRECTIONS.WEST)
})

it('rotate the robot', () => {
  // Rotate the robot left
  runCommand({ command: COMMANDS.LEFT })
  expect(getRobotPosition()).toEqual('1,3,SOUTH')

  // Rotate the robot right
  runCommand({ command: COMMANDS.RIGHT })
  expect(getRobotPosition()).toEqual('1,3,WEST')

  // Rotate the robot right
  runCommand({ command: COMMANDS.RIGHT })
  runCommand({ command: COMMANDS.RIGHT })
  expect(getRobotPosition()).toEqual('1,3,EAST')
})

it('move the robot', () => {
  // Move the robot one position
  runCommand({ command: COMMANDS.MOVE })
  expect(getRobotPosition()).toEqual('1,4,EAST')

  // Move the robot one position to the end of the row
  runCommand({ command: COMMANDS.MOVE })
  expect(getRobotPosition()).toEqual('1,5,EAST')

  // Warp the position to the other side
  runCommand({ command: COMMANDS.MOVE })
  expect(getRobotPosition()).toEqual('1,1,EAST')

  runCommand({ command: COMMANDS.RIGHT })
  expect(getRobotPosition()).toEqual('1,1,SOUTH')

  // Warp the position to the north
  runCommand({ command: COMMANDS.MOVE })
  expect(getRobotPosition()).toEqual('5,1,SOUTH')

  // Move one position
  runCommand({ command: COMMANDS.MOVE })
  expect(getRobotPosition()).toEqual('4,1,SOUTH')

  // Move one position
  runCommand({ command: COMMANDS.MOVE })
  expect(getRobotPosition()).toEqual('3,1,SOUTH')

  // Place walls and test
  runCommand({ command: COMMANDS.PLACE_WALL, row: 2, col: 1 })
  runCommand({ command: COMMANDS.PLACE_WALL, row: 1, col: 1 })

  // Move one position
  runCommand({ command: COMMANDS.MOVE })
  expect(getRobotPosition()).toEqual('3,1,SOUTH')

  // Rotate robot 180 degrees and move ahead 3 steps
  runCommand({ command: COMMANDS.RIGHT })
  runCommand({ command: COMMANDS.RIGHT })

  runCommand({ command: COMMANDS.MOVE })
  runCommand({ command: COMMANDS.MOVE })
  runCommand({ command: COMMANDS.MOVE })
  expect(getRobotPosition()).toEqual('5,1,NORTH')
})
