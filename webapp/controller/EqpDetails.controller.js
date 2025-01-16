sap.ui.define([
   
    "zcalib/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/ui/core/ElementRegistry',
],
function (BaseController,Filter,FilterOperator,ElementRegistry) {
    "use strict";

    return BaseController.extend("zfin.controller.EqpDetails", {
        onInit: function () {
            this.oDataModel = this.getModel("mainService");
            this.oJmodel = this.getModel("oJmodel");
            this.i18nModel = this.getModel("i18n").getResourceBundle();
            this.getRouter().getRoute("EqpDetails").attachMatched(this.fnOnRoutematched,this);
        },
        // fnOnRoutematched : function(oEvent){
        //     var oTable = this.getView().byId("idProductsTable");
        //     var aItems = oTable.getItems();
        //     if (aItems && aItems.length > 0) {
        //         for (var i = 0; i < aItems.length; i++) {
        //           var aCells = aItems[i].getCells();
        //           if (aCells[6].getText() === "N") {
        //             aItems[i].addStyleClass("redBackground");
        //           }
        //           else{
        //             aItems[i].addStyleClass("greenBackground");
        //           }
        //         }
        //       }
        // },
        onPressEqpRow: function (oEvent) {
			var oItem = oEvent.getSource();
			var sPath = oEvent.getSource().getBindingContextPath();
		},
        fnNavtoEqpList : function () {
            this.getRouter().navTo("EqpList");
        }

    });
});
