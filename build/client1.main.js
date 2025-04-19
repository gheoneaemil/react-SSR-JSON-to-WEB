(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["client1"],{

/***/ "./src/EditButton.client.js":
/*!**********************************!*\
  !*** ./src/EditButton.client.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EditButton; });
/* harmony import */ var _home_diimiim_react_SSR_JSON_to_WEB_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _LocationContext_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LocationContext.client */ "./src/LocationContext.client.js");


var _jsxFileName = "/home/diimiim/react-SSR-JSON-to-WEB/src/EditButton.client.js";

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */


function EditButton(_ref) {
  var noteId = _ref.noteId,
      children = _ref.children;

  var _useLocation = Object(_LocationContext_client__WEBPACK_IMPORTED_MODULE_3__["useLocation"])(),
      _useLocation2 = Object(_home_diimiim_react_SSR_JSON_to_WEB_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useLocation, 2),
      setLocation = _useLocation2[1];

  var _unstable_useTransiti = Object(react__WEBPACK_IMPORTED_MODULE_2__["unstable_useTransition"])(),
      _unstable_useTransiti2 = Object(_home_diimiim_react_SSR_JSON_to_WEB_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_unstable_useTransiti, 2),
      startTransition = _unstable_useTransiti2[0],
      isPending = _unstable_useTransiti2[1];

  var isDraft = noteId == null;
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__["jsxDEV"])("button", {
    className: ['edit-button', isDraft ? 'edit-button--solid' : 'edit-button--outline'].join(' '),
    disabled: isPending,
    onClick: function onClick() {
      startTransition(function () {
        setLocation(function (loc) {
          return {
            selectedId: noteId,
            isEditing: true,
            searchText: loc.searchText
          };
        });
      });
    },
    role: "menuitem",
    children: children
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 18,
    columnNumber: 5
  }, this);
}

/***/ })

}]);
//# sourceMappingURL=client1.main.js.map