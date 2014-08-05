angular.module("ngpagerTemplates", []).run(["$templateCache", function($templateCache) {$templateCache.put("pager.tpl.html","\n<ul class=\"pagination\">\n    <li ng-class=\"{disabled: !hasPreviousPage}\"><a href=\"\" ng-click=\"changed(currentPage - 1)\">&laquo;</a></li>\n    <li ng-show=\"hasPreBuffer\" ng-class=\"{disabled: true}\"><a href=\"\">...</a></li>\n    <li ng-class=\"{active: page.isCurrent}\" ng-repeat=\"page in pages\">\n        <a href=\"\" ng-click=\"changed(page.pageNumber)\">{{page.pageNumber+1}}</a>\n    </li>\n    <li ng-show=\"hasPostBuffer\" ng-class=\"{disabled: true}\"><a href=\"\">...</a></li>\n    <li ng-class=\"{disabled: !hasNextPage}\"><a href=\"\" ng-click=\"changed(currentPage + 1)\">&raquo;</a></li>\n</ul>\n");}]);