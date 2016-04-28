package game.common.unit

import game.common.{Player, Position}

abstract class GameUnit(val position: Position,
                        val hp: Int,
                        val attack: Int,
                        val distance: Int,
                        val attackDistance: Int) {

  def getName(player: Player): String
  def move(target: Position): GameUnit
  def attack(damage: Int): GameUnit
}
