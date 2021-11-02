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
var formik_1 = require("formik");
var classnames_1 = require("classnames");
var react_loader_spinner_1 = require("react-loader-spinner");
var zxcvbn_1 = require("zxcvbn");
var requestStatus_1 = require("utils/requestStatus");
var Auth_module_scss_1 = require("./Auth.module.scss");
var useAuth_1 = require("./useAuth");
var SignUpPasswordValidation_1 = require("./SignUpPasswordValidation");
var rawPasswordScore = 0;
var initialValidationRules = [
    {
        id: 0,
        text: "At least 8 characters",
        isValid: false,
        validate: function (input) { return (input === null || input === void 0 ? void 0 : input.length) >= 8; }
    },
    {
        id: 1,
        text: "Not commonly used",
        isValid: false,
        validate: function (input) {
            rawPasswordScore = input.length > 20 ? 3 : zxcvbn_1["default"](input).score;
            return rawPasswordScore > 1;
        }
    },
    {
        id: 2,
        text: "Upper & lowercase",
        isValid: false,
        validate: function (input) { return /[a-z]/.test(input) && /[A-Z]/.test(input); }
    },
    {
        id: 3,
        text: "Numbers and symbols",
        isValid: false,
        validate: function (input) { return /[0-9]/.test(input) && /[-+_=!@#$%^&*.,?]/.test(input); }
    },
];
var SignUp = function (_a) {
    var className = _a.className;
    var formikRef = react_1.useRef(null);
    var _b = useAuth_1.useAuth(formikRef), email = _b.email, status = _b.status, error = _b.error, validationError = _b.validationError, onSignUpSubmit = _b.onSignUpSubmit;
    var _c = react_1.useState(initialValidationRules), validationRules = _c[0], setValidationRules = _c[1];
    var _d = react_1.useState(0), passwordScore = _d[0], setPasswordScore = _d[1];
    var validateEmail = function (email) {
        var error;
        if (!email) {
            error = "Required";
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            error = "Invalid email";
        }
        return error;
    };
    var validatePassword = function (password) {
        validationRules.forEach(function (rule) {
            rule.isValid = rule.validate(password);
        });
        setPasswordScore(rawPasswordScore);
        setValidationRules(__spreadArrays(validationRules));
        setTimeout(function () {
            formikRef.current.validateField("confPassword");
        }, 50);
        var allValid = validationRules.every(function (rule) { return rule.isValid; });
        if (!allValid)
            return "error";
    };
    var validatePassConfirmation = function (pass, confPass) {
        var error = undefined;
        if (pass && confPass) {
            if (pass !== confPass) {
                error = "Password not matched";
            }
        }
        else if (!confPass)
            error = "Required";
        return error;
    };
    return (react_1["default"].createElement("div", { className: className },
        react_1["default"].createElement(formik_1.Formik, { innerRef: formikRef, initialValues: {
                email: email === null ? "" : email,
                password: "",
                confPassword: ""
            }, validateOnChange: true, validateOnBlur: false, onSubmit: onSignUpSubmit }, function (_a) {
            var _b, _c, _d;
            var values = _a.values, errors = _a.errors, touched = _a.touched, isSubmitting = _a.isSubmitting, isValid = _a.isValid;
            return (react_1["default"].createElement(formik_1.Form, { className: classnames_1["default"](Auth_module_scss_1["default"].container, Auth_module_scss_1["default"]["shadow-box"]) },
                react_1["default"].createElement("label", { className: Auth_module_scss_1["default"].label },
                    "Email Address",
                    react_1["default"].createElement(formik_1.Field, { name: "email", type: "input", placeholder: "Email", className: Auth_module_scss_1["default"].input, validate: validateEmail }),
                    errors.email && touched.email ? (react_1["default"].createElement("div", { className: Auth_module_scss_1["default"].fieldValidationError }, errors.email)) : null),
                react_1["default"].createElement("label", { className: Auth_module_scss_1["default"].label },
                    "Create password",
                    react_1["default"].createElement(formik_1.Field, { name: "password", type: "password", placeholder: "Password", className: classnames_1["default"](Auth_module_scss_1["default"].input, Auth_module_scss_1["default"].password), validate: validatePassword }),
                    react_1["default"].createElement("div", { className: Auth_module_scss_1["default"].passValidationContainer },
                        react_1["default"].createElement(SignUpPasswordValidation_1["default"], { rules: validationRules, score: passwordScore, isPasswordEmpty: values.password.length === 0 }))),
                react_1["default"].createElement("label", { className: Auth_module_scss_1["default"].label },
                    "Confirm password",
                    react_1["default"].createElement(formik_1.Field, { name: "confPassword", type: "password", placeholder: "Confirm password", className: Auth_module_scss_1["default"].input, validate: function (value) {
                            return validatePassConfirmation(values.password, value);
                        } }),
                    errors.confPassword && touched.confPassword ? (react_1["default"].createElement("div", { className: Auth_module_scss_1["default"].fieldValidationError }, errors.confPassword)) : null),
                react_1["default"].createElement("input", { type: "submit", disabled: isSubmitting || !isValid, className: classnames_1["default"](Auth_module_scss_1["default"].submit, (_b = {},
                        _b[Auth_module_scss_1["default"]["is-disabled"]] = status === requestStatus_1.RequestStatus.Requesting,
                        _b)), value: "Sign Up" }),
                react_1["default"].createElement("div", { className: Auth_module_scss_1["default"].requestInfoContainer },
                    react_1["default"].createElement("div", { className: classnames_1["default"](Auth_module_scss_1["default"].requesting, (_c = {},
                            _c[Auth_module_scss_1["default"]["is-visible"]] = true,
                            _c[Auth_module_scss_1["default"]["is-visible"]] = status === requestStatus_1.RequestStatus.Requesting,
                            _c)) },
                        react_1["default"].createElement(react_loader_spinner_1["default"], { type: "Bars", color: "#00BFFF", height: 40 })),
                    react_1["default"].createElement("div", { className: classnames_1["default"](Auth_module_scss_1["default"].error, (_d = {},
                            _d[Auth_module_scss_1["default"]["is-visible"]] = status !== requestStatus_1.RequestStatus.Requesting &&
                                (validationError || error),
                            _d)) }, validationError || error))));
        })));
};
exports["default"] = SignUp;
