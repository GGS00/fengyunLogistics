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
	vm.endTaskTime = '';
	vm.startTaskTime = new Date().format("yyyy-MM-dd");
	vm.list;
	getList();

	var rptContent = {

	    
	        chart: {
	            type: 'column'
	        },
	        title: {
	            text: '入场、装车统计'
	        },
	        subtitle: {
	            text: 'statistics'
	        },
	        xAxis: {
	            categories: [],
	            crosshair: true
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: '个数 (个)'
	            }
	        },
	        tooltip: {
	            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	            '<td style="padding:0"><b>{point.y}个</b></td></tr>',
	            footerFormat: '</table>',
	            shared: true,
	            useHTML: true
	        },
	        plotOptions: {
	            column: {
	                pointPadding: 0.2,
	                borderWidth: 0
	            }
	        },
	        series: []
	    
	};

	vm.getList = function() {

		vm.startTaskTime = $('#startTaskTime').val();
		vm.endTaskTime = $('#endTaskTime').val();

		getList();
	}

	function getList() {

		$(".ibox-content").animate({scrollTop: 0},function(){
			showMask();

			Area.getAreaList(vm).success(function(data) {

				if(data.additionalMsg.status=='成功'){
					removeMask();

					vm.list = data.resultList;

                    var categories = [];
                    for(var i = 0 ; i < vm.list.length ; i++){   	 
                    	categories.push(vm.list[i].name);
                    }

					rptContent["xAxis"]["categories"] = categories;
					
					var series = new Array();		
					var serie = {};
					serie["name"] = '订单数';
					var orderNum =[];
					for(var i = 0 ; i < vm.list.length ; i++){			
						orderNum.push(vm.list[i].ORDER_COUNT);			
                    }

                    serie["data"] = orderNum;
                    series.push(serie);

                    var serie = {};
					serie["name"] = '入场数';
					var enterNum =[];
					for(var i = 0 ; i < vm.list.length ; i++){
						enterNum.push(vm.list[i].ENTERED_COUNT);
                    }
                    serie["data"] = enterNum;
                    series.push(serie);

                    var serie = {};
					serie["name"] = '装箱数';
					var truckNum =[];
					for(var i = 0 ; i < vm.list.length ; i++){
						truckNum.push(vm.list[i].TRUCK_COUNT);
                    }
                    serie["data"] = truckNum;
                    series.push(serie);

                    var serie = {};
					serie["name"] = '总箱数';
					var truckNum =[];
					for(var i = 0 ; i < vm.list.length ; i++){
						truckNum.push(vm.list[i].TOTAL_COUNT);
                    }
                    serie["data"] = truckNum;
                    series.push(serie);

					rptContent["series"] = series;
					$("#container").highcharts(rptContent); 


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



	function showMask(){

       $('.ibox-content .loadingMask').show();
       $('.ibox-content').css('overflow','hidden');

	}

	function removeMask(){

	    $('.ibox-content .loadingMask').hide();
	    $('.ibox-content').css({'overflow-x':'hidden','overflow-y':'scroll'});
	}
}
