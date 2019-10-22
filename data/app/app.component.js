(() => {
    'use strict';

    angular.module('footstepData').controller('footstepDataController', footstepDataController);

    footstepDataController.$inject = ['$scope', '$http']

    function footstepDataController ($scope, $http) {

        $scope.footstep = {};

        $http.get('/data/footstep.json')
            .then((footstep) => {
                const footstepUserData = footstep.data;

                for(const user in footstepUserData) {
                    footstepUserData[user] = footstepUserData[user].sort((userDataA, userDataB) => {
                        return userDataA.event.date - userDataB.event.date;
                    });
                }

                $scope.footstep = footstepUserData;
            });

    }

})()