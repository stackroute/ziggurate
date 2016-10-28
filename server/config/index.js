var env=process.env.NODE_ENV || 'dev';
module.exports=require('./environment/'+env+'.js');
