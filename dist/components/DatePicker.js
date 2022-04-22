"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("../utils/utils");

var _datePicker = _interopRequireDefault(require("../components/datePicker.scss"));

var _WeekRow = _interopRequireDefault(require("../components/WeekRow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DatePicker = function DatePicker(_ref, ref) {
  var _ref$forId = _ref.forId,
      forId = _ref$forId === void 0 ? 'date-of-birth' : _ref$forId,
      _ref$content = _ref.content,
      content = _ref$content === void 0 ? 'Date of Birth' : _ref$content;
  var date = new Date();

  var _useState = (0, _react.useState)(date),
      _useState2 = _slicedToArray(_useState, 2),
      selectedDate = _useState2[0],
      modifyDate = _useState2[1];

  var _useState3 = (0, _react.useState)(date.getMonth()),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedMonth = _useState4[0],
      modifyMonth = _useState4[1];

  var _useState5 = (0, _react.useState)(date.getFullYear()),
      _useState6 = _slicedToArray(_useState5, 2),
      selectedYear = _useState6[0],
      modifyYear = _useState6[1];

  var input = document.getElementById("".concat(forId));
  var monthInput = (0, _react.useRef)(null);
  var yearInput = (0, _react.useRef)(null);
  var monthLength = (0, _utils.getNumberOfDays)(selectedYear, selectedMonth);

  var _dayOfWeek = (0, _utils.dayOfWeek)(selectedYear, selectedMonth, monthLength),
      startMonth = _dayOfWeek.startMonth,
      nbrOfRows = _dayOfWeek.nbrOfRows;

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      displayContainer = _useState8[0],
      setDisplay = _useState8[1];

  var onBlur = function onBlur(e) {
    if (e.relatedTarget !== null && e.relatedTarget.classList.contains('ignore_blur')) {
      input.focus(); //setDisplay(true)
    } else {
      setDisplay(false);
    }
  };
  /**
   * change displayed year or month
   * @param {string} target button affect year or month
   * @param {string} type increment or decrement target
   */


  var change = function change(target, type) {
    var newDateInMs;

    if (type) {
      newDateInMs = type === 'increment' ? selectedDate.setMonth(selectedMonth + 1) : selectedDate.setMonth(selectedMonth - 1);
    } else if (!type && target === 'month') {
      newDateInMs = selectedDate.setMonth(monthInput.current.value);
    } else if (!type && target === 'year') {
      newDateInMs = selectedDate.setFullYear(yearInput.current.value);
    }

    modifyDate(new Date(newDateInMs));
    modifyMonth(selectedDate.getMonth());
    modifyYear(selectedDate.getFullYear());
  };

  var today = function today() {
    modifyDate(date);
    modifyMonth(date.getMonth());
    modifyYear(date.getFullYear());
  };

  var yearOptions = [];

  for (var year = 1950; year < 2051; year++) {
    yearOptions.push( /*#__PURE__*/_react.default.createElement("option", {
      key: year,
      value: year
    }, year));
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: forId
  }, content), /*#__PURE__*/_react.default.createElement("input", {
    id: forId,
    required: true,
    defaultValue: (0, _utils.formatUTCDate)(date),
    onClick: function onClick() {
      return setDisplay(true);
    },
    onBlur: onBlur,
    ref: ref
  }), displayContainer && /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(_datePicker.default.prefix, "container ignore_blur"),
    tabIndex: "0"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(_datePicker.default.prefix, "datePicker")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(_datePicker.default.prefix, "monthPicker")
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return change('month', 'decrement');
    },
    className: "".concat(_datePicker.default.prefix, "prev ignore_blur")
  }), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    onClick: today,
    className: "".concat(_datePicker.default.prefix, "today ignore_blur")
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(_datePicker.default.prefix, "month ignore_blur")
  }, /*#__PURE__*/_react.default.createElement("select", {
    name: "month",
    key: selectedMonth,
    defaultValue: selectedMonth,
    onChange: function onChange() {
      return change('month');
    },
    ref: monthInput,
    className: "ignore_blur"
  }, _utils.months.map(function (month, index) {
    return /*#__PURE__*/_react.default.createElement("option", {
      key: index,
      value: index
    }, month);
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(_datePicker.default.prefix, "year")
  }, /*#__PURE__*/_react.default.createElement("select", {
    name: "year",
    key: selectedYear,
    defaultValue: selectedYear,
    onChange: function onChange() {
      return change('year');
    },
    ref: yearInput,
    className: "ignore_blur"
  }, yearOptions)), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return change('month', 'increment');
    },
    className: "".concat(_datePicker.default.prefix, "next ignore_blur")
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(_datePicker.default.prefix, "calendar")
  }, /*#__PURE__*/_react.default.createElement("table", null, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", null, "Sun"), /*#__PURE__*/_react.default.createElement("th", null, "Mon"), /*#__PURE__*/_react.default.createElement("th", null, "Tue"), /*#__PURE__*/_react.default.createElement("th", null, "Wed"), /*#__PURE__*/_react.default.createElement("th", null, "Thu"), /*#__PURE__*/_react.default.createElement("th", null, "Fri"), /*#__PURE__*/_react.default.createElement("th", null, "Sat"))), /*#__PURE__*/_react.default.createElement("tbody", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement(_WeekRow.default, {
    firstDay: startMonth,
    start: 0,
    forwardedRef: input,
    setDisplay: setDisplay,
    currentDay: date,
    selectedMonth: selectedMonth
  })), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement(_WeekRow.default, {
    firstDay: startMonth,
    start: 7,
    forwardedRef: input,
    setDisplay: setDisplay,
    currentDay: date,
    selectedMonth: selectedMonth
  })), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement(_WeekRow.default, {
    firstDay: startMonth,
    start: 14,
    forwardedRef: input,
    setDisplay: setDisplay,
    currentDay: date,
    selectedMonth: selectedMonth
  })), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement(_WeekRow.default, {
    firstDay: startMonth,
    start: 21,
    forwardedRef: input,
    setDisplay: setDisplay,
    currentDay: date,
    selectedMonth: selectedMonth
  })), nbrOfRows > 4 && /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement(_WeekRow.default, {
    firstDay: startMonth,
    start: 28,
    forwardedRef: input,
    setDisplay: setDisplay,
    currentDay: date,
    selectedMonth: selectedMonth
  })), nbrOfRows > 5 && /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement(_WeekRow.default, {
    firstDay: startMonth,
    start: 34,
    forwardedRef: input,
    setDisplay: setDisplay,
    currentDay: date,
    selectedMonth: selectedMonth
  }))))))));
};

var _default = /*#__PURE__*/(0, _react.forwardRef)(DatePicker);

exports.default = _default;