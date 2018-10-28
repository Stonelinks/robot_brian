const express = require("express")
const Botkit = require("botkit")

const face = require("./face")
const food = require("./food")
const cars = require("./cars")
const catchall = require("./catchall")

const PORT = parseInt(process.env.PORT, 10) || 8080
const BOTKIT_DEBUG = parseInt(process.env.BOTKIT_DEBUG, 10) || 0

const app = express()

app.get("/", (req, res) => {
  res
    .status(200)
    .send("Hello from Robot Brian")
    .end()
})

const slackController = Botkit.slackbot({ debug: BOTKIT_DEBUG })
slackController
  .spawn({ token: process.env.SLACK_USER_OAUTH_ACCESS_TOKEN })
  .startRTM(err => {
    if (err) {
      throw new Error(err)
    }
    console.log("slackbot online")
  })

// const fbController = Botkit.facebookbot({
//   debug: BOTKIT_DEBUG,
//   port: PORT,
//   access_token: process.env.FB_PAGE_ACCESS_TOKEN,
//   verify_token: process.env.FB_VERIFY_TOKEN
// })

// const fbBot = fbController.spawn({})

// fbController.createWebhookEndpoints(app, fbBot, function() {
//   console.log("fb messenger bot online")
// })

function setupController(controller) {
  face(controller)
  food(controller)
  cars(controller)
  catchall(controller)
}

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log("Press Ctrl+C to quit.")

  setupController(slackController)
  // setupController(fbController)
})
