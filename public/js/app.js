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
	$scope.deadlines = [{deadline:5, text:"In 3-11 hours"},
			{deadline:15, text:"In 12-24 hours"},
			{deadline:30, text:"In 2 days"},
			{deadline:50, text:"In 4 hours"},
			{deadline:100, text:"In 1 week"},
			{deadline:200, text:"In 2 weeks"}];

			$scope.$on('cell-activated', function (event, args) {
				console.log("cell " + args.deadline + ", " + args.level);

			});
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
					scope.$emit('cell-activated', { deadline: scope.deadline.deadline , level: scope.level});
					
				});
		}
	}
})

.controller('PresCtrl', function ($scope, $element) {
	$scope.heads = ["When you need <br> it to be done?", "High School", "College", "University", "Master's"];
	$scope.deadlines = [{deadline:5, text:"In 3-11 hours"},
			{deadline:15, text:"In 12-24 hours"},
			{deadline:30, text:"In 2 days"},
			{deadline:50, text:"In 4 hours"},
			{deadline:100, text:"In 1 week"},
			{deadline:200, text:"In 2 weeks"}];

	console.log($element[0]);
})
.controller('DissCtrl', function ($scope, $element) {
	$scope.heads = ["When you need <br> it to be done?", "Master's", "PhD"];
	$scope.deadlines = [{deadline:5, text:"In 3-11 hours"},
			{deadline:120, text:"In 3-7 days"},
			{deadline:240, text:"In 8+ days"},
			];

	console.log($element[0]);
});