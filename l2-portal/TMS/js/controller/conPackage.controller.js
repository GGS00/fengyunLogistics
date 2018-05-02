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

  vm.detailPages = [
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
  vm.detailSelected=vm.detailPages[0].id;
  vm.siteSelected=vm.sites[0].name;//如果想要第一个值
      
 
  vm.page = 1; //默认当前页数
  vm.maxSize = 5; //最大页码
  vm.pageSize = 50; //1页多少个

  vm.detailPage = 1; //默认当前页数
  vm.detailMaxSize = 5; //最大页码
  vm.detailPageSize = 50; //1页多少个


  vm.selectAll = false;

  vm.list;
  getList();

  vm.getList = function() {
        
         getList();

  }

  vm.searchPack = function(){
   
    vm.siteName = $('#loadSite').val(); //装包地
    vm.conStatus = $('#removeSite').val(); //拆包地
    vm.conStatus = $('#conStatus').val(); //状态
    vm.conPackageNum = $('#conPackageNum').val(); //con包号
    
    vm.conPackageNum = $('#conPackageStatus').val(); //Con包状态

    getList();

  }

  function showMask(){

      $('.firstLoad .loadingMask').show();
      $('.firstLoad .ibox-content').css('overflow','hidden');

  }

  function removeMask(){

      $('.firstLoad .loadingMask').hide();
      $('.firstLoad .ibox-content').css({'overflow-x':'hidden','overflow-y':'scroll'});
  }

  function showModalMask(){

      $('#conPackageDetail .loadingMask').show();
      $('#conPackageDetail .ibox-content').css('overflow','hidden');

  }

  function removeModalMask(){

      $('#conPackageDetail .loadingMask').hide();
      $('#conPackageDetail .ibox-content').css({'overflow-x':'hidden','overflow-y':'scroll'});
  }


  function getList() {
    
    $(".ibox-content").animate({scrollTop: 0},function(){

        showMask();

        vm.selectAll = false;

        Area.getAreaList(vm).success(function(data) {
          if(data.additionalMsg.status=='成功'){

           removeMask();
          
             $("#checkAndPackage_msg").show().html("<b style='color:#578B99;padding-left: 10px;'>操作成功！耗时："+data.additionalMsg.processTime +"秒!</b>"); 
             $('#checkAndPackage_msg').delay(3000).hide(0);

            vm.pageCount = data.total; //总个数

            for (var i = 0; i < data.rows.length; i++) {

              data.rows[i].state = false;

            }

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

  vm.all = function(m) {
    for (var i = 0; i < vm.list.length; i++) {
      if (m === true) {
        vm.list[i].state = true;
      } else {
        vm.list[i].state = false;
      }
    }
  };

  /*每页不同条数展示*/
  vm.packChange = function(x){

     vm.pageSize = x;

     getList();
  }


  vm.detailPackChange = function(x){

     vm.detailPageSize = x;

     vm.getDetail();
  }



  //新建

  vm.newConPackage = function(){
    $('#goodsBackup').modal('show');
  }


  //打印con包条码
  vm.printConMa = function() {

    var selectList = [];
    vm.selectListSend = [];
    for (var i = 0; i < vm.list.length; i++) {
      if (vm.list[i].state === true) {
        //选中的条目
         selectList.push(vm.list[i]);

      }
    }

    if(selectList.length == '0'){

      /*alert('请先选择要发运的订单');*/
      msgAlert.text('请先选择要打印的Con包');

    }else{

      for(var i = 0 ; i < selectList.length ; i++){
        if(selectList[i].status !='FINISHED' || selectList[i].shipStatus !='UN_SHIP' ){

          msgAlert.text('存在未完成或已发运状态订单');
          return;

        }

      }

      for(var i = 0 ;i < selectList.length ; i++){
           vm.selectListSend.push(selectList[i].id);
      }
      printConPackageCode(vm.selectListSend);

      /*Area.ship(vm).success(function(data) {
          
          if(data.additionalMsg.status=='成功'){

    
              getList();

          }else if(data.additionalMsg.status=='失败'){

            msgAlert.text('接口调用失败 >﹏< ['+ data.additionalMsg.message+']');

          }else{

          $("#checkAndPackage_msg").html("<b style='color:#FF5459;'>系统错误！请联系管理员</b>");
          $('#checkAndPackage_msg').delay(3000).hide(0);
              
            }

      });*/


    }


  }

  //修改

  vm.editConPackage= function() {

    var selectLen = 0;
    

    for (var i = 0; i < vm.list.length; i++) {
      if (vm.list[i].state === true) {
        //选中的条目
        vm.taskId = vm.list[i].id;
        vm.taskExpectedQuantityBU = vm.list[i].expectedQuantityBU;
        vm.taskExpectedCheckQuantityBU = vm.list[i].expectedCheckQuantityBU;
        vm.taskCheckStatus = vm.list[i].checkStatus;
        selectLen++;
      }
    }

    if(selectLen > 0){

        if(selectLen > 1){

          msgAlert.text('至多只能选择一个哦！');
        }else{

          $('#editConInfo').modal('show');
        }

    }else{

       msgAlert.text('请先选择要修改的Con包！');
    }
    
  }


  //指定站点

  vm.showSite = function(){

      $('.showProvince').removeClass('btn-success').addClass('btn-default')

      $('.showSite').addClass('btn-success');

      $(".appointProvince").hide();

      $(".appointSite").toggle('normal');
  }

  //指定省

  vm.showProvince = function(){

      $('.showSite').removeClass('btn-success').addClass('btn-default')

      $('.showProvince').addClass('btn-success');

      $(".appointSite").hide();

      $(".appointProvince").toggle('normal');
  }

  //通过省去关联查询该省下面的站点名

   vm.provinceChange = function(x){

     console.log(x)

     
  }


   //扫货装包

  vm.loadGoods= function() {

    var selectLen = 0;  

    for (var i = 0; i < vm.list.length; i++) {
      if (vm.list[i].state === true) {
        //选中的条目
        vm.taskId = vm.list[i].id;

        selectLen++;
      }
    }

    if(selectLen > 0){

        if(selectLen > 1){

          msgAlert.text('至多只能选择一个哦！');
        }else{
          vm.packageStyle = 0;//扫货装包

          $('#packageChange').modal('show');
        }

    }else{

       msgAlert.text('请先选择要扫货装包的con包！');
    }
    
  }


  //移出装包

  vm.removeGoods= function() {

    var selectLen = 0;
    

    for (var i = 0; i < vm.list.length; i++) {
      if (vm.list[i].state === true) {
        //选中的条目
        vm.taskId = vm.list[i].id;

        selectLen++;
      }
    }

    if(selectLen > 0){

        if(selectLen > 1){

          msgAlert.text('至多只能选择一个哦！');
        }else{

          vm.packageStyle = 1;//移出装包

          $('#packageChange').modal('show');
        }

    }else{

       msgAlert.text('请先选择要移出装包的con包！');
    }
    
  }


  //CON包明细

  vm.conPackageDetail= function() {

    var selectLen = 0;
    

    for (var i = 0; i < vm.list.length; i++) {
      if (vm.list[i].state === true) {
        //选中的条目
        vm.taskId = vm.list[i].id;

        selectLen++;
      }
    }

    if(selectLen > 0){

        if(selectLen > 1){

          msgAlert.text('至多只能选择一个哦！');
        }else{
          
          vm.getDetail();         

        }

    }else{

       msgAlert.text('请先选择要查看的con包！');
    }
    
  }

  vm.getDetail = function(){

    showModalMask();

    Area.conPackageDetail(vm).success(function(data) {
          
              if(data.additionalMsg.status=='成功'){

                removeModalMask()

                 $('#conPackageDetail').modal('show');
                 vm.detailPageCount = data.total; //总个数
                 vm.detailList = data.rows;

              }else if(data.additionalMsg.status=='失败'){
                
                removeModalMask();
                msgAlert.text('接口调用失败 >﹏< ['+ data.additionalMsg.message+']');

              }

          });
  }

  vm.searchConDetail = function(){
    
    vm.packageNum = $('#packageNum').val();
    vm.miandan = $('#miandan').val();
    if(vm.packageNum == '' && vm.miandan==''){

      msgAlert.text('请先输入箱号或面单号');

    }else{
      
      vm.getDetail();
    }
    

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

 

  /*控制头部显影*/
   vm.showAndHide = function(){
     $('.searchShow').toggle('normal');
     if($('.minus').hasClass('fa-minus')){

      $('.minus').removeClass('fa-minus').addClass('fa-plus');

     }else{

      $('.minus').removeClass('fa-plus').addClass('fa-minus');

     }
     

   }


}


