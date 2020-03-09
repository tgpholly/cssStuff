require('http').createServer((req, res) => handleRequest(req, res)).listen(7272, () => console.log("Dev server listening"));

const fs = require('fs');
function handleRequest(req, res)
{
    const exec = require('child_process').exec;
    exec("node build", function(error, stdout, stderr) {
        console.log(stdout)
        return res.end(fs.readFileSync("./compiled.css"));
    });
    return;
    let urlEnd = getLastItem("", req.url);
    if (urlEnd === "/")
    {
        res.end("INDEX");
    } else
    {
        urlEnd = getLastItem("/", req.url);
        let fileExtention = getLastItem(".", urlEnd);
        if (isImage(fileExtention)) {
            res.end("Picture - " + fileExtention + " - " + req.url);
        } else
        {
            res.end("NOT INDEX - " + fileExtention + " - " + req.url);
        }
        
    }

    return;
}

function getLastItem(s, toSplit)
{
    return toSplit.split(s).pop();
}

function isImage(s) {
    if (s === "png" || s === "jpg" || s === "jpeg" || s === "gif") {
        return true;
    } else 
    {
        return false;
    }
}