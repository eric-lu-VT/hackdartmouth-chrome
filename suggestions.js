const analysis = {
  positive: [
    "The internet is treating you well!",
    "Fun twitter feed today!"
  ],

  negative: [
    "Twitter has been pretty rough lately...",
    "The internet can be a scary place...",
    "This seems a little hostile."
  ],
  neutral:[
    "Your feed is pretty neutral today.",
    "Nice and calm, like a breeze on a sunny day.",
  ],
  conflict:[
    "Twitter seems pretty divided... uh oh.",
    "There's a lot going on Twitter today.",
    "You have a confusing feed today..."
  ],
  invalid:[
    "Looks like you're not on Twitter right now.",
    "We're glad to see you're not on Twitter right now!",
    "You don't have Twitter open right now."
  ]
}

const suggestions = {
  positive: [
    "Remember to take a break every so often.",
    "Remember to give your eyes a rest.",
  ],
  negative: [
    "Remember to take a break from the internet!",
    "Go outside and enjoy the sun if you can!",
    "Try reaching out to some friends!",
    "Touch some grass!"
  ],
  neutral:[
    "Have a good day today.",
    "Stay hydrated."
  ],
  conflict:[
    "Maybe try a book instead?",
    "Taking a break from social media can help a lot.",
    "Social media can be a lot sometimes, remember to take a break.",
    "Go hang out with some friends, Twitter's not going anywhere."
  ],
  invalid: [
    "Good choice. We can all use a break from social media sometimes.",
    "It feels nice to be outside the online world.",
    "Nice!"
  ]
}

const getMood = (score, intensity) => {
  // console.log("inside getMood, score: " + score + ", intensity: " + intensity)
  if (intensity - score < 0.75 && intensity + score < 0.75) {
    return 'neutral'
  } else if (score > 0.3) {
    return 'positive'
  } else if (score < -0.3) {
    return 'negative'
  } else {
    return 'conflict'
  }
}

export { analysis, suggestions, getMood }

