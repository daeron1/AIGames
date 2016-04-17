package game.common.move

import game.common.unit.GameUnit
import game.common.{Player, Position}

abstract class Move(val target: Position, val unit: GameUnit, val player: Player)
