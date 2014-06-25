angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, Camera, formDataObject,fileReader, $http) {

	  $scope.getPhoto = function() {
		  Camera.getPicture().then(function(imageURI) {
			  $scope.lastPhoto = imageURI;
		  }, function(err) {
			  console.err(err);
		  }, {
		      quality: 25,
		      targetWidth: 320,
		      targetHeight: 320,
		      saveToPhotoAlbum: false
		  });
	  };
	  
	  $scope.submit = function() {
		  
		  fileReader.readAsDataUrl($scope.lastPhoto).then(function(fileInfo) {
		      
			  return $http({
				  method: 'POST',
			      url: 'url/to/service',
			      headers: {
			    	  'Content-Type':undefined,
			    	  'Authorization': 'Basic ' + btoa("user:password")
			      },
			      data: {
			    	  file: fileInfo,
			    	  input: "{'json': 'ifNeeded'}"
			      },
			      transformRequest: formDataObject
			  })
			  .success(function(data, status, headers, config) {
			    	console.log("success");
			  })
			  .error(function(data, status, headers, config) {
			    	  console.log(data);
			  });
		      
		  }, function(err) {
		    	console.err(err);
		  });    
	  };
})
