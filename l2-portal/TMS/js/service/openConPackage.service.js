angular
	.module('app')
    .factory('Area', Area)

function Area($http){
	return {
		getAreaList:getAreaList,
		imeiConfirmPickedBack:imeiConfirmPickedBack
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


	function imeiConfirmPickedBack(vm){
		return $http({url:""+ Comm_Config + "wmsPackageTask/imeiConfirmPickedBack"/*'../../json/confirmPack.json'*/,method: "post",
						params:{
						    taskId:vm.taskId,
							moveQuantity:vm.taskExpectedQuantityBU,
							quantity:vm.taskExpectedQuantityBU - vm.taskExpectedCheckQuantityBU,
							imeis:vm.imeisNoList.join()
							
							}
						});
	}


}