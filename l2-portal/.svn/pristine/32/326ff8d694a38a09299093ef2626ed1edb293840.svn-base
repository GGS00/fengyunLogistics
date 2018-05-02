angular.module('app').factory('Area',Area)

function Area($http){
	return {
		getTableHead: getTableHead,
		getInventoryList: getInventoryList,
		getLocationInfo: getLocationInfo,
		doChangePreAQBu: doChangePreAQBu
	}
	//   建单操作 表头数据 网络请求
	function getTableHead(vm) {
		return $http({
			url: '../../json/inventoryTitle.json',
			method: "get",
			params: {
					
			}
		});
	}
	
	//获取库存列表
	function getInventoryList(vm){
		return $http({
			url: ""+Comm_Config+"process",
			method: "post",
			params: {
				bean: "wmsInventory",
				method: "page",
				currentWarehouseId:'2184',
				currentOwnerId:'2170',
				supplierName: vm.supplierName,
				ownerName: vm.ownerName, 
				productCode: vm.productCode, 
				productName: vm.productName, 
				brand: vm.brand,
				inboundCode: vm.inboundCode,
				outboundCode: vm.outboundCode, 
				status: vm.status, 
				locationName: vm.locationName,
				barCode: vm.barCode,
				kindName: vm.kindName, 
				locationType: vm.locationType,
				locationCode: vm.locationCode, 
				INVENTORY_AGE_BEGIN: vm.INVENTORY_AGE_BEGIN,
				INVENTORY_AGE_END: vm.INVENTORY_AGE_END, 
				storageTimeStart: vm.storageTimeStart, 
				storageTimeEnd: vm.storageTimeEnd,
				page: vm.page,
				rows: vm.pageSize
			}
		});
	}
	
	//获取库位信息
	function getLocationInfo() {
		return $http({
			url: Comm_Config+"wmsInventory/selectList",
			method: "get",
			params: {
				currentWarehouseId:'2184'
			}
		});
	}
	
	function doChangePreAQBu(ivn) {
		return $http({
			url: Comm_Config+"/wmsInventory/doChangePreAQBu",
			method: "post",
			params: {
				change_warehouseCode : ivn.warehouseCode,
				change_inventoryId : ivn.inventoryId,
				change_location_code : ivn.locationCode,
				change_location_name : ivn.locationName,
				change_product_code : ivn.productCode,
				change_allocated_quantity_BU : ivn.aQuantyBu,
				preAQBU : ivn.preAQBU,
				id : ivn.id
			}
		});
	}
	
}
