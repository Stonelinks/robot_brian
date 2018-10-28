const {
  getGeneralResponse,
  defaultTriggers,
  withTypingDelay
} = require("./utils")

module.exports = function(controller) {
  controller.hears(".*", defaultTriggers, function(bot, message) {
    withTypingDelay(() => {
      bot.reply(message, getGeneralResponse())
    })
  })
}
