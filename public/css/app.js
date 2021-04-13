
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
    messageTwo.textContent=data.forecast_data_temperature +" "+ data.reg

    //   console.log(data.forecast_data_temperature);
     }
  })

})

})
