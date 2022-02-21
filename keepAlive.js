const express = require('express');
const server = express();
const PORT = process.env.PORT || 3000

server.all('/', (req, res)=>{
    res.send('Your bot is alive!')
})

function keepAlive(){
    server.listen(PORT, ()=>{console.log("Server is Ready!")});
}

module.exports = keepAlive;
