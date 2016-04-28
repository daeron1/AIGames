package game

import game.common.Config.startPositions
import game.common.Player._
import game.common.move.{AttackMove, Move, Movement}
import game.common.unit.{Archer, Warrior, Wizard}
import game.common.{AI, Game, Player}


class Processor {

  def simulate(getAi: (Game, Player) => AI): List[Move] = {
    def collectMoves(game: Game, player: Player, acc: List[Move]): List[Move] = {
      if (game.isEnded) acc
      else {
        val move = getAi(game, player).findMove()
        collectMoves(game make move, !player, move :: acc)
      }
    }
    collectMoves(createGame, player1, List()).reverse flatMap { move =>
      move match {
        case movement: Movement => movement.getPath
        case attackMove: AttackMove => List(attackMove)
      }
    }
  }

  private def createGame: Game = {
    val team1 = List(
      Warrior(startPositions("team1")("warrior")),
      Archer(startPositions("team1")("archer")),
      Wizard(startPositions("team1")("warrior"))
    )
    val team2 = List(
      Warrior(startPositions("team2")("warrior")),
      Archer(startPositions("team2")("archer")),
      Wizard(startPositions("team2")("warrior"))
    )
    Game(team1, team2)
  }

}
