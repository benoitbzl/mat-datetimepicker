(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material-moment-adapter'), require('@mat-datetimepicker/core'), require('@angular/material'), require('moment')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/material-moment-adapter', '@mat-datetimepicker/core', '@angular/material', 'moment'], factory) :
	(factory((global.moment = {}),global.ng.core,global.ng.material,global['mat-datetimepicker/core'],global.ng.material,global.moment));
}(this, (function (exports,core,materialMomentAdapter,core$1,material,_rollupMoment__default) { 'use strict';

var _rollupMoment__default__default = _rollupMoment__default['default'];

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// import * as moment from "moment";
// import { Moment } from "moment";
// can't get this to build... ><
var moment = _rollupMoment__default__default || _rollupMoment__default;
/**
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range(length, valueFunction) {
    var /** @type {?} */ valuesArray = Array(length);
    for (var /** @type {?} */ i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
var MomentDatetimeAdapter = (function (_super) {
    __extends(MomentDatetimeAdapter, _super);
    /**
     * @param {?} matDateLocale
     * @param {?} _delegate
     */
    function MomentDatetimeAdapter(matDateLocale, _delegate) {
        var _this = _super.call(this, _delegate) || this;
        _this.setLocale(matDateLocale || moment.locale());
        return _this;
    }
    /**
     * @param {?} locale
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.setLocale = function (locale) {
        var _this = this;
        _super.prototype.setLocale.call(this, locale);
        var /** @type {?} */ momentLocaleData = moment.localeData(locale);
        this._localeData = {
            firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
            longMonths: momentLocaleData.months(),
            shortMonths: momentLocaleData.monthsShort(),
            dates: range(31, function (i) { return _super.prototype.createDate.call(_this, 2017, 0, i + 1).format("D"); }),
            hours: range(24, function (i) { return _this.createDatetime(2017, 0, 1, i, 0).format("H"); }),
            minutes: range(60, function (i) { return _this.createDatetime(2017, 0, 1, 1, i).format("m"); }),
            longDaysOfWeek: momentLocaleData.weekdays(),
            shortDaysOfWeek: momentLocaleData.weekdaysShort(),
            narrowDaysOfWeek: momentLocaleData.weekdaysMin()
        };
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.getHour = function (date) {
        return _super.prototype.clone.call(this, date).hour();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.getMinute = function (date) {
        return _super.prototype.clone.call(this, date).minute();
    };
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.isInNextMonth = function (startDate, endDate) {
        var /** @type {?} */ nextMonth = this.getDateInNextMonth(startDate);
        return _super.prototype.sameMonthAndYear.call(this, nextMonth, endDate);
    };
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hour
     * @param {?} minute
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.createDatetime = function (year, month, date, hour, minute) {
        // Check for invalid month and date (except upper bound on date which we have to check after
        // creating the Date).
        if (month < 0 || month > 11) {
            throw Error("Invalid month index \"" + month + "\". Month index has to be between 0 and 11.");
        }
        if (date < 1) {
            throw Error("Invalid date \"" + date + "\". Date has to be greater than 0.");
        }
        if (hour < 0 || hour > 23) {
            throw Error("Invalid hour \"" + hour + "\". Hour has to be between 0 and 23.");
        }
        if (minute < 0 || minute > 59) {
            throw Error("Invalid minute \"" + minute + "\". Minute has to be between 0 and 59.");
        }
        // const result = moment({year, month, date, hour, minute}).locale(this.locale);
        var /** @type {?} */ result = moment({ year: year, month: month, date: date, hour: hour, minute: minute });
        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid()) {
            throw Error("Invalid date \"" + date + "\" for month with index \"" + month + "\".");
        }
        return result;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.getDateInNextMonth = function (date) {
        return _super.prototype.clone.call(this, date).date(1).add({ month: 1 });
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.getFirstDateOfMonth = function (date) {
        return _super.prototype.clone.call(this, date).startOf("month");
    };
    /**
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.getHourNames = function () {
        return this._localeData.hours;
    };
    /**
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.getMinuteNames = function () {
        return this._localeData.minutes;
    };
    /**
     * @param {?} date
     * @param {?} hours
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.addCalendarHours = function (date, hours) {
        return _super.prototype.clone.call(this, date).add({ hours: hours });
    };
    /**
     * @param {?} date
     * @param {?} minutes
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.addCalendarMinutes = function (date, minutes) {
        return _super.prototype.clone.call(this, date).add({ minutes: minutes });
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.deserialize = function (value) {
        return this._delegate.deserialize(value);
    };
    return MomentDatetimeAdapter;
}(core$1.DatetimeAdapter));
MomentDatetimeAdapter.decorators = [
    { type: core.Injectable },
];
/**
 * @nocollapse
 */
MomentDatetimeAdapter.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [material.MAT_DATE_LOCALE,] },] },
    { type: material.DateAdapter, },
]; };
var MAT_MOMENT_DATETIME_FORMATS = {
    parse: {
        dateInput: "l"
    },
    display: {
        dateInput: "l",
        monthInput: "MMMM",
        datetimeInput: "L LT",
        timeInput: "LT",
        monthYearLabel: "MMM YYYY",
        dateA11yLabel: "LL",
        monthYearA11yLabel: "MMMM YYYY"
    }
};
var MomentDatetimeModule = (function () {
    function MomentDatetimeModule() {
    }
    return MomentDatetimeModule;
}());
MomentDatetimeModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [materialMomentAdapter.MomentDateModule],
                providers: [
                    {
                        provide: core$1.DatetimeAdapter,
                        useClass: MomentDatetimeAdapter
                    }
                ]
            },] },
];
/**
 * @nocollapse
 */
MomentDatetimeModule.ctorParameters = function () { return []; };
var MatMomentDatetimeModule = (function () {
    function MatMomentDatetimeModule() {
    }
    return MatMomentDatetimeModule;
}());
MatMomentDatetimeModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [MomentDatetimeModule, materialMomentAdapter.MatMomentDateModule],
                providers: [{ provide: core$1.MAT_DATETIME_FORMATS, useValue: MAT_MOMENT_DATETIME_FORMATS }]
            },] },
];
/**
 * @nocollapse
 */
MatMomentDatetimeModule.ctorParameters = function () { return []; };

exports.MomentDatetimeModule = MomentDatetimeModule;
exports.MatMomentDatetimeModule = MatMomentDatetimeModule;
exports.MomentDatetimeAdapter = MomentDatetimeAdapter;
exports.MAT_MOMENT_DATETIME_FORMATS = MAT_MOMENT_DATETIME_FORMATS;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=moment.umd.js.map
