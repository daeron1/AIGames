package game.common.unit

import game.common.Position
import game.common.unit.Archer._

case class Archer(override val position: Position, override val hp: Int = Archer.hp) extends GameUnit(position, hp, attack, distance, attackDistance) {

  override def move(target: Position): GameUnit = {
    new Archer(target, hp)
  }

  override def attack(damage: Int): GameUnit = {
    new Archer(position, hp - damage)
  }

}

object Archer {
  val attack = 12
  val distance = 5
  val attackDistance = 5
  val hp = 100
}