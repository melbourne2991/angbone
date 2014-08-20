var directives = angular.module('app.directives', ['app.services']);

directives.directive('body', [function() {
	return {
		controller: function() {

		},
		link: function(scope, element) {
			$(window).scroll(function() {
				var scroll_pos = $(window).scrollTop();

				if(scroll_pos > 150) {
					$(element).find('#header').addClass('collapsed');
					$(element).find('#body').addClass('header-collapsed');
				} else {
					$(element).find('#header').removeClass('collapsed');
					$(element).find('#body').removeClass('header-collapsed');
				}
			});
		}
	}
}]);

directives.directive('gridRepeat', ['$compile', '$rootScope', function($compile, $rootScope) {
	return function(scope, el, attrs) {
		var split 				= attrs.gridRepeat.split(' ');
		var array_name 			= split[2];
		var array_item_name 	= split[0];
		var array 				= scope[array_name];
		var el_inner			= el.html();
		var row_css_class		= attrs.rowCssClass 	|| 'row';
		var column_css_class	= attrs.columnCssClass  || 'column';
		var row_element 		= $('<div class="' + row_css_class + '"></div>');
		var column_element 		= $('<div class="' + column_css_class + '"></div>');
		var columns_to_row		= parseInt(attrs.columnsToRow) || 4;

		// Clear Element on load.
		el.html('');

		var compileDirective = function() {
			var grid 	 			= [];

			// Clear element on scope change
			el.html('');

			// Break up array into array of rows
			(function splicer() {
				grid.push(array.splice(0, columns_to_row));
				if(array.length > 0) splicer();
			}());

			// Build the grid
			_.forEach(grid, function(row, i) {
				var newRow = row_element.clone();

				el.append(newRow);

				_.forEach(row, function(column, i) {
					var newColumn = column_element.clone();
					var populatedColumn = $(newColumn.html(el_inner));

					var compiled = $compile(populatedColumn);
					var columnScope = $rootScope.$new(true);

					columnScope[array_item_name] = column;

					compiled(columnScope);

					newRow.append(newColumn);
				});
			});			
		}

		scope.$watch(array_name, function(newValue, oldValue) {
			console.log(typeof newValue);

			if(newValue !== oldValue && typeof newValue === 'object') {
				array = newValue;

				console.log('in');

				compileDirective();
			}
		});

		if(typeof array === 'object')
			compileDirective();
	}
}]);

directives.directive('loginDirective', ['Login', 'currentUser', '$state', function(Login, currentUser, $state) {
	return {
		controller: function($scope, $element, $attrs) {
			var user = $scope.user = {
				username: '',
				password: ''
			};

			$element.find('input[type="submit"]').on('click', function(e) {
				e.preventDefault();
			});

			$scope.login = function() {
				$scope.errors = {};

				if(user.username === '' && user.password === '') {
					$scope.errors['username'] = 'Username Required';
					errors['password'] = 'Password Required';
				} else if(user.username === '') {
					$scope.errors['username'] = 'Username Required';
				} else if(user.password === '') {
					$scope.errors['password'] = 'Password Required';
				} else {
					Login.postLogin($scope.user).then(function(results) {
						if(results.errors) 	$scope.errors = results.errors;
						if(results.user) 	$state.go('admin');
					});
				}
			}
		},
		link: function(scope, element, attrs) {

		}
	}
}]);

app.directive('ckEditor', [function () {
    return {
        require: '?ngModel',
        link: function ($scope, elm, attr, ngModel) {

            var ck = CKEDITOR.replace(elm[0]);

            ck.on('pasteState', function () {
                $scope.$apply(function () {
                    ngModel.$setViewValue(ck.getData());
                });
            });

            ngModel.$render = function(value) {
                ck.setData(ngModel.$modelValue);
            };
        }
    };
}])