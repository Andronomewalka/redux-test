"use strict";
exports.__esModule = true;
var react_1 = require("react");
var classnames_1 = require("classnames");
var Auth_module_scss_1 = require("./Auth.module.scss");
var IsValidIcon = function () { return (react_1["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 -5 55 55", width: "20px", height: "20px" },
    react_1["default"].createElement("path", { fill: "#bae0bd", d: "M20,38.5C9.8,38.5,1.5,30.2,1.5,20S9.8,1.5,20,1.5S38.5,9.8,38.5,20S30.2,38.5,20,38.5z" }),
    react_1["default"].createElement("path", { fill: "#5e9c76", d: "M20,2c9.9,0,18,8.1,18,18s-8.1,18-18,18S2,29.9,2,20S10.1,2,20,2 M20,1C9.5,1,1,9.5,1,20s8.5,19,19,19\ts19-8.5,19-19S30.5,1,20,1L20,1z" }),
    react_1["default"].createElement("path", { fill: "none", stroke: "#fff", strokeMiterlimit: "10", strokeWidth: "3", d: "M11.2,20.1l5.8,5.8l13.2-13.2" }))); };
var IsNotValidIcon = function () { return (react_1["default"].createElement("svg", { fill: "#000000", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 -6 70 70", width: "20px", height: "20px" },
    react_1["default"].createElement("path", { d: "M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z" }))); };
var SignUpPasswordValidation = function (_a) {
    var rules = _a.rules, score = _a.score, isPasswordEmpty = _a.isPasswordEmpty;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: Auth_module_scss_1["default"].validationScoreContainer },
            react_1["default"].createElement("span", { style: { background: defineScoreBarColor(isPasswordEmpty, score, 0) } }),
            react_1["default"].createElement("span", { style: { background: defineScoreBarColor(isPasswordEmpty, score, 1) } }),
            react_1["default"].createElement("span", { style: { background: defineScoreBarColor(isPasswordEmpty, score, 2) } })),
        react_1["default"].createElement("ul", { className: Auth_module_scss_1["default"].validationList }, rules.map(function (rule) {
            var _a;
            return (react_1["default"].createElement("li", { key: rule.id, className: classnames_1["default"](Auth_module_scss_1["default"].validationItem, (_a = {},
                    _a[Auth_module_scss_1["default"]["is-valid"]] = rule.isValid,
                    _a)) },
                rule.isValid ? react_1["default"].createElement(IsValidIcon, null) : react_1["default"].createElement(IsNotValidIcon, null),
                rule.text));
        }))));
};
exports["default"] = SignUpPasswordValidation;
function defineScoreBarColor(isPasswordEmpty, score, position) {
    if (isPasswordEmpty)
        return "rgba(156, 163, 175, 1)";
    else if (score === 0 && position === 0)
        return "rgba(239, 68, 68, 1)";
    else if (score === 1 && position < 2)
        return "rgba(251, 191, 36, 1)";
    else if (score > 1)
        return "rgba(16, 185, 129, 1)";
    return "rgba(156, 163, 175, 1)";
}
