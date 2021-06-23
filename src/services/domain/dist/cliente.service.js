"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClienteService = void 0;
var api_config_1 = require("./../../config/api.config");
var core_1 = require("@angular/core");
var ClienteService = /** @class */ (function () {
    function ClienteService(http, storage) {
        this.http = http;
        this.storage = storage;
    }
    ClienteService.prototype.findByEmail = function (email) {
        return this.http.get(api_config_1.API_CONFIG.baseUrl + "/clientes/email?value=" + email);
    };
    ClienteService.prototype.getImageFromBucket = function (id) {
        var url = api_config_1.API_CONFIG.bucketBaseUrl + "/cp" + id + ".jpg";
        return this.http.get(url, { responseType: 'blob' });
    };
    ClienteService = __decorate([
        core_1.Injectable()
    ], ClienteService);
    return ClienteService;
}());
exports.ClienteService = ClienteService;
