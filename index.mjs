import express from "express";
import axios from 'axios';
import cors from 'cors';

const app = express()

const apiKey = '7495ed6e5f124b00a2c182237240107';

app.set('trust proxy', true)
app.use(cors())

app.get('/api/hello', async (req, res) => {
    const ipResponse = await axios.get('https://api.ipify.org');
    const clientIp = ipResponse.data
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${clientIp}`;
    const response = await axios.get(url)
    const weatherData = response.data;
    console.log(weatherData)
    return res.json({
        client_ip: clientIp,
        location: weatherData.location.name,
        greeting: `Hello, ${req.query.visitor_name}!, the temperature is ${weatherData.current.temp_c} degrees Celcius in ${weatherData.location.name}`
    })
})

app.listen(3000)