angular.module('app')
  .controller('MainCtrl', MainCtrl)

angular.$inject = ['$http', '$stateParams'];

function MainCtrl($scope, Area) {
  var vm = this;
  vm.list;
  vm.infoList;
  getWlList()   

  function getList() {
    showMask();
    vm.selectAll = false;
   
    Area.getAreaList(vm).success(function(data) {    
      if(data.result == true){

          $('.packCheck').show();
          $('.wlCompany').show();
          removeMask();
          vm.infoList = data;
          vm.list = data.detailList;
          console.log(vm.list)

      }else if(data.result== false){
            
            removeMask();
            msgAlert.text(data.message);

      }else{

            removeMask();
            //返回信息页面展示
            $("#checkAndPackage_msg").html("<b style='color:#FF5459;'>系统错误！请联系管理员</b>");
            $('#checkAndPackage_msg').delay(3000).hide(0);
            
      }

    });

  }


  function getWlList(){
    
    Area.getWlList(vm).success(function(data) {    
      
          vm.wlList = data.rows;
          vm.selected = vm.wlList[0].code;//如果想要第一个值
          console.log(vm.wlList)
    
    });
  }

  vm.searchByOrderNum = function(){
    vm.searchOrderNum = $("#searchOrderNum").val();
    console.log(vm.searchOrderNum);
    if(vm.searchOrderNum == ''){

      msgAlert.text('请先填写订单号');

    }else{

      getList();

    }
    

  }


  function showMask(){

      $('.ibox-content .loadingMask').show();
      $('.ibox-content').css('overflow','hidden');

  }

  function removeMask(){

      $('.ibox-content .loadingMask').hide();
      $('.ibox-content').css({'overflow-x':'hidden','overflow-y':'scroll'});
  }

   //<%--查询  回车自动查询  快捷键 --%>
    var singleCheck_shortcutsKey = function(){
      $("#searchOrderNum").bind('keyup', function(event) {
        if (event.keyCode == "13") {
          getList();
        }
      });
    };
    singleCheck_shortcutsKey();
}
