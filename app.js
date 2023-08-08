const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");
//body-parser is a package which can allow us to parse throught the post data.
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
    //to send a file from the server
    res.sendFile(__dirname+"/index.html");
    
})
app.post("/",function(req,res){
    //console.log(req.body.cityname);
    const city="req.body.cityname";
    const apikey="eeca80e360afb6fc90fa47e5dc138442#";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=eeca80e360afb6fc90fa47e5dc138442#";
    https.get(url,function(response){
        //console.log(response.statusCode);

        response.on("data",function(data){
            //console.log(data);=> we will get data in the form of hexadecimal to get data in the form of JSON
            const weatherdata=JSON.parse(data);
            //console.log(weatherdata);
            const temp=weatherdata.main.temp;

            const desc=weatherdata.weather[0].description
            res.write("<h1>The tempetature in Mumbai is "+temp+" kelvin</h1>");
            res.write("Description "+desc);
            res.send();
        })
    })
})


app.listen(3000,function(){
    console.log("server running at port number 3000");
})