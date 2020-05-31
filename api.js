const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:/gameDB",{useNewUrlParser : true});
const gamesc={
  name:String,
  rating:Number,
  quality: String
};
const gamecol=mongoose.model("game",gamesc);
//restfulapi crud operations intially for whole collection
app.route("/games")
.get(function(req,res)
{
  gamecol.find(function(err,data)
{
  if(data)
  {
    res.send(data);
  }
  else{
    res.send(err);
  }
});
})
app.post("/games",function(req,res)        //the parameters to be mentioned in the http request is name,rating,quality.
{
  const newgame=new gamecol({
    name :req.body.name,
    rating :req.body.rating,
    quality : req.body.quality
  });
  newgame.save(function(err)
{
  if(!err)
  {
    res.send("successfully executed");
  }
});
})
app.delete("/games",function(req,res)
{
  gamecol.deleteMany(function(err)
{
  if(!err)
  {
    res.send("successfully deleted all the data");
  }
  else{
    res.send(err);
  }
})
});
//now we can update a particular document in a collection using restful restfulapi
app.route("/games/:gamename").
get(function(req,res)
{
  gamecol.findOne({name : req.params.gamename},function(err,data)
{
  if(data)
  {
    res.send(data);
  }
  else{
    res.send(err);
  }
});
})
.put(function(req,res)
{
  gamecol.update(
    {name : req.params.gamename},
    {name : req.body.name,rating: req.body.rating,quality : req.body.quality},
    {overwrite : true},
    function(err)
    {
      if(!err)
      {
        res.send("successfully updated");
      }
      else{
        res.send(err);
      }
    }
  );
})
.patch(function(req,res)
{
  gamecol.update(
    {name : req.params.gamename},
    {$set : req.body},
    function(err)
    {
      if(!err)
      {
        res.send("successfully updated");
      }
      else{
        res.send(err);
      }
    }
  );
})  
.delete(function(req,res)
{
  gamecol.deleteOne(
    {name : req.params.gamename},
    function(err)
    {
      if(!err)
      {
        res.send("successfully deleted the document");
      }
      else{
        res.send(err);
      }
    }
  );
});

app.listen(3000,function()
{
  console.log("server has started and it is running at port 3000");
})
