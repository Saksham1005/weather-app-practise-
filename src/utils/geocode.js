const request=require("request")

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2Frc2hhbTEyIiwiYSI6ImNrbTZmMjlzYTAxN2cyeG51cnZvOGt5a3MifQ.OHQMP5yhFJkIU7MQCkR2sg'
    
    //Http request
    request({url,json:true},(error,{body}={})=>{
       
      if(error){
    callback("Unable to connect to location services!",undefined)
    }
    
    else if(body.features.length==0){
    callback("Unable to find loaction!!",undefined);
    }
    else{
      callback(undefined,
        {coordinates:body.features[0].center,
        placename:body.features[0].place_name}
        )
    }
    })
    
    }

    module.exports=geocode