angular.module('IonicGulpSeed.firebaseDataService', [])

.constant('ENV',   {
						name: 'development',
						dataProvider: 'FIREBASE', // LOCAL | REMOTE | FIREBASE
						// REMOTE / LOCAL URLS
						// In the case of REMOTE or LOCAL a URI should be set.
						// Examples:
						 apiUrl: 'misc/data.json', // for LOCAL
						// apiUrl: 'http://appseed.io.s3.amazonaws.com/mobile-apps/conference/data.json', // for REMOTE
						
						firebaseConfig: {
						apiKey: "AIzaSyB3uqv_ZDfYd6zJhSRavhQ5IoRiaI8c-Mg",
						authDomain: "the-deal-maker.firebaseapp.com",
						databaseURL: "https://the-deal-maker.firebaseio.com",
						projectId: "the-deal-maker",
						storageBucket: "the-deal-maker.appspot.com",
						messagingSenderId: "60029212930"
	
						},
						ionicAppId: '2c646baf',
						gcmId: '60029212930' 
					}
			/*
	
	

						firebaseConfig: {
							apiKey: "AIzaSyD1gkNz4pdV9ZWJHezP59OjMm0-TQ2G8pI",
							authDomain: "sociallogindemo-35b63.firebaseapp.com",
							    databaseURL: "https://sociallogindemo-35b63.firebaseio.com",
    							projectId: "sociallogindemo-35b63",
    							storageBucket: "sociallogindemo-35b63.appspot.com",
    							messagingSenderId: "729675561056"
	
						},
						ionicAppId: '2c646baf',
						gcmId: '729675561056' 
					}
				*/	
	
	
	
)
		
.factory('db', ['ENV', function(ENV) {
			firebase.initializeApp(ENV.firebaseConfig);

			var rootRef = firebase.database().ref();
			return rootRef;
}])

