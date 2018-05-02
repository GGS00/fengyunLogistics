angular
	.module('app')
    .factory('Area', Area)

function Area($http){
	return {
		getAreaList:getAreaList,
		getWlList:getWlList

	}


    /*查询接口*/
	function getAreaList(vm){
		return $http({url: ""+ Comm_Config + "thridExpress/queryLogisticsInfo"/*'../../json/pack.json'*/,method: "post",
						params:{
							
							num:vm.searchOrderNum,
							com:vm.selected,
							
	                            			
							}
						});
	}


	/*获得物流公司名列表*/
	function getWlList(vm){
		return $http({url:""+ Comm_Config + "process"/*'../../json/data.json'*/,method: "post",
						params:{

								method:'page',
								bean:'ipsExpressComConfig',
								page:1,
								rows:20
	                            						
							}
						});
	}


	
	
}






