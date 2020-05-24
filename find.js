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
gamecollection.find(function(err,gam)
{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log(gam);
    }
});
gamecollection.find({name : "cricket"},function(err,val)
{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log(val)
    }
});
//findOne method of model
gamecollection.findOne({name : "football"},function(err,val)
{
    if(err)
    {
        console.log(err);
    }
    else{
        console.log(val);
    }
});


//using method findone and update
if(mongoose.Types.ObjectId.isValid('5eca36fe36e9441b28dc6cc2')){
    gamecollection.findOneAndUpdate({_id:'5eca36fe36e9441b28dc6cc2'},{$set:{quality :"good"}}, function (err,changed) {
        if(err){
            console.log(err);
        }
        else{
            if(changed){
                console.log(changed);
            }
        }
    });}
    //find by id method
    if(mongoose.Types.ObjectId.isValid('5eca36fe36e9441b28dc6cc2')){
        gamecollection.findById('5eca36fe36e9441b28dc6cc2',function (err,value) {
            if(err){
                console.log(err);
            }
            else{
                if(value){
                    console.log(value);
                }
            }
        });
    }
   

