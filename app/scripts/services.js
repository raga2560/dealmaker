angular.module('IonicGulpSeed.services', ['firebase'])

.factory('AuthService', function($rootScope, $firebaseAuth, db, dataService) {
	var firebaseAuth = firebase.auth();
		var auth = $firebaseAuth(firebaseAuth);

		
    //var auth = $firebaseAuth();
    var login = function() {
        return auth.$signInWithPopup('google').then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // [START_EXCLUDE]
		 // alert(user);
    
			
			setUser(user.email,user.photoURL ,user.uid);
			var rec = {
				email: user.email,
				emailVerified: user.emailVerified,
				uid : user.uid,
				providerData : user.providerData,
				displayName :user.displayName
			};
			 
		    dataService.getUserRecordByEmail(rec.email).then(function(data1){
				if(data1 == null || data1.uid != rec.uid)
				{
					console.log('Email not found');
					dataService.createUserRecord( rec);
				}
					
			});
			
			$rootScope.$broadcast('loggedIn');
			
          // [END_EXCLUDE]
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // [START_EXCLUDE]
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
          } else {
            console.error(error);
          }
          // [END_EXCLUDE]
        });
    };
    var logout = function() {
		
		setUser(null, null, null);
         auth.$signOut();
		
		 $rootScope.$broadcast('loggedOut');
		 
		 
		 
    };
    var user = {};
	
	
	
		
    auth.$onAuthStateChanged(function(authData) {
        
		
		
		
		if (authData) {
          // User is signed in.
		  user = authData;
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // [START_EXCLUDE]
          setUser(user.email,photoURL , user.uid);
		  
          //alert(JSON.stringify(user, null, '  '));
          // [END_EXCLUDE]
        } else {
          // User is signed out.
		  setUser(null, null, null);
		  
          // [START_EXCLUDE]
          
          // [END_EXCLUDE]
        }
        // [START_EXCLUDE]
        
        // [END_EXCLUDE]
      
	  
	  
    })
	
	function setUser(email , photoURL, uid) {
			if (!email) {
				service.user.email = null;
				service.user.photoURL = '';
				service.user.uid = '';
				service.user.isSignedIn = false;
			} else {
				service.user.email = email;
				service.user.photoURL = photoURL;
				service.user.uid = uid;
				service.user.isSignedIn = true;
			}
			setStoredUser(service.user);
		}

		function getStoredUser() {
			var user = localStorage.getItem('authUser');
			if (user) {
				user = JSON.parse(user);
			}
			return user || { isSignedIn: false };
		}

		function setStoredUser(user) {
			if (user) {
				user = JSON.stringify(user);
			}
			localStorage.setItem('authUser', user);
		}
	
		var service = {
			user: {
				isSignedIn: false

			},
			 login: login,
             logout: logout,
			
			//signUp: signUp,
			
			getUser: getStoredUser
		};
		
	

    return service;
});
