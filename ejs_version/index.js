const express = require('express'), path = require('path');
const router = express.Router(), app = express();

// set the view engine to EJS
app.set('view engine', 'ejs');

// host a directory to be used for accessing files required by the pages
router.use('/public', express.static(path.join(__dirname, './public')));

// send a rendered html page (main page) to the root url
router.get('/', (req, res) => {
    res.render('index');
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


/*-------------------------------------------//
| below is some stuff that is used repeatedly |
//-------------------------------------------*/

const errorNames = {400: "Bad request!"};

// what if someone entered <span style="color: theirColor">theirName</span>
// Yay!, my webpage can run html code, so to prevent this extract only useful (safe) characters
// (a-z, A-Z, 0-9, _, ' ')
// remove all the special characters
function removeSpecials(str) {
    let brokenStr = str.match(/[\w ]/g);
    return brokenStr != null ? brokenStr.join('') : null;
}

// send a rendered html page as response if name is valid else show an error message
function sendHelloToUser(req, res, name) {
    let onlyAllowedLetters = removeSpecials(name);
    if (onlyAllowedLetters != null) {
        res.setHeader('Content-Type', 'text/html');
        res.render('hello', {
            username: onlyAllowedLetters
        });

        return;
    }

    // hmm? it was an invalid name, show an error message then
    showErrorPage(req, res);
}

/*----------------------------------------------------------------------//
| it is not mandatory that the error will of the type Error 400 type---- |
| currently only one errorCode is provided, this is sufficient as of now |
//----------------------------------------------------------------------*/

// show an error message page
function showErrorPage(req, res, errorCode = 400) {
    res.setHeader('Content-Type', 'text/html');
    res.status(errorCode).render('error', {
        errorCode: errorCode,
        errorName: errorNames[errorCode]
    });
}
