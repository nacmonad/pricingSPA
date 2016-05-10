var app = angular.module('PricingApp', ['ngAnimate','ngSanitize']);

app.controller('MainCtrl', function ($scope, $element) {

	$scope.essayBool = true;
	$scope.presBool = false;
	$scope.dissBool = false;

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
})

.controller('EssayCtrl', function ($scope, $element, $attrs) {
	$scope.heads = ["When you need <br> it to be done?", "High School", "College", "University", "Master's"];
	$scope.deadlines = [
			{deadline:15, text:"< 6 hours"},
			{deadline:30, text:"< 12 hours"},
			{deadline:50, text:"< 24 hours"},
			{deadline:100, text:"Within 2 days"},
			{deadline:150, text:"Within 3 days"},
			{deadline:200, text:"Within 4 days"},
			{deadline:300, text:"Within 5 or more days"}];

			$scope.$on('cell-activated', function (event, args) {
				console.log("cell " + args.deadline + ", " + args.level);

			});
})
.controller('PresCtrl', function ($scope, $element) {
	$scope.heads = ["When you need <br> it to be done?", "High School", "College", "University", "Master's"];
	$scope.deadlines = [
			{deadline:50, text:"< 24 hours"},
			{deadline:100, text:"Within 2 days"},
			{deadline:150, text:"Within 3 days"},
			{deadline:200, text:"Within 4 days"},
			{deadline:300, text:"Within 5 or more days"}];

	console.log($element[0]);
})
.controller('DissCtrl', function ($scope, $element) {
	$scope.heads = ["When you need <br> it to be done?", "Master's", "PhD"];
	$scope.deadlines = [
			{deadline:200, text:"In 3-7 days"},
			{deadline:300, text:"In 8+ days"},
			];

	console.log($element[0]);
})
.directive('myCell', function() {
	return {
		restrict: 'A',
		scope: true,
		controller: ['$scope','$element','$timeout', function ($scope, $element,$timeout) {
			$timeout(function() {
				console.log("hello " + $scope.deadline.deadline + " , " + $scope.level);    //angular automatically goes to the parrent scope controller (EssayCtrl, PresCtrl, DissCtrl) to get deadline.deadline
			
			});  
			

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
				console.log("hello popwrap");    //angular automatically goes to the parrent scope controller (EssayCtrl, PresCtrl, DissCtrl) to get deadline.deadline
			
			});  
		}],
		link: function(scope,element,attrs) {
				
		}
	}
});