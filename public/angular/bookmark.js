app.controller("bookmark_controller",function($scope,$http,$window,$rootScope){

	var setbookmarks = function(){
		$http.get('/api/bookmarks/userid/'+$rootScope.currentUser.userid)
		.success(function(data){
			$scope.bookmarks = data;
		})
	}

	$scope.addBookmark = function(data){
		var bookmark_data = {
			userid:$rootScope.currentUser.userid,
			content:data.content,
			url:data.url
		}
		$http.post('/api/bookmarks',bookmark_data)
		.success(function(data){
			setbookmarks();
			$scope.data.content = "";
			$scope.data.url = "";
			setsharedbookmarks()
		})
		.error(function(error){
			console.log(error)
		})
	}

	$scope.openurl = function(data){
		 $window.open(data);
	}

	$scope.delete = function(data){
		$http.delete('/api/bookmarks/'+data+'/delete')
		.success(function(data){
			setbookmarks();
			setsharedbookmarks()

		})
	}

	setbookmarks();

	var setsharedata = function(data,content){
		$scope.shareurl = data;
		$scope.sharecontent = content;
		$http.get('/api/users')
		 .success(function(data){
		 	console.log(data)
		 	$scope.peoples = data;
		 	setsharedbookmarks()
		 })
	}

	$scope.showModal = false

	$scope.open = function(data,content) {
	  setsharedata(data,content);
	  $scope.showModal = true;
	};

	$scope.share = function(userid,title,url){
		var newShare = {
			sharedtoid:userid,
			sharedbyid:$rootScope.currentUser.userid,
			name:$rootScope.currentUser.displayName,
			url:url,
			title:title
		}
		$http.post('/api/share',newShare)
		.success(function(data){
			$scope.cancel();
			setsharedbookmarks()
		}) 

	}

	$scope.cancel = function() {
	  $scope.showModal = false;
	};
	var setsharedbookmarks = function(){
		$http.get('/api/sharedbookmarks/user/'+$rootScope.currentUser.userid)
		.success(function(data){
			$scope.sbookmarks = data;
		})
	}
	setsharedbookmarks()
	setInterval(setsharedbookmarks,2000)
})

