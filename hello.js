const html_before = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Node.js Express Server</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Tillana&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Englebert&display=swap');
        
        body {
            user-select: none;
        }
        
        h1 {
            font-family: 'Tillana', sans-serif;
            font-size: 2em; color: orangered;
            text-decoration: underline;
        }
        
        .main-container h2 {
            margin: 0;
            color: royalblue;
            font-family: 'Englebert', sans-serif;
            font-weight: bolder;
            font-size: 1.5em;
        }
        
        .main-container h2 span {
            color: crimson;
        }
    </style>
</head>

<body>
    <h1>Node.js Express Server - Hello World</h1>

    <div class="main-container" style="border: 3px dashed crimson; border-radius: 8px; padding: 0.5em; background-color: yellowgreen;">
        <h2>
            Hello, <span>`;

const html_after = `
            </span>
        </h2>
    </div>
</body>
</html>`;

// this can be better done by using a templating engine like EJS
module.exports = [html_before, html_after]