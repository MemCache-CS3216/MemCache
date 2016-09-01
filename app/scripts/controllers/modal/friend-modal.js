'use strict';

angular.module('connectrFrontendApp').controller('FriendModalCtrl', function ($uibModalInstance, friend, $scope, countries) {
  console.log(friend);

  $scope.friend = friend;
  $scope.total_checkins = friend.total_checkins;
  $scope.countries = [];

  function toIso(country) {
    return countries.getCountryCode(country);
  }

  function initialise() {

    if (friend && friend.checkins && friend.checkins.features) {
      angular.forEach(friend.checkins.features, function(checkin) {
        if (checkin.properties && checkin.properties.place_country) {
          var cntry = (toIso(checkin.properties.place_country) || '').toLowerCase();
          if (cntry && $scope.countries.indexOf(cntry) === -1) {
            var cntryAndName = cntry + '/' + checkin.properties.place_country;
            console.log(cntry)
            if (!$scope.countries.includes(cntryAndName)) {
              $scope.countries.push(cntryAndName);
            }
          }
        }
      });
    }
  }

  initialise();
});
