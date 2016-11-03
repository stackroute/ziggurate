const Router=require('express').Router();

var Docker=require('dockerode');
var docker=new Docker({socketPath: '/var/run/docker.sock'});
// var docker=new Docker({socketPath: '/var/run/docker.sock',host:'http://localhost',port:2375});


Router.get('/all',(req,res) =>{
  getDataFromDocker(res,"all");
});

Router.get('/Swarm-Manager',(req,res) =>{
  getDataFromDocker(res,"manager");
});

Router.get('/Swarm-Worker',(req,res) =>{
  getDataFromDocker(res,"worker");
});

Router.get('/Swarm-Leader',(req,res) =>{
  getDataFromDocker(res,"leader");
});

function getDataFromDocker(res,mode){
  var info=docker.listNodes(function(err,data){
   res.json(createJson(data,mode)); 
 });
}

//This function will create the drop down list for the nodes page
function createSelection(data){
  var dockerDropDown=[];
  for(let i=0;i<data.length;i++){
    if(!dockerDropDown.includes(data[i]["Spec"]["Role"]))
      dockerDropDown.push(data[i]["Spec"]["Role"]);

    if(Object.keys(data[i]).includes("ManagerStatus"))
    {
      if(Object.keys(data[i]["ManagerStatus"]).includes("Leader"))
      {
        if(!dockerDropDown.includes("Swarm-Leader"))
         dockerDropDown.push("Swarm-Leader"); 
     }
   }
 }

 for(let i=0;i<dockerDropDown.length;i++){
  dockerDropDown[i]=dockerDropDown[i].replace("worker","Swarm-Worker");
  dockerDropDown[i]=dockerDropDown[i].replace("manager","Swarm-Manager");
};
return dockerDropDown;
};



//this function will return a json info for all swarm machines
function createJson(data,mode){
  let dockerSystems=[];
  let dockerDropDown=createSelection(data);

  for(let i=0;i<data.length;i++){
    let dockerSystem={};

 //this is for all systems   
 if(mode=='all')
 {
  if(Object.keys(data[i]).includes("ManagerStatus")){
    if(Object.keys(data[i]["ManagerStatus"]).includes("Leader"))
      dockerSystem["role"]="Swarm Leader";
    else
      dockerSystem["role"]="Swarm Manager";
  }
  else
   dockerSystem["role"]="Swarm Worker";
}
//all system ends here

//this is for Leader
if(mode=='leader')
{
  if(Object.keys(data[i]).includes("ManagerStatus")){
    if(Object.keys(data[i]["ManagerStatus"]).includes("Leader"))
      dockerSystem["role"]="Swarm Leader";
    else
      continue;
  }
  else
    continue;
}
//Leader Ends here

//this is for manager
else if (mode=='manager')
{
  if(Object.keys(data[i]).includes("ManagerStatus")){
    if(Object.keys(data[i]["ManagerStatus"]).includes("Leader"))
      continue;
    else
      dockerSystem["role"]="Swarm Manager";
  }
  else
    continue;
}
//manager ends here

  //This is for the worker
  else if(mode=='worker'){
    if(Object.keys(data[i]).includes("ManagerStatus"))
      continue;
    else
     dockerSystem["role"]="Swarm Worker";
 }
  //Worker end here

  
  if(data[i]["Status"]["State"]=='ready')
    dockerSystem["status"]="ready";
  else
    dockerSystem["status"]="down";

  dockerSystem["id"]=data[i]["ID"];
  dockerSystem["name"]=data[i]["Description"]["Hostname"];
  dockerSystem["createdAt"]=calculateTime(new Date(data[i]["CreatedAt"]).toLocaleString());    
  dockerSystem["updatedAt"]=calculateTime(new Date(data[i]["CreatedAt"]).toLocaleString());
  dockerSystem["dropDown"]=dockerDropDown;
  dockerSystems.push(dockerSystem);
};
return dockerSystems;
};


function calculateTime(data){
var date = new Date(data);
var today=new Date();
if(today.getYear() - date.getYear() >0){
  return(today.getYear()-date.getYear()+" years ago");
}
else if(today.getMonth() - date.getMonth()>0){
  return(today.getMonth()-date.getMonth()+" months ago"); 
}
else if(today.getDate() - date.getDate()>0){
  if(today.getDate() - date.getDate()==1){
    return("yesterday");}
    else
      return(today.getDate() - date.getDate()," days ago");
  }
else{
  if(today.getHours() - date.getHours() ==1 && today.getMinutes() - date.getMinutes() >0)
  return(today.getHours() - date.getHours()+" hours ago");

  else if(today.getHours() - date.getHours() >1){
    return(today.getHours() - date.getHours()+" hours ago");
  }
  else{
    if(today.getMinutes()-date.getMinutes() <0)
    return((today.getMinutes()-date.getMinutes() + 60)+" minutes ago");
    else 
    return((today.getMinutes()-date.getMinutes() )+" minutes ago");
      
  }
}
};


module.exports=Router;
