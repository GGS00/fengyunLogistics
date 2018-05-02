//<%--结束包装 --%>
var overPackage = function(){
	$.ajax({
		url:""+ Comm_Config + "wmsPackageTask/overPackage",
		method:'post',
		data:{
			packageTaskId: $("#checkAndPackage_id").val()
		},
		dataType:'json',
		cache:false,
		success:function(data){
			if(data.additionalMsg.status == "成功"){
				refreshAfterOverPackage();
			}
			//返回信息页面展示
			msgObj.ajaxResponseMsg($("#checkAndPackage_msg"), data);
		}
	});
};

//<%--结束包装 刷新数据--%>
var refreshAfterOverPackage = function(){
	$.ajax({
		url:""+ Comm_Config + "wmsPackageTask/refreshAfterOverPackage",
		method:'post',
		data:{
			packageTaskId: $("#checkAndPackage_id").val()
		},
		dataType:'json',
		cache:false,
		success:function(data){
			if(data.additionalMsg.status == "成功"){
				$("#checkAndPackage_status").val(data.status);
				isFinishPackage();
				$("#checkAndPackage_src_srchValue").focus();
				$("#checkAndPackage_src_srchValue").val('');
				//串行打印运单、发货清单、箱标贴
				checkAndPackage_printOutbound(true);
			}else {
				msgObj.showMsgService($("#checkAndPackage_msg"), "<b style='padding-left:5px;color:red;'>[系统内部错误]</b>");
				return;
			}
		}
	});
};