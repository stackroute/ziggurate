var Docker=require('dockerode');

var docker=new Docker({socketPath: '/var/run/docker.sock',host:'http://192.168.3.2',port:2375});
// var docker=new Docker({socketPath: '/var/run/docker.sock',host:'http://localhost',port:2375});

var http=require('http');
const Router=require('express').Router();


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
    console.log(data);
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
  dockerSystem["createdAt"]=new Date(data[i]["CreatedAt"]).toLocaleString();
  dockerSystem["updatedAt"]=new Date(data[i]["UpdatedAt"]).toLocaleString();
  dockerSystem["dropDown"]=dockerDropDown;

  dockerSystems.push(dockerSystem);
};
return dockerSystems;
};


module.exports=Router;












//this will return a json info for swarm managers


/*function createMangerJson(data){
  let dockerSystems=[];
  let dockerDropDown=createSelection(data);

  for(let i=0;i<data.length;i++){
    let dockerSystem={};
    
    if(Object.keys(data[i]).includes("ManagerStatus")){

      if(Object.keys(data[i]["ManagerStatus"]).includes("Leader"))
        dockerSystem["role"]="Swarm Leader";
      else
        dockerSystem["role"]="Swarm Manager";
    }
    else
      continue;

    if(data[i]["Status"]["State"]=='ready')
      dockerSystem["status"]="ready";
    else
      dockerSystem["status"]="down";

    dockerSystem["id"]=data[i]["ID"];
    dockerSystem["name"]=data[i]["Description"]["Hostname"];
    dockerSystem["createdAt"]=data[i]["CreatedAt"];
    dockerSystem["updatedAt"]=data[i]["UpdatedAt"];
    dockerSystem["dropDown"]=dockerDropDown;

    dockerSystems.push(dockerSystem);
  };
  return dockerSystems;

};


//This function will return a json info for swarm workers and leader
function createWorkerJson(data){
  let dockerSystems=[];
  let dockerDropDown=createSelection(data);

  for(let i=0;i<data.length;i++){
    let dockerSystem={};
    
    if(Object.keys(data[i]).includes("ManagerStatus")){

      if(Object.keys(data[i]["ManagerStatus"]).includes("Leader"))
        dockerSystem["role"]="Swarm Leader";
      else
        continue;
    }
    else
     dockerSystem["role"]="Swarm Worker";

   if(data[i]["Status"]["State"]=='ready')
    dockerSystem["status"]="ready";
  else
    dockerSystem["status"]="down";

  dockerSystem["id"]=data[i]["ID"];
  dockerSystem["name"]=data[i]["Description"]["Hostname"];
  dockerSystem["createdAt"]=data[i]["CreatedAt"];
  dockerSystem["updatedAt"]=data[i]["UpdatedAt"];
  dockerSystem["dropDown"]=dockerDropDown;

  dockerSystems.push(dockerSystem);
};
return dockerSystems;

};
*/

/*Router.get('/consul-Worker',(req,res) =>{
  consulApi(createConsulWorkerJson,res,0);
});

Router.get('/all',(req,res) =>{
  // consulApi(createConsulAllJson,res,0);
  })
});

Router.get('/consul-Server',(req,res) =>{
  consulApi(createConsulServerJson,res,0);
});

//Function get the Response From Consul API

function consulApi (callfunction,res,index){
   var options = {
    "method": "GET",
    // "hostname": "172.23.238.236",
    "hostname": ""+Ips[index]+"",
    "port": "8500",
    "path": "/v1/agent/members",
    "headers": {
      "cache-control": "no-cache"
    }
  };

  var req1 = http.request(options, function (res1) {
    var chunks = [];
    
    res1.on("data",(chunk) =>{
      chunks.push(chunk);
    });


    res1.on("end",() =>{
      var body = Buffer.concat(chunks).toString();
      body=JSON.parse(body);
      index=0;
      res.json(callfunction(body));
    });

  });
  req1.end(); 

  req1.on("error",(error) =>{
    var newIndex=index+1;
   consulApi(callfunction,res,newIndex);
  });

};

function createSelection(body){
  var consulArray=[];
  for(let i=0;i<body.length;i++){
    if(!consulArray.includes(body[i]["Tags"]["role"]))
    {
      consulArray.push(body[i]["Tags"]["role"]);
    }
  }

  for(let i=0;i<consulArray.length;i++){
    consulArray[i]=consulArray[i].replace("consul","Consul-Server");
    consulArray[i]=consulArray[i].replace("node","Consul-Worker");
  };

  return consulArray;
};

//To Create Json for whole Cluster of consul

function createConsulAllJson(body){
  var consulWorkerArray=[];
  var arr=createSelection(body);

  for(let i=0;i<body.length;i++){
    var consulWorker={};
    if(body[i]["Status"]==3)
      continue;
    if(body[i]["Status"]==4)
      consulWorker["Status"]="Failed";
    else if(body[i]["Status"]==1)
      consulWorker["Status"]="Alive";
    if(body[i]["Tags"]["role"]=="consul")
      consulWorker["Role"]="Consul Server";
    else if(body[i]["Tags"]["role"]=="node")
      consulWorker["Role"]="Consul Worker";
    consulWorker["Name"]=body[i]["Name"];
    consulWorker["Ip"]=body[i]["Addr"];
    consulWorker["Port"]=body[i]["Port"];
    consulWorker["Array"]=arr;
    consulWorkerArray.push(consulWorker);
  };
  return consulWorkerArray;
};

// THis will create the Json For consul Workers Only
function createConsulWorkerJson(body){
 var arr=createSelection(body);

 var consulWorkerArray=[];
 for(let i=0;i<body.length;i++){
  var consulWorker={};
  if(body[i]["Status"]==3)
    continue;
  if(body[i]["Status"]==4)
    consulWorker["Status"]="Failed";
  else if(body[i]["Status"]==1)
    consulWorker["Status"]="Alive";

  if(body[i]["Tags"]["role"]=="consul")
    continue;
  else if(body[i]["Tags"]["role"]=="node")
    consulWorker["Role"]="Consul Worker";
  consulWorker["Name"]=body[i]["Name"];
  consulWorker["Ip"]=body[i]["Addr"];
  consulWorker["Port"]=body[i]["Port"];
  consulWorker["Array"]=arr;

  consulWorkerArray.push(consulWorker);
};
return consulWorkerArray;
};

//This will create the Consul Server Json

function createConsulServerJson(body){
 var arr=createSelection(body);
 var consulWorkerArray=[];
 for(let i=0;i<body.length;i++){
  var consulWorker={};
  if(body[i]["Status"]==3)
    continue;
  if(body[i]["Status"]==4)
    consulWorker["Status"]="Failed";
  else if(body[i]["Status"]==1)
    consulWorker["Status"]="Alive";

  if(body[i]["Tags"]["role"]=="consul")
    consulWorker["Role"]="Consul Server";
  else if(body[i]["Tags"]["role"]=="node")
    continue;

  consulWorker["Name"]=body[i]["Name"];
  consulWorker["Ip"]=body[i]["Addr"];
  consulWorker["Port"]=body[i]["Port"];
  consulWorker["Array"]=arr;

  consulWorkerArray.push(consulWorker);
};
return consulWorkerArray;
};
*/
