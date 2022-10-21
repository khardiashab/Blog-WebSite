// * Import external modules 
const express = require("express")
const bodyParser = require("body-parser")

// * Import my module that I have made for functionality in backend 
const content = require("./my_modules/content")
const data = require("./my_modules/functions")
const { homeContent } = require("./my_modules/content")


// * Let's make the app from express and use it 

const app = express()

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended : true}))

app.use(express.static(__dirname + "/public"))

// ! Let's create an array that strores the post that we get from compose page
const posts = []

// * from app take request and send the response
//? Home page
app.get("/", (req, res) =>{

    let inputObject = {
        content: content.homeContent,
        itemsArray: posts
    }

    res.render("home", inputObject)
})

//? about page
app.get("/about", (req, res) =>{
    res.render("about", {content: content.aboutContent})
})

//? contact page
app.get("/contact", (req, res) =>{
    res.render("contact", {content: content.contactContent})
})


//? compost page
app.get("/compose", (req, res) =>{

    res.render("compose")
})

app.post("/compose", (req, res) =>{
    // ! here we get the data from the page so we store it in a variable and add into posts
    let post = req.body;
    posts.push(post);

    for( let item of posts){
        let route = data.route(item.title)
        app.get(route, (req, res) =>{
            res.render("post", item)
        })
    }
    res.redirect("/")
})

// Let's make every upload to a new page

for( let item of posts){
    let route = data.route(item.title)
    app.get(route, (req, res) =>{
        res.render("post", item)
    })
}


// * Let's set the port and run it 

const port = process.env.PORT || 3000 

app.listen(port, () =>{
    console.log(`App is running on Port : ${port}`)
})