// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('IonicGulpSeed', ['ionic', 'IonicGulpSeed.controllers', 'IonicGulpSeed.services', 'IonicGulpSeed.firebaseDataService', 
'IonicGulpSeed.dataService', 'IonicGulpSeed.fileDataService', 'firebase', 'ngFileUpload', 
  'IonicGulpSeed.deals', 'ionic-toast', 'LocalStorageModule', 'ngCordova'])

.value('_', window._)
.config(function($ionicConfigProvider) {
  $ionicConfigProvider.scrolling.jsScrolling(true);
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
				.state('tab.consents', {
					url: '/consents',
					views: {
						'tab-chats': {
						templateUrl: 'templates/consents.html',
						controller: 'DealsController as vm'
						}
					}
				})
				.state('tab.consent-drafts', {
					url: '/consent-drafts',
					views: {
						'tab-chats': {
						templateUrl: 'templates/consent-drafts.html',
						controller: 'DealDetailsController as vm'
						}
					}
				})
				.state('tab.consent-deals', {
					url: '/consent-deals',
					views: {
						'tab-chats': {
						templateUrl: 'templates/consent-deals.html',
						controller: 'DealDetailsController as vm'
						}
					}
				})
				.state('tab.consent-pending', {
					url: '/consent-pending',
					views: {
						'tab-chats': {
						templateUrl: 'templates/consent-pendings.html',
						controller: 'DealDetailsController as vm'
						}
					}
				})
				.state('tab.consent-agreed', {
					url: '/consent-agreed',
					views: {
						'tab-chats': {
						templateUrl: 'templates/consent-agreeds.html',
						controller: 'DealDetailsController as vm'
						}
					}
				})
				
				
				.state('tab.consent-create', {
					url: '/consent-create',
					views: {
						'tab-chats': {
						templateUrl: 'templates/consent-create.html',
						controller: 'DealDetailsController as vm'
						}
					}
				})
				.state('tab.consent-edit', {
					url: '/consent-edit/:id',
					views: {
						'tab-chats': {
						templateUrl: 'templates/consent-edit.html',
						controller: 'DealDetailsController as vm'
						}
					}
				})

				.state('tab.consent-view', {
					url: '/consent-view/:id',
					views: {
						'tab-chats': {
						templateUrl: 'templates/consent-view.html',
						controller: 'DealDetailsController as vm'
						}
					}
  })
				
	

  .state('tab.login', {
    url: '/login',
    views: {
      'tab-login': {
        templateUrl: 'templates/tab-login.html',
        controller: 'loginCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

})
.run(function($rootScope, $state, $ionicHistory) {
			$rootScope.$on('loggedIn', function() {
				$ionicHistory.clearHistory();
				$ionicHistory.nextViewOptions({
					disableBack: true
				});

				$state.go('tab.home');
			});

			$rootScope.$on('loggedOut', function() {
				$ionicHistory.clearHistory();
				$ionicHistory.nextViewOptions({
					disableBack: true
				});

				$state.go('tab.login');
			});
});
;
