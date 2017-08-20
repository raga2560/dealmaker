angular.module('IonicGulpSeed.deals', [])

.controller('DealDetailsController', function(dealsService,$scope,  $state, $filter, $stateParams, ionicToast, AuthService) {
		var dealId = $stateParams.id
		var editdealId = $stateParams.id
		
		var consentoruid=12345;
		var uid =  AuthService.getUser().uid;
		var youremail =  AuthService.getUser().email;
		var subbiuid = 12134154;
		var vm = angular.extend(this, {
			deal: null,
		
			consent: {
				title:'',
				type:'',
				subtype:'',
				description:'',
				startDate:'',
				endDate:'',
				consentid:'',
				uploadedimage: '',
				imagehash: '',
				uploadedpdf: '',
				pdfhash: '',
				consentmessage:'',
				creatorid :'',
				closingmessage:'',
				consentoremail:'',
				consentorid:'',
				phoneNumber: '',
				consented  : 'draft',  // draft/sent//accepted/refused
				blockchained : 'no'

				
			},
			consentblockchain : {
				consentid:'',
				blockchainid:'',
				blockchaintx:''
			},
			dynamicconsent : {
				
			},
			
			type : ['Business', 'Real Estate','Marriage', 'Dating'],
			datingtype : ['Casual', 'Outing','Intimacy', 'Other'],
			marriagetype : ['Discussion', 'Outing','Intimacy', 'Other'],
			businesstype : ['Finance', 'Software','Other'],
			realestatetype : ['Land', 'House','Apartment', 'Other'],
			
			
			consentId: $stateParams.id,
			editdealId: editdealId,
			uid: uid,
			md5hash: '',
			//createNewDeal: createNewDeal,
			deleteDeal: deleteDeal,
			deleteDeal: deleteDeal,
			//goToEditDealDetails: goToEditDealDetails,
			EditConsentDetails: EditConsentDetails,
			//saveEditDealDetails: saveEditDealDetails,
			createNewConsentdata: createNewConsentdata,
			UpdateConsentdata: UpdateConsentdata,
			AcceptConsent: AcceptConsent,
			RefuseConsent: RefuseConsent,
			SentConsent: SentConsent,
		    uploadimage: uploadimage,
			uploadpdf: uploadpdf
			
			//toggleFavorites: toggleFavorites
		});
		

		// ********************************************************************

		(function activate() {
		//	getDeal();
		})();

		$scope.$on('$ionicView.enter', function() {
			dealsService.init();
				// getDeal();
				getConsent();
				
		});
		
/*
		function goToEditDealDetails(id) {
			 //vm.entereddeal = vm.deal;
			$state.go('tab.editdeal-details', {
				id: id
			});
		}
*/		
		function deleteDeal(id) {
			dealsService.deleteDeal(id);
			$state.go('tab.deals');
		}
		
		function deleteDeal(id) {
			if(vm.dynamicconsent.data.creatorid == uid)
			{
					dealsService.deleteDeal(id);
					$state.go('tab.consents');
			}
			
			
		}
		
		function EditConsentDetails(id) {
			 //vm.entereddeal = vm.deal;
			// alert('hi');
			$state.go('tab.consent-edit', {
				id: id
			});
		}
		function getconsetorid(email) {
			return dealsService.getUserRecordByEmail(email).then(function(users) {
				//vm.dynamicconsent = consent;
				// vm.deal.isInFavorites = dealsService.isInFavorites(vm.deal.$id);
			//	console.log (angular.toJson(user));
				 angular.forEach(users, function(user) {
				console.log(user);
				vm.consent.consentorid = user.uid;
				
				})
				//vm.consent.consentorid = user.uid;
				
				
				// vm.consentId = vm.consent.$id;
				return users;
				
			})
		};
		
		
		function createNewConsentdata(){
			vm.consent.creatorid = uid;
			
			
			getconsetorid(vm.consent.consentoremail).then(function(xx){
			
				
			if(vm.consent.consentorid == null || vm.consent.consentorid=='')
			{
				alert (vm.consent.consentoremail + 'has not account');
				return;
			}
			var data = {
				data: vm.consent
			};
			dealsService.insertConsent(data);
			$state.go('tab.consents');
			
			})
			
		}
		
		function UpdateConsentdata(id){
			/*var data = {
				data: vm.consent
			}; */
			dealsService.UpdateConsentdata(id, vm.dynamicconsent);
			$state.go('tab.consents');
		}
		function AcceptConsent(id){
			/*var data = {
				data: vm.consent
			}; */
			
			dealsService.AcceptConsent(id, vm.dynamicconsent);
			$state.go('tab.consents');
		}
		
		function RefuseConsent(id){
			/*var data = {
				data: vm.consent
			}; */
			
			dealsService.RefuseConsent(id, vm.dynamicconsent);
			$state.go('tab.consents');
		}
		function SentConsent(id){
			/*var data = {
				data: vm.consent
			}; */
			
			dealsService.ConsentAction(id, vm.dynamicconsent, 'sent');
			$state.go('tab.consents');
		}
		
		function saveEditDealDetails(id) {
						
			vm.entereddeal.startDate = $filter('date')(vm.entereddeal.startDate, 'fullDate'); 
			vm.entereddeal.endDate =  $filter('date')(vm.entereddeal.endDate, 'fullDate') ; 
			//  dealsService.updateDeal(vm.deal.$id, vm.entereddeal); // working. replaced by below line
			dealsService.updateDeal(vm.deal.$ref(), vm.entereddeal);
			
			/* 
			//working
			dealsService.getDeal(id).then(function(deal) {
				dealsService.updateDeal(deal.$ref(), vm.entereddeal);
				
			})
			*/
			$state.go('tab.deal-details', {
				id: id
			});
		}
/*		
		function createNewDeal (){
			vm.entereddeal.startDate = $filter('date')(vm.entereddeal.startDate, 'fullDate'); // vm.entereddeal.startDate.binding("1288323623006 | date:'medium'")).getText();//.toJSON(); 
			vm.entereddeal.endDate =  $filter('date')(vm.entereddeal.endDate, 'fullDate') ; // vm.entereddeal.endDate.toLocaleDateString(); //.toJSON() ; //Date.UTC(vm.entereddeal.endDate);
			dealsService.createDeal(vm.entereddeal);
			$state.go('tab.deals');
		};
	*/	
		
		
		function getDeal() {
			return dealsService.getDeal(dealId).then(function(deal) {
				vm.deal = deal;
				vm.deal.isInFavorites = dealsService.isInFavorites(vm.deal.$id);
				
				
				vm.editdealId = vm.deal.$id;
				return deal;
				
			})
		};
		
		function getConsent() {
			return dealsService.getConsent(vm.consentId).then(function(consent) {
				vm.dynamicconsent = consent;
				// vm.deal.isInFavorites = dealsService.isInFavorites(vm.deal.$id);
				
				
				// vm.consentId = vm.consent.$id;
				return consent;
				
			})
		};
/*
		function toggleFavorites() {
			vm.deal.isInFavorites = !vm.deal.isInFavorites;
			if (vm.deal.isInFavorites) {
				dealsService.toggleFavorites(vm.deal.$id, true);
				ionicToast.show('\'' + vm.deal.title + '\' has been added to your Favorites', 'bottom', false, 2000);
			} else {
				dealsService.toggleFavorites(vm.deal.$id, false);
				ionicToast.show('\'' + vm.deal.title + '\' has been removed from your Favorites', 'bottom', false, 2000);
			}
		}
*/
		function hashdata (file) 
		{
    var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
       // file = this.files[0],
        chunkSize = 2097152,                             // Read in chunks of 2MB
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,
        spark = new SparkMD5.ArrayBuffer(),
        fileReader = new FileReader();

    fileReader.onload = function (e) {
        console.log('read chunk nr', currentChunk + 1, 'of', chunks);
        spark.append(e.target.result);                   // Append array buffer
        currentChunk++;

        if (currentChunk < chunks) {
            loadNext();
        } else {
            console.log('finished loading');
			vm.md5hash = spark.end();
            console.info('computed hash', vm.md5hash);  // Compute hash
			
        }
    };

    fileReader.onerror = function () {
        console.warn('oops, something went wrong.');
    };

    function loadNext() {
        var start = currentChunk * chunkSize,
            end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }

    loadNext();
};

		
		function uploadimage(file, errFiles) {
        $scope.f = file;
		
		hashdata(file);
		
        $scope.errFile = errFiles && errFiles[0];
		dealsService.uploadImage(file, file.name).then(function(url){
			vm.consent.uploadedimage = url;
			vm.consent.imagehash = vm.md5hash;
			if(vm.dynamicconsent.data)
			{
				vm.dynamicconsent.data.uploadedimage = url;
				vm.dynamicconsent.data.imagehash = vm.md5hash;
			}
			//alert(url);
		}, function(error){
			alert(error);
		})
		;
		
    }
	
	
	function uploadpdf(file, errFiles) {
        $scope.f = file;
		
		hashdata(file);
		
        $scope.errFile = errFiles && errFiles[0];
		dealsService.uploadImage(file, file.name).then(function(url){
			vm.consent.uploadedpdf = url;
			vm.consent.pdfhash = vm.md5hash;
			if(vm.dynamicconsent.data)
			{
				vm.dynamicconsent.data.uploadedpdf = url;
				vm.dynamicconsent.data.pdfhash = vm.md5hash;
			}
			//alert(url);
		}, function(error){
			alert(error);
		})
		;
		
    }
	

	}
)
.factory('dealsService', function(dataService, $q, _, localStorageService, AuthService) {
		var deals = null;
		var consents = null;
		var consentrequests = null;
		
		var uid =  AuthService.getUser().uid;
		var service = {
			init: init,
			//fetchDeals: fetchDeals,
			fetchConsents: fetchConsents,
			//getDeal: getDeal,
			getConsent: getConsent,
			//deleteDeal: deleteDeal,
			fetchConsentRequests: fetchConsentRequests,
			getDealRecord: getDealRecord,
			UpdateConsentdata: UpdateConsentdata,
			AcceptConsent: AcceptConsent,
			RefuseConsent: RefuseConsent,
			ConsentAction: ConsentAction,
			updateDeal: updateDeal,
			uploadImage: uploadImage,
			createDeal: createDeal,
			deleteDeal: deleteDeal,
			getUserRecordByEmail: getUserRecordByEmail,
			toggleFavorites: toggleFavorites,
			createUserRecord: createUserRecord,
			insertConsent: insertConsent,
			isInFavorites: isInFavorites
		};
		return service;


		
		function init() {
			
	
		}
		
		function getDealRecord(dealId) {
			return dataService.getDealRecord(dealId);
		}

		
		
		function getDeal(dealId) {
			return dataService.getDeal(dealId);
		}

		
		function getConsent(dealId) {
			return dataService.getConsent(dealId);
		}
		
		function deleteDeal(dealId) {
			return dataService.deleteDeal(dealId);
		}

		function deleteDeal(dealId) {
			return dataService.deleteDeal(dealId, uid);
		}

		
		function getUserRecordByEmail(email) {
			return dataService.getUserRecordByEmail(email);
		}
		
		function UpdateConsentdata(dealref, msg) {
	
			return dataService.UpdateConsentdata(dealref, msg);
		}
		
		function AcceptConsent(dealref, msg) {
	
			return dataService.AcceptConsent(dealref, msg);
		}
		
		
		function RefuseConsent(dealref, msg) {
	
			return dataService.RefuseConsent(dealref, msg);
		}
		
		function ConsentAction(dealref, msg, status) {
	
			return dataService.ConsentAction(dealref, msg, status);
		}
		
		function updateDeal(dealId, msg) {
	
			return dataService.updateDeal(dealId, msg);
		}
		function createDeal( msg) {
	
			return dataService.createDeal( msg);
		}
		
		function insertConsent( msg) {
	
			return dataService.insertConsent( msg);
		}
		
		function createUserRecord( msg) {
	
			return dataService.createUserRecord( msg);
		}
		
		
		function uploadImage(file, filename)
		{
			return dataService.uploadImage(file, filename);
		}
/*		
		function getDeals() {
			if (!deals) {
				return dataService.getDeals().then(function(items) {
					deals = items;

					var favorites = localStorageService.get('favoritesDeals') || [];
					_.each(items, function(item) {
						if (favorites.indexOf(item.$id) >= 0) {
							item.isInFavorites = true;
						}
					});
					return items;
				});
			}
			return $q.when(deals);
		}
*/
		function getConsents(uid, status) {
			if (!consents) {
				return dataService.getConsents(uid, status).then(function(items) {
					consents = items;
					//alert(angular.toJson(items));

					/*
					var favorites = localStorageService.get('favoritesDeals') || [];
					_.each(items, function(item) {
						if (favorites.indexOf(item.$id) >= 0) {
							item.isInFavorites = true;
						}
					}); */
					return items; 
				});
			}
			return $q.when(consents);
		}
		
		
		function getRequests(uid, status) {
			if (!consentrequests) {
				return dataService.getRequests(uid, status).then(function(items) {
					consentrequests = items;
				//	alert(angular.toJson(items));

					/*
					var favorites = localStorageService.get('favoritesDeals') || [];
					_.each(items, function(item) {
						if (favorites.indexOf(item.$id) >= 0) {
							item.isInFavorites = true;
						}
					}); */
					return items; 
				});
			}
			return $q.when(consentrequests);
		}
		

		function fetchConsents(filter, showFavorites) {
			filter = filter ? filter.toLowerCase() : filter;
			return getConsents(uid, 'draft').then(function(deals) {
				var filteredDeals = _.filter(deals, function(deal) {
					return (!filter || deal.title.toLowerCase().indexOf(filter) >= 0)
						&& (!showFavorites || deal.isInFavorites);
				});

				return $q.when(filteredDeals);
			});
		}
		
		function fetchConsentRequests(filter, showFavorites) {
			filter = filter ? filter.toLowerCase() : filter;
			return getRequests(uid, 'draft').then(function(deals) {
				var filteredDeals = _.filter(deals, function(deal) {
					return (!filter || deal.title.toLowerCase().indexOf(filter) >= 0)
						&& (!showFavorites || deal.isInFavorites);
				});

				return $q.when(filteredDeals);
			});
		}


/*		
		function fetchDeals(filter, showFavorites) {
			filter = filter ? filter.toLowerCase() : filter;
			return getDeals().then(function(deals) {
				var filteredDeals = _.filter(deals, function(deal) {
					return (!filter || deal.title.toLowerCase().indexOf(filter) >= 0)
						&& (!showFavorites || deal.isInFavorites);
				});

				return $q.when(filteredDeals);
			});
		}
*/
		function toggleFavorites(dealId, toggle) {
			_.each(deals, function(deal) {
				if (deal.$id === dealId) {
					deal.isInFavorites = toggle;

					var favorites = localStorageService.get('favoritesDeals') || [];
					if (toggle) {
						favorites.push(deal.$id);
						favorites = _.uniq(favorites);
					} else {
						favorites = _.filter(favorites, function(item) {
							return item != deal.$id;
						});
					}
					localStorageService.set('favoritesDeals', favorites);
				}
			});
		};

		function isInFavorites(id) {
			var favorites = localStorageService.get('favoritesDeals');
			return _.indexOf(favorites, id) >= 0;
		}
	}
)
	.controller('DealsController', function($state, dealsService, $location,$anchorScroll,$timeout, $ionicScrollDelegate, $ionicListDelegate, $scope, AuthService) {
		var vm = angular.extend(this, {
			deals: [],
			consents: [],
			consentrequests: [],
			filter: null,
			favorites: false,
			//goToDealDetails: goToDealDetails,
			goToConsentDetails: goToConsentDetails,
			goToEditConsentDetails: goToEditConsentDetails,
			//gotoDealRequests: gotoDealRequests,
			//goToEditDealDetails: goToEditDealDetails,
			//goToNewDealDetails: goToNewDealDetails,
			//goToNewImageDetails: goToNewImageDetails,
			gotoConsentedDeals:gotoConsentedDeals,
			gotoDraftDeals:gotoDraftDeals,
			//showFavorites: showFavorites,
			//showAll: showAll,
			//filterChanged: filterChanged,
			//addFavorites: addFavorites,
			init: init
			//removeFavorites: removeFavorites
		});
		var uid =  AuthService.getUser().uid;
		var youremail =  AuthService.getUser().email;
		var subbiuid = 12134154;
		
		var testdata = [
			 {
				title:'Sample proposal to buy house #234 in jayanagar',
				type:'Real Estate',
				subtype:'House',
				description:'The house price has been negotiated for 2 Crore rupees. The advance of 20 Lacs Rs has been paid to Subbi Kappa.',
				startDate:'',
				endDate:'',
				consentid:'',
				uploadedimage: '',
				imagehash: '',
				uploadedpdf: '',
				pdfhash: '',
				consentmessage:'',
				creatorid :uid,
				closingmessage:'Have good day',
				consentoremail:'subbikappa123@gmail.com',
				consentorid:'subbikappa',
				phoneNumber: '123456',
				consented  : 'draft',  // draft/sent//accepted/refused
				blockchained : 'no'

				
			},
			 {
				title:'Sample dating proposal to go for movie',
				type:'Dating',
				subtype:'Outing',
				description:'I would like to go with you for a movie.',
				startDate:'',
				endDate:'',
				consentid:'',
				uploadedimage: '',
				imagehash: '',
				uploadedpdf: '',
				pdfhash: '',
				consentmessage:'',
				creatorid :subbiuid,
				closingmessage:'Have good day',
				consentoremail:youremail,
				consentorid:uid,
				phoneNumber: '123456',
				consented  : 'sent',  // draft/sent//accepted/refused
				blockchained : 'no'

				
			}
		];

		//*********************************************
		
		

		(function activate() {
			// fetchDeals();
			
		})();
		
		
		
		
		$scope.$on('$ionicView.enter', function() {
			dealsService.init();
			//fetchDeals();
			fetchConsents();
			fetchConsentRequests();
			
			
			
		});
		
		$scope.anchorScroll = function() {
		$ionicScrollDelegate.anchorScroll(true);
		};
  
		$scope.scrollBottom = function() {
		$ionicScrollDelegate.scrollBottom(true);
		};
  
		
		
		function init()
		{
			dealsService.init();
			
		}
		
		function LoadNewUserdata(){
			_.each(testdata, function(mydata) {
				
			
			var data = {
				data: mydata
			};
			
			dealsService.insertConsent(data);			
			
			});
			
			
						
		}
		
		function gotoDraftDeals() {
			 
			$location.hash('draftdeals');
			$anchorScroll();
		}

		
		function gotoConsentedDeals() {
			 
			$location.hash('consenteddeals');
			$anchorScroll();
		}
		
		function gotoDealRequests() {
			 
			$location.hash('incomingdeals');
			$anchorScroll();
		}
/*		
		function goToNewDealDetails() {
			 
			$state.go('tab.newdeal-details');
		}
		function goToNewImageDetails() {
			 
			$state.go('tab.newimage-details');
		}
		

		function fetchDeals() {
			dealsService.fetchDeals(vm.filter, vm.favorites).then(function(items) {
				vm.deals = items;
			})
		}
*/
		function fetchConsents() {
			dealsService.fetchConsents(vm.filter, vm.favorites).then(function(items) {
				vm.consents = items;
			
			if(vm.consents.length == 0)
			{
				LoadNewUserdata();
			}	
				
			})
		}

		
		function fetchConsentRequests() {
			dealsService.fetchConsentRequests(vm.filter, vm.favorites).then(function(items) {
				vm.consentrequests = items;
			})
		}
		
/*
		function goToDealDetails(id) {
			$state.go('tab.deal-details', {
				id: id
			});
		}
		function goToEditDealDetails(id) {
			$state.go('tab.editdeal-details', {
				id: id
			});
		}
		
*/
		function goToConsentDetails(id) {
			$state.go('tab.consent-view', {
				id: id
			});
		}
		function goToEditConsentDetails(id) {
			$state.go('tab.consent-edit', {
				id: id
			});
		}
/*
		function filterChanged() {
			fetchDeals();
		}

		function addFavorites(deal, dealId) {
			deal.stopPropagation();
			dealsService.toggleFavorites(dealId, true);
			$ionicListDelegate.closeOptionButtons();
		}

		function removeFavorites(dealId) {
			dealsService.toggleFavorites(dealId, false);
			showFavorites();
		}

		function showFavorites() {
			vm.favorites = true;
			fetchDeals();
		}

		function showAll() {
			vm.favorites = false;
			fetchDeals();
		}
*/
	}
);
