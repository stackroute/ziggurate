var mongoose=require('mongoose');

const NodesHealth = new mongoose.Schema(
{
   Name: {type: String,required:true},
   Status: {type: Number, requored: true},
   ProtocolMax : {type: Number},
   Port : {type:Number},
   DelegateMin : {type:Number},
   DelegateMax : {type:Number},
   Tags : {
     build : {type:String},
     vsn_max : {type:Number},
     vsn : {type:Number},
     vsn_min : {type:Number},
     role : {type:String},
     dc : {type:String}
  },
  ProtocolCur : {type:Number},
  ProtocolMin : {type:Number},
  Addr : {type:String},
  DelegateCur : {type:Number}

});

module.exports=mongoose.model('NodesHealth',NodesHealth);
