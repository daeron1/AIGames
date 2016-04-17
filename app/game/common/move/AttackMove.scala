package game.common.move

import game.common.Player
import game.common.unit.GameUnit


case class AttackMove(targetUnit: GameUnit, override val unit: GameUnit, override val player: Player) extends Move(targetUnit.position, unit, player)
