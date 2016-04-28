package game.implementations

import game.common.move.{AttackMove, Move}
import game.common.{AI, Game, Player}

import scala.util.Random


class RandomAI(game: Game, player: Player) extends AI(game, player) {

  override def findMove(): Move = {
    val moves: List[Move] = game.getPossibleMovesFor(player)
    val attackMoves = moves filter(_.isInstanceOf[AttackMove])
    if (attackMoves.nonEmpty)
      getRandomMove(attackMoves)
    else {
      val filtered = moves filter { move =>
        val target = move.target
        target.x >= 5 && target.x <= 15 && target.y >= 5 && target.x <= 15
      }
      getRandomMove(if (filtered.isEmpty) moves else filtered)
    }
  }

  private def getRandomMove(list: List[Move]): Move = {
    val random = new Random
    list(random.nextInt(list.size))
  }
}
