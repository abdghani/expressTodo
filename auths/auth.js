var basic = {
	"port":process.env.OPENSHIFT_NODEJS_PORT || 3000,
	"ip":process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
	"mongooseUrl":process.env.OPENSHIFT_MONGODB_DB_URL||'mongodb://localhost/todos',
	"facebook":{
		'id':'##facebookId',
		'secret':'##facebookSecret##',
		'callback': '##facebook callback url##'
	}

}
module.exports = basic;
