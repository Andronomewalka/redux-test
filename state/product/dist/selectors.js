"use strict";
exports.__esModule = true;
exports.selectProductsError = exports.selectProductsFetchStatus = exports.selectProductsSearch = exports.selectProductsLimit = exports.selectProductsPage = exports.selectProductStatusById = exports.selectProductById = exports.selectProducts = void 0;
exports.selectProducts = function (state) { return state.products.products; };
exports.selectProductById = function (id) { return function (state) {
    return state.products.products.filter(function (product) { return product.id === id; })[0];
}; };
exports.selectProductStatusById = function (id) { return function (state) {
    return state.products.products.filter(function (product) { return product.id === id; })[0].status;
}; };
exports.selectProductsPage = function (state) { return state.products.page; };
exports.selectProductsLimit = function (state) { return state.products.limit; };
exports.selectProductsSearch = function (state) { return state.products.search; };
exports.selectProductsFetchStatus = function (state) { return state.products.status; };
exports.selectProductsError = function (state) { return state.products.error; };
