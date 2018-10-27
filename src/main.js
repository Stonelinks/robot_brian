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
    .spawn({ token: process.env.SLACK_USER_OAUTH_ACCESS_TOKEN })
    .startRTM(err => {
      if (err) {
        throw new Error(err)
      }
    })

  setupController(controller)
})

function setupController(controller) {
  require("./face")(controller)
  require("./food")(controller)
  require("./catchall")(controller)
}
