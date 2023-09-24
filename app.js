const dotenv = require("dotenv");

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const ejslayouts = require("express-ejs-layouts");
const app = express();
const path = require('path')
// dotenv.config({path: '.env'})


dotenv.config(path.join(__dirname,'.env'))

const PORT = process.env.PORT
app.use(express.static('public'))
// app.use(ejslayouts)

//set template engine
app.set('views', path.join(__dirname,'/Public/views'))
app.set('view engine','ejs')


const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());

app.get("/",function(req,res){
res.render("index")
})

app.post("/",function(req,res){ 
const city = req.body.city;
const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=2b4fb4eea66b64a3ec0b85a0d0482f37&units=metric"

https.get(url,function(response){
   
  console.log(response.statusCode);
    response.on("data",function(data){
  const weatherData = JSON.parse(data);
  console.log(weatherData);

//just reverse
//   const object ={
//     name:"uday",
//     branch:"cse"
//   }
//   console.log(JSON.stringify(object));

const temp = weatherData.main.temp;
const description = weatherData.weather[0].description;
console.log(description)
const icon = weatherData.weather[0].icon;
const imageurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
res.render('result',{temp :temp,desc:description,cityname:city,imageurl:imageurl})
// res.write("<h1>the temperature  is "+temp+ " degree celcius</h1>");



// res.write("<img src = "+imageurl+">")
     
})

})


})



app.listen(PORT,()=>{
    console.log(`listening:${PORT}`);
});
