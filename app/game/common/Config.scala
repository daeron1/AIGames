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

  val map = Array(
    Array(1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1),
    Array(1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1),
    Array(0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 1, 1, 0, 0, 1, 1, 0, 1, 1),
    Array(0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0),
    Array(0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0),
    Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    Array(0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0),
    Array()
  )

}