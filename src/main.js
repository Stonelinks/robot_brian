const express = require("express")
const Botkit = require("botkit")

const PORT = parseInt(process.env.PORT, 10) || 8080
const BOTKIT_DEBUG = parseInt(process.env.BOTKIT_DEBUG, 10) || 0

const app = express()

app.get("/", (req, res) => {
  res
    .status(200)
    .send("Hello from Robot Brian")
    .end()
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log("Press Ctrl+C to quit.")

  const controller = Botkit.slackbot({ debug: BOTKIT_DEBUG })
  controller
    .spawn({ token: process.env.BOT_USER_OAUTH_ACCESS_TOKEN })
    .startRTM(err => {
      if (err) {
        throw new Error(err)
      }
    })

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
})

function chooseRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
