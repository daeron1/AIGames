package game.common

import play.api.libs.json.{JsValue, Json, Writes}

case class Position(x: Int, y: Int)

object Position {
  implicit val positionWrites = new Writes[Position] {
    override def writes(position: Position): JsValue = Json.obj(
      "x" -> position.x,
      "y" -> position.y
    )
  }
}