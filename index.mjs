import express from "express";
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express()
dotenv.config({path: './.env'})
const apiKey = process.env.API_KEY;

app.set('trust proxy', true)
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/api/hello', async (req, res) => {
    //get client ip from request headers
    const clientIp = req.ip;
    //get client weather and city details using ip address
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${clientIp}`;
    const response = await axios.get(url)
    const weatherData = response.data;
    return res.json({
        client_ip: clientIp,
        location: weatherData.location.name,
        greeting: `Hello, ${req.query.visitor_name}!, the temperature is ${weatherData.current.temp_c} degrees Celcius in ${weatherData.location.name}`
    })
})

const port = process.env.PORT || 3000
app.listen(port)

export default app