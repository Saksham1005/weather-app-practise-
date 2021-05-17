//Cant use require in client side javascript
// const forecast = require("../../src/utils/forecast");


console.log('Client side Javascript file is loaded')

//fetch data from this url and then run this function 
fetch("http://puzzle.mead.io/puzzle").then((response)=>{
  response.json().then((data)=>{
  console.log(data);
  })
})

//Setup a call to fetch weather for Boston 
//client side javascript
// fetch("http://localhost:3000/weather?address=!").then((response)=>{
//   response.json().then((data)=>{
//     if(data.error){
//       console.log(data.error);
//     }else{
//       console.log(data.location);
//       console.log(data.forecast_data_temperature);
//     }
//   })

// })
const weather_form=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#id1')
const messageTwo=document.querySelector('#id2')



//event e
weather_form.addEventListener('submit',(e)=>{
  e.preventDefault()
  const location=search.value
//console.log(location,'testing!');
//Now time to display the location and forecast of the address(either on console or on intput field)
messageOne.textContent="Loading..."
messageTwo.textContent=""
//removing the http://localhost:3000 for deployment for heroku
fetch("/weather?address="+location).then((response)=>{
  response.json().then((data)=>{
    if(data.error){
      //console.log(data.error);
      messageOne.textContent=data.error
      messageTwo.textContent=""

    }else{
    //   console.log(data.location);
    messageOne.textContent=data.location
    messageTwo.textContent=data.forecast_data_temperature +" and region is ->"+ data.reg
    search.value=""
    //   console.log(data.forecast_data_temperature);
     }
  })

})

})

//Getting current location 
const $getcurrentlocation=document.querySelector("div.getcurrentlocation")
    const p1=document.getElementById("id1")
    const p2=document.getElementById("id2")

    $getcurrentlocation.addEventListener("click",function(e){
        e.preventDefault()
        p1.innerHTML="Loading..."
        p2.innerHTML="Loading..."
        if(!navigator.geolocation){
            p1.innerHTML="Not able to display the user location"
        }
        else{
          let longitude,latitude;
        navigator.geolocation.getCurrentPosition(function(position){
             longitude=position.coords.longitude //x
             latitude=position.coords.latitude  //y
          

          //console.log(longitude+" "+latitude);

          //Fetching the location----reverse geocoding
          fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1Ijoic2Frc2hhbTEyIiwiYSI6ImNrbTZmMjlzYTAxN2cyeG51cnZvOGt5a3MifQ.OHQMP5yhFJkIU7MQCkR2sg&limit=1`)
             
              .then(response=>{
               return response.json()
              })
              
              .then((response)=>{
              // console.log(response.features[0].place_name);
                //Fetching the forecast
                
                  fetch("/weather?address="+response.features[0].place_name)
                    .then(fore=>fore.json())
                    .then(fore=>{
                      //  console.log(fore);
                      if(fore.error){
                        p2.innerHTML="Location not fetched"
                        return;
                      }
                      p1.innerHTML=response.features[0].place_name
                      p2.innerHTML="Location ->"+fore.location+" ,Forecast data temperature ->"+
                      fore.forecast_data_temperature+" ,Region is ->"+fore.reg
                    })
                    .catch((e)=>{
                      p2.innerText=e;
                    })
                    
              })
              .catch((e)=>{
                p2.innerText=e;
              })

            })

            // forecast(longitude,latitude,(error,temperature,region)=>{
            //   if(error){
            //      p2.innerHTML=error
            //      return;
            //   }
            //   p2.innerHTML=temperature + "    ---    "+region
            // })
      }
      
    })