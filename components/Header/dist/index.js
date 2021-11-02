"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("react");
var react_redux_1 = require("react-redux");
var router_1 = require("next/router");
var auth_1 = require("state/auth");
var Header_module_scss_1 = require("./Header.module.scss");
var useAppSelector_1 = require("hooks/useAppSelector");
var useAppDispatch_1 = require("hooks/useAppDispatch");
var rawNavigationItems = [
    { id: 0, title: "Products", route: "products" },
    { id: 1, title: "Posts", route: "posts" },
    { id: 2, title: "Chatik", route: "chatik" },
    { id: 3, title: "Auth", route: "auth" },
];
var Header = function (_a) {
    var className = _a.className;
    var _b = react_1.useState(Array()), navigationItems = _b[0], setNavigationItems = _b[1];
    var dispatch = useAppDispatch_1.useAppDispatch();
    var router = router_1.useRouter();
    var email = useAppSelector_1.useAppSelector(auth_1.selectEmail);
    var isSignedIn = react_redux_1.useSelector(auth_1.selectIsSignedIn);
    var onSignOut = function () {
        dispatch(auth_1.signOut());
        router.push("./auth");
    };
    var onNavigationChanged = function (item) {
        if (item.route === "auth") {
            onSignOut();
        }
        else {
            router.push(item.route);
        }
    };
    react_2.useEffect(function () {
        rawNavigationItems.forEach(function (item) {
            item.onClick = onNavigationChanged;
        });
        setNavigationItems(rawNavigationItems);
    }, []);
    react_2.useEffect(function () {
        dispatch(auth_1.fetchLastUsedEmail());
    }, [email]);
    react_2.useEffect(function () {
        var authItem = navigationItems.find(function (item) { return item.route === "auth"; });
        if (authItem) {
            authItem.title = isSignedIn ? "Sign Out" : "Auth";
            setNavigationItems(__spreadArrays(navigationItems));
        }
    }, [isSignedIn]);
    return (react_1["default"].createElement("header", { "data-testid": "header", className: Header_module_scss_1["default"].header },
        react_1["default"].createElement("b", { className: Header_module_scss_1["default"].email }, isSignedIn ? email : ""),
        react_1["default"].createElement("ul", { className: Header_module_scss_1["default"].navigationItems }, navigationItems.map(function (item) { return (react_1["default"].createElement("li", { key: item.id },
            react_1["default"].createElement("button", { className: Header_module_scss_1["default"].inverse, onClick: function () { return item.onClick(item); } }, item.title))); }))));
};
exports["default"] = Header;
