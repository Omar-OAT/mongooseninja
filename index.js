const express = require('express')
const app = express();
const port = 8080;
const parser = require("body-parser");

app.use(parser.json());

const ninjaroutes = require("./routes/ninjaroutes");

app.use("/ninjas", ninjaroutes);




app.use((req, res, next) => {
    console.log(req.method, req.url, new Date())
    return next(); 
});

app.use((err, req, res, next) => {
    res.status(err.status).send(err.message);
})

app.use("*", (req, res, next) => {
    return next({status: 404, message: "Invalid URL"});
});
app.use((req, res, next) => {
    const logEntry = `host: ${req.hostname}
    ip: ${req.ip}
    method: ${req.method}
    path: ${req.path}
    time: ${new Date()}`;
    console.log(logEntry);
    next();
});
// Add HTTP listener
const server = app.listen(port,() => {
    console.log(`Server started successfully on port number ${server.address().port}`);
});