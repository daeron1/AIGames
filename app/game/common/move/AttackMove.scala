package game.common.move

import game.common.Player
import game.common.unit.GameUnit
import play.api.libs.json.{JsValue, Json, Writes}


case class AttackMove(targetUnit: GameUnit,
                      override val unit: GameUnit,
                      override val player: Player) extends Move(targetUnit.position, unit, player)


object AttackMove {
  implicit val attackMoveWrites = new Writes[AttackMove] {
    override def writes(movement: AttackMove): JsValue = Json.obj(
      "object" -> movement.unit.getName(movement.player),
      "action" -> "attack",
      "target" -> movement.target
    )
  }
}
