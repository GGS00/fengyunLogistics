var printConPackageCode = function(name) {
        alert(name.length)
        var selections = $("#" + name).datagrid('getSelections');
        if (selections.length > 10) {
                $.messager.alert('提示', '一次最多打印10条数据，请重新选择！', 'warning');
                return false;
        }
        for (var i = 0; i < selections.length; i++) {

                var wayBill_Lodop_obj = getLodop();

                wayBill_Lodop_obj.PRINT_INITA("2mm", "-2mm", "98mm", "98mm", "printWayBillTemplate");
                wayBill_Lodop_obj.SET_PRINT_PAGESIZE(1, "100mm", "100mm", "");
                wayBill_Lodop_obj.SET_PRINT_MODE("RESELECT_PRINTER", true);

                wayBill_Lodop_obj.ADD_PRINT_RECT(10, 10, 360, 360, 0, 1);
                wayBill_Lodop_obj.ADD_PRINT_LINE(290, 10, 290, 370, 0, 1);
                wayBill_Lodop_obj.ADD_PRINT_LINE(290, 190, 370, 190, 0, 1);

                wayBill_Lodop_obj.ADD_PRINT_LINE(330, 10, 330, 370, 0, 1);

                wayBill_Lodop_obj.ADD_PRINT_BARCODE(70, 57, 310, 110, "128A", code);

                wayBill_Lodop_obj.ADD_PRINT_TEXT(300, 56, 98, 20, "装包地");
                wayBill_Lodop_obj.SET_PRINT_STYLEA(0, "FontName", "黑体");
                wayBill_Lodop_obj.SET_PRINT_STYLEA(0, "FontSize", 20);
                wayBill_Lodop_obj.SET_PRINT_STYLEA(0, "Bold", 1);

                wayBill_Lodop_obj.ADD_PRINT_TEXT(300, 236, 98, 20, "拆包地");
                wayBill_Lodop_obj.SET_PRINT_STYLEA(0, "FontName", "黑体");
                wayBill_Lodop_obj.SET_PRINT_STYLEA(0, "FontSize", 20);
                wayBill_Lodop_obj.SET_PRINT_STYLEA(0, "Bold", 1);

                wayBill_Lodop_obj.ADD_PRINT_TEXT(340, 62, 98, 20, zhuangbaodi);
                wayBill_Lodop_obj.SET_PRINT_STYLEA(0, "FontSize", 18);

                wayBill_Lodop_obj.ADD_PRINT_TEXT(340, 242, 98, 20, chaibaodi);
                wayBill_Lodop_obj.SET_PRINT_STYLEA(0, "FontSize", 18);



                if (wayBill_Lodop_obj.SET_PRINTER_INDEXA("EW")) {
                        //wayBill_Lodop_obj.PREVIEW();
                        //wayBill_Lodop_obj.PRINT_DESIGN();
                        wayBill_Lodop_obj.PRINT();
                }


        }

};