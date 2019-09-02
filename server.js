//dependencies
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

//require models
var db = require("./models");

//set up port
var PORT = process.env.PORT || 3000;

//initialize express
var app = express();

//middleware
app.use(logger("dev")); //use morgan logger for logging requests
app.use(express.urlencoded({ extended:true })); //parse request body as JSON
app.use(express.json());
app.use(express.static("public")); //make public a static folder

//connect to mongo
mongoose.connect("mongodb://localhost/scrapedb", { useNewUrlParser: true });

//routes

//GET--->scrapes NYT website
app.get("/scrape", function(req, res) {
    axios.get("https://www.nytimes.com/").then(function(response) {
        var $ = cheerio.load(response.data); //load response into cheerio with $ selector

        //grab each h2 and article tag
        $("h2").each(function(i, element) {
            //establish an empty object for results to dump into
            var results = [];

            // Save the text of the element in a "title" variable
            var title = $(element).text();

            // In the currently selected element, look at its child elements (i.e., its a-tags),
            // then save the values for any "href" attributes that the child elements may have
            var link = $(element).children().attr("href");

            // Save these results in an object that we'll push into the results array we defined earlier
            results.push({
            title: title,
            link: link
            });
       
            console.log(results);

            // //add the text and href of every link, and save them as properties of the result object
            // result.title = $(this)
            //     .children("a")
            //     .text();
            // result.link = $(this)
            //     .children("a")
            //     .attr("href");

            // console.log(result); 

            //use the result object we just built to create a new Article entry in db
            // db.Article.create(result)
            //     .then(function(dbArticle) {
            //         console.log(dbArticle);
            //     }).catch(function(err) {
            //         console.log(err);
            //     });
        });

        //send message to client 
        res.send("Scrape Complete!");
    });
});

//start server
app.listen(PORT, function() {
    console.log("App running on port http://localhost:" + PORT);
});