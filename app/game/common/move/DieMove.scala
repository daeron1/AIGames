package game.common.move

import game.common.{Player, Position}
import game.common.unit.GameUnit
import play.api.libs.json.{JsValue, Json, Writes}


case class DieMove(override val unit: GameUnit, override val player: Player) extends Move(Position(0, 0), unit, player)

object DieMove {
  implicit val dieMoveWrites = new Writes[DieMove] {
    override def writes(move: DieMove): JsValue = Json.obj(
      "object" -> move.unit.getName(move.player),
      "action" -> "die"
    )
  }
}
