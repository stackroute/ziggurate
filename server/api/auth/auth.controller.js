var request = require('request');
var jwt = require('jsonwebtoken');
const Router=require('express').Router();

Router.get('/github', function(req, res) {

    // GET code
    var code = req.query.code;

    //Get access token
    var tokenUrl = "https://github.com/login/oauth/access_token?client_id=f15e432f497c0eb37e47&client_secret=f4e8072e9f9a5b367aab1c9a0ecb641188787c97&code=" + code;
    var accessToken ="";
    request.post(tokenUrl,function(err, response, body) {
    	if(err) { return "Error"; }
    	accessToken = body.split('=')[1].split('&')[0];


	   //Get Userdata   
	   var userDataUrl = "https://api.github.com/user?access_token="  +accessToken ;

	   request.get({url:userDataUrl,headers:{'User-Agent':'request'}},function(err,response,body) {
	   	if(err) { return "Error"; }
	   	const userProfile = JSON.parse(body);

	   	var adm=true;        
	   	request.get({url:userProfile.organizations_url,headers:{'User-Agent':'request'}},function(err,response,data){
	   		if(err) {
	   			adm=false;
	   			return "Error"; 
	   		}
	   		else
	   		{
	   			var org='';
	   			if(data.length==2){
	   				adm=false;
	   			}
	   			else{
	   				for(var i=1;i<(data.length)-1;i++){
	   					org+=data[i];
	   				}
	   				org=JSON.parse(org);
	   				if(org.login == "Ziggurate")
	   				{
	   					adm=true;
	   				}
	   				else{
	   					adm=false;
	   				}
	   			}
	   			var jwtToken = jwt.sign({"accesstoken": accessToken,"user":"github.com/"+userProfile.login ,"admin":adm},'my MERN project');
	   			if(adm == true)
	   			{
	   				res.cookie('JWT',jwtToken,{maxAge:900000}).redirect('/#/nodedashboardpage');
	   			}
	   			else{
	   				res.cookie('JWT',jwtToken,{maxAge:900000}).redirect('/#/apps');
	   			}
	   		}
 		});
	   });
	});
});

module.exports=Router;