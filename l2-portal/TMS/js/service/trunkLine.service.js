angular
	.module('app')
    .factory('Area', Area)

function Area($http){
	return {
		getAreaList:getAreaList,
		getPassBy:getPassBy,
		getLineSite:getLineSite,
		submit:submit
	}
	function getAreaList(xparam){
		return $http({url: '/logistics/process',method: "post",
						params:xparam
						});
	}

	function getPassBy(name){
		return $http({url: '/logistics/wms/platForm/toSwitchPlatFormPageByName',method: "post",
						params:{
							name:name
							}
						});
	}

	function getLineSite(vm){
		return $http({url: '/logistics/wms/platForm/toSwitchPlatFormPageByName',method: "post",
						params:{
							name:vm.startsitename
							}
						});
	}

	function submit(xtt){
		return $http({url: '/logistics/roadlinetrunk/add',method: "post",
						params:xtt
						});
	}
	
}
