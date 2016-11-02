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
		containerinfo["id"]=data[i]["Status"]["ContainerStatus"]["ContainerID"];
		containerinfo["createdAt"]=new Date(data[i]["CreatedAt"]).toLocaleString();
		containerinfo["updatedAt"]=new Date(data[i]["UpdatedAt"]).toLocaleString();
		containerinfo["serviceID"]=data[i]["ServiceID"];

		if(data[i]["DesiredState"]=='shutdown')
		{
			containerinfo["desiredState"]=data[i]["DesiredState"];
			containers.push(containerinfo);
		}

	else if(data[i]["DesiredState"]=='running')
	{
		containerinfo["desiredState"]=data[i]["DesiredState"];
		containers.unshift(containerinfo);
	}

};
if(containers.length==0)
	res.json({state:'false'});
else
	res.json(containers);

};

module.exports=Router;