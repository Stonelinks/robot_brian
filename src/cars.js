const {
  chooseRandom,
  defaultTriggers,
  getGeneralResponse,
  withTypingDelay
} = require("./utils")
const brianFaces = require("./brianFaces")

module.exports = function(controller) {
  controller.hears(["car"], defaultTriggers, function(bot, message) {
    bot.startConversation(message, function(err, convo) {
      convo.say("Okay lets figure out what kind of car you should get")

      const carInterview = [
        ["What is your budget? You may specify ranges", "budgetRange"],
        ["How many wheels is important (include steering wheel)?", "numWheels"],
        ["Convertible, offroad or both?", "convertable"],
        ["Do you need to drive to Tahoe with it?", "tahoe"],
        [
          "Do you care if the windows get smashed parking in SOMA?",
          "windowsSmashed"
        ],
        [
          "What year(s) are you looking for? You may specify ranges",
          "yearRange"
        ],
        [
          "How many miles are you okay with? You may specify ranges",
          "mileRange"
        ],
        [
          "Do you like nice things? Like is luxury important to you or do u wanna shit in the cupholders?",
          "niceness"
        ],
        ["How many people do you want to drive around?", "numPeople"],
        ["How many accidents have you been in?", "accidents"],
        ["Do you eat meat?", "meat"],
        ["What's it like to hold the hand of someone you love?", "love"],
        [
          "Do you feel that there's a part of you that's missing?",
          "isPsychopath"
        ],
        ["What is your favorite movie and why is it Marley & Me?", "movie"]
      ]

      let thisThread = "default"
      for (var i = 0; i < carInterview.length; i++) {
        const [questionText, varName] = carInterview[i]

        const nextThread =
          i + 1 === carInterview.length ? "completed" : carInterview[i + 1][1]

        const thisQuestionText = i
          ? `Okay, ${getGeneralResponse()}. ${questionText}`
          : questionText

        convo.addQuestion(
          { text: thisQuestionText },
          function(res, convo) {
            withTypingDelay(() => {
              convo.gotoThread(nextThread)
            })
          },
          { key: varName },
          thisThread
        )
        thisThread = nextThread
      }

      convo.addMessage(
        {
          text: `Based on your answeres of {{vars.resultsString}}, I think you should get a ${chooseRandom(
            [
              "1996 Mazda MX-5 Miata",
              "1999 Mazda MX-5 Miata",
              "2013 Mazda MX-5 Miata Club",
              "2001 Mazda MX-5 Miata",
              "1999 Mazda MX-5 Miata 10th Anniversary Edition",
              "1994 Mazda MX-5 Miata R Package",
              "1990 Mazda MX-5 Miata",
              "2004 Mazda MX-5 Mazdaspeed Miata",
              "2016 Mazda MX-5 Miata",
              "Xterra",
              "Luke's Land Cruiser"
            ]
          )}`
        },
        "completed"
      )

      // convo.addMessage({ text: 'Oh no I had an error! {{vars.error}}' }, 'error');

      // now, define a function that will be called AFTER the `default` thread ends and BEFORE the `completed` thread begins
      convo.beforeThread("completed", function(convo, next) {
        let results = {}
        let resultsString = []

        for (var i = 0; i < carInterview.length; i++) {
          const [questionText, varName] = carInterview[i]

          results[varName] = convo.extractResponse(varName)

          resultsString.push(`${results[varName]} for ${varName}`)
        }

        resultsString = resultsString.join(", ")

        // myFakeFunction(name).then(function (results) {

        convo.setVar("resultsString", resultsString)

        // call next to continue to the secondary thread...
        next()

        // }).catch(function (err) {
        //   convo.setVar('error', err);
        //   convo.gotoThread('error');
        //   next(err); // pass an error because we changed threads again during this transition
        // });
      })
    })
  })
}
