const { chooseRandom, defaultTriggers } = require("./utils")
const brianFaces = require("./brianFaces")

module.exports = function(controller) {
  controller.hears(
    ["brian", "face"],
    defaultTriggers.concat(["ambient"]),
    function(bot, message) {
      bot.reply(message, chooseRandom(brianFaces))
    }
  )
}
