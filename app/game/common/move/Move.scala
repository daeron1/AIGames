package game.common.move

import game.common.unit.GameUnit
import game.common.{Player, Position}
import play.api.libs.json.{JsValue, Json, Writes}

abstract class Move(val target: Position, val unit: GameUnit, val player: Player)

object Move {

  implicit val moveWrites = new Writes[Move] {
    override def writes(o: Move): JsValue = o match {
      case movement: Movement => Json.toJson(movement)
      case attackMove: AttackMove => Json.toJson(attackMove)
      case dieMove: DieMove => Json.toJson(dieMove)
    }
  }

}
