package game



class Game(units: List[GameUnit]) {

  def getPossibleMovesFor(player: Player): List[Move] = ???

  def make(move: Move): Game = ???

  def evaluateFor(player: Player): Int = ???

  def isEnded: Boolean = ???

}
