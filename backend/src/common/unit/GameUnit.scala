package common.unit

import common.Position

abstract class GameUnit(val position: Position,
                        val hp: Int,
                        val attack: Int,
                        val distance: Int,
                        val attackDistance: Int) {

  def move(target: Position): GameUnit
  def attack(damage: Int): GameUnit
}
