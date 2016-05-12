var app = angular.module('PricingApp', ['ngAnimate','ngSanitize']);

app.controller('MainCtrl', function ($scope, $element, $timeout) {

	$scope.essayBool = true;
	$scope.presBool = false;
	$scope.dissBool = false;
	$scope.heads = ["What is your <br> deadline?", "High School", "College", "University", "Master's","PhD"];
	$scope.dateNow = new Date();
	$scope.selectedDeadline;
	$scope.difficultyLevel;
	$scope.mappedDeadline;

	//menu control
	$scope.showEssay = function () {
		$scope.presBool = false;
		$scope.dissBool = false;
		$scope.essayBool = true;
		console.log("essayBool onw true");

	}
	$scope.showPres = function () {
		$scope.essayBool = false;
		$scope.dissBool = false;
		$scope.presBool = true;
		console.log("presyBool now true")

	}
	$scope.showDiss = function () {
		$scope.essayBool = false;
		$scope.presBool = false;
		$scope.dissBool = true;
		console.log("diss Bool now true")

	}

	$scope.mapDeadline = function () {
		console.log($scope.dateNow);
		$scope.mappedDeadline = ["Computed DL1", "Computed D2", "Computed DL3","Computed DL4","Computed DL5","Computed DL6","Computed DL7","Computed DL8","Computed DL9" ];
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

.controller('PriceWdgtCtrl', function ($scope, $element) {
	console.log("derp im the price widget!");

	$scope.pricePerPage = 20.00;
	$scope.numberOfPages = 1;
	$scope.numberOfWords = 250;
	$scope.totalCost = 420.00;
	$scope.currencyType = "CAD";
	$scope.freeWithOrder = ["Bibliography and Title","Unlimited revisions","Formatting","Proofreading","Assignment Scheduler"]
	$scope.pageBool = true;


	$scope.pageActivate = function () {
		$scope.pageBool = true;
		$scope.numberOfPages = $scope.numberOfWords/300;
		console.log("pageactivate!" + $scope.numberOfPages);

		}
	$scope.wordActivate = function () {
		$scope.pageBool = false;
		$scope.numberOfWords = 300*$scope.numberOfPages;
		console.log("wordactivate! " + $scope.numberOfWords);

	}



	$scope.$watch('numberOfPages', function () {
		console.log("page change");
		$scope.numberOfWords = 300 * $scope.numberOfPages;
	});
	$scope.$watch('numberOfWords', function () {
		console.log("wordcnt change");
		$scope.numberOfPages = $scope.numberOfWords/300;;
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