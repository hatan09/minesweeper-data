var express = require('express');
var cors = require('cors')
let app = express();

app.use(cors());

app.use(express.json());

app.get('/', function(req, res){
   res.send("Hello world!");
});

// API routes
app.use('/api', require('./routes/api'));

let RUNNING_PORT = process.env.PORT || 3000;

app.listen(RUNNING_PORT, () => console.log(`Running on port ${RUNNING_PORT}`));