package common.unit

import common.Position
import common.unit.Wizard._

case class Wizard(override val position: Position, override val hp: Int = Wizard.hp) extends GameUnit(position, hp, attack, distance, attackDistance) {

  override def move(target: Position): GameUnit = {
    new Wizard(target, hp)
  }

  override def attack(damage: Int): GameUnit = {
    new Archer(position, hp - damage)
  }

}

object Wizard {
  val attack = 10
  val heal = 6
  val distance = 4
  val attackDistance = 1
  val hp = 80
}
