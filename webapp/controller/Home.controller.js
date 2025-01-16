sap.ui.define([
   
    "zcalib/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
    
],
function (BaseController,Filter,FilterOperator,MessageBox,MessageToast) {
    "use strict";

    return BaseController.extend("zcalib.controller.Home", {
        onInit: function () {
            this.oDataModel = this.getModel("mainService");
            this.oJmodel = this.getModel("oJmodel");
            this.i18nModel = this.getModel("i18n").getResourceBundle();
            this.oJmodel.setProperty("/fiVis",true);
            this.oJmodel.setProperty("/EiVis",false);
        },
        onSelectionChange: function (oEvent) {
			var selKey = oEvent.getParameter("item").getKey() ;
            if(selKey === "FI"){
                this.oJmodel.setProperty("/fiVis",true);
                this.oJmodel.setProperty("/EiVis",false);
            }
            else{
                this.oJmodel.setProperty("/EiVis",true);
                this.oJmodel.setProperty("/fiVis",false);
            }

		},
        fnOnSubmitFL : function (){
            var sFuncLoc = this.getView().byId("inputFuncLoc").getValue();
            if(!sFuncLoc){
                MessageBox.warning(this.i18nModel.getText("warningMsgFl"));
            }
            else{
            var aFilters = [];
            aFilters.push(new Filter("Tplnr",FilterOperator.EQ,sFuncLoc));
            this.fnSearchEqp(aFilters);
            }
        },
        fnOnSubmitEQ : function () {
            var sEqpId = this.getView().byId("inputEqpId").getValue();
            if(!sEqpId){
                MessageBox.warning(this.i18nModel.getText("warningMsgEqpID"));
            }
            else{
            var aFilters = [];
            aFilters.push(new Filter("Equnr",FilterOperator.EQ,sEqpId));
            this.fnSearchEqp(aFilters);
            }
        },
        fnSearchEqp : function (aFilters) {
          
            sap.ui.core.BusyIndicator.show();

            this.oDataModel.read("/OutputDataSet",{
                filters : aFilters,
                success : function (oRes){
                    sap.ui.core.BusyIndicator.hide();
                   this.oJmodel.setProperty("/oEqpList",oRes.results);
                   this.fnNavtoEqpList();
                }.bind(this),
                error  : function (oError){
                    sap.ui.core.BusyIndicator.hide();
                   MessageBox.error(this.i18nModel.getText("noResMsg"));
                }.bind(this)
            })
        },
        fnNavtoEqpList : function () {
            this.getRouter().navTo("EqpList");
        },
        onScanSuccessFL: function(oEvent) {
            if (oEvent.getParameter("cancelled")) {
                MessageToast.show("Scan cancelled", { duration:1000 });
            } else {
                if (oEvent.getParameter("text")) {
                    this.getView().byId("inputFuncLoc").setValue((oEvent.getParameter("text")));
                } else {
                    this.getView().byId("inputFuncLoc").setValue("");
                }
            }
        },
        onScanErrorFL: function(oEvent) {
            MessageToast.show("Scan failed: " + oEvent, { duration:1000 });
        },
        onScanSuccessEI: function(oEvent) {
            if (oEvent.getParameter("cancelled")) {
                MessageToast.show("Scan cancelled", { duration:1000 });
            } else {
                if (oEvent.getParameter("text")) {
                    this.getView().byId("inputEqpId").setValue((oEvent.getParameter("text")));
                } else {
                    this.getView().byId("inputEqpId").setValue("");
                }
            }
        },
        onScanErrorEI: function(oEvent) {
            MessageToast.show("Scan failed: " + oEvent, { duration:1000 });
        },

    });
});
