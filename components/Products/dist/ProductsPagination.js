"use strict";
exports.__esModule = true;
var react_1 = require("react");
var useAppSelector_1 = require("hooks/useAppSelector");
var useDebounce_1 = require("hooks/useDebounce");
var useAppDispatch_1 = require("hooks/useAppDispatch");
var Products_module_scss_1 = require("./Products.module.scss");
var product_1 = require("state/product");
var ProductItem_1 = require("./ProductItem");
var info_1 = require("state/info");
var ProductsPagination = function () {
    var dispatch = useAppDispatch_1.useAppDispatch();
    var products = useAppSelector_1.useAppSelector(product_1.selectProducts);
    var error = useAppSelector_1.useAppSelector(product_1.selectProductsError);
    var curPage = useAppSelector_1.useAppSelector(product_1.selectProductsPage);
    var _a = react_1.useState(curPage), curPageState = _a[0], setPageState = _a[1];
    var curPageStateDebounced = useDebounce_1.useDebounce(curPageState, 200);
    var _b = react_1.useState(""), search = _b[0], setSearch = _b[1];
    var searchDebounced = useDebounce_1.useDebounce(search, 400);
    var isSearchUpdatedRef = react_1.useRef(true);
    react_1.useEffect(function () {
        dispatch(product_1.fetchProductsBySearch({
            search: searchDebounced,
            page: isSearchUpdatedRef.current ? 1 : curPageStateDebounced
        }));
        if (isSearchUpdatedRef.current)
            setPageState(1);
    }, [isSearchUpdatedRef, searchDebounced, curPageStateDebounced]);
    react_1.useEffect(function () {
        if (error) {
            dispatch(info_1.infoAdded({ text: error, status: info_1.InfoStatus.Bad }));
        }
    }, [error]);
    var OnNextClicked = function (e) {
        e.preventDefault();
        dispatch(product_1.fetchProductsBySearch({
            search: searchDebounced,
            page: curPageStateDebounced + 1
        }));
        isSearchUpdatedRef.current = false;
        setPageState(curPageStateDebounced + 1);
    };
    var OnPrevClicked = function (e) {
        e.preventDefault();
        dispatch(product_1.fetchProductsBySearch({
            search: searchDebounced,
            page: curPageStateDebounced - 1
        }));
        isSearchUpdatedRef.current = false;
        setPageState(curPageStateDebounced - 1);
    };
    var onPageInputChanged = function (e) {
        isSearchUpdatedRef.current = false;
        setPageState(+e.target.value);
    };
    var onSearchInputChanged = function (e) {
        isSearchUpdatedRef.current = true;
        setSearch(e.target.value);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("form", { onSubmit: function (e) { return void e.preventDefault(); } },
            react_1["default"].createElement("input", { placeholder: "Search", "data-cy": "search", className: Products_module_scss_1["default"].search, onChange: onSearchInputChanged, value: search })),
        react_1["default"].createElement("ul", { "data-cy": "products", className: Products_module_scss_1["default"].cards }, products.map(function (product) { return (react_1["default"].createElement(ProductItem_1["default"], { key: product.id, id: product.id })); })),
        react_1["default"].createElement("form", { className: Products_module_scss_1["default"].pagination, onSubmit: function (e) { return void e.preventDefault(); } },
            react_1["default"].createElement("button", { "data-cy": "prev-page-btn", className: Products_module_scss_1["default"].inverse, onClick: OnPrevClicked }, "Prev"),
            react_1["default"].createElement("input", { type: "number", "data-cy": "page-input", className: Products_module_scss_1["default"]["bottom-line-input"], onChange: onPageInputChanged, onFocus: function (e) { return void e.target.select(); }, value: curPageState }),
            react_1["default"].createElement("button", { "data-cy": "next-page-btn", className: Products_module_scss_1["default"].inverse, onClick: OnNextClicked }, "Next"))));
};
exports["default"] = ProductsPagination;
