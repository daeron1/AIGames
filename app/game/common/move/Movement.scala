package game.common.move

import game.common.unit.GameUnit
import game.common.{Player, Position}
import game.common.move.Direction._

case class Movement(override val target: Position,
                    override val unit: GameUnit,
                    override val player: Player,
                    previousMove: Option[Movement]) extends Move(target, unit, player) {

  def nextMove(direction: Direction): Movement = {
    val newTarget = direction match {
      case LEFT => Position(target.x - 1, target.y)
      case RIGHT => Position(target.x + 1, target.y)
      case UP => Position(target.x, target.y - 1)
      case DOWN => Position(target.x, target.y + 1)
    }
    Movement(newTarget, unit, player, Some(this))
  }

}
