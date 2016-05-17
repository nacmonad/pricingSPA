var app = angular.module('PricingApp', ['ngAnimate','ngSanitize','counter','ngSlider','ui.bootstrap']);

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

	$scope.additionalOne = {
		title: "Plagiarism Report",
		icon: "fa fa-flag-o",
		price: 29.99,
		items: ["Plagiarism report", "Top writer assigned", "Receive drafts"]
	}
	$scope.additionalTwo = {
		title: "Copies of Cited Scholarly Articles",
		icon: "fa fa-file-pdf-o",
		price: 39.99,
		items: ["Copies of Cited Scholarly Articles", "PDF copies", "MIT License autographed by Aaron Swartz?"]
	}

	//form data
	$scope.formData = {};
	$scope.formData.pages = 1;
	$scope.formData.words = 300;
	$scope.formData.totalCost = 420.00;
	$scope.formData.currencyType = "CAD";

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
				});
	
	$scope.$on('add-option', function (event, args) {
		console.log(event);
		console.log(args);
		$scope.formData.totalCost += args.optionPrice;
	});
	$scope.$on('remove-option',  function (event, args) {
		console.log(event);
		console.log(args);
		$scope.formData.totalCost -= args.optionPrice;
	});
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

.controller('PriceWdgtCtrl', function ($scope, $element, $timeout) {
	$scope.initializing = true;
	
	
	$scope.freeWithOrder = ["Bibliography and Title","Unlimited revisions","Formatting","Proofreading","Assignment Scheduler"]
	$scope.pageBool = true;
	
	$scope.sliderOptions = {
		from: "0",
		to: "100",
		step: "1",
		round: "1",
		skin: "round",
		callback: function (value, released) {
				$scope.$parent.formData.pages = parseInt(value);
				$scope.$parent.formData.words = ($scope.$parent.formData.pages*300);
				angular.element('i.range')[0].style.width = value + "%";
				$scope.$apply();
		}
	};

	$scope.value = $scope.$parent.formData.pages.toString();


	$scope.pageActivate = function () {
		$scope.pageBool = true;
		$scope.$parent.formData.pages = $scope.$parent.formData.words/300;
		}
	$scope.wordActivate = function () {
		$scope.pageBool = false;
		$scope.$parent.formData.words = ($scope.$parent.formData.pages*300);

	}
	$scope.counterFinish = function () {
		console.log("done counting");
	}
	$scope.orderNow = function () {
		console.log($scope.$parent.formData);
	}
	
	

	$scope.$watch(function () { 
		return $scope.$parent.formData.pages * $scope.$parent.formData.pricePerPage }, function (newValue,oldValue) {
			$scope.$parent.formData.oldCost = oldValue;
			$scope.$parent.formData.totalCost = newValue;
			$scope.$parent.formData.pages ? ( $scope.$parent.formData.pages <= 100 ? $scope.value = $scope.$parent.formData.pages.toString() : $scope.value = "100" ) : $scope.value = "0";
			$scope.$parent.formData.words = $scope.$parent.formData.pages*300;
			//the fix for manipulating/watching after load
			if ($scope.initializing) {
				$timeout(function() {
					$scope.initializing = false; 
					angular.element('i.range')[0].style.width = $scope.value + "%";
					angular.element('.jslider-pointer')[0].style.left = $scope.value + "%";});
			}
			else {
				angular.element('i.range')[0].style.width = $scope.value + "%";
				angular.element('.jslider-pointer')[0].style.left = $scope.value + "%";
			}
			
	});
	$scope.$watch(function () { 
		return $scope.$parent.formData.words}, function () {
		$scope.$parent.formData.pages = $scope.$parent.formData.words/300;
		$scope.$parent.formData.pages ? ( $scope.$parent.formData.pages <= 100 ? $scope.value = $scope.$parent.formData.pages.toString() : $scope.value = "100" ) : $scope.value = "0";
		$scope.$parent.formData.totalCost = $scope.$parent.formData.pages * $scope.$parent.formData.pricePerPage;
		//the fix for manipulating/watching after load
			if ($scope.initializing) {
				$timeout(function() {
					$scope.initializing = false; 
					angular.element('i.range')[0].style.width = $scope.value + "%";
					angular.element('.jslider-pointer')[0].style.left = $scope.value + "%";});
			}
			else {
				angular.element('i.range')[0].style.width = $scope.value + "%";
				angular.element('.jslider-pointer')[0].style.left = $scope.value + "%";
			}

	});

	$scope.$watch(function() {
		return $scope.difficultyLevel / $scope.selectedDeadline;
	}, function () {
		$scope.$parent.formData.pricePerPage = 20 * $scope.difficultyLevel / $scope.selectedDeadline;
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
})
.directive('additionalTab', function() {
	return {
		restrict: 'E',
		scope: { 
			obj: '='
		},
		controller: ['$scope','$element','$timeout', function ($scope, $element,$timeout) {
			$scope.added = false;	
			$scope.addOption = function () {
					//scope.$$prevSibling.formData.totalCost += obj.price;
					$scope.added = true;
					$scope.$emit('add-option', {optionPrice: $scope.obj.price});
				}
			$scope.removeOption = function () {
					$scope.added = false;
					$scope.$emit('remove-option', {optionPrice: $scope.obj.price});
				}
		}],
		templateUrl: "/views/partials/additionaltab.html",
		link: function(scope,element,attrs) {
				
		}
	}
})
.directive('hoverToggle', function() {
	return {
		restrict: 'A',
		scope: true,
		controller: ['$scope','$element','$timeout', function ($scope, $element,$timeout) {
			
		}],
		link: function(scope,element,attrs) {
			element.bind('mouseover', function () {
				element.toggleClass('fa fa-question-circle-o');
				element.toggleClass('fa fa-question-circle');
				
			});
			element.bind('mouseleave', function () {
				element.toggleClass('fa fa-question-circle-o');
				element.toggleClass('fa fa-question-circle');

			});
					
		}
	}
});