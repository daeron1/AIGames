package common.unit

import common.Position
import common.unit.Archer._

class Archer(position: Position) extends GameUnit(position, attack, distance, attackDistance, hp)

object Archer {
  val attack = 12
  val distance = 5
  val attackDistance = 5
  val hp = 80
}

