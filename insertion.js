const mongoose =require("mongoose");
mongoose.connect("mongodb://localhost:/gameDB",{useNewUrlParser : true,useUnifiedTopology : true});
const gameSchema=new mongoose.Schema({name : {
    type : String,
    required :[1,"name should be specified"]

},
rating : {
    type : Number,
    min : 1,
    max : 10
},
quality : String});
const gamecollection=mongoose.model("game",gameSchema);
const g1=new gamecollection({
    name : "cricket",
    rating : 10,
    quality : "valuable"
});
const g2=new gamecollection({
    name : "football",
    rating : 7,
    quality : "medium"
});
const g3=new gamecollection({
    name : "volleyball",
    rating : 5,
    quality : "average"

});
gamecollection.insertMany([g1,g2,g3],function(err)
{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("success");
    }
});

const g4=new gamecollection({
    name : "hockey",
    rating : 6,
    quality : "good"
});
// using save method to add data
g4.save(function(err,value)
{
    if(err)
    {
        console.log(err);
    }
});
gamecollection.create({
    name:"chess",
    rating:10,
    quality : "great game"
},function (err,val) {
    if(err){
        console.log(err);
    }
});