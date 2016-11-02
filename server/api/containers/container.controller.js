const Router=require('express').Router();

var Docker=require('dockerode');

var docker=new Docker({socketPath: '/var/run/docker.sock',host:'http://192.168.3.2',port:2375,});


Router.post('/node',(req,res) =>{
	var tasks=docker.listTasks({filters:{'node':[req.body['nodeId']]}},function(err,data)
	{
		getContainersFromDocker(res,data);
	})	
});

function getContainersFromDocker (res,data){
	var containers=[];
	for(let i=0;i<data.length;i++){
		var containerinfo={};
		if(data[i]["DesiredState"]=='shutdown')
			continue;
		containerinfo["id"]=data[i]["ID"];
		containerinfo["createdAt"]=data[i]["CreatedAt"];
		containerinfo["updatedAt"]=data[i]["UpdatedAt"];
		containerinfo["serviceID"]=data[i]["ServiceID"];
		containers.push(containerinfo);
	};
	if(containers.length==0)
		res.json({state:'false'});
	else
	res.json(containers);

};

module.exports=Router;