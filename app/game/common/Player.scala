package game.common

class Player {
  import game.common.Player._
  def unary_!(): Player = if (this == player1) player2 else this
  def getNumber: Int = if (this == player1) 1 else 2
}

object Player {
  val player1 = new Player
  val player2 = new Player
}
