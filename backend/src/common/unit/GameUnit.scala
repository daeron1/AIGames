package common.unit

import common.Position

abstract class GameUnit(val position: Position,
                        val attack: Int,
                        val distance: Int,
                        val attackDistance: Int,
                        val hp: Int)
