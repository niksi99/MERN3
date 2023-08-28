const express = require('express')
const app = express()

app.get("/", function(req, res) {
    res.send("FKehofu");
});

app.listen(2301, () => {
    console.log(`2301`)
})