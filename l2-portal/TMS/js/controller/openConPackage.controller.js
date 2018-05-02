angular.module('app',['ngSanitize','ui.bootstrap'])
  .controller('MainCtrl', MainCtrl)

angular.$inject = ['$http', '$stateParams'];

function MainCtrl($scope,$sce,Area) {
 

  var vm = this;
  vm.pages = [
        {name:'50',id:'50'},
        {name:'20',id:'20'},
        {name:'40',id:'40'},
        {name:'80',id:'80'}
    ];

  vm.sites = [
        {name:'南京站',id:'50'},
        {name:'盐城站',id:'20'},
        {name:'苏州站',id:'40'},
        {name:'扬州站',id:'80'}
  ];

  vm.selected=vm.pages[0].id;//如果想要第一个值
  vm.siteSelected=vm.sites[0].id;//如果想要第一个值
      
 
  vm.page = 1; //默认当前页数
  vm.maxSize = 5; //最大页码
  vm.pageSize = 50; //1页多少个


  vm.list;
  getList();

  vm.getList = function() {
        
         getList();

  }

  vm.searchPack = function(){
   
    vm.siteName = $('#siteName').val(); //站点
    vm.conStatus = $('#conStatus').val(); //状态
    vm.conPackageNum = $('#conPackageNum').val(); //con包号

    getList();

  }

  function showMask(){

      $('.ibox-content .loadingMask').show();
      $('.ibox-content').css('overflow','hidden');

  }

  function removeMask(){

      $('.ibox-content .loadingMask').hide();
      $('.ibox-content').css({'overflow-x':'hidden','overflow-y':'scroll'});
  }


  function getList() {
    
    $(".ibox-content").animate({scrollTop: 0},function(){

        showMask();

        Area.getAreaList(vm).success(function(data) {
          if(data.additionalMsg.status=='成功'){

           removeMask();
          
             $("#checkAndPackage_msg").show().html("<b style='color:#578B99;padding-left: 10px;'>操作成功！耗时："+data.additionalMsg.processTime +"秒!</b>"); 
             $('#checkAndPackage_msg').delay(3000).hide(0);

            vm.pageCount = data.total; //总个数
            vm.list = data.rows;

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


  vm.confrimAddCon = function(){
      
      vm.goodCounts = $('#goodsCount').val();

      if(vm.goodCounts == ''){

        msgAlert.text('请输入Con包数');

      }else{

        Area.confirmPickedBack(vm).success(function(data) {

         if(data.additionalMsg.status=='成功'){

            $('#checkAndPackage_msg').show().html("<b style='color:#578B99;padding-left: 10px;'>新建成功</b>");
            $('#checkAndPackage_msg').delay(3000).hide(0);
            $('#goodsBackup').modal('hide');
            $('#goodsCount').val('');
            getList();

          }else if(data.additionalMsg.status=='失败'){

            msgAlert.text('接口调用失败 >﹏< ['+ data.additionalMsg.message+']');

          }else{

              //返回信息页面展示
              /*msgObj.ajaxResponseMsg($("#checkAndPackage_msg"), data);*/
              $('.imeisNoMsg').html("<b style='color:#FF5459;'>系统错误！请联系管理员</b>"); 
              $('.imeisNoMsg').delay(3000).hide(0);
              
            }
          
        });

      }

  }

 



}


