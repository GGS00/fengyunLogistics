angular.module('app').controller('MainCtrl', MainCtrl)

angular.$inject = [ '$http', '$stateParams' ];

function MainCtrl($scope, Area) {
	var vm = this;
	vm.pages = [ {
		name : '50',
		id : '50'
	}, {
		name : '20',
		id : '20'
	}, {
		name : '40',
		id : '40'
	}, {
		name : '80',
		id : '80'
	} ];
	vm.selected = vm.pages[0].id;// 如果想要第一个值
	vm.page = 1; // 默认当前页数
	vm.maxSize = 5; // 最大页码
	vm.pageSize = 20; // 1页多少个
	vm.pageCount = 100; // 总个数
	vm.selectAll = false;
	vm.passList = [];
	vm.passIdList = [];
	vm.list;
	getList();

	vm.getList = function() {
		getList();
	}

	function getList() {

		$(".ibox-content").animate({scrollTop: 0},function(){
			showMask();

			vm.selectAll = false;
			var bcode = $("#bcode").val();
			var stsitenm = $("#stsitenm").val();
			var pssitenm = $("#pssitenm").val();
			var edsitenm = $("#edsitenm").val();
			var xparam = {
					bean:'roadLineTrunk',
					method:'page',
	                page:vm.page,
					rows:vm.pageSize,
					lineName:bcode,
					startPlatformName:stsitenm,
					endPlatformName:edsitenm,
					roadPlatformNames:pssitenm
			};
			Area.getAreaList(xparam).success(function(data) {

				if(data.additionalMsg.status=='成功'){
					removeMask();

					vm.pageCount = data.total;
					for (var i = 0; i < data.rows.length; i++) {
						data.rows[i].state = false;
					}
					vm.list = data.rows;
					console.log(vm.list);
					$("#checkAndPackage_msg").show().html("<b style='color:#578B99;padding-left: 10px;'>操作成功！耗时："+data.additionalMsg.processTime +"秒!</b>");
					$('#checkAndPackage_msg').delay(3000).hide(0);

				}else if(data.additionalMsg.status=='失败'){
					removeMask();

                    msgAlert.text('接口调用失败 >﹏< ['+ data.additionalMsg.message+']');

	            }else{
	            	removeMask();

	                //返回信息页面展示
		            /*msgObj.ajaxResponseMsg($("#checkAndPackage_msg"), data);*/
		            $("#checkAndPackage_msg").html("<b style='color:#FF5459;'>系统错误！请联系管理员</b>");
		            $('#checkAndPackage_msg').delay(3000).hide(0);
	                
	              }  
				
			});



		});
		
	}

	vm.all = function(m) {
		for (var i = 0; i < vm.list.length; i++) {
			if (m === true) {
				vm.list[i].state = true;
			} else {
				vm.list[i].state = false;
			}
		}
	};

	vm.goodsSend = function() {
		for (var i = 0; i < vm.list.length; i++) {
			if (vm.list[i].state === true) {

				alert(vm.list[i].agent_id);

			}
		}
	}

	vm.packChange = function(x) {
		console.log(x);
		vm.pageSize = x;
		console.log(vm.pageSize);
		getList();
	}

	vm.showPassBy = function() {
		$(".passSite").toggle(500);
	}

	vm.addPassBy = function() {
		$("#addLine .passByTable").show();
		/* console.log(vm.passList.join('').indexOf(vm.passbyselected)) */
		if(vm.passid != null){
			vm.passList.push(vm.passbyselected);
			vm.passIdList.push(vm.passid);
			vm.passid = null;
		}
		console.log(vm.passList)
	}

	vm.showAddLine = function() {
		$('#addLine').modal('show');
		vm.passList = [];
		$("#addLine .passByTable").hide();
		$(".siteSelected #startsite").val('');
        $(".siteSelected #endsite").val('');
		$(".siteSelected .selectControl").hide();
        $(".siteSelected .selectEndControl").hide();
		$("#addLine .passSite").hide();
	}

	vm.searchByKey = function() {
		vm.startsitename = $("#startsite").val();
		Area.getPassBy(vm.startsitename).success(function(data) {
			vm.lineSiteList = data.list;
		});
		$(".selectControl").show();
	}

	vm.selectSite = function(id, name) {
		vm.lineStartSelected = name;
		vm.startid = id;
		$(".selectControl").toggle();
	}

	vm.searchByEndKey = function() {
		vm.endsitename = $("#endsite").val();
		Area.getPassBy(vm.endsitename).success(function(data) {
			vm.lineSiteList = data.list;
		});
		$(".selectEndControl").show();
	}

	vm.selectEndSite = function(id, name) {
		vm.lineEndSelected = name;
		vm.endid = id;
		$(".selectEndControl").toggle();

	}

	vm.searchByPassKey = function() {
		vm.passsitename = $("#passsite").val();
		var name = $("#passsite").val();
		Area.getPassBy(name).success(function(data) {
			vm.lineSiteList = data.list;
		});
		$(".selectPassControl").show();
	}

	vm.selectPassSite = function(id, name) {
		vm.passbyselected = name;
		vm.passid = id;
		$(".selectPassControl").toggle();

	}

	vm.resetPassBy = function() {
		vm.passList = [];
		vm.passIdList = [];
		vm.passbyselected = null;
		vm.passid = null;
		$("#addLine .passByTable").hide();
	}

	vm.submitLine = function() {
		var xtt = {
				lineName: '',
				startPlatformId:vm.startid,
				startPlatformName:vm.lineStartSelected,
				endPlatformId:vm.endid,
				endPlatformName:vm.lineEndSelected,
				roadPlatformIds:vm.passIdList.join(),
				roadPlatformNames:vm.passList.join()
		};
		console.log(xtt);
		Area.submit(xtt).success(function(data) {
			if(data.additionalMsg.status=='成功'){

				if(data.id>0){
				$("#addLine").modal('hide');
					getList();
				}else{
					console.log('fail');
				}

			}else if(data.additionalMsg.status=='失败'){

                    msgAlert.text('接口调用失败 >﹏< ['+ data.additionalMsg.message+']');

            }else{

	            $(".imeisNoMsg").html("<b style='color:#FF5459;'>系统错误！请联系管理员</b>");
	            $('.imeisNoMsg').delay(3000).hide(0);
                
              }  

			
		});
		/* $('#addLine').modal('hide'); */
	}


	function showMask(){

       $('.ibox-content .loadingMask').show();
       $('.ibox-content').css('overflow','hidden');

	}

	function removeMask(){

	    $('.ibox-content .loadingMask').hide();
	    $('.ibox-content').css({'overflow-x':'hidden','overflow-y':'scroll'});
	}
}
