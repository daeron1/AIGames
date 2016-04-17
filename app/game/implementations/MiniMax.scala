package game.implementations

import game.common.Player.player1
import game.common.move.Move
import game.common.{AI, Game, Player}

class MiniMax(game: Game, player: Player) extends AI(game, player) {

  type ScoredMove = (Move, Int)

  val comparator1: (ScoredMove, ScoredMove) => ScoredMove = (a, b) => if (a._2 > b._2) a else b
  val comparator2: (ScoredMove, ScoredMove) => ScoredMove = (a, b) => if (a._2 > b._2) b else a

  def minmax(player: Player) = if (player == player1) comparator1 else comparator2

/*  def miniMax(game: Game, player: Player, depth: Int): ScoredMove = {
    if (depth == 0 || game.isEnded)
      (null, evaluateFor(player))
    else
      (game getPossibleMovesFor player).foldLeft((new Move, 0))((acc, move) => {
        val result = miniMax(game make move, !player, depth - 1)
        minmax(player)(acc, result)
      })
  }*/

//  def evaluateFor(player: Player): Int = ???
  override def findMove(): Move = ???
}


