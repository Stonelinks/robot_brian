const { chooseRandom } = require("./utils")

module.exports = function(controller) {
  controller.hears(".*", ["direct_message", "direct_mention"], function(
    bot,
    message
  ) {
    bot.reply(
      message,
      chooseRandom([
        "Sure why not",
        "Maybe",
        "Listen",
        "Lets circle back on that",
        "That’s bitchass",
        "That’s horseshit",
        "Who cares",
        "Are you f’realz",
        "Who fuks",
        "Welcome to my world",
        "I have thoughts on that",
        "Uh",
        "Where are we feeding",
        "You would have lost your ass",
        "Fucked me over for the last time",
        "He's really coming into himself",
        "Last time for everything",
        "Dickwad",
        "I would rather cut my dick off",
        "I would rather cut my ass off",
        "I would rather eat my own ass",
        "I would rather eat Mackles’ ass",
        "You fucked me",
        "Need you to get real aware",
        "Continue to further increase momentum",
        "there's no there there",
        "Show me the data",
        "I’d rather eat cok",
        "bulbous",
        "Fuck",
        "Fuck off",
        "Fuck me",
        "Listen",
        "Listen you fuk",
        "Who fuks"
      ])
    )
  })
}
