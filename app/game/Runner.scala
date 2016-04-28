package game

import game.common.{AI, Game, Player}
import game.implementations.RandomAI

object Runner extends App {

  val processor = new Processor()
  val getAi: (Game, Player) => AI =
    (game, player) => new RandomAI(game, player)
  val moves = processor.simulate(getAi)
}
