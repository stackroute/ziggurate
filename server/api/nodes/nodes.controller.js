var http=require('http');

const Router=require('express').Router();

Router.get('/consul-Worker',function(req,res){
  consulApi(createConsulWorkerJson,res);
});

Router.get('/all',function(req,res){
  consulApi(createConsulAllJson,res);
});

Router.get('/consul-Server',function(req,res){
  consulApi(createConsulServerJson,res);
});

//Function get the Response From Consul API

function consulApi (callfunction,res){
 var options = {
  "method": "GET",
  "hostname": "192.168.2.7",
  "port": "8500",
  "path": "/v1/agent/members",
  "headers": {
    "cache-control": "no-cache"
  }
};
var req1 = http.request(options, function (res1) {
  var chunks = [];
  res1.on("data", function (chunk) {
    chunks.push(chunk);
  });
  res1.on("end", function () 
  {
    var body = Buffer.concat(chunks).toString();
    body=JSON.parse(body);
    res.json(callfunction(body));
  });
});
req1.end(); 
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
    if(body[i]["Status"]==4)
      continue;
    if(body[i]["Status"]==3)
      consulWorker["Status"]="Failed";
    else if(body[i]["Status"]==1)
      consulWorker["Status"]="Alive";
    console.log(body[i]["Tags"]["role"]);
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
    if(body[i]["Status"]==4)
      continue;
    if(body[i]["Status"]==3)
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
    if(body[i]["Status"]==4)
      continue;
    if(body[i]["Status"]==3)
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

module.exports=Router;
