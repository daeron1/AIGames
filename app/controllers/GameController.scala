package controllers

import javax.inject.Inject

import game.Processor
import game.common.{AI, Game, Player}
import game.implementations.RandomAI
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}

import scala.concurrent.ExecutionContext


class GameController @Inject()(processor: Processor)(implicit ec: ExecutionContext) extends Controller {

  def simulate = Action {
    val getAi: (Game, Player) => AI =
      (game, player) => new RandomAI(game, player)
    val moves = processor.simulate(getAi)
    Ok(Json.toJson(moves))
  }

}