.factory('stor', ['ENV', function(ENV) {
			// firebase.initializeApp(ENV.firebaseConfig);

			var storageRef = firebase.storage().ref();
			return storageRef;
}])
.factory('firebaseDataService', function(_, db, stor, $q, $firebaseArray, $firebaseObject) {
		
		var service = {
		//	getDeals: getDeals,
			getConsents: getConsents,
			getConsent: getConsent,
		//	getDeal: getDeal,
			getDealRecord: getDealRecord,
		//	deleteDeal:deleteDeal,
		//	updateDeal: updateDeal,
			UpdateConsentdata: UpdateConsentdata,
			ConsentAction: ConsentAction,
			AcceptConsent: AcceptConsent,
			RefuseConsent: RefuseConsent,
			getRequests: getRequests,
			createDeal: createDeal,
			deleteDeal: deleteDeal,
			createUserRecord: createUserRecord,
			getUserRecordByEmail: getUserRecordByEmail,
			getUserRecordByUid : getUserRecordByUid,
			insertConsent: insertConsent,
			uploadImage: uploadImage,
			init: init
		};
	
		return service;

		// ***********************************************************

		function init() {}
		
		
		function getDeals() {
			var query = db.child('deals');
			return $firebaseArray(query).$loaded();
		}
		
		function getConsents(uid, status) {
			
				
			// https://firebase.google.com/docs/reference/js/firebase.database.Query
			
			// this is better https://stackoverflow.com/questions/26700924/query-based-on-multiple-where-clauses-in-firebase
			
			var query = db.child('consents').orderByChild('data/creatorid').equalTo(uid).limitToLast(5);;
			
			 
			return $firebaseArray(query).$loaded();
			
		}
		function getRequests(uid, status) {
			
				
			// https://firebase.google.com/docs/reference/js/firebase.database.Query
			
			// this is better https://stackoverflow.com/questions/26700924/query-based-on-multiple-where-clauses-in-firebase
			
			var query = db.child('consents').orderByChild('data/consentorid').equalTo(uid).limitToLast(5);;
			
			 
			return $firebaseArray(query).$loaded();
			
		}
		

		function getConsent(dealId) {
			var query = db.child('consents/' + dealId);
			return $firebaseObject(query).$loaded();
		}
		
		function getDeal(dealId) {
			var query = db.child('deals/' + dealId);
			return $firebaseObject(query).$loaded();
		}
		
		function getDealRecord(dealId) {
		
			var query = db.child('deals');
			 return $firebaseArray(query).$loaded().then(function(tasks) {

    
			console.log(tasks.$getRecord(dealId));
			});
  
  
		}

		function updateDeal(dealref, dealmessage) {
			// Below 2 line was earlier
			//var dbref = firebase.database().ref('deals/' +dealId);
			//dbref.update( dealmessage);
			
			// This is better 
			dealref.update( dealmessage);
		}
		
		
		function UpdateConsentdata(dealref, dealmessage) {
			// Below 2 line was earlier
			// alert (angular.toJson(dealref));
			console.log (angular.toJson(dealmessage));
			
			var dbref = firebase.database().ref('consents/' +dealref);
			var test = {
				data: dealmessage.data
			};
			dbref.update( test);	
			
			// This is better 
			//dealref.update( test);
		}
		
		
		function AcceptConsent(dealref, dealmessage) {
			// Below 2 line was earlier
			// alert (angular.toJson(dealref));
			//console.log (angular.toJson(dealmessage));
			
			
			db.child('consents/'+dealref+'/data/consented').set('accepted');
			
			// This is better 
			//dealref.update( test);
		}
		
		function RefuseConsent(dealref, dealmessage) {
			// Below 2 line was earlier
			// alert (angular.toJson(dealref));
			//console.log (angular.toJson(dealmessage));
			
			
			db.child('consents/'+dealref+'/data/consented').set('refused');
			
			// This is better 
			//dealref.update( test);
		}
		
		function ConsentAction(dealref, dealmessage, status) {
			// Below 2 line was earlier
			// alert (angular.toJson(dealref));
			//console.log (angular.toJson(dealmessage));
			
			
			db.child('consents/'+dealref+'/data/consented').set(status);
			
			// This is better 
			//dealref.update( test);
		}
		
		
		
		
		
		function uploadImage(file, fileName) {
			var deferred = $q.defer();
			var fileRef = stor.child('images/'+fileName);
			var uploadTask = fileRef.put(file);
 
			uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
			function(snapshot) {
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log('Upload is ' + progress + '% done');
			switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING:
              console.log('Upload is running');
              break;
			}
			}, 
			function(error) {
			switch (error.code) {
           case 'storage/unauthorized':
               deferred.reject('User does not have permission to access the object.');
               break;
           case 'storage/canceled':
               deferred.reject('User canceled the upload.');
               break;
           case 'storage/unknown':
               deferred.reject(' Unknown error occurred, Please try later.');
               break;
			}
		}, function() {
            deferred.resolve(uploadTask.snapshot.downloadURL);
		});
 
		return deferred.promise;
		}

		
		function createDeal( dealmessage) {
			// alert(angular.toJson(dealmessage));
			
			db.child('deals').push().set(dealmessage);

			

		}
		// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
		function uuidv41() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
		}
		
		function uuidv4() {
		return ([1e7]+-1e3+-4e3+-8e8+-1e8).replace(/[018]/g, c =>
			(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
		)
		}

		// This is useful for creating drafts.

		function insertConsent( consentmessage) {
		
			consentmessage.data.consentid = uuidv4();
		
			db.child('consents').child(consentmessage.data.consentid).set(consentmessage);
			
		}
		
		// useful for sent, received, draft. Benefit is fast access. This is just a copy
		function insertlocalConsent( consentmessage, uid) {
		
			db.child(uid).child('consents').push().set(consentmessage);   
			
		}
		
		function getlocalConsents(  uid) {
		
			var query = db.child(uid).child('consents');
			return $firebaseArray(query).$loaded();
		
		}
		

		function updateConsent(consentref, consentmessage) {

			
			consentref.update( consentmessage);
			
		}

		// For this user, get all consents raised by this user. It may have drafts, approved, etc
		function getUsersConsents(uid) {
			var query = db.child('consents/data/creatorid').equalTo(uid);
			
			return $firebaseObject(query).$loaded();
		}
		
		
		// For this user, get all consents raised by this user. It may have refused, approved, etc
		function getIncomingConsents(uid) {
			var query = db.child('consents/data/consentorid').equalTo(uid);
			
			return $firebaseObject(query).$loaded();
		}
		
		
		

		
		function createUserRecord( urecord) {
			//alert(angular.toJson(dealmessage));
			
			db.child('userrecord').push().set(urecord);

			

		}
		
		// https://howtofirebase.com/collection-queries-with-firebase-b95a0193745d
		
		function getUserRecordByEmail(email) {
			
			var query = db.child('userrecord').orderByChild('email').equalTo(email).limitToLast(1);
			
			return $firebaseObject(query).$loaded();
		}
		
		function getUserRecordByUid(uid) {
			var query = db.child('userrecord/uid').equalTo(uid);
			return $firebaseObject(query).$loaded();
		}
		
		function deleteDeal(dealId) {

			var dbref = firebase.database().ref('deals/' +dealId);
			dbref.remove( );
			
		}
		
		function deleteDeal(dealId, uid) {

			
			var dbref = firebase.database().ref('consents/' +dealId);
			dbref.remove( );
			
		}
		

	}
);
