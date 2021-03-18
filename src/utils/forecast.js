const request=require("request")

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=44bf96bc0489352284c270185697522d&query='+latitude+','+longitude+'&units=m'
//const url='http://api.weatherstack.com/current?access_key=44bf96bc0489352284c270185697522d&query=37.8267,-122.4233&units=f'
    request({url,json:true},(error,{body})=>{
     //   console.log(url);
    if(error)
        callback("Unable to connect to weather fetching services!!",undefined)
    else if(body.error){
        callback("Unable to search weather for the given location",undefined)
    } 
    else{
        callback(undefined,body.current.temperature)
    }

    })
}

module.exports=forecast