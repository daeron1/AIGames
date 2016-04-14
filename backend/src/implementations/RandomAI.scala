package implementations

import common.move.{AttackMove, Move}
import common.{AI, Game, Player}

import scala.util.Random


class RandomAI(game: Game, player: Player) extends AI(game, player) {

  override def findMove(): Move = {
    val moves: List[Move] = game.getPossibleMovesFor(player)
    val attackMoves = moves filter(_.isInstanceOf[AttackMove])
    if (attackMoves.nonEmpty)
      getRandomMove(attackMoves)
    else
      getRandomMove(moves)
  }

  private def getRandomMove(list: List[Move]): Move = {
    val random = new Random
    list(random.nextInt(list.size))
  }
}
