sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("zcalib.controller.BaseController", {
        getModel : function(sModelName) {
            return this.getOwnerComponent().getModel(sModelName);
        },
        getRouter : function(){
            return sap.ui.core.UIComponent.getRouterFor(this);
        }
    });
});
