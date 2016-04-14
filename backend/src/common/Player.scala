package common

class Player {
  import common.Player._
  def unary_!(): Player = if (this == player1) player2 else this
}

object Player {
  val player1 = new Player
  val player2 = new Player
}
