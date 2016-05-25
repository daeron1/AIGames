package game.implementations

import game.common.Player.player1
import game.common.move.Move
import game.common.unit.GameUnit
import game.common.{AI, Game, Player}

class MiniMax(game: Game, player: Player) extends AI(game, player) {

  override def findMove(): Move = {
    val result = miniMax(game, player, 3)
    result._1
  }

  type ScoredMove = (Move, Int)

  val comparator1: (ScoredMove, ScoredMove) => ScoredMove = (a, b) => if (a._2 > b._2) a else b
  val comparator2: (ScoredMove, ScoredMove) => ScoredMove = (a, b) => if (a._2 > b._2) b else a

  private def minmax(player: Player) = if (player == player1) comparator1 else comparator2

  private def miniMax(game: Game, player: Player, depth: Int): ScoredMove = {
    if (depth == 0 || game.isEnded)
      (null, evaluateFor(player))
    else {
      def findBestMove(moves: List[Move], bestMove: Option[ScoredMove]): ScoredMove = {
        if (moves.isEmpty) bestMove.get
        else {
          val move = moves.head
          val result: ScoredMove = (move, miniMax(game make move, !player, depth - 1)._2)
          val betterMove = Some(if (bestMove.isEmpty) result else minmax(player)(bestMove.get, result))
          findBestMove(moves.tail, betterMove)
        }
      }
      findBestMove(game getPossibleMovesFor player, None)
    }
  }

  private def evaluateFor(player: Player): Int = {
    def getHpSum(units: List[GameUnit]) = units.foldLeft(0)((acc, unit) => acc + unit.hp)
    val difference = getHpSum(game.team1) - getHpSum(game.team2)
    if (player == player1) difference else -difference
  }
}


