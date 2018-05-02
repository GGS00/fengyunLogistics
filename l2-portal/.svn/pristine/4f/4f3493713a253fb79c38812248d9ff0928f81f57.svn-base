angular.module('app', ['ui.bootstrap', ])
	.controller('IndexCtrl', IndexCtrl)

function IndexCtrl($scope, Area) {
	var vm = this;
	vm.pages = [{
		name: '5',
		id: '5'
	}, {
		name: '10',
		id: '10'
	}, {
		name: '30',
		id: '30'
	}, {
		name: '50',
		id: '50'
	}, {
		name: '100',
		id: '100'
	}, {
		name: '150',
		id: '150'
	}, {
		name: '200',
		id: '200'
	}, {
		name: '300',
		id: '300'
	}, {
		name: '28',
		id: '28'
	}];

	//建单操作 参数-----------------------------------------------------------------------------------------------------------------------------
	vm.selected = vm.pages[8].id; //默认取值28
	vm.selectAll = false;
	vm.list;
	vm.totalitems = 10; //总共有多少条数据
	vm.currentpage = 1; //当前第几页
	vm.maxsize = 5; //可选择的页数范围(如果设置为5,当前页为10,总页数为100,那么可选择第8,9,10,11,12页
	vm.pageSize = 28; //页面显示数量

	vm.singleCode = "";
	vm.singleStatus = "";
	vm.singleCreateTime = "";
	vm.singleModifier = "";
	vm.singleModifTime = "";

	vm.success = "";
	vm.processTime = "";

	getTableHead();
	getList();

	/*
	 * 简单操作-查询表格标题头
	 */
	function getTableHead() {
		Area.getTableHead(vm).success(function(data) {
			vm.tableList = data.resultValue;
		});
	}

	vm.getList = function() {
			getList();
		}
		/**
		 * 建单操作-获取数据列表
		 */
	function getList() {
		vm.selectAll = false;
		Area.getAreaList(vm).success(function(responseData) {
			var data = new Array();
			data = responseData.rows;
			for(var i = 0; i < data.length; i++) {
				data[i].state = false;
			}
			vm.list = data;
			vm.success = responseData.additionalMsg.status;
			vm.processTime = responseData.additionalMsg.processTime;
			vm.totalitems = responseData.total;
		});
	}
	/**
	 * 建单操作-查询空进空出单  接口和获取数据列表一样
	 */
	$("#single_query").click(function() {
		vm.singleCode = $("#single_code").val(); //单号
		vm.singleStatus = $("#single_status").val();; //状态
		vm.singleCreateTime = $("#single_create_time").val();; //创建时间
		vm.singleModifier = $("#single_modifier").val();; //修改人
		vm.singleModifTime = $("#single_modif_time").val();; //修改时间
		getList();
	});
	$("#sigle_refurbish").click(function() {
			getList();
	});
	
	$("#single_new").click(function() {
		getSingleNewList();
	});
	/**
	 * 建单操作-新建空单 
	 * 参数：无
	 */
	function getSingleNewList() {
		Area.getSingleNewList(vm).success(function(data) {
			if(data.additionalMsg.status == '成功') {
				$("#success-dialog").show();
				vm.successText = "建单成功";
				if(!$scope.$$phase) {
					$scope.$digest();
				}
				window.setTimeout(function() {
					$("#success-dialog").hide();
				}, 3000);
				getList();
			} else if(data.additionalMsg.status == '失败') {
				$("#danger-dialog").show();
				vm.dangerText = data.additionalMsg.message;
				if(!$scope.$$phase) {
					$scope.$digest();
				}
				window.setTimeout(function() {
					$("#danger-dialog").hide();
				}, 3000);
			} else {
				$("#danger-dialog").show();
				vm.dangerText = "系统错误！请联系管理员";
				if(!$scope.$$phase) {
					$scope.$digest();
				}
				window.setTimeout(function() {
					$("#danger-dialog").hide();
				}, 3000);
			}
		});
	}
	/**
	 * 建单操作-删除一条空进空出单
	 */
	$("#sigle_delete").click(function() {
		var s = 0;
		var p;
		for(var i = 0; i < vm.list.length; i++) {
			if(vm.list[i].state === true) {
				s++;
				p = i;
			}
		}
		if(s == 0) {
			$("#danger-dialog").show();
			vm.dangerText = "请选中后再删除！";
			$scope.$digest();
			window.setTimeout(function() {
				$("#danger-dialog").hide();
			}, 3000);

			return;
		}
		if(s != 1) {
			$("#danger-dialog").show();
			vm.dangerText = "删除只能单个删除，不可批量删除！";
			$scope.$digest();
			window.setTimeout(function() {
				$("#danger-dialog").hide();
			}, 3000);
			return;
		}
		vm.sign_del_id = vm.list[p].id;
		Area.getSingleDelete(vm).success(function(data) {
			if(data.additionalMsg.status == '成功') {
				$("#success-dialog").show();
				vm.successText = "删除成功";
				if(!$scope.$$phase) {
					$scope.$digest();
				}
				window.setTimeout(function() {
					$("#success-dialog").hide();
				}, 3000);
				getList();
			} else if(data.additionalMsg.status == '失败') {
				$("#danger-dialog").show();
				vm.dangerText = data.additionalMsg.message;
				if(!$scope.$$phase) {
					$scope.$digest();
				}
				window.setTimeout(function() {
					$("#danger-dialog").hide();
				}, 3000);
			} else {
				$("#danger-dialog").show();
				vm.dangerText = "系统错误！请联系管理员";
				if(!$scope.$$phase) {
					$scope.$digest();
				}
				window.setTimeout(function() {
					$("#danger-dialog").hide();
				}, 3000);
			}

		});

	});
	vm.ids = "";
	$("#sigle_effective").click(function() {
		var str = "";
		for(var i = 0; i < vm.list.length; i++) {
			if(vm.list[i].state === true) {
				str += vm.list[i].id + ","
			}
		}
		vm.ids = str.substring(0, str.length - 1);
		Area.getActiveWmsEieo(vm).success(function(data) {
			if(data.additionalMsg.status == '成功') {
				$("#success-dialog").show();
				vm.successText = "生效成功";
				if(!$scope.$$phase) {
					$scope.$digest();
				}
				window.setTimeout(function() {
					$("#success-dialog").hide();
				}, 3000);
				getList();
			} else if(data.additionalMsg.status == '失败') {
				$("#danger-dialog").show();
				vm.dangerText = data.additionalMsg.message;
				if(!$scope.$$phase) {
					$scope.$digest();
				}
				window.setTimeout(function() {
					$("#danger-dialog").hide();
				}, 3000);
			} else {
				$("#danger-dialog").show();
				vm.dangerText = "系统错误！请联系管理员";
				if(!$scope.$$phase) {
					$scope.$digest();
				}
				window.setTimeout(function() {
					$("#danger-dialog").hide();
				}, 3000);
			}

		});
	});
	/**
	 * 建单操作-选中表中所有checkbox
	 * @param {Object} m
	 */
	vm.all = function(m) {
		for(var i = 0; i < vm.list.length; i++) {
			if(m === true) {
				vm.list[i].state = true;
			} else {
				vm.list[i].state = false;
			}
		}

	};
	/**
	 * 建单操作-选中其中一条单子
	 * @param {Object} m
	 */
	vm.selectCheckBox = function(m) {
		if(vm.list[m].state === true) {
			vm.list[m].state = true;
		} else {
			vm.list[m].state = false;
		}
		event.stopPropagation();
	}
	vm.selectAddDetail = function(m) {
		if(vm.list[m].state === true) {
			var s = 0;
			for(var i = 0; i < vm.list.length; i++) {
				if(vm.list[i].state === true) {
					s++;
					vm.list[i].state = false;
				}
			}
			if(s > 1) {
				vm.list[m].state = true;
			}

		} else {
			vm.list[m].state = true;
			for(var i = 0; i < vm.list.length; i++) {
				if(m != i) {
					vm.list[i].state = false;
				}
			}
		}
		vm.eieoId = vm.list[m].id;
		getDeatailAreaList();
	}

	//	记录条数
	vm.packChange = function(x) {
		vm.pageSize = x;
		getList();
	}

	//----------------------------------------------------------------------------------------------------------------------
	//----------------------------------------------------------------------------------------------------------------------

	vm.detailselected = vm.pages[8].id; //默认取值28
	vm.detailselectAll = false;
	vm.detaillist;
	getDetailTableHead();

	vm.detailtotalitems = 10; //总共有多少条数据
	vm.detailcurrentpage = 1; //当前第几页
	vm.detailmaxsize = 5; //可选择的页数范围(如果设置为5,当前页为10,总页数为100,那么可选择第8,9,10,11,12页
	vm.detailpageSize = 28; //页面显示数量

	vm.eieoSuccess = "";
	vm.eieoTime = "";

	vm.eieoId = "";
	vm.eieoStatus = "";
	vm.eieosrcProId = "";
	vm.eieodestProId = "";
	vm.getdetailList = function() {
			getDeatailAreaList();
		}
		/**
		 * 明细表-标题头获取
		 */
	function getDetailTableHead() {
		Area.getDetailTableHead(vm).success(function(data) {
			vm.detailtableList = data.resultValue;
		});
	}
	/**
	 * 明细表-数据列表获取
	 */
	function getDeatailAreaList() {
		vm.selectdetailAll = false;
		Area.getDeatailAreaList(vm).success(function(responseData) {

			var data = new Array();
			data = responseData.rows;
			if(!$scope.$$phase) {
				$scope.$digest();
			}

			vm.detailtotalitems = responseData.total;
			vm.detaillist = data;
			vm.eieoSuccess = responseData.additionalMsg.status;
			vm.eieoTime = responseData.additionalMsg.processTime;
		});
	}
	/**
	 * 明细表-全选操作
	 * @param {Object} m
	 */
	vm.detailAll = function(m) {
		for(var i = 0; i < vm.detaillist.length; i++) {
			if(m === true) {
				vm.detaillist[i].state = true;
			} else {
				vm.detaillist[i].state = false;
			}
		}

	};
	/**
	 * 明细表-删除明细操作
	 */
	$("#eieo_delete").click(function() {
		var s = 0;
		var p;
		for(var i = 0; i < vm.detaillist.length; i++) {
			if(vm.detaillist[i].state === true) {
				s++;
				p = i;
			}
		}
		if(s == 0) {
			$("#danger-dialog").show();
			vm.dangerText = "请选中后再删除！";
			$scope.$digest();
			window.setTimeout(function() {
				$("#danger-dialog").hide();
			}, 3000);
			return;
		}
		if(s != 1) {
			$("#danger-dialog").show();
			vm.dangerText = "删除只能单个删除，不可批量删除！";
			$scope.$digest();
			window.setTimeout(function() {
				$("#danger-dialog").hide();
			}, 3000);
			return;
		}
		vm.eieoDetId = vm.detaillist[p].id;
		Area.getDeatailEieoDet(vm).success(function(data) {
			if(data.additionalMsg.status == '成功') {
				$("#success-dialog").show();
				vm.successText = "删除成功";
				if(!$scope.$$phase) {
					$scope.$digest();
				}
				window.setTimeout(function() {
					$("#success-dialog").hide();
				}, 3000);
				getDeatailAreaList();
			} else if(data.additionalMsg.status == '失败') {
				$("#danger-dialog").show();
				vm.dangerText = data.additionalMsg.message;
				if(!$scope.$$phase) {
					$scope.$digest();
				}
				window.setTimeout(function() {
					$("#danger-dialog").hide();
				}, 3000);
			} else {
				$("#danger-dialog").show();
				vm.dangerText = "系统错误！请联系管理员";
				if(!$scope.$$phase) {
					$scope.$digest();
				}
				window.setTimeout(function() {
					$("#danger-dialog").hide();
				}, 3000);
			}
		});
	});
	/*
	 * 明细表-单选操作
	 */
	vm.selectdetailCheckBox = function(m) {
		if(vm.detaillist[m].state === true) {
			vm.detaillist[m].state = false;
		} else {
			vm.detaillist[m].state = true;
			for(var i = 0; i < vm.detaillist.length; i++) {
				if(m != i) {
					vm.detaillist[i].state = false;
				}
			}
		}

	}
	vm.detId = "";
	vm.srcInvId = "";
	vm.qty = "";
	vm.srcProid = "";
	vm.destProId = "";
	/**
	 * 明细表-移位数量修改操作
	 * @param {Object} m
	 */
	vm.detailQuantity = function(m) {
			vm.detId = vm.detaillist[m].id;
			vm.srcInvId = vm.detaillist[m].src_inv_id; //
			vm.qty = $("#detail_quantity" + m + "").val();
			vm.srcProid = vm.detaillist[m].src_product_id;
			vm.destProId = vm.detaillist[m].dest_product_id;
			Area.getDetailupdateEieoDet(vm).success(function(data) {
				if(data.additionalMsg.status == '成功') {
					$("#success-dialog").show();
					vm.successText = "修改成功";
					if(!$scope.$$phase) {
						$scope.$digest();
					}
					window.setTimeout(function() {
						$("#success-dialog").hide();

					}, 3000);
					getDeatailAreaList();
				} else if(data.additionalMsg.status == '失败') {
					$("#danger-dialog").show();
					vm.dangerText = data.additionalMsg.message;
					if(!$scope.$$phase) {
						$scope.$digest();
					}
					window.setTimeout(function() {
						$("#danger-dialog").hide();
					}, 3000);
					getDeatailAreaList();
				} else {
					$("#danger-dialog").show();
					vm.dangerText = "系统错误！请联系管理员";
					if(!$scope.$$phase) {
						$scope.$digest();
					}
					window.setTimeout(function() {
						$("#danger-dialog").hide();
					}, 3000);
				}
			});
		}
		/**
		 * 明细表-查询添加货品
		 */
	vm.eieoSelectDialog = function() {
		getseletdialog();
	}
	vm.srcProCode = "";
	vm.destProCode = "";

	function getseletdialog() {
		$('#eieo_select_dialog').modal('show');
	}
	0

	$("#eieo_query").click(function() {
		vm.eieoStatus = $("#eieo_status").val();
		vm.srcProCode = $("#eieo_srcpro").val();
		vm.destProCode = $("#eieo_objpro").val();
		getDeatailAreaList();
		window.setTimeout(function() {
			$('#eieo_select_dialog').modal('hide')
		}, 3000);

	});

	/**
	 * 明细表-新建明细
	 */
	$("#eieo_new").click(function() {
		Area.getDeatailEoeiADD(vm).success(function(data) {
			if(data.additionalMsg.status == '成功') {
				$("#success-dialog").show();
				vm.successText = "明细添加成功";
				if(!$scope.$$phase) {
					$scope.$digest();
				}
				window.setTimeout(function() {
					$("#success-dialog").hide();
				}, 3000);
				getDeatailAreaList();
			} else if(data.additionalMsg.status == '失败') {
				$("#danger-dialog").show();
				vm.dangerText = data.additionalMsg.message;
				if(!$scope.$$phase) {
					$scope.$digest();
				}
				window.setTimeout(function() {
					$("#danger-dialog").hide();
				}, 3000);
			} else {
				$("#danger-dialog").show();
				vm.dangerText = "系统错误！请联系管理员";
				if(!$scope.$$phase) {
					$scope.$digest();
				}
				window.setTimeout(function() {
					$("#danger-dialog").hide();
				}, 3000);
			}

		});

	});
	//	记录条数
	vm.packdetailChange = function(x) {
		vm.detailpageSize = x;
		getDeatailAreaList();
	}

	//原货品表---------------------------------------------------------------------------------------------------------------------------------------------
	//---------------------------------------------------------------------------------------------------------------------------------------------	

	vm.productselected = vm.pages[8].id; //默认取值28
	vm.productselectAll = false;
	vm.productlist;
	getproductTableHead();
	getproductAreaList();
	vm.producttotalitems = 10; //总共有多少条数据
	vm.productcurrentpage = 1; //当前第几页
	vm.productmaxsize = 5; //可选择的页数范围(如果设置为5,当前页为10,总页数为100,那么可选择第8,9,10,11,12页
	vm.productpageSize = 28; //页面显示数量

	vm.ownerName = ""; //货主
	vm.supplierName = ""; //供应商
	vm.productCode = ""; //货品code
	vm.productName = ""; //货品名称
	vm.status = ""; //库存状态
	vm.locationName = ""; //库位名称
	vm.barCode = ""; //69码
	vm.locationCode = ""; //库存code

	//  明细表格标题头
	function getproductTableHead() {
		Area.getproductTableHead(vm).success(function(data) {
			vm.producttableList = data.resultValue;
		});
	}
	$("#p_query").click(function() {
		getproductAreaList();
	});
	/**
	 * 货品明细-获取数据列表
	 */
	function getproductAreaList() {
		vm.productselectAll = false;
		vm.ownerName = $("#p_ownerName").val(); //货主
		vm.supplierName = $("#p_supplierName").val(); //供应商
		vm.productCode = $("#p_productCode").val(); //货品code
		vm.productName = $("#p_productName").val(); //货品名称
		vm.status = $("#p_status").val(); //库存状态
		vm.locationName = vm.option_selected; //库位名称（ng-model="indexCtrl.option_selected"）
		vm.barCode = $("#p_barcode").val(); //69码
		vm.locationCode = $("#p_locationCode").val(); //库位编码
		Area.getproductAreaList(vm).success(function(response) {
			var data = new Array();
			data = response.rows;
			for(var i = 0; i < data.length; i++) {
				data[i].state = false;
			}
			vm.productlist = data;
			vm.productSuccess = response.additionalMsg.status;
			vm.productTime = response.additionalMsg.processTime;
			vm.producttotalitems = response.total;
		});
	}
	var srcPosition;
	/**
	 * 添加源货品dialog
	 * @param {Object} m
	 */
	vm.mydialog = function(m) {
			srcPosition = m;
			Area.getSelectStorage().success(function(data) {
				vm.option_selected = ""; //库位名称（ng-model="indexCtrl.option_selected"）
				vm.selectStroage = data; //库位名称（下拉）返回的数据
				$('#detail-operate').modal('show');
			});
		}
		/**
		 * 源货添加-确定
		 */
	$("#src_srue").click(function() {
		var a = 0;
		var b;
		if(vm.productlist.length == 0) {
			$("#danger-dialog1").show();
			vm.dangerText = "没有数据！";
			$scope.$digest();
			window.setTimeout(function() {
				$("#danger-dialog1").hide();
			}, 3000);
			return;
		}
		for(var i = 0; i < vm.productlist.length; i++) {
			if(vm.productlist[i].state === true) {
				a++;
				b = i;
			}
		}
		if(a == 0) {
			$("#danger-dialog1").show();
			vm.dangerText = "请选中后再删除！";
			$scope.$digest();
			window.setTimeout(function() {
				$("#danger-dialog1").hide();
			}, 3000);
			return;
		}
		if(a != 1) {
			$("#danger-dialog1").show();
			vm.dangerText = "删除只能单个删除，不可批量删除！";
			$scope.$digest();
			window.setTimeout(function() {
				$("#danger-dialog1").hide();
			}, 3000);
			return;
		}
		vm.detId = vm.detaillist[srcPosition].id; //明细id
		vm.srcInvId = vm.productlist[b].id; //源货品库位id
		vm.qty = vm.detaillist[srcPosition].quantity; //移位数量
		vm.srcProid = vm.productlist[b].PROID; //源货品货品id
		vm.destProId = vm.detaillist[srcPosition].dest_product_id; //目标货品id
		Area.getDetailupdateEieoDet(vm).success(function(data) {
			if(data.additionalMsg.status == '成功') {
				$("#success-dialog1").show();
				vm.successText = "成功";
				if(!$scope.$$phase) {
					$scope.$digest();
				}
				window.setTimeout(function() {
					$("#success-dialog1").hide();
				}, 3000);
				window.setTimeout(function() {
					$('#detail-operate').modal('hide')
				}, 2000);
				getDeatailAreaList();
			} else if(data.additionalMsg.status == '失败') {
				$("#danger-dialog1").show();
				vm.dangerText = data.additionalMsg.message;
				if(!$scope.$$phase) {
					$scope.$digest();
				}
				window.setTimeout(function() {
					$("#danger-dialog1").hide();
				}, 3000);
				getDeatailAreaList();
			} else {
				$("#danger-dialog1").show();
				vm.dangerText = "系统错误！请联系管理员";
				if(!$scope.$$phase) {
					$scope.$digest();
				}
				window.setTimeout(function() {
					$("#danger-dialog1").hide();
				}, 3000);
			}
		});

	});
	/**
	 * 添加源货品 -单选checkbox
	 * @param {Object} m
	 */
	vm.selectproductCheckBox = function(m) {
			if(vm.productlist[m].state === true) {
				vm.productlist[m].state = false;
			} else {
				vm.productlist[m].state = true;
				for(var i = 0; i < vm.productlist.length; i++) {
					if(m != i) {
						vm.productlist[i].state = false;
					}
				}
			}
		}
		/**
		 * 源货品全选checkbox
		 * @param {Object} m
		 */
	vm.productAll = function(m) {
		for(var i = 0; i < vm.productlist.length; i++) {
			if(m === true) {
				vm.productlist[i].state = true;
			} else {
				vm.productlist[i].state = false;
			}
		}

	};
	//	记录条数
	vm.packprductChange = function(x) {
		vm.productpageSize = x;
		getproductAreaList();
	}

	//	-----------------------------------------------------------------------------------------------------
	//查询货品---------------------------------------------------------------------------------------------------------------------------------------------

	vm.objselected = vm.pages[8].id; //默认取值28
	vm.objselectAll = false;
	vm.objlist;
	getObjTableHead();
	vm.objtotalitems = 10; //总共有多少条数据
	vm.objcurrentpage = 1; //当前第几页
	vm.objmaxsize = 5; //可选择的页数范围(如果设置为5,当前页为10,总页数为100,那么可选择第8,9,10,11,12页
	vm.objpageSize = 28; //页面显示数量

	vm.objcode = ""; //货品编码
	vm.objname = ""; //货品名称 
	vm.objbarCode = ""; //69码

	/**
	 * 目标货品-表头数据获取
	 */
	function getObjTableHead() {
		Area.getObjTableHead(vm).success(function(data) {
			vm.objtableList = data.resultValue;
		});
	}

	$("#obj_query").click(function() {
		getobjAreaList();
	});
	/**
	 * 目标货品-表数据获取
	 */
	function getobjAreaList() {
		vm.objselectAll = false;
		vm.objcode = $("#obj_productCode").val(); //货品编码
		vm.objName = encodeURI($.trim($("#obj_productName").val())); //货品名
		vm.objbarCode = $("#obj_barCode").val(); //69码
		Area.getObjAreaList(vm).success(function(response) {
			var data = new Array();
			data = response.rows;
			for(var i = 0; i < data.length; i++) {
				data[i].state = false;
			}
			vm.objlist = data;
			vm.objSuccess = response.additionalMsg.status;
			vm.objTime = response.additionalMsg.processTime;
			vm.producttotalitems = response.total;
		});
	}
	/**
	 * 目标货品-添加确定
	 */
	$("#obj_sure").click(function() {
		var c = 0;
		var d;
		if(vm.objlist.length == 0) {
			$("#danger-dialog2").show();
			vm.dangerText = "没有数据！";
			$scope.$digest();
			window.setTimeout(function() {
				$("#danger-dialog2").hide();
			}, 3000);
			return;
		}
		for(var i = 0; i < vm.objlist.length; i++) {
			if(vm.objlist[i].state === true) {
				c++;
				d = i;
			}
		}
		if(c == 0) {
			$("#danger-dialog2").show();
			vm.dangerText = "请选中后再删除！";
			$scope.$digest();
			window.setTimeout(function() {
				$("#danger-dialog2").hide();
			}, 3000);
			return;
		}
		if(c != 1) {
			$("#danger-dialog2").show();
			vm.dangerText = "删除只能单个删除，不可批量删除！";
			$scope.$digest();
			window.setTimeout(function() {
				$("#danger-dialog2").hide();
			}, 3000);
			return;
		}
		vm.detId = vm.detaillist[objPosition].id;
		vm.srcInvId = vm.detaillist[objPosition].src_inv_id; //
		vm.qty = vm.detaillist[objPosition].quantity;
		vm.srcProid = vm.detaillist[objPosition].src_product_id;
		vm.destProId = vm.objlist[d].id;
		Area.getDetailupdateEieoDet(vm).success(function(data) {
			if(data.additionalMsg.status == '成功') {
				$("#success-dialog2").show();
				vm.successText = "成功";
				if(!$scope.$$phase) {
					$scope.$digest();
				}
				window.setTimeout(function() {
					$("#success-dialog2").hide();
				}, 3000);
				window.setTimeout(function() {
					$('#obj-operate').modal('hide')

					$('#obj-operate').on('hidden.bs.modal', function(e) {
						cleanInputDatas();
					});

				}, 2000);
				getDeatailAreaList();
			} else if(data.additionalMsg.status == '失败') {
				$("#danger-dialog2").show();
				vm.dangerText = data.additionalMsg.message;
				if(!$scope.$$phase) {
					$scope.$digest();
				}
				window.setTimeout(function() {
					$("#danger-dialog2").hide();
				}, 3000);
				getDeatailAreaList();
			} else {
				$("#danger-dialog2").show();
				vm.dangerText = "系统错误！请联系管理员";
				if(!$scope.$$phase) {
					$scope.$digest();
				}
				window.setTimeout(function() {
					$("#danger-dialog2").hide();
				}, 3000);
			}
		});

	});
	/**
	 * 目标货品-添加的dialog
	 */
	var objPosition;
	vm.objDialog = function(m) {
		objPosition = m;
		$('#obj-operate').modal('show');
	}
	vm.objAll = function(m) {
		for(var i = 0; i < vm.objlist.length; i++) {
			if(m === true) {
				vm.objlist[i].state = true;
			} else {
				vm.objlist[i].state = false;
			}
		}

	};
	vm.selectobjCheckBox = function(m) {
		if(vm.objlist[m].state === true) {
			vm.objlist[m].state = false;
		} else {
			vm.objlist[m].state = true;
			for(var i = 0; i < vm.objlist.length; i++) {
				if(m != i) {
					vm.objlist[i].state = false;
				}
			}
		}
	}

	//	记录条数
	vm.packobjChange = function(x) {
			vm.objpageSize = x;
			getobjAreaList();
		}
		//-----------------------------------------------------------------------

}
$.fn.datetimepicker.dates['zh'] = {
	days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
	daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"],
	daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
	months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
	monthsShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
	meridiem: ["上午", "下午"],
	//suffix:      ["st", "nd", "rd", "th"],  
	today: "今天"
};

$(function() {
	$('#datetimepicker').datetimepicker({
		language: 'zh',
		autoclose: 'true'
	});
	$('#datetimepicker1').datetimepicker({
		language: 'zh',
		autoclose: 'true'
	});
});