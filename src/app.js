const forecast=require("./utils/forecast")
const geocode=require("./utils/geocode")

const path=require("path")
const express=require("express")
const hbs=require("hbs")
const app=express() //Just a simple function

//Define paths for express config
const public_directory_path=(path.join(__dirname, '../public'))
const viewPath=path.join(__dirname,'../templates/views')
const partial_path=path.join(__dirname,'../templates/partials')

//Set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partial_path)

//Setup static directory to serve
app.use(express.static(public_directory_path))

//app.get-route handlers
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Andrew Mead',
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Saksham',
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text',
        title:'Help',
        name:'Saksham',
    })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
       return res.send({
         error:'No address was provided for getting location and weather information'   
        })
    }
    geocode(req.query.address,(error,{coordinates}={} )=>{
        if(error){
           return res.send({
               error
           });
        }
        forecast(coordinates[1],coordinates[0],(error,forecast_data_temperature)=>{
        if(error){
            return res.send({
                error
            });
        }
        
        //Sending responses !!
        res.send({
            location:coordinates,
            forecast_data_temperature,
            address:req.query.address
        })

        })
    })

    // res.send({
    //    Address:req.query.address
    // })
    /*res.send({
        forecast:'Warm',
        location:'Delhi',
    })*/
})

app.get('/products',(req, res)=>{
    if(!req.query.search){
    return res.send({
        error:'You must provide a search term'
    })
    }
    console.log(req.query.search); 
res.send({
    products:[]
})
})

//Wild card character '*' which selects all the urls other than the spcified ones
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Error page!!',
        name:'Saksham',
        errorMessage:"Help article not found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'Error page!!',
        name:'Saksham',
        errorMessage:"Page not found"
    })
})

// app.get('/help/*',(req,res)=>{
// res.send("Help article not found")
// })

//app.get for all other urls not listed above need to come last 
//So express works in order first it matches url from top to bottom order 
//So FIRST it tries to match public folder then all the urls of the route handlers
//Then if nothing matches then it comes to the last url used for (any else url) to display the given message

// app.get('*',(req,res)=>{
// res.send("My 404 page")
// })

app.listen(3000,()=>{
    console.log('server is up on port 3000')
})

console.log(__dirname);
//http://localhost:3000



//console.log(__filename);


//First parameter rout('') ,second one is a function
//If using the app.use() function then remove then old rout handlers(app.get())
// app.get('',(req,res)=>{
//     res.send('<h1>Content</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'Andrew',
//         age:27
//     },
//     {
//         name:'Saksham'
//     }
// ])
// })

// app.get('/about',(req,res)=>{
//     res.send('About page')
// })