import { COMMANDS, DIRECTIONS } from './enums'
import { getRobotPosition, initialiseGame, runCommand } from './robotEngine'

it('place a robot', () => {
  // Test placing
  runCommand({
    command: COMMANDS.PLACE_ROBOT,
    row: 1,
    col: 1,
    facing: DIRECTIONS.EAST,
  })

  expect(getRobotPosition()).toEqual('1,1,EAST')

  initialiseGame()
})
