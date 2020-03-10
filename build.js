const fs = require("fs"), startTime = new Date().getTime(); let fileCount = 0;

fs.readdir(__dirname + "/base/", (err, files) =>
{
    console.log("Reading directory...");
    let fileArray = [], textToMinify = "";
    for (let i = 0; i < files.length; i++)
    {
        if (!files[i].includes(".css"))
        {
            console.log(`Found Directory "${files[i]}"`);
            fileArray.push(files[i]);
        } else
        {
            console.log(`Found css file "${files[i]}"`);
            textToMinify += fs.readFileSync(__dirname + "/base/" + files[i]).toString() + "\n";
            fileCount++;
        }
    }
    for (let i = 0; i < fileArray.length; i++)
    {
        textToMinify += grabDataFromDirectory(__dirname + "/base/" + fileArray[i] + "/");
    }
    fs.writeFileSync(__dirname + "/compiled.css", minifyText(textToMinify));
    console.log(`Finished! Took ${new Date().getTime() - startTime}ms. Output result to "compiled.css" from ${fileCount} file(s)`);
});

function grabDataFromDirectory(s)
{
    const a = fs.readdirSync(s);
    let ttr = "";
    for (let i = 0; i < a.length; i++)
    {
        if (!a[i].includes(".css"))
        {
            console.log(`Found Directory "${a[i]}"`);
            ttr += grabDataFromDirectory(s + a[i] + "/");
        } else
        {
            console.log(`Found css file "${a[i]}"`);
            ttr += fs.readFileSync(s + a[i]).toString() + "\n";
        }
        fileCount++;
    }
    return ttr;
}

// Rubbish minify function, need to do proper.
function minifyText(s)
{
    return s
           .split("\n").join("")  // split join is pretty bad tbh
           .split("\t").join("")
           .split(" {").join("{")
           .split("    ").join(" ")
           .split(": ").join(":")
}