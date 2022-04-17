# sadbird
A chrome extension reminding you of self-care

## Inspiration

The internet can be a scary place.

Twitter can be especially harmful. It has been known to stir heavy political conflict and worsen depression.
Even worse, posts can oscillate between very positive and brutally negative.
If users aren't careful, Twitter can be dangerous for their mental health.

## What it does

Sadbird hopes to alleviate the mental strain Twitter places on users by displaying the emotional strain of tweets. It measures the emotion of tweets and their intensity to warn users about both negative and emotionally confusing tweets. Additionally, it rewards users when not on Twitter to provide an incentive to avoid a potentially harmful social media.

Sadbird can also be used to assist neurodivergent users who may struggle with tonal interpretation of tweets. Communication can be a struggle for those who have trouble reading social or emotional cues, and Sadbird hopes to engage with these users more directly.

## How we built it

Sadbird accomplishes these goals as a Chrome extension. It uses HTML scraping and Google Cloud's Natural Language API to gauge the happiness of Twitter posts.

The front end of the application was built with pure HTML, CSS and JavaScript. It was made to be relatively unobtrusive and easily accessible. 

The application interfaces directly with Google Cloud to provide quick, accurate emotional judgements. The extension then provides a human-readable sentence analyzing the results of the machine-learned emotional ratings. Then, based on the analysis of the scores, the extension suggests an activity.

Even if tweets are neutral on average, it is possible that the tweets displayed are extremely positive and negative. We realized the inconsistency of the messaging can be dangerous, and we made an algorithm to determine the conflict of a tweet. 

We also realized that social media can be harmful even without overt negative influences, and we built the app to account for this. Even when the messages are positive, the extension suggests taking a break or drinking water. Any reminder to engage with the outside world can be very helpful to preventing gradual declines in mental health.

## Challenges we ran into

In order to maintain a small footprint, Chrome must make its extensions as lightweight as possible. In particular, it's nearly impossible to import external modules into the service worker; the backend capabilities of Chrome development is severely limited. Our main difficulty was making API calls to Google Cloud without the help of typical Node or React libraries.

## Accomplishments that we're proud of

We're extremely proud of our finished product and its design. It's amazing to see all of the different pieces come together to form a working extension. It looks refined and professional, and it works well.

## What we learned

This project was the first exploration into Chrome Extension development for all of us, and it was a tough experience to pull the app together with a very different and unfamiliar toolset. This was also our first experience with the Google Cloud Natural Language API and Natural Language Processing in general, so this was a great foray into the uses of machine learning in human-oriented development.

## What's next for Sadbird

### More holistic analysis

Sadbird will expand to read whole twitter feeds and give more detailed analysis on the mood of the internet. Users will be able to see more accurately how the internet may be affecting their mood. Currently, Sadbird only reads the content of an opened tweet. Although this makes the extension useful for those unable to detect the emotions in a tweet, more users could benefit from the application reading and analyzing the whole twitter feed.

### Terminally Online warnings

Using more thorough data, Sadbird will be able to interrupt users when they're around too much Twitter negativity and warn them before the internet becomes too dangerous. Through this, we're hoping to prevent mental health spirals and protect people from addictive or self-defeating social media tendencies.
