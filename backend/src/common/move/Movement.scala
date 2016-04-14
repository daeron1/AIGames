package common.move

import common.unit.GameUnit
import common.{Player, Position}


case class Movement(override val target: Position, override val unit: GameUnit, override val player: Player) extends Move(target, unit, player)
