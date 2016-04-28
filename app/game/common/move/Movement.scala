package game.common.move

import game.common.unit.GameUnit
import game.common.{Player, Position}
import game.common.move.Direction._
import play.api.libs.json.{JsValue, Json, Writes}

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

  def getPath: List[Movement] = {
    def buildPath(movement: Movement, acc: List[Movement]): List[Movement] = {
      if (movement.previousMove.isEmpty) movement :: acc
      else buildPath(movement.previousMove.get, movement :: acc)
    }
    buildPath(this, List())
  }

}

object Movement {
  implicit val movementWrites = new Writes[Movement] {
    override def writes(movement: Movement): JsValue = Json.obj(
      "object" -> movement.unit.getName(movement.player),
      "action" -> "move",
      "target" -> Json.toJson(movement.target)
    )
  }
}
