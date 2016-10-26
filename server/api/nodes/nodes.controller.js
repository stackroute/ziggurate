var fs=require('fs');
var http=require('http');
const Router=require('express').Router();

var IpFile=fs.readFileSync('./server/api/nodes/Ips.txt','utf-8');

var Ips=IpFile.split("\n");


Router.get('/consul-Worker',(req,res) =>{
  consulApi(createConsulWorkerJson,res,0);
});

Router.get('/all',(req,res) =>{
  consulApi(createConsulAllJson,res,0);
});

Router.get('/consul-Server',(req,res) =>{
  consulApi(createConsulServerJson,res,0);
});

//Function get the Response From Consul API

function consulApi (callfunction,res,index){
   var options = {
    "method": "GET",
    // "hostname": "192.168.2.7",
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

module.exports=Router;
