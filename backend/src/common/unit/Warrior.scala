package common.unit

import common.Position
import common.unit.Warrior._

case class Warrior(override val position: Position, override val hp: Int = Warrior.hp) extends GameUnit(position, hp, attack, distance, attackDistance) {

  override def move(target: Position): GameUnit = {
    new Warrior(target, hp)
  }

  override def attack(damage: Int): GameUnit = {
    new Warrior(position, hp - damage)
  }
}

object Warrior {
  val attack = 8
  val distance = 4
  val attackDistance = 1
  val hp = 120
}