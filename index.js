const express = require('express'), path = require('path');
const hello = require('./hello');
const router = express.Router(), app = express();

// host a directory to be used for accessing files required by the pages
router.use('/public', express.static(path.join(__dirname, 'public')));

// send a html page (main page) to the main page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

// send appropriate response for the GET request
router.get('/send/:query', (req, res) => {
    // if the path is valid, that is /send/query?
    // but for example: /send/oops, /send/oops2?q=deceptive+routing are invalid
    if (req.params.query === 'query') {
        // if there is a query attribute - username
        if (req.query.username !== undefined) {
            // if it is non-empty
            if (req.query.username.length !== 0) {
                sendHelloToUser(res, res, req.query.username);
                return;
            }
        }
    }

    // hmm? it was an invalid GET request, show an error message then
    showErrorPage(req, res);
})

// send appropriate response for the GET request
router.get('/:name', (req, res) => {
    // if there are no queries, for example /Mitul?q=query has one query 'q'
    if (Object.keys(req.query).length === 0) {
        sendHelloToUser(req, res, req.params.name);
    }
    else {
        showErrorPage(req, res);
    }
});

// router is working at the root
app.use('/', router);

// for invalid url addresses
app.all('/*', (req, res) => {
    showErrorPage(req, res);
});

// this gets called when something goes wrong in other route managing functions
// if they throw an error, this catches them, though I have taken care of some errors
app.use(function (err, req, res, next) {
    showErrorPage(req, res);
})

// start listening to the port :8080
app.listen(8080);


/*------------------------------------------------//
| below are some functions, to reuse parts of code |
//------------------------------------------------*/

// what if someone entered <span style="color: theirColor">theirName</span>
// Yay!, my webpage can run html code, so to prevent this extract only useful (safe) data
// (a-z, A-Z, 0-9, _, ' ')
// remove all the special characters
function removeSpecials(str) {
    let brokenStr = str.match(/[\w ]/g);
    return brokenStr != null ? brokenStr.join('') : null;
}

// send a html page as response if name is good else show error message
function sendHelloToUser(req, res, name) {
    let onlyAllowedLetters = removeSpecials(name);
    if (onlyAllowedLetters != null) {
        // find a way to update values
        // use the js script for this page, and use onload to retrieve values from the server
        // need to create a unique key for that particular request to send the correct values
        // that will require a database, arghhh! keep it simple stupid!

        // this can be better done by using a templating engine like EJS
        res.setHeader('Content-Type', 'text/html');
        res.send(hello[0] + onlyAllowedLetters + hello[1]);
        return;
    }

    // hmm? it was an invalid name, show an error message then
    showErrorPage(req, res);
}

// show a error message page
function showErrorPage(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(400).sendFile(path.join(__dirname, 'private/error.html'));
}
