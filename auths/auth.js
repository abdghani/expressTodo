var basic = {
	"port":process.env.OPENSHIFT_NODEJS_PORT || 3000,
	"ip":process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
	"mongooseUrl":process.env.OPENSHIFT_MONGODB_DB_URL||'mongodb://localhost/todos',
	"facebook":{
		'id':'990285217722403',
		'secret':'6640514e8c7f56a93c2439a464b65650',
		'callback': 'http://expresstodo-makepost.rhcloud.com/login/facebook/return'
	}

}
module.exports = basic;
