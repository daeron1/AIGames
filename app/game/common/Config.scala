package game.common

object Config {
  val gameWidth = 20
  val gameHeight = 13
  val startPositions = Map(
    "team1" -> Map(
      "warrior" -> Position(2, 6),
      "archer" -> Position(1, 5),
      "wizard" -> Position(1, 7)
    ),
    "team2" -> Map(
      "warrior" -> Position(19, 6),
      "archer" -> Position(20, 5),
      "wizard" -> Position(20, 7)
    )
  )

  val terrainMap = Array(
    Array(1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1),
    Array(1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1),
    Array(0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 1, 1, 0, 0, 1, 1, 0, 1, 1),
    Array(0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0),
    Array(0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0),
    Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    Array(0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0), //TODO finish map since 7 row
    Array(0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0),
    Array(0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0),
    Array(0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0),
    Array(0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 1, 1, 0, 0, 1, 1, 0, 1, 1),
    Array(1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1),
    Array(1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1)
  )

}