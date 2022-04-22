"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _utils = require("../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Row = function Row(_ref) {
  var firstDay = _ref.firstDay,
      start = _ref.start,
      forwardedRef = _ref.forwardedRef,
      setDisplay = _ref.setDisplay,
      currentDay = _ref.currentDay,
      selectedMonth = _ref.selectedMonth;
  var week = [];

  var _loop = function _loop(day) {
    var GMTDate = new Date(firstDay.getTime() - (firstDay.getDay() - day) * 24 * 60 * 60 * 1000);
    var UTCDate = new Date(Date.parse(GMTDate) - new Date().getTimezoneOffset() * 60 * 1000);
    week.push( /*#__PURE__*/_react.default.createElement("td", {
      key: day,
      className: "".concat(currentDay.getMonth(), "/").concat(currentDay.getDate(), "/").concat(currentDay.getFullYear()) === "".concat(UTCDate.getMonth(), "/").concat(UTCDate.getDate(), "/").concat(UTCDate.getFullYear()) ? 'current' : selectedMonth !== UTCDate.getMonth() ? 'other_month' : '',
      onClick: function onClick() {
        return _onClick(UTCDate);
      }
    }, /*#__PURE__*/_react.default.createElement("div", null, UTCDate.getUTCDate())));
  };

  for (var day = start; day <= start + 6; day++) {
    _loop(day);
  }

  var _onClick = function onClick(UTCDate) {
    var formatedDate = (0, _utils.formatUTCDate)(UTCDate);
    forwardedRef.value = formatedDate;
    setDisplay(false);
  };

  return week;
};

var _default = Row;
exports.default = _default;