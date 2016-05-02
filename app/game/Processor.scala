package game

import game.common.Config.startPositions
import game.common.Player._
import game.common.move.{AttackMove, DieMove, Move, Movement}
import game.common.unit.{Archer, Warrior, Wizard}
import game.common.{AI, Game, Player}


class Processor {

  def simulate(getAi: (Game, Player) => AI): List[Move] = {
    def collectMoves(game: Game, player: Player, acc: List[Move]): List[Move] = {
      if (game.isEnded) acc
      else {
        val move = getAi(game, player).findMove()
        val moves: List[Move] = move match {
          case attackMove: AttackMove =>
            if (attackMove.targetUnit.hp - attackMove.unit.attack <= 0)
              DieMove(attackMove.targetUnit, !player) :: move :: acc
            else move :: acc
          case _ => move :: acc
        }
        collectMoves(game make move, !player, moves)
      }
    }
    collectMoves(createGame, player1, List()).reverse flatMap {
      case movement: Movement => movement.getPath
      case attackMove: AttackMove => List(attackMove)
      case dieMove: DieMove => List(dieMove)
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
