package game.common

import java.lang.Math.{pow, sqrt}

import game.common.Player.player1
import game.common.move.Direction._
import game.common.move.{AttackMove, Move, Movement}
import game.common.unit.{Archer, GameUnit, Warrior, Wizard}
import play.api.Logger


case class Game(team1: List[GameUnit], team2: List[GameUnit]) {

  def getPossibleMovesFor(player: Player): List[Move] = {
    val (team, opponentsTeam) = if (player == player1) (team1, team2) else (team2, team1)
    team.flatMap(unit => {

      def getMovements(unit: GameUnit): Seq[Move] = {
        def bfs(occupied: Set[Position], previousMvs: List[Movement], acc: List[Movement], depth: Int): List[Movement] = {
          if (depth == 0) acc
          else {
            val moves = previousMvs flatMap {
              List(LEFT, RIGHT, UP, DOWN) map _.nextMove
            } filter { movement =>
              val position = movement.target
              GameMap.isPassable(position) && !occupied(position)
            }
            val positions = moves.map(_.target).toSet
            bfs(occupied | positions, moves, moves ::: acc, depth - 1)
          }
        }
        val start = Movement(unit.position, unit, player, None)
        bfs(occupiedPositions, List(start), List(), unit.distance)
      }

      def getAttackMoves(unit: GameUnit): Seq[Move] = {
        for (opponentUnit <- opponentsTeam
             if canBeReached(unit.position, opponentUnit.position, unit.attackDistance)) yield new AttackMove(opponentUnit, unit, player)
      }

      (getMovements(unit) ++ getAttackMoves(unit)).to[List]
    })
  }

  def make(move: Move): Game = {
    val (updatedTeam1, updatedTeam2): (List[GameUnit], List[GameUnit]) = move match {
      case Movement(target, unit, player, previousMove, lastMove) =>
        val unitToUpdate = (if (player == player1) team1 else team2).find(_ == unit).get
        val updatedUnit = unitToUpdate move target
        (updateUnitList(team1, unitToUpdate, updatedUnit), updateUnitList(team2, unitToUpdate, updatedUnit))
      case AttackMove(target, unit, player) =>
        val unitToUpdate = (if (player == player1) team2 else team1).find(_ == target).get
        val updatedUnit = unitToUpdate attack unit.attack
        if (updatedUnit.hp <= 0)
          (removeUnitFromList(team1, unitToUpdate), removeUnitFromList(team2, unitToUpdate))
        else
          (updateUnitList(team1, unitToUpdate, updatedUnit), updateUnitList(team2, unitToUpdate, updatedUnit))
    }
    Logger.info(String.format("move for team %s - %s(%s, %s)",
      if (move.player == player1) "player1" else "player2",
      move.getClass.getName, move.unit, move.target))
    Logger.info("team1 - " + updatedTeam1)
    Logger.info("team2 - " + updatedTeam2)
    Game(updatedTeam1, updatedTeam2)
  }

  def isEnded: Boolean = team1.isEmpty || team2.isEmpty

  private def canBeReached(from: Position, to: Position, maxDistance: Int): Boolean =
    sqrt(pow(to.x - from.x, 2) + pow(to.y - from.y, 2)) <= maxDistance

  private def updateUnitList(list: List[GameUnit], oldUnit: GameUnit, newUnit: GameUnit): List[GameUnit] =
    list map { case `oldUnit` => newUnit; case any => cloneUnit(any) }

  private def removeUnitFromList(list: List[GameUnit], unit: GameUnit): List[GameUnit] =
    list filter (_ != unit) map cloneUnit

  private def cloneUnit(unit: GameUnit): GameUnit = unit match {
    case Warrior(position, hp) => new Warrior(position, hp)
    case Archer(position, hp) => new Archer(position, hp)
    case Wizard(position, hp) => new Wizard(position, hp)
  }

  private val occupiedPositions: Set[Position] = {
    def toPositionsSet: List[GameUnit] => Set[Position] = _.map(unit => unit.position).toSet
    toPositionsSet(team1) | toPositionsSet(team2)
  }

}
