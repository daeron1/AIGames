package processor

import common.Config.startPositions
import common.Game
import common.Player._
import common.unit.{Archer, Warrior, Wizard}
import implementations.RandomAI


class Processor {

  def simulate() = {
    var game = createGame
    while (!game.isEnded) {
      val ai1 = new RandomAI(game, player1)
      val move1 = ai1.findMove()
      game = game.make(move1)
      if (!game.isEnded) {
        val ai2 = new RandomAI(game, player2)
        val move2 = ai2.findMove()
        game = game.make(move2)
      }
    }

  }

  def createGame: Game = {
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
