angular.module('IonicGulpSeed.controllers', [])

.controller('homeCtrl', function($state,  $scope, AuthService) {
	

	$scope.myuserdata = AuthService.getUser();
	if($scope.myuserdata.isSignedIn == false)
	{
		$state.go('tab.login');
	}
	
	$scope.goToConsents = function() {
			 
			$state.go('tab.consents');
		}
	
	
	
		
	
	$scope.logout = function ()
  {
	  AuthService.logout();
	
	  
	  //alert(AuthService.getUser().email);
  }
  
  $scope.$on('loggedIn', function() {
	  $scope.myuserdata = AuthService.getUser();
				
			});

			$scope.$on('loggedOut', function() {
				$scope.myuserdata = AuthService.getUser();
				
			});
			
	
})


.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('loginCtrl', function($scope, AuthService) {
  $scope.settings = {
    enableFriends: true
  };
  
  $scope.myuserdata = {
	email : '',
	photoURL: '',
	isSignedIn :false  
  };
  
  
  
  $scope.login = function ()
  {
	  AuthService.login().then(function(){
		$scope.myuserdata = AuthService.getUser();  
	  });
		  ;
	  
	  //alert(AuthService.getUser().email);
  }
  $scope.logout = function ()
  {
	  AuthService.logout();
		$scope.myuserdata = AuthService.getUser();  
	  
	  //$scope.myuserdata = AuthService.getUser();
	  //alert(AuthService.getUser().email);
  }
  $scope.$on('loggedIn', function() {
	  $scope.myuserdata = AuthService.getUser();
				
	});

  $scope.$on('loggedOut', function() {
				$scope.myuserdata = AuthService.getUser();
				
  });
	
	
  
});
