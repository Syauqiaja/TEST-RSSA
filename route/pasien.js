const express = require('express');
const app = express();
const router = express.Router();
const pasienController = require('../controller/pasien.controller');
var bodyParser = require('body-parser');

var options = {
    inflate: true,
    limit: '100kb',
    type: 'application/json'
  }
// app.use(bodyParser.raw(options))
app.use(express.urlencoded());
app.use(express.json());

router.get('/', async (req,res)=>{
    try {
        res.json(await pasienController.getMultiple());
    } catch (error) {
        res.send("Error")
    }
})
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        
        res.json(await pasienController.createPasien(req.body));
    } catch (error) {
        res.send(error)
    }
})

module.exports = router