package common

import common.move.Move

abstract class AI(game: Game, player: Player) {

  def findMove(): Move

}
