package game.common

import Config._

object Map {

  def isPassable(position: Position): Boolean = {
    val (x, y) = (position.x, position.y)
    x >= 1 && x <= gameWidth && y >= 1 && y <= gameHeight && terrainMap(y - 1)(x - 1) == 0
  }

}
