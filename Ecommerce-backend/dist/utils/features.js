var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import mongoose from "mongoose";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";
export var connectDB = function (uri) {
    mongoose.connect(uri, {
        dbName: "Ecommerce_2024"
    }).then(function (c) { return console.log("Database connected to ".concat(c.connection.host)); })
        .catch(function (e) { return console.log(e); });
};
export var invalidateCache = function (_a) {
    var product = _a.product, order = _a.order, admin = _a.admin, userId = _a.userId, orderId = _a.orderId, productId = _a.productId;
    return __awaiter(void 0, void 0, void 0, function () {
        var productKeys_1, orderKeys;
        return __generator(this, function (_b) {
            if (product) {
                productKeys_1 = ["latest-product", "categories", "all-products"];
                //if there is change in single product
                if (typeof productId === "string") {
                    productKeys_1.push("product-".concat(productId));
                }
                //if productId is in array, if any new order is placed
                if (typeof productId === "object") {
                    productId.forEach(function (i) { return productKeys_1.push("product-".concat(i)); });
                }
                myCache.del(productKeys_1);
            }
            if (order) {
                orderKeys = ["all-orders", "my-orders-".concat(userId), "order-".concat(orderId)];
                myCache.del(orderKeys);
            }
            if (admin) { }
            return [2 /*return*/];
        });
    });
};
export var reduceStock = function (orderItems) { return __awaiter(void 0, void 0, void 0, function () {
    var i, order, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < orderItems.length)) return [3 /*break*/, 5];
                order = orderItems[i];
                return [4 /*yield*/, Product.findById(order.productId)];
            case 2:
                product = _a.sent();
                if (!product) {
                    throw new Error("Product not found");
                }
                product.stock -= order.quantity;
                return [4 /*yield*/, product.save()];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/];
        }
    });
}); };
