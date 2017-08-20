angular.module('IonicGulpSeed.fileDataService', [])

		
.factory('fileDataService', function($http, $q, _, ENV) {
		var url = ENV.apiUrl;
		var cache = null;

		var service = {
			getEvents: getEvents,
			getEvent: getEvent,
			updateEvent: updateEvent,
			init: init
		};
	
		
		
		init();
	
		return service;
			
		
		// ******************************************************************

		function setInternalIds(collections) {
			_.each(collections, function(collection) {
				_.each(cache[collection], function(item, $id) {
					item.$id = $id;
				});
			});
		}

	
		function init() {
			
			return $http.get(url).then(function(response) {
		//		alert(angular.toJson(response.data));
				cache = response.data;
				setInternalIds(['events']);
			});
		}

		
	
		function getEvents() {
	
			return $q.when(cache.events);
			
			
		}

		function getEvent(eventId) {
			return $q.when(cache.events[eventId]);
		}

	
	}
);