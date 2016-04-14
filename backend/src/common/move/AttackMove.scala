package common.move

import common.Player
import common.unit.GameUnit


case class AttackMove(targetUnit: GameUnit, override val unit: GameUnit, override val player: Player) extends Move(targetUnit.position, unit, player)
