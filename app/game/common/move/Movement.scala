package game.common.move

import game.common.unit.GameUnit
import game.common.{Player, Position}


case class Movement(override val target: Position, override val unit: GameUnit, override val player: Player) extends Move(target, unit, player)
