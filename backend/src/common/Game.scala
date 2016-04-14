package common

import java.lang.Math.{pow, sqrt}

import common.Player.player1
import common.unit.{Wizard, GameUnit}


case class Game(team1: List[GameUnit], team2: List[GameUnit]) {

  def getPossibleMovesFor(player: Player): List[Move] = {
    val (team, opponentsTeam) = if (player == player1) (team1, team2) else (team2, team1)
    team.flatMap(unit => {

      if (unit.isInstanceOf[Wizard]) {

      }

      Array(new Move, new Move)
    })
  }

  private def canBeReached(from: Position, to: Position, maxDistance: Int): Boolean =
    sqrt(pow(to.x - from.x, 2) + pow(to.y - from.y, 2)) <= maxDistance


  private val getOccupiedPositions: Set[Position] = {
    def toPositionsSet: List[GameUnit] => Set[Position] = _.map(unit => unit.position).toSet
    toPositionsSet(team1) | toPositionsSet(team2)
  }

}
