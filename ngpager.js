(function () {
    'use strict';

    angular.module('NgPager', ['ngPagerTemplates', 'PagerConfig'])
    .directive('ngPager', ['PagerConfig', function (PagerConfig) {
        var definition = {
            restrict: 'A',
            scope: { currentPage: '@', totalPages: '@', maxPagesToDisplay: '@', pageChanged: '&', enableJumpControls: '@' },
            replace: true,
            templateUrl: 'ngpager.tpl.html',

            link: function (scope, iElement, iAttrs) {

                scope.changed = function (newPage) {
                    if (!newPage && newPage === 0)
                        return;

                    if (newPage < 0 || newPage > scope.totalPages)
                        return;

                    scope.pageChanged({ pageNum: newPage });
                };

                var enableJumpControls = scope.enableJumpControls || PagerConfig.areJumpControlsEnabled;

                scope.$watch('currentPage', updateCurrentPage);
                scope.$watch('totalPages', updateTotalPages);
                scope.$watch('maxPagesToDisplay', updateMaxPages);

                function updateTotalPages(totalPages) {
                    updatePages(scope.currentPage, totalPages, scope.maxPagesToDisplay || PagerConfig.defaultMaxPages);
                }

                function updateCurrentPage(currentPage) {
                    updatePages(currentPage, scope.totalPages, scope.maxPagesToDisplay || PagerConfig.defaultMaxPages);
                }

                function updateMaxPages(maxPages) {
                    updatePages(scope.currentPage, scope.totalPages, maxPages || PagerConfig.defaultMaxPages);
                }

                function updatePages(currentPage, totalPages, maxPages) {
                    currentPage = parseInt(currentPage);
                    maxPages = parseInt(maxPages);
                    totalPages = parseInt(totalPages);
                    var selectedPage = currentPage;                 
                    var pages = [];
                    var firstPage = 0;
                    var lastPage = totalPages - 1;

                    scope.selectedPage = selectedPage;
                    var start = 0;
                    var end = 0;
                    if (scope.pages && scope.pages.length > 0) {
                        start = Math.floor((selectedPage - 1) / maxPages) * maxPages;
                        end = start + maxPages;
                        if (end > totalPages) {
                            end = totalPages;
                        }
                    }
                    else {
                        end = maxPages;
                    }

                    for (var i = start ; i < end ; i++) {                       
                        var pageNumber = i + 1;
                        pages.push({ pageNumber: pageNumber, isCurrent: pageNumber == selectedPage });
                    }
                    scope.pages = pages;

                    if (enableJumpControls) {
                        scope.prevBuffer = start - maxPages + 1;
                        scope.postBuffer = end + 1;
                        scope.displayFirstPage = start > firstPage;
                        scope.hasPreBuffer = start > firstPage;
                        scope.hasPostBuffer = end < lastPage;
                        scope.displayLastPage = end < lastPage;
                    } else {
                        scope.prevBuffer = start - maxPages + 1;
                        scope.postBuffer = end + 1;
                        scope.displayFirstPage = false;
                        scope.hasPreBuffer = start > firstPage;
                        scope.hasPostBuffer = end < lastPage;
                        scope.displayLastPage = false;
                    }
                    scope.hasPreviousPage = selectedPage > 1;
                    scope.hasNextPage = selectedPage < lastPage;
                    scope.totalPages = totalPages;
                    scope.maxPages = maxPages;
                }
            }
        };
        return definition;
    }]);
})();
