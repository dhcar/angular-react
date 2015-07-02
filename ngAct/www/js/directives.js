angular.module('ngAct')

.directive('reactToCount', function() {
	return {
		restrict: 'A',
		scope: '=',
		link: function (scope, iElement, iAttrs) {

			// 
			// Extrapolates binding data to a view from the angular model to the react model
			// Obviously this is a rudimentary example,
			// 	react will serve better in more complicated DOM manipulations
			// 
			// Notice how this directive logic serves only to keep the view up to date with the data model
			// 	whereas the controller logic in dash-ctrl deals with manipulating the data model
			// 
			// Directives can be made as modular/portable or as specific/custom as necessary
			// 	through setting different environmental variables on the scope or other attributes
			//
			// 	Directives are really powerful and cool :)

			var countElem = document.getElementById('count');
			var clickElem = document.getElementById('clicks');

			console.log(scope);

			function renderCount(){

				var countDiv = React.createClass({displayName: 'countDiv',
	  			render: function() {
				    return (
				      React.createElement('div', {className: "count-div"},
				        scope.counter.count
				      )
				    );
				  }
				});

				React.render(
				  React.createElement(countDiv, null),
				  countElem
				);

			};

			function renderClicks(){

				var clickDiv = React.createClass({displayName: 'clickDiv',
					render: function(){
						return (
							React.createElement('div', {className: "click-div"},
								scope.counter.clicks
							)
						);
					}
				});

				React.render(
					React.createElement(clickDiv, null),
					clickElem
				)

			};


			scope.$watch( 'counter.count', function(){
				renderCount();
			});

			scope.$watch( 'counter.clicks', function(){
				renderClicks();
			});

		}
	};
})