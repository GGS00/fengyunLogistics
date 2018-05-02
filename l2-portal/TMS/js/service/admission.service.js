angular
	.module('app')
    .factory('Area', Area)

function Area($http){
	return {
		getAreaList:getAreaList
	}
	function getAreaList(vm){
		return $http({url: ""+ Comm_Config + "/enteredAndTrucked/getEnteredAndTruckData"/*'../../json/admission.json'*/,method: "post",						
						params:{

							beginDate:vm.startTaskTime,
							endDate:vm.endTaskTime,
							plateform:'NJZC'

							}

						});
	}


	
}
