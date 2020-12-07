const fs = require('fs'),
      exec = require('child_process').exec;

// Create server instance
require('http').createServer((req, res) => handleRequest(req, res)).listen(7272, () => console.log("Dev server listening"));

function handleRequest(req, res) {
    switch (req.url.split("?")[0]) {
        case "/":
            return fs.readFile("./testPage/index.html", (e, b) => { if (e) throw e; else res.end(b); });

        case "/latest.css":
            // Compile the most recent changes
            exec("node build", function(error, stdout, stderr) {
                // Get the time taken to compile / total files compiled
                console.log(stdout.split("\n")[stdout.split("\n").length-2]);
                // Read the most recent compiled css and send it to the client
                fs.readFile("./compiled.css", (e, b) => { if (e) throw e; else res.end(b); });
            });
        break;

        default:
            return res.end("404 | Not found");
    }
}