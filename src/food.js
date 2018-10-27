const { chooseRandom } = require("./utils")

module.exports = function(controller) {
  controller.hears(
    ["eat", "food", "feed"],
    ["direct_message", "direct_mention", "ambient"],
    function(bot, message) {
      bot.reply(
        message,
        chooseRandom([
          "il borgo",
          "souvla",
          "kobani",
          "sf kebab",
          "chutney",
          "swensens",
          "blue bottle",
          "soopen' cookie",
          "cheesecake factory",
          "hard rock cafe",
          "tacko",
          "chubby noodle",
          "Garaje(fuck garaje)",
          "HRD",
          "Il canto",
          "Ritual",
          "Avellino",
          "Golden boy",
          "Chipotle",
          "Pancho Villa Taqueria"
        ])
      )
    }
  )
}
