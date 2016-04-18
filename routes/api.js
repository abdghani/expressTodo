var express = require('express');
var router = express.Router()
var todo = require('../models/todos.js');
var bookmark = require('../models/bookmark.js');
var todouser = require('../models/users.js');
var share = require('../models/share.js');

router.get('/todo/:id/userid',function(req,res){
	
	todo.find({userid:req.params.id,completed:0},function(err,data){
		res.json(data);
	})

});

router.post('/todo',function(req,res){
	var newTodo = new todo(req.body)
	newTodo.save(function(err,data){
		if(err){
			res.send(err);
		}
		else{
			res.send(data);
		}
	}) 
})

router.put('/todo/:id/completed',function(req,res){
	todo.update({_id:req.params.id},
				{	$set:{
							'completed':1,
							'completedTime':new Date()
						 }
				},
				function(err,data){
		if(err){
			res.send(err)
		}
		else{
			res.send(data)
		}
	})
})

router.delete('/todo/:id',function(req,res){
	todo.remove({_id:req.params.id},function(err,data){
		if(err){
			res.send(err)
		}
		else{
			res.send(data)
		}
	})
})

router.get('/todo/completed/:id/userid',function(req,res){
	todo.find({userid:req.params.id,completed:1},function(err,data){
		res.json(data);
	})
})


router.get('/bookmarks/userid/:id',function(req,res){
	bookmark.find({'userid':req.params.id},function(err,data){
		if(err){
			res.json(err)
		}
		else{
			res.json(data)
		}
	})
})

router.post('/bookmarks',function(req,res){
	var newBookmark = new bookmark(req.body);
	newBookmark.save(function(err,data){
		if(err){
			res.send(err)
		}
		else{
			res.send(data)
		}
	})
})

router.delete('/bookmarks/:id/delete',function(req,res){
	bookmark.remove({_id:req.params.id},function(err,data){
		if(err){
			res.send(err);
		}
		else{
			res.send(data);
		}
	})
})

router.get('/users',function(req,res){
	todouser.find(function(err,data){
		res.json(data)
	})
})

router.get('/users/:id',function(req,res){
	todouser.findOne({'userid':req.params.id},function(err,data){
		res.json(data)
	})
})

router.get('/share',function(req,res){
	share.find(function(err,data){
		res.json(data)
	})
})

router.post('/share',function(req,res){
	console.log(req.body)
	var newShare = new share(req.body)
	newShare.save(newShare,function(err,data){
		if(err){
			console.log(err)
		}
		res.send(data);
	})
})


router.get('/sharedbookmarks/user/:id',function(req,res){
	share.find({'sharedtoid':req.params.id},function(err,data){
		res.json(data);
	})
})
module.exports = router;