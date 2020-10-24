# Imposter Checker App

### What does this app do?

It is an web app that runs on a ticketing tool called [Freshdesk](https://freshdesk.com/). Any employee that is expected to solve tickets can use this app to keep their session imposter free. Did you forget logging out? Is your session still active? No worries :-)

### Demo
![Alt](https://i.ibb.co/4FbDRR1/image.png)
![Alt](/screenshots/improved%20ux%20-%20page%202.png)
[See the Screenshot](https://ibb.co/YN5KBB0)

**What does Demo doesn't cover?**
1. I plan on improving UX ([Improved now](/screenshots/))
2. Refactor the code to be more readable (Done)
3. All other updates post October 10, 2020. (Done as planned)

I intend to implement them until the Oct 31, 2020. To abide by this you can check the commits made via [my Github Repository](https://github.com/Saif-Shines/imposter-checker-app). I will keep pushing them :-)

I guess the best way to describe this project is with the criteria that that holds.

## Impact & Innovation
Before I thought of building an Freshworks App, I intended to build a chrome extension because it felt a lot of users can use the app. Among those most of uses would be happy with Authentication & Security measures which already exists. Brining secure-ness to those general users didn't felt like they would pay for a product and buy.

More impactful way is the B2B businesses.

- For a sales rep. Every Sale in important.
- For a support desk. Every ticket costs customer experience.
- For a HR. Every email costs talented employee.
- For every IT team. Every ticket costs valuable company assets.
- For every chat support with website visitor. Every conversation will get a lead.

This stake level brings one of most powerful and competition less features of TypingDNA that brings to the table. [Matching Typing Patterns](https://api.typingdna.com/#api-Optional-matchTypingPattern) without any form of formal sign up and registration. Because, original methods of Authentication still brings in competition with any SSO provider.

So this app is impactful because,
1. With a [single line update](https://github.com/Saif-Shines/imposter-checker-app/blob/e4d6df393b39852ff013f584a2016dd42177230c/manifest.json#L4) in `manifest.json`, this app will work on Freshservice, Freshteam, Freshchat, Freshdesk and Freshsales.
2. It gives the user power to decide and add additional security check for particular feature inside a (any) product. This app adds additional check for Ticket Reply, Property change(in demo), deleting and closing the ticket.
3. If the user claims that some imposter has used the feature or may be replied an email; It can be always assess from confidence attribute sent from TypingDNA API.

**Limitations**
The app's user base would be limited to [businesses who use Freshworks products](https://getlatka.com/companies/freshworks#:~:text=Freshworks%20has%20150K%20customers.)

## UX

- App places itself inside the product in such a way that it is easily accessible to the user.
- App has simply two pages. One to give in initial pattern and other is to customise security check for certain features inside the product.
- User needs to give in pattern only once and only other time when configuration are needed to be changed.
- User simply has to login once to the freshdesk and doesn't require to login again to use the app.
- To stay consistent with the design, app uses own UI kit, [Crayons](https://crayons.freshworks.com/) along side CSS Flexbox. This automatically renders buttons and text boxes in which ever the app it runs in. No heavy frameworks or Libraries.

## Technical Implementation

- App runs on Freshworks Developer Platform [which is entirely serverless platform](https://www.freshworks.com/saas/how-developers-go-serverless-on-the-freshworks-platform-blog/).
- App uses [Events API](https://developers.freshdesk.com/v2/docs/events-api/#) to interact with Freshdesk.
- App consumes [Match Typing Patterns API](https://api.typingdna.com/#api-Optional-matchTypingPattern) to check and verify the patterns.
- App uses Browsers localstorage for session level storage and Freshworks' [data store](https://developers.freshdesk.com/v2/docs/data-storage/) for persistence on avoiding manipulating stored patterns.
- Elements are laid out using CSS Flexbox.
- The Frontend components of the app makes call to Backend after capturing patterns with [TypingDNA class](https://api.typingdna.com/#api-capture-class) is made possible by [Server Method Invocation](https://developers.freshdesk.com/v2/docs/server-method-invocation/)

## Final Thoughts

Well, this is my first non-student level Hackathon that I've participated it. Without a team has been pretty much hard hectic as well. Over all, I enjoyed participating it and I do see a lot of potential that TypingDNA has.

Thanks to Adrian form TypingDNA Slack community in trying out and helping with Technical queries.
