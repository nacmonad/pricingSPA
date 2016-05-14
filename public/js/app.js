var app = angular.module('PricingApp', ['ngAnimate','ngSanitize','counter']);

app.controller('MainCtrl', function ($scope, $element, $timeout) {

	$scope.essayBool = true;
	$scope.presBool = false;
	$scope.dissBool = false;
	$scope.heads = ["What is your <br> deadline?", "High School", "College", "University", "Master's","PhD"];
	//these three are needed for the mapDeadline to work properly... 
	$scope.dateNow = new Date();
	$scope.tempDate = new Date();
	$scope.temp2Date = new Date();
	
	$scope.selectedDeadline;
	$scope.difficultyLevel;
	$scope.mappedDeadline;

	//menu control
	$scope.showEssay = function () {
		$scope.presBool = false;
		$scope.dissBool = false;
		$scope.essayBool = true;
	}
	$scope.showPres = function () {
		$scope.essayBool = false;
		$scope.dissBool = false;
		$scope.presBool = true;
	}
	$scope.showDiss = function () {
		$scope.essayBool = false;
		$scope.presBool = false;
		$scope.dissBool = true;
	}

	$scope.mapDeadline = function () {
	
		$scope.mappedDeadline = [
			dateFormat($scope.tempDate.setHours($scope.tempDate.getHours() + 7), "dddd mmmm dS, h:00 TT"), 
			dateFormat($scope.tempDate.setHours($scope.tempDate.getHours() + 6), "dddd mmmm dS, h:00 TT"), 
			dateFormat($scope.tempDate.setHours($scope.tempDate.getHours() + 12), "dddd mmmm dS, h:00 TT"),
			dateFormat($scope.tempDate.setHours($scope.tempDate.getHours() + 24), "dddd mmmm dS, h:00 TT"),
			dateFormat($scope.tempDate.setHours($scope.tempDate.getHours() + 24), "dddd mmmm dS, h:00 TT"),
			dateFormat($scope.tempDate.setHours($scope.tempDate.getHours() + 24), "dddd mmmm dS, h:00 TT"),
			"After " + dateFormat($scope.tempDate.setHours($scope.tempDate.getHours() + 24), "dddd mmmm dS"),
			dateFormat( $scope.temp2Date.setHours( $scope.temp2Date.getHours() + 72), "dddd mmmm dS" ) + " and " + dateFormat($scope.temp2Date.setHours($scope.temp2Date.getHours() + 96),"dddd mmmm dS"),
			"After " + dateFormat($scope.temp2Date.setHours($scope.temp2Date.getHours() + 24), "dddd mmmm dS") ];

	}

	$scope.mapDeadline();



	//table cell listen events
	
		$scope.$on('cell-activated', function (event, args) {
					
					$scope.selectedDeadline = args.deadline;
					$scope.difficultyLevel = args.level;
					$scope.$apply();
				})
	

})

.controller('EssayCtrl', function ($scope, $element, $attrs) {
	//these can be individually adjusted, although essay/presentation the same
	$scope.deadlines = [
			{deadline: 0.25, text:"< 6 hours"},
			{deadline: 0.5, text:"< 12 hours"},
			{deadline: 1, text:"< 24 hours"},
			{deadline:2, text:"Within 2 days"},
			{deadline:3, text:"Within 3 days"},
			{deadline:4, text:"Within 4 days"},
			{deadline:5, text:"Within 5 or more days"}];

			
})
.controller('PresCtrl', function ($scope, $element) {
	
	$scope.deadlines = [
			{deadline: 0.25, text:"< 6 hours"},
			{deadline: 0.5, text:"< 12 hours"},
			{deadline: 1, text:"< 24 hours"},
			{deadline:2, text:"Within 2 days"},
			{deadline:3, text:"Within 3 days"},
			{deadline:4, text:"Within 4 days"},
			{deadline:5, text:"Within 5 or more days"}];


})
.controller('DissCtrl', function ($scope, $element) {
	
	$scope.deadlines = [
			{deadline:6, text:"In 3-7 days"},
			{deadline:8, text:"In 8+ days"},
			];
})

.controller('PriceWdgtCtrl', function ($scope, $element, $http) {
	$scope.formData = {};
	$scope.formData.pricePerPage = 20.00;
	$scope.formData.pages = 1;
	$scope.formData.words = 300;
	$scope.formData.totalCost = 420.00;
	$scope.formData.currencyType = "CAD";
	
	$scope.freeWithOrder = ["Bibliography and Title","Unlimited revisions","Formatting","Proofreading","Assignment Scheduler"]
	$scope.pageBool = true;
	
	//$http.get('http://api.fixer.io/latest?base=USD').then(
	//	function successCb(res) {
	//		$scope.formData.fxusd = res.data;
	//		console.log("USDCAD = " + $scope.formData.fxusd.rates.CAD);
	//	}, function errorCb(res) {
	//		console.log("err : " + res);
	//	});
	
	$scope.pageActivate = function () {
		$scope.pageBool = true;
		console.log("pageactivate! pages: " + $scope.formData.pages + "words: " + $scope.formData.words);
		$scope.formData.pages = $scope.formData.words/300;
		}
	$scope.wordActivate = function () {
		$scope.pageBool = false;
		console.log("wordactivate! pages: " + $scope.formData.pages + "words: " + $scope.formData.words);
		$scope.formData.words = $scope.formData.pages*300;

	}
	$scope.counterFinish = function () {
		console.log("done counting");
	}
	

	$scope.$watch(function () { 
		return $scope.formData.pages * $scope.formData.pricePerPage }, function (newValue,oldValue) {
			$scope.formData.oldCost = oldValue;
			$scope.formData.totalCost = newValue;
	});
	$scope.$watch(function () { 
		return $scope.formData.words}, function () {
		$scope.formData.pages = $scope.formData.words/300;
		$scope.formData.totalCost = $scope.formData.pages * $scope.formData.pricePerPage;
	});
})

.directive('myCell', function() {
	return {
		restrict: 'A',
		scope: true,
		controller: ['$scope','$element','$timeout', function ($scope, $element,$timeout) {
			//$timeout(function() {
				//console.log("hello " + $scope.deadline.deadline + " , " + $scope.level);    //angular automatically goes to the parrent scope controller (EssayCtrl, PresCtrl, DissCtrl) to get deadline.deadline
			
			//});  
			

		}],
		link: function(scope,element,attrs) {
				scope.level = attrs.level;
				angular.element(element[0]).bind('click', function () {
					angular.element($("[my-cell]")).removeClass('active');
					element.toggleClass('active');
					angular.element($("tbody tr")).removeClass('cross');
					element.parent().toggleClass('cross');
					scope.$emit('cell-activated', { deadline: scope.deadline.deadline , level: scope.level});
					
				});
		}
	}
})
.directive('popWrap', function() {
	return {
		restrict: 'A',
		scope: true,
		controller: ['$scope','$element','$timeout', function ($scope, $element,$timeout) {
			$timeout(function() {
				//console.log("hello popwrap");    //angular automatically goes to the parrent scope controller (EssayCtrl, PresCtrl, DissCtrl) to get deadline.deadline
			
			});  
		}],
		link: function(scope,element,attrs) {
				
		}
	}
});