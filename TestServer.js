require('http').createServer((req, res) => handleRequest(req, res)).listen(7272, () => console.log("Dev server listening"));

const fs = require('fs');

function handleRequest(req, res)
{
    require('child_process').exec("node build", function(error, stdout, stderr) {
        console.log(stdout.split("\n")[stdout.split("\n").length-2]);
        return res.end(fs.readFileSync("./compiled.css"));
    });
}