package common.unit

import common.Position
import common.unit.Warrior._

class Warrior(position: Position) extends GameUnit(position, attack, distance, attackDistance, hp)

object Warrior {
  val attack = 8
  val distance = 4
  val attackDistance = 1
  val hp = 120
}
