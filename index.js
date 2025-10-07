import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";

env.config(); 

const app = express();
const port = process.env.PORT;

var posts = [];
var content = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  
  if (posts.length > 0) {
    res.render("index.ejs", {
      pTitle: posts,
      pContent: content
    });
  } else {
    res.render("index.ejs");
  }
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/submit", (req,res) => {
  posts.push(req.body.pTitle);
  content.push(req.body.pContent);
  res.redirect("/");
  
});

app.post("/posts", (req,res) => {
  res.render ("posts.ejs", {
    pTitle: req.body.pTitle,
    pContent: req.body.pContent,
    pIndex: req.body.pIndex
  })
});

app.post("/delete", (req,res) => {
  posts.splice(req.body.pIndex, 1);
  content.splice(req.body.pIndex, 1);
  res.redirect("/");
});

app.post("/edit", (req,res) => {
  res.render("edit.ejs", {
    pTitle: posts[req.body.pIndex],
    pContent: content[req.body.pIndex],
    pIndex: req.body.pIndex
  });
});

app.post("/edited", (req,res) => {
  posts.splice(req.body.pIndex, 1);
  content.splice(req.body.pIndex, 1);
  posts.push(req.body.pTitle);
  content.push(req.body.pContent);
  res.redirect("/");
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});