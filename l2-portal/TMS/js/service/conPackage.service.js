angular
	.module('app')
    .factory('Area', Area)

function Area($http){
	return {
		getAreaList:getAreaList,
		conPackageDetail:conPackageDetail
	}
	function getAreaList(vm){
		return $http({url:/*""+ Comm_Config + "process"*/'../../json/pack.json',method: "get",
						params:{
								bean: 'wmsPackageTask',
								method: 'page',
								outboundCode: vm.outboundCode,
								waybillCode: vm.waybillCode,
								code: vm.code,
								type: vm.type,
								status: vm.status,
								checkStatus: vm.checkStatus,
								shipStatus: vm.shipStatus,
								turnoverCode: vm.turnoverCode,
								beginTaskTime: vm.beginTaskTime,
								endTaskTime: vm.endTaskTime,
								page: vm.page,
								rows: vm.pageSize
							
							}
						});
	}


	function conPackageDetail(vm){
		return $http({url:/*""+ Comm_Config + "wmsPackageTask/imeiConfirmPickedBack"*/'../../json/pack.json',method: "post",
						params:{
							
						     page: vm.detailPage,
							 rows: vm.detailPageSize
							
							}
						});
	}


}