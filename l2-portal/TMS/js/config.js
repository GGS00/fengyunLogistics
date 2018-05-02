/*var Home_host = window.location.host;*/
/*var Home_host = window.location.host;*/
var Home_host = "172.18.13.124:8003";
var Comm_Config =  "http://"+Home_host+"/logistics/";

var request =
{
    QueryString : function(val)
    {
        var uri = window.location.search;
        var re = new RegExp("" +val+ "=([^&?]*)", "ig");
        return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
    }
}


var msgAlert = 
{
   text :function(msg){

   	  $("div#msgTips").remove();
   	  $('body').append("<div class=\"modal fade\" id=\"msgTips\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"><div class=\"modal-dialog msgtips\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button><h4 class=\"modal-title\" id=\"myModalLabel\"><i class=\"fa fa-warning\" style=\"margin-right: 10px;\"></i>提示</h4></div><div class=\"modal-body\">"+ msg +"</div><div class=\"modal-footer\"><div class=\imeisNoMsg\"></div><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭</button></div></div></div></div>");
      $('#msgTips').modal('show');

   }

}


Date.prototype.format = function(format) {
  var o = {
    "M+" : this.getMonth() + 1, // month
    "d+" : this.getDate(), // day
    "h+" : this.getHours(), // hour
    "m+" : this.getMinutes(), // minute
    "s+" : this.getSeconds(), // second
    "q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
    "S" : this.getMilliseconds()
  // millisecond
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "")
        .substr(4 - RegExp.$1.length));
  }

  for ( var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
          : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}

