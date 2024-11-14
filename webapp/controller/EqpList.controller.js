sap.ui.define([
   
    "zdemo/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/ui/core/ElementRegistry',
],
function (BaseController,Filter,FilterOperator,ElementRegistry) {
    "use strict";

    return BaseController.extend("zfin.controller.EqpList", {
        onInit: function () {
            this.oDataModel = this.getModel("mainService");
            this.oJmodel = this.getModel("oJmodel");
            this.i18nModel = this.getModel("i18n").getResourceBundle();
            this.getRouter().getRoute("EqpList").attachMatched(this.fnOnRoutematched,this);
        },
        fnOnRoutematched : function(oEvent){
            // var oTable = this.getView().byId("idProductsDetailsTable");
            // var aItems = oTable.getItems();
            // if (aItems && aItems.length > 0) {
            //     for (var i = 0; i < aItems.length; i++) {
            //       var aCells = aItems[i].getCells();
            //       if (aCells[4].getText() === "N") {
            //         aItems[i].addStyleClass("redBackground");
            //       }
            //       else{
            //         aItems[i].addStyleClass("greenBackground");
            //       }
            //     }
            //   }
        },
        onPressEqpRow: function (oEvent) {
			var oItem = oEvent.getSource();
			var selInd = oEvent.getSource().getBindingContextPath().split("/").pop();
            var aResults =  this.oJmodel.getProperty("/oEqpList");
            var aSelResult = [];aSelResult.push(aResults[selInd]);
            this.oJmodel.setProperty("/oEqpListDetails",aSelResult);
            this.fnNavtoEqpDetails();
		},
        fnNavtoEqpDetails : function () {
            this.getRouter().navTo("EqpDetails");
        },
        // onAfterRendering: function() {
        //     var oTable = this.getView().byId("idProductsDetailsTable");
        //     var aItems = oTable.getItems();
        //     if (aItems && aItems.length > 0) {
        //     for (i = 0; i < aItems.length; i++) {
        //       var aCells = aItems[i].getCells();
        //       if (aCells[1].getText() === "red") {
        //           //you can set the style via Jquery
        //         //$("#" + aItems[i].getId()).css("background-color", "red");
        //         //or add the style
        //         aItems[i].addStyleClass("redBackground");
        //       }
        //     }
        //   }
        // }
    

    });
});
