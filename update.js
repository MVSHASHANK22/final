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
gamecollection.updateMany({name:"volleyball"},{$set:{rating:8,quality : "very good"}},function (err,data) {
    if(err){
        console.log(err);
    }
    else{
        console.log("updated: ");
        console.log(data);
    }
});
if (mongoose.Types.ObjectId.isValid('5ec7a330737f1149d08a8961')){
    gamecollection.remove({ _id: '5ec7a330737f1149d08a8961'},function (err,data) {
        if(err){
            console.log(err);
        }
        else{
            if(data){
                console.log("removed ");
                console.log(data);
            }
            else{
                console.log("no such user exists");
            }
        }
    });
}
