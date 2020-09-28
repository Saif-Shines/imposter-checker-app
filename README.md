## Your First App

This app displays the name of the requester of a freshdesk ticket in the ticket_sidebar placeholder

### Files and Folders
    .
    ├── README.md                 A file for your future self and developer friends to learn about app
    ├── app                       A folder to place all assets required for frontend components
    │   ├── index.html            A landing page for the user to use the app
    │   ├── scripts               JavaScript to place files frontend components business logic
    │   │   └── app.js
    │   └── styles                A folder to place all the styles for app
    │       ├── images
    │       │   └── icon.svg
    │       └── style.css
    ├── config                    A folder to place all the configuration files
    │   └── iparams.json
    └── manifest.json             A JSON file holding meta data for app to run on platform

Explore [more of app sample codes](https://github.com/freshworks/marketplace-sample-apps) on the Freshworks github respository.

**Steps**:
1. Capture the initial `dna` and store it.
2. Block the ticket reply using `intercepting events` if the `high-value-customer` is recognised and button `start secure session` is pressed.
3. When tried to reply during `high-value-customer` a notification should apprear saying, agent needs to submit another pattern.
4. `ticket_sidebar` app will another button to submit 2nd pattern `dna`. This time a modal opens up.
5. In the modal, he types an random quote using `quote api` from TypingDNA and hits `/match` endpoint with both `dna1` and `dna2`.
6. If result turns positive, the intercepting should be removed and agent should be able to reply the ticket.
