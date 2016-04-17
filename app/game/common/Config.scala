package game.common

object Config {
  val gameWidth = 10
  val gameHeight = 7
  val startPositions = Map(
    "team1" -> Map(
      "warrior" -> Position(2, 4),
      "archer" -> Position(1, 3),
      "wizard" -> Position(1, 5)
    ),
    "team2" -> Map(
      "warrior" -> Position(9, 4),
      "archer" -> Position(10, 3),
      "wizard" -> Position(10, 5)
    )
  )
}