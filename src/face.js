const { chooseRandom } = require("./utils")
const brianFaces = require("./brianFaces")

module.exports = function(controller) {
  controller.hears(
    ["brian", "face"],
    ["direct_message", "direct_mention", "ambient"],
    function(bot, message) {
      bot.reply(message, chooseRandom(brianFaces))
    }
  )
}
