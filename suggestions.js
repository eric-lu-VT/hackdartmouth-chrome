const analysis = {
  positive: [
    "The internet is treating you well!",
  ],

  negative: [
    "Twitter has been pretty rough lately...",
    "The internet can be a scary place...",
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
    "Try reaching out to some friends!"
  ]
}

const getMood = (score, intensity) => {
  if (intensity - score < 0.75 && intensity + score < 0.75) {
    return 'neutral'
  } else if (score > 0.3) {
    return 'positive'
  } else if (score < 0.3) {
    return 'negative'
  } else {
    return 'conflict'
  }
}

const getAnalysis = (score, threshold=0.3) => {
  let emotion = score < threshold? 'positive': 'negative'

  const numAnalysisOpts = analysis[emotion].length
  const numSuggestionOpts = suggestions[emotion].length

}

const getSuggestions = (score, threshold=0.3) => {

}

export { analysis, suggestions, getMood, getAnalysis, getSuggestions }

