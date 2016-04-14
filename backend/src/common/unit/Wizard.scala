package common.unit

import common.Position
import common.unit.Wizard._

class Wizard(position: Position) extends GameUnit(position, attack, distance, attackDistance, hp)

object Wizard {
  val attack = 10
  val heal = 6
  val distance = 4
  val attackDistance = 1
  val hp = 120
}
