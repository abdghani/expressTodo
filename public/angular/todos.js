app.controller("todo_controller",function($scope,$http,$rootScope){

	var setTodo = function(){
		$http.get('/api/todo/'+$rootScope.currentUser.userid+'/userid')
		.success(function(data){
			$scope.todoss = data
		})
	};

	var setCompletedTodo = function(){
		$http.get('/api/todo/completed/'+$rootScope.currentUser.userid+'/userid')
		.success(function(data){
			$scope.completed = data;
		})
	}

	$scope.submitTodo =function(data){
		var post = {
			"userid":$rootScope.currentUser.userid,
			"content":data.content
		}
		$http.post('/api/todo',post)
		.success(function(data){
			setTodo();
			$scope.data.content = '';
		})
		.error(function(err){
			console.log(err)
		})
	}
	$scope.completedTodo = function(data){
		$http.put('/api/todo/'+data+'/completed')
		.success(function(data){
			setTodo();
			setCompletedTodo();
		})
		.error(function(err){
			console.log(err)
		})
	}
	$scope.deleteTodo = function(id){
		
		$http.delete('/api/todo/'+id)
		.success(function(data){
			setTodo();
		})
		.error(function(err){
			console.log(err)
		})
	}
	setTodo();
	setCompletedTodo();
})

app.filter("getTimeOffset", function(){
	   return function(date){
	     return moment(date).fromNow();
	}
});


app.controller("logoutCtrl",function($scope,$http,$rootScope,$location){
	$scope.logout = function(){
		$http.post('/logout')
		.success(function(){
			$rootScope.currentUser=null;
			$location.url("/homes");
		});
	}
})

