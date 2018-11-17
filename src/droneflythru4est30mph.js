const { defaultTriggers } = require("./utils")

module.exports = function(controller) {
  controller.hears(
    ["droneflythru4est30mph", "30mph", "30 mph", "fly through forest"],
    defaultTriggers.concat(["ambient"]),
    function(bot, message) {
      bot.reply(
        message,
        "https://www.csail.mit.edu/news/self-flying-drone-dips-darts-and-dives-through-trees-30-mph"
      )
      setInterval(() => {
        bot.reply(
          message,
          "https://www.csail.mit.edu/news/self-flying-drone-dips-darts-and-dives-through-trees-30-mph"
        )
      }, 1000 * 60 * 60 * 12)
    }
  )
}
