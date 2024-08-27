const http = require('http');
const express = require('express');
const app = express();
const router = express.Router();
const pasienRouter = require('./route/pasien');

// app.use(
//     express.urlencoded({
//         extended : true
//     })
// )
app.get('/', (req,res)=>{
    res.send('Get request to the homepage')
});
app.use('/pasien', pasienRouter);

const port = process.env.PORT || 3000
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack)
    res.status(statusCode).json({message: err.message});
    return;
})
app.listen(port, () => {
    console.log('Server running at http://127.0.0.1:8081/');  
});