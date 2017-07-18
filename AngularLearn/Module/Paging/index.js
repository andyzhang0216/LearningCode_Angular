(function () {
    'use strict';

    var app = angular.module('app', []);

    app.controller('pageCtrl', pageCtrl);

    pageCtrl.$inject = ['$scope'];

    function pageCtrl($scope) {
        $scope.pages = 10;
        $scope.page = 1;

        $scope.selectPage = function (page) {
            console.log("selected page: " + page);
        };
    }

    app.directive('pagination', function () {
        return {
            restrict: 'E',
            scope: {
                numPages: '=',
                currPage: '=',
                onSelectPage: '&'
            },

            template: '<ul class="pagination">'
            + '<li ng-class="{disabled: noPreviousPage()}">'
            + '<a ng-click="selectPreviousPage()">&laquo;</a>'
            + '</li>'

            + '<li ng-repeat="page in pages" ng-class="{active: isActivePage(page)}">'
            + '<a ng-click="selectPage(page)">{{page}}</a>'
            + '</li>'

            + '<li ng-class="{disabled: noNextPage()}">'
            + '<a ng-click="selectNextPage()">&raquo;</a>'
            + '</li>'

            + '</ul>',

            replace: true,
            link: function (s) {
                s.$watch('numPages', function (value) {
                    s.pages = [];

                    for (var i = 1; i <= value; i++) {
                        s.pages.push(i);
                    }

                    if (s.currPage > value) {
                        s.selectPage(value);
                    }
                });

                s.noPreviousPage = function () {
                    return s.currPage === 1;
                };

                s.noNextPage = function () {
                    return s.currPage === s.numPages;
                };

                s.isActivePage = function (page) {
                    return s.currPage === page;
                };

                s.selectPage = function (page) {
                    if (!s.isActivePage(page)) {
                        s.currPage = page;

                        s.onSelectPage({ page: page });
                    }
                };

                s.selectNextPage = function () {
                    if (!s.noNextPage()) {
                        s.selectPage(s.currPage + 1);
                    }
                };

                s.selectPreviousPage = function () {
                    if (!s.noPreviousPage()) {
                        s.selectPage(s.currPage - 1);
                    }
                };
            }
        };
    });
})();