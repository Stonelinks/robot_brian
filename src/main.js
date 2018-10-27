const express = require("express")

const app = express()

app.get("/", (req, res) => {
  res
    .status(200)
    .send("Hello, world!")
    .end()
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log("Press Ctrl+C to quit.")

  var Botkit = require("botkit")

  var controller = Botkit.slackbot({ debug: true })
  controller
    .spawn({ token: process.env.BOT_USER_OAUTH_ACCESS_TOKEN })
    .startRTM(function(err) {
      if (err) {
        throw new Error(err)
      }
    })

  controller.hears(
    ["hello", "hi"],
    ["direct_message", "direct_mention", "mention"],
    function(bot, message) {
      bot.reply(message, "Meow. :smile_cat:")
    }
  )
})
