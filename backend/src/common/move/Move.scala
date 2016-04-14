package common.move

import common.unit.GameUnit
import common.{Player, Position}

abstract class Move(val target: Position, val unit: GameUnit, val player: Player)
