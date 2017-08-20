angular.module('IonicGulpSeed.dataService', [])

.factory('dataService', function(ENV, $injector) {
	
			return $injector.get('firebaseDataService');
	/*
		switch(ENV.dataProvider) {
			case 'LOCAL':
				return $injector.get('fileDataService');
			case 'REMOTE':
				return $injector.get('fileDataService');
			case 'FIREBASE':
				return $injector.get('firebaseDataService');
		}

		throw new Error('Data provider is not valid');
		*/
	}
);
