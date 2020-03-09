require('http').createServer((req, res) => handleRequest(req, res)).listen(7272, () => console.log("Dev server listening"));

const fs = require('fs');

function handleRequest(req, res)
{
    const exec = require('child_process').exec;
    exec("node build", function(error, stdout, stderr) {
        console.log(stdout)
        return res.end(fs.readFileSync("./compiled.css"));
    });
}