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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, EventEmitter, Inject, Injectable, InjectionToken, Input, NgModule, NgZone, Optional, Output, Renderer2, ViewChild, ViewContainerRef, ViewEncapsulation, forwardRef } from '@angular/core';
import { DateAdapter, MAT_DATEPICKER_SCROLL_STRATEGY, MAT_DATE_LOCALE, MatButtonModule, MatDatepickerIntl, MatDialogModule, MatIconModule, MatNativeDateModule, NativeDateModule } from '@angular/material';
import { DateAdapter as DateAdapter$1 } from '@angular/material/core';
import { A11yModule } from '@angular/cdk/a11y';
import { Overlay, OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { DOWN_ARROW, END, ENTER, ESCAPE, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/platform-browser';
import { Subject as Subject$1 } from 'rxjs/Subject';
import { Subscription as Subscription$1 } from 'rxjs/Subscription';
import { merge as merge$1 } from 'rxjs/observable/merge';
import { of as of$1 } from 'rxjs/observable/of';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
/**
 * @abstract
 */
var DatetimeAdapter = (function (_super) {
    __extends(DatetimeAdapter, _super);
    /**
     * @param {?} _delegate
     */
    function DatetimeAdapter(_delegate) {
        var _this = _super.call(this) || this;
        _this._delegate = _delegate;
        return _this;
    }
    /**
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.getHour = function (date) { };
    /**
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.getMinute = function (date) { };
    /**
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.getFirstDateOfMonth = function (date) { };
    /**
     * @abstract
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    DatetimeAdapter.prototype.isInNextMonth = function (startDate, endDate) { };
    /**
     * @abstract
     * @return {?}
     */
    DatetimeAdapter.prototype.getHourNames = function () { };
    /**
     * @abstract
     * @return {?}
     */
    DatetimeAdapter.prototype.getMinuteNames = function () { };
    /**
     * @abstract
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    DatetimeAdapter.prototype.addCalendarHours = function (date, months) { };
    /**
     * @abstract
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    DatetimeAdapter.prototype.addCalendarMinutes = function (date, months) { };
    /**
     * @abstract
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hour
     * @param {?} minute
     * @return {?}
     */
    DatetimeAdapter.prototype.createDatetime = function (year, month, date, hour, minute) { };
    /**
     * @param {?} obj
     * @return {?}
     */
    DatetimeAdapter.prototype.getValidDateOrNull = function (obj) {
        return (this.isDateInstance(obj) && this.isValid(obj)) ? obj : null;
    };
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    DatetimeAdapter.prototype.compareDatetime = function (first, second) {
        return this.compareDate(first, second) ||
            this.getHour(first) - this.getHour(second) ||
            this.getMinute(first) - this.getMinute(second);
    };
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    DatetimeAdapter.prototype.sameDatetime = function (first, second) {
        if (first && second) {
            var /** @type {?} */ firstValid = this.isValid(first);
            var /** @type {?} */ secondValid = this.isValid(second);
            if (firstValid && secondValid) {
                return !this.compareDatetime(first, second);
            }
            return firstValid === secondValid;
        }
        return first === second;
    };
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    DatetimeAdapter.prototype.sameYear = function (first, second) {
        return first && second && this.getYear(first) === this.getYear(second);
    };
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    DatetimeAdapter.prototype.sameDay = function (first, second) {
        return first && second && this.getDate(first) === this.getDate(second) && this.sameMonthAndYear(first, second);
    };
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    DatetimeAdapter.prototype.sameHour = function (first, second) {
        return first && second && this.getHour(first) === this.getHour(second) && this.sameDay(first, second);
    };
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    DatetimeAdapter.prototype.sameMinute = function (first, second) {
        return first && second && this.getMinute(first) === this.getMinute(second) && this.sameHour(first, second);
    };
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    DatetimeAdapter.prototype.sameMonthAndYear = function (first, second) {
        if (first && second) {
            var /** @type {?} */ firstValid = this.isValid(first);
            var /** @type {?} */ secondValid = this.isValid(second);
            if (firstValid && secondValid) {
                return !(this.getYear(first) - this.getYear(second) ||
                    this.getMonth(first) - this.getMonth(second));
            }
            return firstValid === secondValid;
        }
        return first === second;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.clone = function (date) {
        return this._delegate.clone(date);
    };
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    DatetimeAdapter.prototype.addCalendarYears = function (date, years) {
        return this._delegate.addCalendarYears(date, years);
    };
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    DatetimeAdapter.prototype.addCalendarMonths = function (date, months) {
        return this._delegate.addCalendarMonths(date, months);
    };
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    DatetimeAdapter.prototype.addCalendarDays = function (date, days) {
        return this._delegate.addCalendarDays(date, days);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.getYear = function (date) {
        return this._delegate.getYear(date);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.getMonth = function (date) {
        return this._delegate.getMonth(date);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.getDate = function (date) {
        return this._delegate.getDate(date);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.getDayOfWeek = function (date) {
        return this._delegate.getDayOfWeek(date);
    };
    /**
     * @param {?} style
     * @return {?}
     */
    DatetimeAdapter.prototype.getMonthNames = function (style$$1) {
        return this._delegate.getMonthNames(style$$1);
    };
    /**
     * @return {?}
     */
    DatetimeAdapter.prototype.getDateNames = function () {
        return this._delegate.getDateNames();
    };
    /**
     * @param {?} style
     * @return {?}
     */
    DatetimeAdapter.prototype.getDayOfWeekNames = function (style$$1) {
        return this._delegate.getDayOfWeekNames(style$$1);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.getYearName = function (date) {
        return this._delegate.getYearName(date);
    };
    /**
     * @return {?}
     */
    DatetimeAdapter.prototype.getFirstDayOfWeek = function () {
        return this._delegate.getFirstDayOfWeek();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.getNumDaysInMonth = function (date) {
        return this._delegate.getNumDaysInMonth(date);
    };
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.createDate = function (year, month, date) {
        return this._delegate.createDate(year, month, date);
    };
    /**
     * @return {?}
     */
    DatetimeAdapter.prototype.today = function () {
        return this._delegate.today();
    };
    /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    DatetimeAdapter.prototype.parse = function (value, parseFormat) {
        return this._delegate.parse(value, parseFormat);
    };
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    DatetimeAdapter.prototype.format = function (date, displayFormat) {
        return this._delegate.format(date, displayFormat);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.toIso8601 = function (date) {
        return this._delegate.toIso8601(date);
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    DatetimeAdapter.prototype.isDateInstance = function (obj) {
        return this._delegate.isDateInstance(obj);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.isValid = function (date) {
        return this._delegate.isValid(date);
    };
    /**
     * @return {?}
     */
    DatetimeAdapter.prototype.invalid = function () {
        return this._delegate.invalid();
    };
    /**
     * @param {?} date
     * @param {?=} min
     * @param {?=} max
     * @return {?}
     */
    DatetimeAdapter.prototype.clampDate = function (date, min, max) {
        if (min && this.compareDatetime(date, min) < 0) {
            return min;
        }
        if (max && this.compareDatetime(date, max) > 0) {
            return max;
        }
        return date;
    };
    return DatetimeAdapter;
}(DateAdapter$1));
var MAT_DATETIME_FORMATS = new InjectionToken("mat-datetime-formats");
/**
 * The default hour names to use if Intl API is not available.
 */
var DEFAULT_HOUR_NAMES = range(24, function (i) { return String(i); });
/**
 * The default minute names to use if Intl API is not available.
 */
var DEFAULT_MINUTE_NAMES = range(60, function (i) { return String(i); });
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
var NativeDatetimeAdapter = (function (_super) {
    __extends(NativeDatetimeAdapter, _super);
    /**
     * @param {?} matDateLocale
     * @param {?} _delegate
     */
    function NativeDatetimeAdapter(matDateLocale, _delegate) {
        var _this = _super.call(this, _delegate) || this;
        _this.setLocale(matDateLocale);
        return _this;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.clone = function (date) {
        return this.createDatetime(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHour(date), this.getMinute(date));
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.getHour = function (date) {
        return date.getHours();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.getMinute = function (date) {
        return date.getMinutes();
    };
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.isInNextMonth = function (startDate, endDate) {
        var /** @type {?} */ nextMonth = this.getDateInNextMonth(startDate);
        return this.sameMonthAndYear(nextMonth, endDate);
    };
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hour
     * @param {?} minute
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.createDatetime = function (year, month, date, hour, minute) {
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
        var /** @type {?} */ result = this._createDateWithOverflow(year, month, date, hour, minute);
        // Check that the date wasn't above the upper bound for the month, causing the month to overflow
        if (result.getMonth() !== month) {
            throw Error("Invalid date \"" + date + "\" for month with index \"" + month + "\".");
        }
        return result;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.getDateInNextMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1, date.getHours(), date.getMinutes());
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.getFirstDateOfMonth = function (date) {
        var /** @type {?} */ result = new Date();
        result.setFullYear(date.getFullYear(), date.getMonth(), 1);
        return result;
    };
    /**
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.getHourNames = function () {
        return DEFAULT_HOUR_NAMES;
    };
    /**
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.getMinuteNames = function () {
        return DEFAULT_MINUTE_NAMES;
    };
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.addCalendarYears = function (date, years) {
        return this.addCalendarMonths(date, years * 12);
    };
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.addCalendarMonths = function (date, months) {
        var /** @type {?} */ newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date), this.getHour(date), this.getMinute(date));
        // It's possible to wind up in the wrong month if the original month has more days than the new
        // month. In this case we want to go to the last day of the desired month.
        // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
        // guarantee this.
        if (this.getMonth(newDate) !== ((this.getMonth(date) + months) % 12 + 12) % 12) {
            newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0, this.getHour(date), this.getMinute(date));
        }
        return newDate;
    };
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.addCalendarDays = function (date, days) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days, this.getHour(date), this.getMinute(date));
    };
    /**
     * @param {?} date
     * @param {?} hours
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.addCalendarHours = function (date, hours) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHour(date) + hours, this.getMinute(date));
    };
    /**
     * @param {?} date
     * @param {?} minutes
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.addCalendarMinutes = function (date, minutes) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHour(date), this.getMinute(date) + minutes);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.toIso8601 = function (date) {
        return _super.prototype.toIso8601.call(this, date) + "T" + [
            this._2digit(date.getUTCHours()),
            this._2digit(date.getUTCMinutes())
        ].join(":");
    };
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param {?} str The string to strip direction characters from.
     * @return {?} The stripped string.
     */
    NativeDatetimeAdapter.prototype._stripDirectionalityCharacters = function (str) {
        return str.replace(/[\u200e\u200f]/g, "");
    };
    /**
     * Pads a number to make it two digits.
     * @param {?} n The number to pad.
     * @return {?} The padded number.
     */
    NativeDatetimeAdapter.prototype._2digit = function (n) {
        return ("00" + n).slice(-2);
    };
    /**
     * Creates a date but allows the month and date to overflow.
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hours
     * @param {?} minutes
     * @return {?}
     */
    NativeDatetimeAdapter.prototype._createDateWithOverflow = function (year, month, date, hours, minutes) {
        var /** @type {?} */ result = new Date(year, month, date, hours, minutes);
        // We need to correct for the fact that JS native Date treats years in range [0, 99] as
        // abbreviations for 19xx.
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }
        return result;
    };
    return NativeDatetimeAdapter;
}(DatetimeAdapter));
NativeDatetimeAdapter.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
NativeDatetimeAdapter.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATE_LOCALE,] },] },
    { type: DateAdapter, },
]; };
var MAT_NATIVE_DATETIME_FORMATS = {
    parse: {
        dateInput: null
    },
    display: {
        dateInput: { year: "numeric", month: "numeric", day: "numeric" },
        monthInput: { month: "long" },
        datetimeInput: { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" },
        timeInput: { hour: "numeric", minute: "numeric" },
        monthYearLabel: { year: "numeric", month: "short" },
        dateA11yLabel: { year: "numeric", month: "long", day: "numeric" },
        monthYearA11yLabel: { year: "numeric", month: "long" }
    }
};
var NativeDatetimeModule = (function () {
    function NativeDatetimeModule() {
    }
    return NativeDatetimeModule;
}());
NativeDatetimeModule.decorators = [
    { type: NgModule, args: [{
                imports: [NativeDateModule],
                providers: [
                    {
                        provide: DatetimeAdapter,
                        useClass: NativeDatetimeAdapter
                    }
                ]
            },] },
];
/**
 * @nocollapse
 */
NativeDatetimeModule.ctorParameters = function () { return []; };
var MatNativeDatetimeModule = (function () {
    function MatNativeDatetimeModule() {
    }
    return MatNativeDatetimeModule;
}());
MatNativeDatetimeModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    NativeDatetimeModule,
                    MatNativeDateModule
                ],
                providers: [{ provide: MAT_DATETIME_FORMATS, useValue: MAT_NATIVE_DATETIME_FORMATS }]
            },] },
];
/**
 * @nocollapse
 */
MatNativeDatetimeModule.ctorParameters = function () { return []; };
var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
}
function isFunction(x) {
    return typeof x === 'function';
}
var isFunction_2 = isFunction;
var isFunction_1 = {
    isFunction: isFunction_2
};
var isArray_1 = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
var isArray = {
    isArray: isArray_1
};
function isObject(x) {
    return x != null && typeof x === 'object';
}
var isObject_2 = isObject;
var isObject_1 = {
    isObject: isObject_2
};
// typeof any so that it we don't have to cast when comparing a result to the error object
var errorObject_1 = { e: {} };
var errorObject = {
    errorObject: errorObject_1
};
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject.errorObject.e = e;
        return errorObject.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
var tryCatch_2 = tryCatch;
var tryCatch_1 = {
    tryCatch: tryCatch_2
};
var __extends$2 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends$2(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
var UnsubscriptionError_2 = UnsubscriptionError;
var UnsubscriptionError_1 = {
    UnsubscriptionError: UnsubscriptionError_2
};
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription$2 = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription$$1(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription$$1.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        // null out _subscriptions first so any child subscriptions that attempt
        // to remove themselves from this subscription will noop
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        // if this._parent is null, then so is this._parents, and we
        // don't have to remove ourselves from any parent subscriptions.
        while (_parent) {
            _parent.remove(this);
            // if this._parents is null or index >= len,
            // then _parent is set to null, and the loop exits
            _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject.errorObject) {
                hasErrors = true;
                errors = errors || (errorObject.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject.errorObject.e.errors) : [errorObject.errorObject.e]);
            }
        }
        if (isArray.isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription$$1.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription$$1.EMPTY)) {
            return Subscription$$1.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription$$1(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function' /* quack quack */) {
                    var tmp = subscription;
                    subscription = new Subscription$$1();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription$$1.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription$$1.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            // If we don't have a parent, or the new parent is the same as the
            // current parent, then set this._parent to the new parent.
            this._parent = parent;
        }
        else if (!_parents) {
            // If there's already one parent, but not multiple, allocate an Array to
            // store the rest of the parent Subscriptions.
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            // Only add the new parent to the _parents list if it's not already there.
            _parents.push(parent);
        }
    };
    Subscription$$1.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription$$1()));
    return Subscription$$1;
}());
var Subscription_2 = Subscription$2;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}
var Subscription_1 = {
    Subscription: Subscription_2
};
var empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};
var Observer = {
    empty: empty
};
// CommonJS / Node have global context exposed as "global" variable.
// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
// the global "global" var for now.
var __window = typeof window !== 'undefined' && window;
var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
var __global = typeof commonjsGlobal !== 'undefined' && commonjsGlobal;
var _root = __window || __global || __self;
var root_1 = _root;
// Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
// This is needed when used with angular/tsickle which inserts a goog.module statement.
// Wrap in IIFE
(function () {
    if (!_root) {
        throw new Error('RxJS could not find any global context (window, self, global)');
    }
})();
var root = {
    root: root_1
};
var rxSubscriber = createCommonjsModule(function (module, exports) {
    var Symbol = root.root.Symbol;
    exports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
        Symbol.for('rxSubscriber') : '@@rxSubscriber';
    /**
     * @deprecated use rxSubscriber instead
     */
    exports.$$rxSubscriber = exports.rxSubscriber;
});
var rxSubscriber_1 = rxSubscriber.rxSubscriber;
var rxSubscriber_2 = rxSubscriber.$$rxSubscriber;
var __extends$1 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends$1(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber.rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        return this;
    };
    return Subscriber;
}(Subscription_1.Subscription));
var Subscriber_2 = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends$1(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        _super.call(this);
        this._parentSubscriber = _parentSubscriber;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer.empty) {
                context = Object.create(observerOrNext);
                if (isFunction_1.isFunction(context.unsubscribe)) {
                    this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = this.unsubscribe.bind(this);
            }
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._error) {
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parentSubscriber.syncErrorValue = err;
                _parentSubscriber.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
var Subscriber_1 = {
    Subscriber: Subscriber_2
};
var __extends$3 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an Observable or a sequence was queried but has no
 * elements.
 *
 * @see {@link first}
 * @see {@link last}
 * @see {@link single}
 *
 * @class EmptyError
 */
var EmptyError = (function (_super) {
    __extends$3(EmptyError, _super);
    function EmptyError() {
        var err = _super.call(this, 'no elements in sequence');
        this.name = err.name = 'EmptyError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return EmptyError;
}(Error));
var EmptyError_2 = EmptyError;
var EmptyError_1 = {
    EmptyError: EmptyError_2
};
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
    for (var p in b)
        if (b.hasOwnProperty(p))
            d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Emits only the first value (or the first value that meets some condition)
 * emitted by the source Observable.
 *
 * <span class="informal">Emits only the first value. Or emits only the first
 * value that passes some test.</span>
 *
 * <img src="./img/first.png" width="100%">
 *
 * If called with no arguments, `first` emits the first value of the source
 * Observable, then completes. If called with a `predicate` function, `first`
 * emits the first value of the source that matches the specified condition. It
 * may also take a `resultSelector` function to produce the output value from
 * the input value, and a `defaultValue` to emit in case the source completes
 * before it is able to emit a valid value. Throws an error if `defaultValue`
 * was not provided and a matching element is not found.
 *
 * @example <caption>Emit only the first click that happens on the DOM</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.first();
 * result.subscribe(x => console.log(x));
 *
 * @example <caption>Emits the first click that happens on a DIV</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.first(ev => ev.target.tagName === 'DIV');
 * result.subscribe(x => console.log(x));
 *
 * @see {@link filter}
 * @see {@link find}
 * @see {@link take}
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 *
 * @param {function(value: T, index: number, source: Observable<T>): boolean} [predicate]
 * An optional function called with each item to test for condition matching.
 * @param {function(value: T, index: number): R} [resultSelector] A function to
 * produce the value on the output Observable based on the values
 * and the indices of the source Observable. The arguments passed to this
 * function are:
 * - `value`: the value that was emitted on the source.
 * - `index`: the "index" of the value from the source.
 * @param {R} [defaultValue] The default value emitted in case no valid value
 * was found on the source.
 * @return {Observable<T|R>} An Observable of the first item that matches the
 * condition.
 * @method first
 * @owner Observable
 */
function first(predicate, resultSelector, defaultValue) {
    return function (source) { return source.lift(new FirstOperator(predicate, resultSelector, defaultValue, source)); };
}
var first_2 = first;
var FirstOperator = (function () {
    function FirstOperator(predicate, resultSelector, defaultValue, source) {
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
    }
    FirstOperator.prototype.call = function (observer, source) {
        return source.subscribe(new FirstSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
    };
    return FirstOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FirstSubscriber = (function (_super) {
    __extends(FirstSubscriber, _super);
    function FirstSubscriber(destination, predicate, resultSelector, defaultValue, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
        this.index = 0;
        this.hasCompleted = false;
        this._emitted = false;
    }
    FirstSubscriber.prototype._next = function (value) {
        var index = this.index++;
        if (this.predicate) {
            this._tryPredicate(value, index);
        }
        else {
            this._emit(value, index);
        }
    };
    FirstSubscriber.prototype._tryPredicate = function (value, index) {
        var result;
        try {
            result = this.predicate(value, index, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this._emit(value, index);
        }
    };
    FirstSubscriber.prototype._emit = function (value, index) {
        if (this.resultSelector) {
            this._tryResultSelector(value, index);
            return;
        }
        this._emitFinal(value);
    };
    FirstSubscriber.prototype._tryResultSelector = function (value, index) {
        var result;
        try {
            result = this.resultSelector(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this._emitFinal(result);
    };
    FirstSubscriber.prototype._emitFinal = function (value) {
        var destination = this.destination;
        if (!this._emitted) {
            this._emitted = true;
            destination.next(value);
            destination.complete();
            this.hasCompleted = true;
        }
    };
    FirstSubscriber.prototype._complete = function () {
        var destination = this.destination;
        if (!this.hasCompleted && typeof this.defaultValue !== 'undefined') {
            destination.next(this.defaultValue);
            destination.complete();
        }
        else if (!this.hasCompleted) {
            destination.error(new EmptyError_1.EmptyError);
        }
    };
    return FirstSubscriber;
}(Subscriber_1.Subscriber));
/**
 * \@docs-private
 * @param {?} provider
 * @return {?}
 */
function createMissingDateImplError(provider) {
    return Error("MatDatetimepicker: No provider found for " + provider + ". You must import one of the following " +
        "modules at your application root: MatNativeDatetimeModule, MatMomentDatetimeModule, or provide a " +
        "custom implementation.");
}
/**
 * This animation fades in the background color and text content of the
 * select's options. It is time delayed to occur 100ms after the overlay
 * panel has transformed in.
 */
var fadeInContent = trigger("fadeInContent", [
    state("showing", style({ opacity: 1 })),
    transition("void => showing", [
        style({ opacity: 0 }),
        animate("150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)")
    ])
]);
var slideCalendar = trigger("slideCalendar", [
    transition("* => left", [
        animate(180, keyframes([
            style({ transform: "translateX(100%)", offset: 0.5 }),
            style({ transform: "translateX(-100%)", offset: 0.51 }),
            style({ transform: "translateX(0)", offset: 1 })
        ]))
    ]),
    transition("* => right", [
        animate(180, keyframes([
            style({ transform: "translateX(-100%)", offset: 0.5 }),
            style({ transform: "translateX(100%)", offset: 0.51 }),
            style({ transform: "translateX(0)", offset: 1 })
        ]))
    ])
]);
/* tslint:disable */
/**
 * A calendar that is used as part of the datepicker.
 * \@docs-private
 */
var MatDatetimepickerCalendar = (function () {
    /**
     * @param {?} _elementRef
     * @param {?} _intl
     * @param {?} _ngZone
     * @param {?} _adapter
     * @param {?} _dateFormats
     * @param {?} changeDetectorRef
     */
    function MatDatetimepickerCalendar(_elementRef, _intl, _ngZone, _adapter, _dateFormats, changeDetectorRef) {
        var _this = this;
        this._elementRef = _elementRef;
        this._intl = _intl;
        this._ngZone = _ngZone;
        this._adapter = _adapter;
        this._dateFormats = _dateFormats;
        this._userSelection = new EventEmitter();
        this.type = "date";
        /**
         * Whether the calendar should be started in month or year view.
         */
        this.startView = "month";
        this.timeInterval = 1;
        /**
         * Emits when the currently selected date changes.
         */
        this.selectedChange = new EventEmitter();
        /**
         * Date filter for the month and year views.
         */
        this._dateFilterForViews = function (date) {
            return !!date &&
                (!_this.dateFilter || _this.dateFilter(date)) &&
                (!_this.minDate || _this._adapter.compareDate(date, _this.minDate) >= 0) &&
                (!_this.maxDate || _this._adapter.compareDate(date, _this.maxDate) <= 0);
        };
        /**
         * Whether the calendar is in month view.
         */
        this._currentView = "month";
        this._clockView = "hour";
        if (!this._adapter) {
            throw createMissingDateImplError("DatetimeAdapter");
        }
        if (!this._dateFormats) {
            throw createMissingDateImplError("MAT_DATE_FORMATS");
        }
        this._intlChanges = _intl.changes.subscribe(function () { return changeDetectorRef.markForCheck(); });
    }
    Object.defineProperty(MatDatetimepickerCalendar.prototype, "startAt", {
        /**
         * A date representing the period (month or year) to start the calendar in.
         * @return {?}
         */
        get: function () {
            return this._startAt;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._startAt = this._adapter.getValidDateOrNull(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerCalendar.prototype, "selected", {
        /**
         * The currently selected date.
         * @return {?}
         */
        get: function () {
            return this._selected;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._selected = this._adapter.getValidDateOrNull(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerCalendar.prototype, "minDate", {
        /**
         * The minimum selectable date.
         * @return {?}
         */
        get: function () {
            return this._minDate;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._minDate = this._adapter.getValidDateOrNull(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerCalendar.prototype, "maxDate", {
        /**
         * The maximum selectable date.
         * @return {?}
         */
        get: function () {
            return this._maxDate;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._maxDate = this._adapter.getValidDateOrNull(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerCalendar.prototype, "_activeDate", {
        /**
         * The current active date. This determines which time period is shown and which date is
         * highlighted when using keyboard navigation.
         * @return {?}
         */
        get: function () {
            return this._clampedActiveDate;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            var /** @type {?} */ oldActiveDate = this._clampedActiveDate;
            this._clampedActiveDate = this._adapter.clampDate(value, this.minDate, this.maxDate);
            if (oldActiveDate && this._clampedActiveDate && this._currentView === "month" &&
                !this._adapter.sameMonthAndYear(oldActiveDate, this._clampedActiveDate)) {
                if (this._adapter.isInNextMonth(oldActiveDate, this._clampedActiveDate)) {
                    this.calendarState("right");
                }
                else {
                    this.calendarState("left");
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._userSelected = function () {
        this._userSelection.emit();
    };
    Object.defineProperty(MatDatetimepickerCalendar.prototype, "_yearLabel", {
        /**
         * The label for the current calendar view.
         * @return {?}
         */
        get: function () {
            return this._adapter.getYearName(this._activeDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerCalendar.prototype, "_monthYearLabel", {
        /**
         * @return {?}
         */
        get: function () {
            return this._currentView === "month" ? this._adapter.getMonthNames("long")[this._adapter.getMonth(this._activeDate)] :
                this._adapter.getYearName(this._activeDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerCalendar.prototype, "_dateLabel", {
        /**
         * @return {?}
         */
        get: function () {
            if (this.type === "month") {
                return this._adapter.getMonthNames("long")[this._adapter.getMonth(this._activeDate)];
            }
            var /** @type {?} */ day = this._adapter.getDayOfWeekNames("short")[this._adapter.getDayOfWeek(this._activeDate)];
            var /** @type {?} */ month = this._adapter.getMonthNames("short")[this._adapter.getMonth(this._activeDate)];
            var /** @type {?} */ date = this._adapter.getDateNames()[this._adapter.getDate(this._activeDate) - 1];
            return day + ", " + month + " " + date;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerCalendar.prototype, "_hoursLabel", {
        /**
         * @return {?}
         */
        get: function () {
            return this._2digit(this._adapter.getHour(this._activeDate));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerCalendar.prototype, "_minutesLabel", {
        /**
         * @return {?}
         */
        get: function () {
            return this._2digit(this._adapter.getMinute(this._activeDate));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype.ngAfterContentInit = function () {
        this._activeDate = this.startAt || this._adapter.today();
        this._focusActiveCell();
        if (this.type === "month") {
            this._currentView = "year";
        }
        else if (this.type === "time") {
            this._currentView = "clock";
        }
        else {
            this._currentView = this.startView || "month";
        }
    };
    /**
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype.ngOnDestroy = function () {
        this._intlChanges.unsubscribe();
    };
    /**
     * Handles date selection in the month view.
     * @param {?} date
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._dateSelected = function (date) {
        if (this.type == "date") {
            if (!this._adapter.sameDate(date, this.selected)) {
                this.selectedChange.emit(date);
            }
        }
        else {
            this._activeDate = date;
            this._currentView = "clock";
        }
    };
    /**
     * Handles month selection in the year view.
     * @param {?} month
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._monthSelected = function (month) {
        if (this.type == "month") {
            if (!this._adapter.sameMonthAndYear(month, this.selected)) {
                this.selectedChange.emit(this._adapter.getFirstDateOfMonth(month));
            }
        }
        else {
            this._activeDate = month;
            this._currentView = "month";
            this._clockView = "hour";
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._timeSelected = function (date) {
        if (this._clockView !== "minute") {
            this._activeDate = date;
            this._clockView = "minute";
        }
        else {
            if (!this._adapter.sameDatetime(date, this.selected)) {
                this.selectedChange.emit(date);
            }
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._onActiveDateChange = function (date) {
        this._activeDate = date;
    };
    /**
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._yearClicked = function () {
        this._currentView = "year";
    };
    /**
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._dateClicked = function () {
        this._currentView = "month";
    };
    /**
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._hoursClicked = function () {
        this._currentView = "clock";
        this._clockView = "hour";
    };
    /**
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._minutesClicked = function () {
        this._currentView = "clock";
        this._clockView = "minute";
    };
    /**
     * Handles user clicks on the previous button.
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._previousClicked = function () {
        this._activeDate = this._currentView === "month" ?
            this._adapter.addCalendarMonths(this._activeDate, -1) :
            this._adapter.addCalendarYears(this._activeDate, -1);
    };
    /**
     * Handles user clicks on the next button.
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._nextClicked = function () {
        this._activeDate = this._currentView === "month" ?
            this._adapter.addCalendarMonths(this._activeDate, 1) :
            this._adapter.addCalendarYears(this._activeDate, 1);
    };
    /**
     * Whether the previous period button is enabled.
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._previousEnabled = function () {
        if (!this.minDate) {
            return true;
        }
        return !this.minDate || !this._isSameView(this._activeDate, this.minDate);
    };
    /**
     * Whether the next period button is enabled.
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._nextEnabled = function () {
        return !this.maxDate || !this._isSameView(this._activeDate, this.maxDate);
    };
    /**
     * Handles keydown events on the calendar body.
     * @param {?} event
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._handleCalendarBodyKeydown = function (event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        if (this._currentView === "month") {
            this._handleCalendarBodyKeydownInMonthView(event);
        }
        else if (this._currentView === "year") {
            this._handleCalendarBodyKeydownInYearView(event);
        }
        else {
            this._handleCalendarBodyKeydownInClockView(event);
        }
    };
    /**
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._focusActiveCell = function () {
        var _this = this;
        this._ngZone.runOutsideAngular(function () {
            _this._ngZone.onStable.asObservable().pipe(first_2()).subscribe(function () {
                _this._elementRef.nativeElement.focus();
            });
        });
    };
    /**
     * Whether the two dates represent the same view in the current view mode (month or year).
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._isSameView = function (date1, date2) {
        return this._currentView === "month" ?
            this._adapter.getYear(date1) == this._adapter.getYear(date2) &&
                this._adapter.getMonth(date1) == this._adapter.getMonth(date2) :
            this._adapter.getYear(date1) == this._adapter.getYear(date2);
    };
    /**
     * Handles keydown events on the calendar body when calendar is in month view.
     * @param {?} event
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._handleCalendarBodyKeydownInMonthView = function (event) {
        switch (event.keyCode) {
            case LEFT_ARROW:
                this._activeDate = this._adapter.addCalendarDays(this._activeDate, -1);
                break;
            case RIGHT_ARROW:
                this._activeDate = this._adapter.addCalendarDays(this._activeDate, 1);
                break;
            case UP_ARROW:
                this._activeDate = this._adapter.addCalendarDays(this._activeDate, -7);
                break;
            case DOWN_ARROW:
                this._activeDate = this._adapter.addCalendarDays(this._activeDate, 7);
                break;
            case HOME:
                this._activeDate = this._adapter.addCalendarDays(this._activeDate, 1 - this._adapter.getDate(this._activeDate));
                break;
            case END:
                this._activeDate = this._adapter.addCalendarDays(this._activeDate, (this._adapter.getNumDaysInMonth(this._activeDate) -
                    this._adapter.getDate(this._activeDate)));
                break;
            case PAGE_UP:
                this._activeDate = event.altKey ?
                    this._adapter.addCalendarYears(this._activeDate, -1) :
                    this._adapter.addCalendarMonths(this._activeDate, -1);
                break;
            case PAGE_DOWN:
                this._activeDate = event.altKey ?
                    this._adapter.addCalendarYears(this._activeDate, 1) :
                    this._adapter.addCalendarMonths(this._activeDate, 1);
                break;
            case ENTER:
                if (this._dateFilterForViews(this._activeDate)) {
                    this._dateSelected(this._activeDate);
                    // Prevent unexpected default actions such as form submission.
                    event.preventDefault();
                }
                return;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    };
    /**
     * Handles keydown events on the calendar body when calendar is in year view.
     * @param {?} event
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._handleCalendarBodyKeydownInYearView = function (event) {
        switch (event.keyCode) {
            case LEFT_ARROW:
                this._activeDate = this._adapter.addCalendarMonths(this._activeDate, -1);
                break;
            case RIGHT_ARROW:
                this._activeDate = this._adapter.addCalendarMonths(this._activeDate, 1);
                break;
            case UP_ARROW:
                this._activeDate = this._prevMonthInSameCol(this._activeDate);
                break;
            case DOWN_ARROW:
                this._activeDate = this._nextMonthInSameCol(this._activeDate);
                break;
            case HOME:
                this._activeDate = this._adapter.addCalendarMonths(this._activeDate, -this._adapter.getMonth(this._activeDate));
                break;
            case END:
                this._activeDate = this._adapter.addCalendarMonths(this._activeDate, 11 - this._adapter.getMonth(this._activeDate));
                break;
            case PAGE_UP:
                this._activeDate =
                    this._adapter.addCalendarYears(this._activeDate, event.altKey ? -10 : -1);
                break;
            case PAGE_DOWN:
                this._activeDate =
                    this._adapter.addCalendarYears(this._activeDate, event.altKey ? 10 : 1);
                break;
            case ENTER:
                this._monthSelected(this._activeDate);
                break;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    };
    /**
     * Handles keydown events on the calendar body when calendar is in month view.
     * @param {?} event
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._handleCalendarBodyKeydownInClockView = function (event) {
        switch (event.keyCode) {
            case UP_ARROW:
                this._activeDate = this._clockView == "hour" ?
                    this._adapter.addCalendarHours(this._activeDate, 1) :
                    this._adapter.addCalendarMinutes(this._activeDate, 1);
                break;
            case DOWN_ARROW:
                this._activeDate = this._clockView == "hour" ?
                    this._adapter.addCalendarHours(this._activeDate, -1) :
                    this._adapter.addCalendarMinutes(this._activeDate, -1);
                break;
            case ENTER:
                this._timeSelected(this._activeDate);
                return;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    };
    /**
     * Determine the date for the month that comes before the given month in the same column in the
     * calendar table.
     * @param {?} date
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._prevMonthInSameCol = function (date) {
        // Determine how many months to jump forward given that there are 2 empty slots at the beginning
        // of each year.
        var /** @type {?} */ increment = this._adapter.getMonth(date) <= 4 ? -5 :
            (this._adapter.getMonth(date) >= 7 ? -7 : -12);
        return this._adapter.addCalendarMonths(date, increment);
    };
    /**
     * Determine the date for the month that comes after the given month in the same column in the
     * calendar table.
     * @param {?} date
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._nextMonthInSameCol = function (date) {
        // Determine how many months to jump forward given that there are 2 empty slots at the beginning
        // of each year.
        var /** @type {?} */ increment = this._adapter.getMonth(date) <= 4 ? 7 :
            (this._adapter.getMonth(date) >= 7 ? 5 : 12);
        return this._adapter.addCalendarMonths(date, increment);
    };
    /**
     * @param {?} direction
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype.calendarState = function (direction) {
        this._calendarState = direction;
    };
    /**
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._calendarStateDone = function () {
        this._calendarState = "";
    };
    /**
     * @param {?} n
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._2digit = function (n) {
        return ("00" + n).slice(-2);
    };
    return MatDatetimepickerCalendar;
}());
MatDatetimepickerCalendar.decorators = [
    { type: Component, args: [{
                selector: "mat-datetimepicker-calendar",
                template: "\n    <div class=\"mat-datetimepicker-calendar-header\">\n      <div *ngIf=\"type !== 'time'\"\n           class=\"mat-datetimepicker-calendar-header-year\"\n           [class.active]=\"_currentView == 'year'\"\n           (click)=\"_yearClicked()\">{{ _yearLabel }}</div>\n      <div class=\"mat-datetimepicker-calendar-header-date-time\">\n        <span *ngIf=\"type !== 'time'\"\n              class=\"mat-datetimepicker-calendar-header-date\"\n              [class.active]=\"_currentView == 'month'\"\n              (click)=\"_dateClicked()\">{{ _dateLabel }}</span>\n        <span *ngIf=\"type.endsWith('time')\"\n              class=\"mat-datetimepicker-calendar-header-time\"\n              [class.active]=\"_currentView == 'clock'\">\n          <span class=\"mat-datetimepicker-calendar-header-hours\"\n                [class.active]=\"_clockView == 'hour'\"\n                (click)=\"_hoursClicked()\">{{ _hoursLabel }}</span>:<span class=\"mat-datetimepicker-calendar-header-minutes\"\n                                                                         [class.active]=\"_clockView == 'minute'\"\n                                                                         (click)=\"_minutesClicked()\">{{ _minutesLabel }}</span>\n        </span>\n      </div>\n    </div>\n    <div class=\"mat-datetimepicker-calendar-content\" [ngSwitch]=\"_currentView\">\n      <div class=\"mat-month-content\" *ngIf=\"_currentView === 'month' || _currentView === 'year'\">\n        <div class=\"mat-datetimepicker-calendar-controls\">\n          <div class=\"mat-datetimepicker-calendar-previous-button\"\n               [class.disabled]=\"!_previousEnabled()\" (click)=\"_previousClicked()\"\n               aria-label=\"Previous month\">\n            <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n              <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"></path>\n            </svg>\n          </div>\n          <div class=\"mat-datetimepicker-calendar-period-button\" [@slideCalendar]=\"_calendarState\" (@slideCalendar.done)=\"_calendarStateDone()\">\n            <strong>{{ _monthYearLabel }}</strong>\n          </div>\n          <div class=\"mat-datetimepicker-calendar-next-button\"\n               [class.disabled]=\"!_nextEnabled()\" (click)=\"_nextClicked()\"\n               aria-label=\"Next month\">\n            <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n              <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"></path>\n            </svg>\n          </div>\n        </div>\n      </div>\n      <mat-datetimepicker-month-view *ngSwitchCase=\"'month'\"\n                      [activeDate]=\"_activeDate\"\n                      [type]=\"type\"\n                      [selected]=\"selected\"\n                      [dateFilter]=\"_dateFilterForViews\"\n                      (selectedChange)=\"_dateSelected($event)\"\n                      (_userSelection)=\"_userSelected()\">\n      </mat-datetimepicker-month-view>\n      <mat-datetimepicker-year-view *ngSwitchCase=\"'year'\"\n                     [activeDate]=\"_activeDate\"\n                     [type]=\"type\"\n                     [selected]=\"selected\"\n                     [dateFilter]=\"_dateFilterForViews\"\n                     (selectedChange)=\"_monthSelected($event)\"\n                     (_userSelection)=\"_userSelected()\">\n      </mat-datetimepicker-year-view>\n      <mat-datetimepicker-clock *ngSwitchDefault\n                 [startView]=\"_clockView\"\n                 [interval]=\"timeInterval\"\n                 [minDate]=\"minDate\"\n                 [maxDate]=\"maxDate\"\n                 [selected]=\"_activeDate\"\n                 (activeDateChange)=\"_onActiveDateChange($event)\"\n                 (selectedChange)=\"_timeSelected($event)\"\n                 (_userSelection)=\"_userSelected()\">\n      </mat-datetimepicker-clock>\n    </div>\n  ",
                styles: ["\n    /**\n     * Applies styles for users in high contrast mode. Note that this only applies\n     * to Microsoft browsers. Chrome can be included by checking for the `html[hc]`\n     * attribute, however Chrome handles high contrast differently.\n     */\n    /* Theme for the ripple elements.*/\n    /* stylelint-disable material/no-prefixes */\n    /* stylelint-enable */\n    .mat-datetimepicker-calendar {\n      -webkit-user-select: none;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      user-select: none;\n      display: block;\n      outline: none; }\n      .mat-datetimepicker-calendar[mode='landscape'] {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n\n    .mat-datetimepicker-calendar-header {\n      padding: 16px;\n      font-size: 14px;\n      color: white;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box; }\n      [mode='landscape'] .mat-datetimepicker-calendar-header {\n        width: 150px;\n        min-width: 150px; }\n\n    .mat-datetimepicker-calendar-header-year,\n    .mat-datetimepicker-calendar-header-date-time {\n      width: 100%;\n      font-weight: 500;\n      white-space: nowrap; }\n\n    .mat-datetimepicker-calendar-header-date-time {\n      font-size: 30px;\n      line-height: 34px; }\n      [mode='landscape'] .mat-datetimepicker-calendar-header-date-time {\n        white-space: normal;\n        word-wrap: break-word; }\n\n    .mat-datetimepicker-calendar-header-year:not(.active),\n    .mat-datetimepicker-calendar-header-date:not(.active),\n    .mat-datetimepicker-calendar-header-hours:not(.active),\n    .mat-datetimepicker-calendar-header-minutes:not(.active) {\n      cursor: pointer;\n      opacity: 0.6; }\n\n    .mat-datetimepicker-calendar-header-time {\n      padding-left: 8px; }\n      .mat-datetimepicker-calendar-header-time:not(.active) {\n        opacity: 0.6; }\n        .mat-datetimepicker-calendar-header-time:not(.active) .mat-datetimepicker-calendar-header-hours,\n        .mat-datetimepicker-calendar-header-time:not(.active) .mat-datetimepicker-calendar-header-minutes {\n          cursor: pointer;\n          opacity: 1; }\n      [mode='landscape'] .mat-datetimepicker-calendar-header-time {\n        display: block;\n        padding-left: 0; }\n\n    .mat-datetimepicker-calendar-content {\n      width: 100%;\n      padding: 0 8px 8px 8px;\n      outline: none;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      overflow: hidden; }\n      [mode='landscape'] .mat-datetimepicker-calendar-content {\n        padding-top: 8px; }\n\n    .mat-datetimepicker-calendar-controls {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between; }\n\n    .mat-datetimepicker-calendar-period-button {\n      display: inline-block;\n      height: 48px;\n      padding: 12px;\n      outline: none;\n      border: 0;\n      background: transparent;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box; }\n\n    .mat-datetimepicker-calendar-previous-button,\n    .mat-datetimepicker-calendar-next-button {\n      display: inline-block;\n      width: 48px;\n      height: 48px;\n      padding: 12px;\n      outline: none;\n      border: 0;\n      cursor: pointer;\n      background: transparent;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box; }\n      .mat-datetimepicker-calendar-previous-button.disabled,\n      .mat-datetimepicker-calendar-next-button.disabled {\n        color: rgba(0, 0, 0, 0.38);\n        pointer-events: none; }\n      .mat-datetimepicker-calendar-previous-button svg,\n      .mat-datetimepicker-calendar-next-button svg {\n        fill: currentColor;\n        vertical-align: top; }\n\n    .mat-datetimepicker-calendar-table {\n      border-spacing: 0;\n      border-collapse: collapse;\n      width: 100%; }\n\n    .mat-datetimepicker-calendar-table-header {\n      color: rgba(0, 0, 0, 0.38); }\n      .mat-datetimepicker-calendar-table-header th {\n        text-align: center;\n        font-size: 11px;\n        padding: 0 0 8px 0; }\n\n    @media (min-width: 480px) {\n      .mat-datetimepicker-calendar[mode='auto'] {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n        .mat-datetimepicker-calendar[mode='auto'] .mat-datetimepicker-calendar-header {\n          width: 150px;\n          min-width: 150px; }\n        .mat-datetimepicker-calendar[mode='auto'] .mat-datetimepicker-calendar-header-date-time {\n          white-space: normal;\n          word-wrap: break-word; }\n        .mat-datetimepicker-calendar[mode='auto'] .mat-datetimepicker-calendar-header-time {\n          display: block;\n          padding-left: 0; }\n        .mat-datetimepicker-calendar[mode='auto'] .mat-datetimepicker-calendar-content {\n          padding-top: 8px; } }\n  "],
                host: {
                    "[class.mat-datetimepicker-calendar]": "true",
                    "tabindex": "0",
                    "(keydown)": "_handleCalendarBodyKeydown($event)"
                },
                animations: [slideCalendar],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/**
 * @nocollapse
 */
MatDatetimepickerCalendar.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: MatDatepickerIntl, },
    { type: NgZone, },
    { type: DatetimeAdapter, decorators: [{ type: Optional },] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATETIME_FORMATS,] },] },
    { type: ChangeDetectorRef, },
]; };
MatDatetimepickerCalendar.propDecorators = {
    '_userSelection': [{ type: Output },],
    'type': [{ type: Input },],
    'startAt': [{ type: Input },],
    'startView': [{ type: Input },],
    'selected': [{ type: Input },],
    'minDate': [{ type: Input },],
    'maxDate': [{ type: Input },],
    'timeInterval': [{ type: Input },],
    'dateFilter': [{ type: Input },],
    'selectedChange': [{ type: Output },],
};
/**
 * An internal class that represents the data corresponding to a single calendar cell.
 * \@docs-private
 */
var MatDatetimepickerCalendarCell = (function () {
    /**
     * @param {?} value
     * @param {?} displayValue
     * @param {?} ariaLabel
     * @param {?} enabled
     */
    function MatDatetimepickerCalendarCell(value, displayValue, ariaLabel, enabled) {
        this.value = value;
        this.displayValue = displayValue;
        this.ariaLabel = ariaLabel;
        this.enabled = enabled;
    }
    return MatDatetimepickerCalendarCell;
}());
/**
 * An internal component used to display calendar data in a table.
 * \@docs-private
 */
var MatDatetimepickerCalendarBody = (function () {
    function MatDatetimepickerCalendarBody() {
        /**
         * The number of columns in the table.
         */
        this.numCols = 7;
        /**
         * Whether to allow selection of disabled cells.
         */
        this.allowDisabledSelection = false;
        /**
         * The cell number of the active cell in the table.
         */
        this.activeCell = 0;
        /**
         * Emits when a new value is selected.
         */
        this.selectedValueChange = new EventEmitter();
    }
    /**
     * @param {?} cell
     * @return {?}
     */
    MatDatetimepickerCalendarBody.prototype._cellClicked = function (cell) {
        if (!this.allowDisabledSelection && !cell.enabled) {
            return;
        }
        this.selectedValueChange.emit(cell.value);
    };
    Object.defineProperty(MatDatetimepickerCalendarBody.prototype, "_firstRowOffset", {
        /**
         * The number of blank cells to put at the beginning for the first row.
         * @return {?}
         */
        get: function () {
            return this.rows && this.rows.length && this.rows[0].length ?
                this.numCols - this.rows[0].length : 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} rowIndex
     * @param {?} colIndex
     * @return {?}
     */
    MatDatetimepickerCalendarBody.prototype._isActiveCell = function (rowIndex, colIndex) {
        var /** @type {?} */ cellNumber = rowIndex * this.numCols + colIndex;
        // Account for the fact that the first row may not have as many cells.
        if (rowIndex) {
            cellNumber -= this._firstRowOffset;
        }
        return cellNumber === this.activeCell;
    };
    return MatDatetimepickerCalendarBody;
}());
MatDatetimepickerCalendarBody.decorators = [
    { type: Component, args: [{
                selector: "[mat-datetimepicker-calendar-body]",
                template: "\n    <!--\n      If there's not enough space in the first row, create a separate label row. We mark this row as\n      aria-hidden because we don't want it to be read out as one of the weeks in the month.\n    -->\n    <tr *ngIf=\"_firstRowOffset < labelMinRequiredCells\" aria-hidden=\"true\">\n      <td class=\"mat-datetimepicker-calendar-body-label\" [attr.colspan]=\"numCols\" >{{label}}</td>\n    </tr>\n\n    <!-- Create the first row separately so we can include a special spacer cell. -->\n    <tr *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\">\n      <!--\n        We mark this cell as aria-hidden so it doesn't get read out as one of the days in the week.\n      -->\n      <td *ngIf=\"rowIndex === 0 && _firstRowOffset\"\n          aria-hidden=\"true\"\n          class=\"mat-datetimepicker-calendar-body-label\"\n          [attr.colspan]=\"_firstRowOffset\">\n        {{_firstRowOffset >= labelMinRequiredCells ? label : ''}}\n      </td>\n      <td *ngFor=\"let item of row; let colIndex = index\"\n          role=\"gridcell\"\n          class=\"mat-datetimepicker-calendar-body-cell\"\n          [class.mat-datetimepicker-calendar-body-disabled]=\"!item.enabled\"\n          [class.mat-datetimepicker-calendar-body-active]=\"_isActiveCell(rowIndex, colIndex)\"\n          [attr.aria-label]=\"item.ariaLabel\"\n          [attr.aria-disabled]=\"!item.enabled || null\"\n          (click)=\"_cellClicked(item)\">\n        <div class=\"mat-datetimepicker-calendar-body-cell-content\"\n             [class.mat-datetimepicker-calendar-body-selected]=\"selectedValue === item.value\"\n             [class.mat-datetimepicker-calendar-body-today]=\"todayValue === item.value\">\n          {{item.displayValue}}\n        </div>\n      </td>\n    </tr>\n  ",
                styles: ["\n    /**\n     * Applies styles for users in high contrast mode. Note that this only applies\n     * to Microsoft browsers. Chrome can be included by checking for the `html[hc]`\n     * attribute, however Chrome handles high contrast differently.\n     */\n    /* Theme for the ripple elements.*/\n    /* stylelint-disable material/no-prefixes */\n    /* stylelint-enable */\n    .mat-datetimepicker-calendar-body {\n      font-size: 13px;\n      min-width: 224px; }\n\n    .mat-datetimepicker-calendar-body-label {\n      padding: 7.14286% 0 7.14286% 7.14286%;\n      height: 0;\n      line-height: 0;\n      color: rgba(0, 0, 0, 0.54);\n      -webkit-transform: translateX(-6px);\n              transform: translateX(-6px);\n      text-align: left; }\n\n    .mat-datetimepicker-calendar-body-cell {\n      position: relative;\n      width: 14.28571%;\n      height: 0;\n      line-height: 0;\n      padding: 7.14286% 0;\n      text-align: center;\n      outline: none;\n      cursor: pointer; }\n\n    .mat-datetimepicker-calendar-body-disabled {\n      cursor: default;\n      pointer-events: none; }\n\n    .mat-datetimepicker-calendar-body-cell-content {\n      position: absolute;\n      top: 5%;\n      left: 5%;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      width: 90%;\n      height: 90%;\n      color: rgba(0, 0, 0, 0.87);\n      border: 1px solid transparent;\n      border-radius: 50%; }\n      .mat-datetimepicker-calendar-body-disabled > .mat-datetimepicker-calendar-body-cell-content:not(.mat-datetimepicker-calendar-body-selected) {\n        color: rgba(0, 0, 0, 0.38); }\n\n    :not(.mat-datetimepicker-calendar-body-disabled):hover > .mat-datetimepicker-calendar-body-cell-content:not(.mat-datetimepicker-calendar-body-selected),\n    .mat-calendar:focus .mat-datetimepicker-calendar-body-active > .mat-datetimepicker-calendar-body-cell-content:not(.mat-datetimepicker-calendar-body-selected) {\n      background-color: rgba(0, 0, 0, 0.12); }\n\n    .mat-datetimepicker-calendar-body-disabled > .mat-datetimepicker-calendar-body-today:not(.mat-datetimepicker-calendar-body-selected) {\n      border-color: rgba(0, 0, 0, 0.18); }\n\n    [dir='rtl'] .mat-datetimepicker-calendar-body-label {\n      padding: 0 7.14286% 0 0;\n      -webkit-transform: translateX(6px);\n              transform: translateX(6px);\n      text-align: right; }\n  "],
                host: {
                    "class": "mat-datetimepicker-calendar-body"
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/**
 * @nocollapse
 */
MatDatetimepickerCalendarBody.ctorParameters = function () { return []; };
MatDatetimepickerCalendarBody.propDecorators = {
    'label': [{ type: Input },],
    'rows': [{ type: Input },],
    'todayValue': [{ type: Input },],
    'selectedValue': [{ type: Input },],
    'labelMinRequiredCells': [{ type: Input },],
    'numCols': [{ type: Input },],
    'allowDisabledSelection': [{ type: Input },],
    'activeCell': [{ type: Input },],
    'selectedValueChange': [{ type: Output },],
};
/* tslint:disable */
var CLOCK_RADIUS = 50;
var CLOCK_INNER_RADIUS = 27.5;
var CLOCK_OUTER_RADIUS = 41.25;
var CLOCK_TICK_RADIUS = 7.0833;
/**
 * A clock that is used as part of the datepicker.
 * \@docs-private
 */
var MatDatetimepickerClock = (function () {
    /**
     * @param {?} _element
     * @param {?} _adapter
     */
    function MatDatetimepickerClock(_element, _adapter) {
        var _this = this;
        this._element = _element;
        this._adapter = _adapter;
        this._userSelection = new EventEmitter();
        this._timeChanged = false;
        this.interval = 1;
        this.twelvehour = false;
        /**
         * Emits when the currently selected date changes.
         */
        this.selectedChange = new EventEmitter();
        this.activeDateChange = new EventEmitter();
        /**
         * Hours and Minutes representing the clock view.
         */
        this._hours = [];
        this._minutes = [];
        /**
         * Whether the clock is in hour view.
         */
        this._hourView = true;
        this.mouseMoveListener = function (event) {
            _this._handleMousemove(event);
        };
        this.mouseUpListener = function () {
            _this._handleMouseup();
        };
    }
    Object.defineProperty(MatDatetimepickerClock.prototype, "activeDate", {
        /**
         * The date to display in this clock view.
         * @return {?}
         */
        get: function () {
            return this._activeDate;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            var /** @type {?} */ oldActiveDate = this._activeDate;
            this._activeDate = this._adapter.clampDate(value, this.minDate, this.maxDate);
            if (!this._adapter.sameMinute(oldActiveDate, this._activeDate)) {
                this._init();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerClock.prototype, "selected", {
        /**
         * The currently selected date.
         * @return {?}
         */
        get: function () {
            return this._selected;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._selected = this._adapter.getValidDateOrNull(this._adapter.deserialize(value));
            if (this._selected) {
                this.activeDate = this._selected;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerClock.prototype, "minDate", {
        /**
         * The minimum selectable date.
         * @return {?}
         */
        get: function () {
            return this._minDate;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._minDate = this._adapter.getValidDateOrNull(this._adapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerClock.prototype, "maxDate", {
        /**
         * The maximum selectable date.
         * @return {?}
         */
        get: function () {
            return this._maxDate;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._maxDate = this._adapter.getValidDateOrNull(this._adapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerClock.prototype, "startView", {
        /**
         * Whether the clock should be started in hour or minute view.
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._hourView = value != "minute";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerClock.prototype, "_hand", {
        /**
         * @return {?}
         */
        get: function () {
            this._selectedHour = this._adapter.getHour(this.activeDate);
            this._selectedMinute = this._adapter.getMinute(this.activeDate);
            var /** @type {?} */ deg = 0;
            var /** @type {?} */ radius = CLOCK_OUTER_RADIUS;
            if (this._hourView) {
                var /** @type {?} */ outer = this._selectedHour > 0 && this._selectedHour < 13;
                radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
                if (this.twelvehour) {
                    radius = CLOCK_OUTER_RADIUS;
                }
                deg = Math.round(this._selectedHour * (360 / (24 / 2)));
            }
            else {
                deg = Math.round(this._selectedMinute * (360 / 60));
            }
            return {
                "transform": "rotate(" + deg + "deg)",
                "height": radius + "%",
                "margin-top": 50 - radius + "%"
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatDatetimepickerClock.prototype.ngAfterContentInit = function () {
        this.activeDate = this._activeDate || this._adapter.today();
        this._init();
    };
    /**
     * Handles mousedown events on the clock body.
     * @param {?} event
     * @return {?}
     */
    MatDatetimepickerClock.prototype._handleMousedown = function (event) {
        this._timeChanged = false;
        this.setTime(event);
        document.addEventListener("mousemove", this.mouseMoveListener);
        document.addEventListener("touchmove", this.mouseMoveListener);
        document.addEventListener("mouseup", this.mouseUpListener);
        document.addEventListener("touchend", this.mouseUpListener);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatDatetimepickerClock.prototype._handleMousemove = function (event) {
        event.preventDefault();
        this.setTime(event);
    };
    /**
     * @return {?}
     */
    MatDatetimepickerClock.prototype._handleMouseup = function () {
        document.removeEventListener("mousemove", this.mouseMoveListener);
        document.removeEventListener("touchmove", this.mouseMoveListener);
        document.removeEventListener("mouseup", this.mouseUpListener);
        document.removeEventListener("touchend", this.mouseUpListener);
        if (this._timeChanged) {
            this.selectedChange.emit(this.activeDate);
            if (!this._hourView) {
                this._userSelection.emit();
            }
        }
    };
    /**
     * Initializes this clock view.
     * @return {?}
     */
    MatDatetimepickerClock.prototype._init = function () {
        this._hours.length = 0;
        this._minutes.length = 0;
        var /** @type {?} */ hourNames = this._adapter.getHourNames();
        var /** @type {?} */ minuteNames = this._adapter.getMinuteNames();
        if (this.twelvehour) {
            for (var /** @type {?} */ i = 1; i < (hourNames.length / 2) + 1; i++) {
                var /** @type {?} */ radian = i / 6 * Math.PI;
                var /** @type {?} */ radius = CLOCK_OUTER_RADIUS;
                var /** @type {?} */ date = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), this._adapter.getDate(this.activeDate), i + 1, 0);
                var /** @type {?} */ enabled = (!this.minDate || this._adapter.compareDatetime(date, this.minDate) >= 0) &&
                    (!this.maxDate || this._adapter.compareDatetime(date, this.maxDate) <= 0);
                this._hours.push({
                    value: i,
                    displayValue: i === 0 ? "00" : hourNames[i],
                    enabled: enabled,
                    top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
                    left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS
                });
            }
        }
        else {
            for (var /** @type {?} */ i = 0; i < hourNames.length; i++) {
                var /** @type {?} */ radian = i / 6 * Math.PI;
                var /** @type {?} */ outer = i > 0 && i < 13, /** @type {?} */ radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
                var /** @type {?} */ date = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), this._adapter.getDate(this.activeDate), i, 0);
                var /** @type {?} */ enabled = (!this.minDate || this._adapter.compareDatetime(date, this.minDate) >= 0) &&
                    (!this.maxDate || this._adapter.compareDatetime(date, this.maxDate) <= 0);
                this._hours.push({
                    value: i,
                    displayValue: i === 0 ? "00" : hourNames[i],
                    enabled: enabled,
                    top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
                    left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS,
                    fontSize: i > 0 && i < 13 ? "" : "80%"
                });
            }
        }
        for (var /** @type {?} */ i = 0; i < minuteNames.length; i += 5) {
            var /** @type {?} */ radian = i / 30 * Math.PI;
            var /** @type {?} */ date = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), this._adapter.getDate(this.activeDate), this._adapter.getHour(this.activeDate), i);
            var /** @type {?} */ enabled = (!this.minDate || this._adapter.compareDatetime(date, this.minDate) >= 0) &&
                (!this.maxDate || this._adapter.compareDatetime(date, this.maxDate) <= 0);
            this._minutes.push({
                value: i,
                displayValue: i === 0 ? "00" : minuteNames[i],
                enabled: enabled,
                top: CLOCK_RADIUS - Math.cos(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS,
                left: CLOCK_RADIUS + Math.sin(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS
            });
        }
    };
    /**
     * Set Time
     * @param {?} event
     * @return {?}
     */
    MatDatetimepickerClock.prototype.setTime = function (event) {
        var /** @type {?} */ trigger$$1 = this._element.nativeElement;
        var /** @type {?} */ triggerRect = trigger$$1.getBoundingClientRect();
        var /** @type {?} */ width = trigger$$1.offsetWidth;
        var /** @type {?} */ height = trigger$$1.offsetHeight;
        var /** @type {?} */ pageX = event.pageX !== undefined ? event.pageX : event.touches[0].pageX;
        var /** @type {?} */ pageY = event.pageY !== undefined ? event.pageY : event.touches[0].pageY;
        var /** @type {?} */ x = (width / 2) - (pageX - triggerRect.left - window.pageXOffset);
        var /** @type {?} */ y = (height / 2) - (pageY - triggerRect.top - window.pageYOffset);
        var /** @type {?} */ radian = Math.atan2(-x, y);
        var /** @type {?} */ unit = Math.PI / (this._hourView ? 6 : (this.interval ? (30 / this.interval) : 30));
        var /** @type {?} */ z = Math.sqrt(x * x + y * y);
        var /** @type {?} */ outer = this._hourView && z > ((width * (CLOCK_OUTER_RADIUS / 100)) +
            (width * (CLOCK_INNER_RADIUS / 100))) / 2;
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }
        var /** @type {?} */ value = Math.round(radian / unit);
        var /** @type {?} */ date;
        if (this._hourView) {
            if (this.twelvehour) {
                value = value === 0 ? 12 : value;
            }
            else {
                if (value === 12) {
                    value = 0;
                }
                value = outer ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
            }
            date = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), this._adapter.getDate(this.activeDate), value, this._adapter.getMinute(this.activeDate));
        }
        else {
            if (this.interval) {
                value *= this.interval;
            }
            if (value === 60) {
                value = 0;
            }
            date = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), this._adapter.getDate(this.activeDate), this._adapter.getHour(this.activeDate), value);
        }
        var /** @type {?} */ clamped = this._adapter.clampDate(date, this.minDate, this.maxDate);
        if (date === clamped) {
            this._timeChanged = true;
            this.activeDate = clamped;
            this.activeDateChange.emit(this.activeDate);
        }
    };
    return MatDatetimepickerClock;
}());
MatDatetimepickerClock.decorators = [
    { type: Component, args: [{
                selector: "mat-datetimepicker-clock",
                template: "\n    <div class=\"mat-datetimepicker-clock\">\n      <div class=\"mat-datetimepicker-clock-center\"></div>\n      <div class=\"mat-datetimepicker-clock-hand\" [ngStyle]=\"_hand\"></div>\n      <div class=\"mat-datetimepicker-clock-hours\" [class.active]=\"_hourView\">\n        <div *ngFor=\"let item of _hours\"\n             class=\"mat-datetimepicker-clock-cell\"\n             [class.mat-datetimepicker-clock-cell-selected]=\"_selectedHour == item.value\"\n             [class.mat-datetimepicker-clock-cell-disabled]=\"!item.enabled\"\n             [style.top]=\"item.top+'%'\"\n             [style.left]=\"item.left+'%'\"\n             [style.fontSize]=\"item.fontSize\">{{ item.displayValue }}</div>\n      </div>\n      <div class=\"mat-datetimepicker-clock-minutes\" [class.active]=\"!_hourView\">\n        <div *ngFor=\"let item of _minutes\"\n             class=\"mat-datetimepicker-clock-cell\"\n             [class.mat-datetimepicker-clock-cell-selected]=\"_selectedMinute == item.value\"\n             [class.mat-datetimepicker-clock-cell-disabled]=\"!item.enabled\"\n             [style.top]=\"item.top+'%'\"\n             [style.left]=\"item.left+'%'\">{{ item.displayValue }}</div>\n      </div>\n    </div>\n  ",
                styles: ["\n    /**\n     * Applies styles for users in high contrast mode. Note that this only applies\n     * to Microsoft browsers. Chrome can be included by checking for the `html[hc]`\n     * attribute, however Chrome handles high contrast differently.\n     */\n    /* Theme for the ripple elements.*/\n    /* stylelint-disable material/no-prefixes */\n    /* stylelint-enable */\n    :host {\n      position: relative;\n      display: block;\n      min-width: 224px;\n      margin: 8px;\n      font-size: 14px;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      -webkit-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none; }\n\n    .mat-datetimepicker-clock {\n      position: relative;\n      width: 100%;\n      height: 0;\n      padding-top: 100%;\n      background-color: #e0e0e0;\n      border-radius: 50%; }\n\n    .mat-datetimepicker-clock-center {\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      width: 2%;\n      height: 2%;\n      margin: -1%;\n      border-radius: 50%; }\n\n    .mat-datetimepicker-clock-hand {\n      position: absolute;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      width: 1px;\n      /*height: $mat-clock-hand-size;*/\n      margin: 0 auto;\n      -webkit-transform-origin: bottom;\n              transform-origin: bottom; }\n      .mat-datetimepicker-clock-hand::before {\n        content: '';\n        position: absolute;\n        top: -4px;\n        left: -4px;\n        width: 8px;\n        height: 8px;\n        border-radius: 50%; }\n\n    .mat-datetimepicker-clock-hours,\n    .mat-datetimepicker-clock-minutes {\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      opacity: 0;\n      visibility: hidden;\n      -webkit-transition: 350ms;\n      transition: 350ms;\n      -webkit-transform: scale(1.2);\n              transform: scale(1.2); }\n      .mat-datetimepicker-clock-hours.active,\n      .mat-datetimepicker-clock-minutes.active {\n        opacity: 1;\n        visibility: visible;\n        -webkit-transform: scale(1);\n                transform: scale(1); }\n\n    .mat-datetimepicker-clock-minutes {\n      -webkit-transform: scale(0.8);\n              transform: scale(0.8); }\n\n    .mat-datetimepicker-clock-cell {\n      position: absolute;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      width: 14.1666%;\n      height: 14.1666%;\n      color: rgba(0, 0, 0, 0.87);\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      border-radius: 50%;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      cursor: pointer; }\n      .mat-datetimepicker-clock-cell:not(.mat-datetimepicker-clock-cell-selected):not(.mat-datetimepicker-clock-cell-disabled):hover {\n        background-color: rgba(0, 0, 0, 0.1); }\n      .mat-datetimepicker-clock-cell.mat-datetimepicker-clock-cell-disabled {\n        color: rgba(0, 0, 0, 0.38);\n        pointer-events: none; }\n      .mat-datetimepicker-clock-cell.mat-datetimepicker-clock-cell-selected {\n        color: white; }\n  "],
                host: {
                    "role": "clock",
                    "(mousedown)": "_handleMousedown($event)"
                }
            },] },
];
/**
 * @nocollapse
 */
MatDatetimepickerClock.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: DatetimeAdapter, },
]; };
MatDatetimepickerClock.propDecorators = {
    '_userSelection': [{ type: Output },],
    'activeDate': [{ type: Input },],
    'selected': [{ type: Input },],
    'minDate': [{ type: Input },],
    'maxDate': [{ type: Input },],
    'startView': [{ type: Input },],
    'dateFilter': [{ type: Input },],
    'interval': [{ type: Input },],
    'twelvehour': [{ type: Input },],
    'selectedChange': [{ type: Output },],
    'activeDateChange': [{ type: Output },],
};
/* tslint:disable */
/**
 * Used to generate a unique ID for each datepicker instance.
 */
var datetimepickerUid = 0;
/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * MatCalendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * \@docs-private
 */
var MatDatetimepickerContent = (function () {
    function MatDatetimepickerContent() {
    }
    /**
     * @return {?}
     */
    MatDatetimepickerContent.prototype.ngAfterContentInit = function () {
        this._calendar._focusActiveCell();
    };
    /**
     * Handles keydown event on datepicker content.
     * @param {?} event The event.
     * @return {?}
     */
    MatDatetimepickerContent.prototype._handleKeydown = function (event) {
        if (event.keyCode === ESCAPE) {
            this.datetimepicker.close();
            event.preventDefault();
            event.stopPropagation();
        }
    };
    return MatDatetimepickerContent;
}());
MatDatetimepickerContent.decorators = [
    { type: Component, args: [{
                selector: "mat-datetimepicker-content",
                template: "\n    <mat-datetimepicker-calendar class=\"mat-typography\" cdkTrapFocus\n                  [id]=\"datetimepicker.id\"\n                  [attr.mode]=\"datetimepicker.mode\"\n                  [startView]=\"datetimepicker.startView\"\n                  [type]=\"datetimepicker.type\"\n                  [timeInterval]=\"datetimepicker.timeInterval\"\n                  [minDate]=\"datetimepicker._minDate\"\n                  [maxDate]=\"datetimepicker._maxDate\"\n                  [dateFilter]=\"datetimepicker._dateFilter\"\n                  [selected]=\"datetimepicker._selected\"\n                  [startAt]=\"datetimepicker.startAt\"\n                  (selectedChange)=\"datetimepicker._select($event)\"\n                  (_userSelection)=\"datetimepicker.close()\">\n    </mat-datetimepicker-calendar>\n  ",
                styles: ["\n    /**\n     * Applies styles for users in high contrast mode. Note that this only applies\n     * to Microsoft browsers. Chrome can be included by checking for the `html[hc]`\n     * attribute, however Chrome handles high contrast differently.\n     */\n    /* Theme for the ripple elements.*/\n    /* stylelint-disable material/no-prefixes */\n    /* stylelint-enable */\n    .mat-datetimepicker-content {\n      -webkit-box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);\n              box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);\n      display: block;\n      background-color: white;\n      border-radius: 2px;\n      overflow: hidden; }\n\n    .mat-datetimepicker-calendar {\n      width: 296px;\n      height: 405px; }\n      .mat-datetimepicker-calendar[mode='landscape'] {\n        width: 446px;\n        height: 328px; }\n\n    @media (min-width: 480px) {\n      .mat-datetimepicker-calendar[mode='auto'] {\n        width: 446px;\n        height: 328px; } }\n\n    .mat-datetimepicker-content-touch {\n      -webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n              box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n      display: block;\n      -webkit-box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);\n              box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12); }\n\n    .cdk-overlay-container, .cdk-global-overlay-wrapper {\n      pointer-events: none;\n      top: 0;\n      left: 0;\n      height: 100%;\n      width: 100%; }\n\n    .cdk-overlay-container {\n      position: fixed;\n      z-index: 1000; }\n\n    .cdk-global-overlay-wrapper {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      position: absolute;\n      z-index: 1000; }\n\n    .cdk-overlay-pane {\n      position: absolute;\n      pointer-events: auto;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      z-index: 1000; }\n\n    .cdk-overlay-backdrop {\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      z-index: 1000;\n      pointer-events: auto;\n      -webkit-transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n      transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n      opacity: 0; }\n\n    .cdk-overlay-backdrop.cdk-overlay-backdrop-showing {\n      opacity: 0.48; }\n\n    .cdk-overlay-dark-backdrop {\n      background: rgba(0, 0, 0, 0.6); }\n  "],
                host: {
                    "class": "mat-datetimepicker-content",
                    "[class.mat-datetimepicker-content-touch]": "datetimepicker?.touchUi",
                    "(keydown)": "_handleKeydown($event)"
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/**
 * @nocollapse
 */
MatDatetimepickerContent.ctorParameters = function () { return []; };
MatDatetimepickerContent.propDecorators = {
    '_calendar': [{ type: ViewChild, args: [MatDatetimepickerCalendar,] },],
};
var MatDatetimepicker = (function () {
    /**
     * @param {?} _dialog
     * @param {?} _overlay
     * @param {?} _ngZone
     * @param {?} _viewContainerRef
     * @param {?} _scrollStrategy
     * @param {?} _dateAdapter
     * @param {?} _dir
     * @param {?} _document
     */
    function MatDatetimepicker(_dialog, _overlay, _ngZone, _viewContainerRef, _scrollStrategy, _dateAdapter, _dir, _document) {
        this._dialog = _dialog;
        this._overlay = _overlay;
        this._ngZone = _ngZone;
        this._viewContainerRef = _viewContainerRef;
        this._scrollStrategy = _scrollStrategy;
        this._dateAdapter = _dateAdapter;
        this._dir = _dir;
        this._document = _document;
        /**
         * The view that the calendar should start in.
         */
        this.startView = 'month';
        this.mode = 'auto';
        this.timeInterval = 1;
        this._type = "date";
        this._touchUi = false;
        /**
         * Emits new selected date when selected date changes.
         * @deprecated Switch to the `dateChange` and `dateInput` binding on the input element.
         */
        this.selectedChanged = new EventEmitter();
        /**
         * Emits when the datepicker has been opened.
         */
        this.openedStream = new EventEmitter();
        /**
         * Emits when the datepicker has been closed.
         */
        this.closedStream = new EventEmitter();
        /**
         * Whether the calendar is open.
         */
        this.opened = false;
        /**
         * The id for the datepicker calendar.
         */
        this.id = "mat-datetimepicker-" + datetimepickerUid++;
        this._validSelected = null;
        /**
         * The element that was focused before the datepicker was opened.
         */
        this._focusedElementBeforeOpen = null;
        this._inputSubscription = Subscription$1.EMPTY;
        /**
         * Emits when the datepicker is disabled.
         */
        this._disabledChange = new Subject$1();
        if (!this._dateAdapter) {
            throw createMissingDateImplError("DateAdapter");
        }
    }
    Object.defineProperty(MatDatetimepicker.prototype, "startAt", {
        /**
         * The date to open the calendar to initially.
         * @return {?}
         */
        get: function () {
            // If an explicit startAt is set we start there, otherwise we start at whatever the currently
            // selected value is.
            return this._startAt || (this._datepickerInput ? this._datepickerInput.value : null);
        },
        /**
         * @param {?} date
         * @return {?}
         */
        set: function (date) {
            this._startAt = this._dateAdapter.getValidDateOrNull(date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepicker.prototype, "openOnFocus", {
        /**
         * @return {?}
         */
        get: function () { return this._openOnFocus; },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) { this._openOnFocus = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatDatetimepicker.prototype._handleFocus = function () {
        if (!this.opened && this.openOnFocus) {
            this.open();
        }
    };
    Object.defineProperty(MatDatetimepicker.prototype, "type", {
        /**
         * @return {?}
         */
        get: function () {
            return this._type;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._type = value || "date";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepicker.prototype, "touchUi", {
        /**
         * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
         * than a popup and elements have more padding to allow for bigger touch targets.
         * @return {?}
         */
        get: function () {
            return this._touchUi;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._touchUi = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepicker.prototype, "disabled", {
        /**
         * Whether the datepicker pop-up should be disabled.
         * @return {?}
         */
        get: function () {
            return this._disabled === undefined && this._datepickerInput ?
                this._datepickerInput.disabled : !!this._disabled;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            var /** @type {?} */ newValue = coerceBooleanProperty(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
                this._disabledChange.next(newValue);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepicker.prototype, "_selected", {
        /**
         * The currently selected date.
         * @return {?}
         */
        get: function () {
            return this._validSelected;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._validSelected = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepicker.prototype, "_minDate", {
        /**
         * The minimum selectable date.
         * @return {?}
         */
        get: function () {
            return this._datepickerInput && this._datepickerInput.min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepicker.prototype, "_maxDate", {
        /**
         * The maximum selectable date.
         * @return {?}
         */
        get: function () {
            return this._datepickerInput && this._datepickerInput.max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepicker.prototype, "_dateFilter", {
        /**
         * @return {?}
         */
        get: function () {
            return this._datepickerInput && this._datepickerInput._dateFilter;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatDatetimepicker.prototype.ngOnDestroy = function () {
        this.close();
        this._inputSubscription.unsubscribe();
        this._disabledChange.complete();
        if (this._popupRef) {
            this._popupRef.dispose();
        }
    };
    /**
     * Selects the given date
     * @param {?} date
     * @return {?}
     */
    MatDatetimepicker.prototype._select = function (date) {
        var /** @type {?} */ oldValue = this._selected;
        this._selected = date;
        if (!this._dateAdapter.sameDatetime(oldValue, this._selected)) {
            this.selectedChanged.emit(date);
        }
    };
    /**
     * Register an input with this datepicker.
     * @param {?} input The datepicker input to register with this datepicker.
     * @return {?}
     */
    MatDatetimepicker.prototype._registerInput = function (input) {
        var _this = this;
        if (this._datepickerInput) {
            throw Error("A MatDatepicker can only be associated with a single input.");
        }
        this._datepickerInput = input;
        this._inputSubscription =
            this._datepickerInput._valueChange.subscribe(function (value) { return _this._selected = value; });
    };
    /**
     * Open the calendar.
     * @return {?}
     */
    MatDatetimepicker.prototype.open = function () {
        if (this.opened || this.disabled) {
            return;
        }
        if (!this._datepickerInput) {
            throw Error("Attempted to open an MatDatepicker with no associated input.");
        }
        if (this._document) {
            this._focusedElementBeforeOpen = this._document.activeElement;
        }
        this.touchUi ? this._openAsDialog() : this._openAsPopup();
        this.opened = true;
        this.openedStream.emit();
    };
    /**
     * Close the calendar.
     * @return {?}
     */
    MatDatetimepicker.prototype.close = function () {
        if (!this.opened) {
            return;
        }
        if (this._popupRef && this._popupRef.hasAttached()) {
            this._popupRef.detach();
        }
        if (this._dialogRef) {
            this._dialogRef.close();
            this._dialogRef = null;
        }
        if (this._calendarPortal && this._calendarPortal.isAttached) {
            this._calendarPortal.detach();
        }
        if (this._focusedElementBeforeOpen &&
            typeof this._focusedElementBeforeOpen.focus === "function") {
            this._focusedElementBeforeOpen.focus();
            this._focusedElementBeforeOpen = null;
        }
        this.opened = false;
        this.closedStream.emit();
    };
    /**
     * Open the calendar as a dialog.
     * @return {?}
     */
    MatDatetimepicker.prototype._openAsDialog = function () {
        var _this = this;
        this._dialogRef = this._dialog.open(MatDatetimepickerContent, {
            direction: this._dir ? this._dir.value : "ltr",
            viewContainerRef: this._viewContainerRef,
            panelClass: "mat-datetimepicker-dialog"
        });
        this._dialogRef.afterClosed().subscribe(function () { return _this.close(); });
        this._dialogRef.componentInstance.datepicker = this;
    };
    /**
     * Open the calendar as a popup.
     * @return {?}
     */
    MatDatetimepicker.prototype._openAsPopup = function () {
        var _this = this;
        if (!this._calendarPortal) {
            this._calendarPortal = new ComponentPortal(MatDatetimepickerContent, this._viewContainerRef);
        }
        if (!this._popupRef) {
            this._createPopup();
        }
        if (!this._popupRef.hasAttached()) {
            var /** @type {?} */ componentRef = this._popupRef.attach(this._calendarPortal);
            componentRef.instance.datetimepicker = this;
            // Update the position once the calendar has rendered.
            this._ngZone.onStable.asObservable().pipe(first_2()).subscribe(function () {
                _this._popupRef.updatePosition();
            });
        }
        this._popupRef.backdropClick().subscribe(function () { return _this.close(); });
    };
    /**
     * Create the popup.
     * @return {?}
     */
    MatDatetimepicker.prototype._createPopup = function () {
        var /** @type {?} */ overlayConfig = new OverlayConfig({
            positionStrategy: this._createPopupPositionStrategy(),
            hasBackdrop: true,
            backdropClass: "mat-overlay-transparent-backdrop",
            direction: this._dir ? this._dir.value : "ltr",
            scrollStrategy: this._scrollStrategy(),
            panelClass: "mat-datetimepicker-popup"
        });
        this._popupRef = this._overlay.create(overlayConfig);
    };
    /**
     * Create the popup PositionStrategy.
     * @return {?}
     */
    MatDatetimepicker.prototype._createPopupPositionStrategy = function () {
        return this._overlay.position()
            .connectedTo(this._datepickerInput.getPopupConnectionElementRef(), { originX: "start", originY: "bottom" }, { overlayX: "start", overlayY: "top" })
            .withFallbackPosition({ originX: "start", originY: "top" }, { overlayX: "start", overlayY: "bottom" })
            .withFallbackPosition({ originX: "end", originY: "bottom" }, { overlayX: "end", overlayY: "top" })
            .withFallbackPosition({ originX: "end", originY: "top" }, { overlayX: "end", overlayY: "bottom" });
    };
    return MatDatetimepicker;
}());
MatDatetimepicker.decorators = [
    { type: Component, args: [{
                selector: "mat-datetimepicker",
                exportAs: "matDatetimepicker",
                template: "",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false
            },] },
];
/**
 * @nocollapse
 */
MatDatetimepicker.ctorParameters = function () { return [
    { type: MatDialog, },
    { type: Overlay, },
    { type: NgZone, },
    { type: ViewContainerRef, },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DATEPICKER_SCROLL_STRATEGY,] },] },
    { type: DatetimeAdapter, decorators: [{ type: Optional },] },
    { type: Directionality, decorators: [{ type: Optional },] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] },] },
]; };
MatDatetimepicker.propDecorators = {
    'startAt': [{ type: Input },],
    'startView': [{ type: Input },],
    'mode': [{ type: Input },],
    'timeInterval': [{ type: Input },],
    'openOnFocus': [{ type: Input },],
    'type': [{ type: Input },],
    'touchUi': [{ type: Input },],
    'disabled': [{ type: Input },],
    'selectedChanged': [{ type: Output },],
    'panelClass': [{ type: Input },],
    'openedStream': [{ type: Output, args: ["opened",] },],
    'closedStream': [{ type: Output, args: ["closed",] },],
};
/* tslint:disable */
var MatDatetimepickerToggle = (function () {
    /**
     * @param {?} _intl
     * @param {?} _changeDetectorRef
     */
    function MatDatetimepickerToggle(_intl, _changeDetectorRef) {
        this._intl = _intl;
        this._changeDetectorRef = _changeDetectorRef;
        this._stateChanges = Subscription$1.EMPTY;
    }
    Object.defineProperty(MatDatetimepickerToggle.prototype, "disabled", {
        /**
         * Whether the toggle button is disabled.
         * @return {?}
         */
        get: function () {
            return this._disabled === undefined ? this.datetimepicker.disabled : !!this._disabled;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    MatDatetimepickerToggle.prototype.ngOnChanges = function (changes) {
        if (changes.datepicker) {
            this._watchStateChanges();
        }
    };
    /**
     * @return {?}
     */
    MatDatetimepickerToggle.prototype.ngOnDestroy = function () {
        this._stateChanges.unsubscribe();
    };
    /**
     * @return {?}
     */
    MatDatetimepickerToggle.prototype.ngAfterContentInit = function () {
        this._watchStateChanges();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatDatetimepickerToggle.prototype._open = function (event) {
        if (this.datetimepicker && !this.disabled) {
            this.datetimepicker.open();
            event.stopPropagation();
        }
    };
    /**
     * @return {?}
     */
    MatDatetimepickerToggle.prototype._watchStateChanges = function () {
        var _this = this;
        var /** @type {?} */ datepickerDisabled = this.datetimepicker ? this.datetimepicker._disabledChange : of$1();
        var /** @type {?} */ inputDisabled = this.datetimepicker && this.datetimepicker._datepickerInput ?
            this.datetimepicker._datepickerInput._disabledChange : of$1();
        this._stateChanges.unsubscribe();
        this._stateChanges = merge$1(this._intl.changes, datepickerDisabled, inputDisabled)
            .subscribe(function () { return _this._changeDetectorRef.markForCheck(); });
    };
    return MatDatetimepickerToggle;
}());
MatDatetimepickerToggle.decorators = [
    { type: Component, args: [{
                selector: 'mat-datetimepicker-toggle',
                template: "\n    <button mat-icon-button type=\"button\" [attr.aria-label]=\"_intl.openCalendarLabel\"\n            [disabled]=\"disabled\" (click)=\"_open($event)\">\n      <mat-icon [ngSwitch]=\"datetimepicker.type\">\n        <svg *ngSwitchCase=\"'time'\" viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" fill=\"currentColor\"\n                style=\"vertical-align: top\" focusable=\"false\">\n          <path d=\"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z\"></path>\n        </svg>\n        <svg *ngSwitchCase=\"'datetime'\" viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" fill=\"currentColor\"\n                style=\"vertical-align: top\" focusable=\"false\">\n          <path d=\"M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z\"></path>\n        </svg>\n        <svg *ngSwitchDefault viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" fill=\"currentColor\"\n            style=\"vertical-align: top\" focusable=\"false\">\n          <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n          <path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"/>\n        </svg>\n      </mat-icon>\n    </button>\n  ",
                host: {
                    'class': 'mat-datetimepicker-toggle',
                },
                exportAs: 'matDatetimepickerToggle',
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/**
 * @nocollapse
 */
MatDatetimepickerToggle.ctorParameters = function () { return [
    { type: MatDatepickerIntl, },
    { type: ChangeDetectorRef, },
]; };
MatDatetimepickerToggle.propDecorators = {
    'datetimepicker': [{ type: Input, args: ['for',] },],
    'disabled': [{ type: Input },],
};
/* tslint:disable */
var MAT_DATETIMEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MatDatetimepickerInput; }),
    multi: true
};
var MAT_DATETIMEPICKER_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return MatDatetimepickerInput; }),
    multi: true
};
/**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use MatDatepickerInputEvent instead.
 */
var MatDatetimepickerInputEvent = (function () {
    /**
     * @param {?} target
     * @param {?} targetElement
     */
    function MatDatetimepickerInputEvent(target, targetElement) {
        this.target = target;
        this.targetElement = targetElement;
        this.value = this.target.value;
    }
    return MatDatetimepickerInputEvent;
}());
/**
 * Directive used to connect an input to a MatDatepicker.
 */
var MatDatetimepickerInput = (function () {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _dateAdapter
     * @param {?} _dateFormats
     * @param {?} _formField
     */
    function MatDatetimepickerInput(_elementRef, _renderer, _dateAdapter, _dateFormats, _formField) {
        var _this = this;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        this._formField = _formField;
        /**
         * Emits when a `change` event is fired on this `<input>`.
         */
        this.dateChange = new EventEmitter();
        /**
         * Emits when an `input` event is fired on this `<input>`.
         */
        this.dateInput = new EventEmitter();
        /**
         * Emits when the value changes (either due to user input or programmatic change).
         */
        this._valueChange = new EventEmitter();
        /**
         * Emits when the disabled state has changed
         */
        this._disabledChange = new EventEmitter();
        this._onTouched = function () {
        };
        this._cvaOnChange = function () {
        };
        this._validatorOnChange = function () {
        };
        this._datepickerSubscription = Subscription$1.EMPTY;
        this._localeSubscription = Subscription$1.EMPTY;
        /**
         * The form control validator for whether the input parses.
         */
        this._parseValidator = function () {
            return _this._lastValueValid ?
                null : { "matDatepickerParse": { "text": _this._elementRef.nativeElement.value } };
        };
        /**
         * The form control validator for the min date.
         */
        this._minValidator = function (control) {
            var controlValue = _this._dateAdapter.getValidDateOrNull(_this._dateAdapter.deserialize(control.value));
            return (!_this.min || !controlValue ||
                _this._dateAdapter.compareDate(_this.min, controlValue) <= 0) ?
                null : { "matDatepickerMin": { "min": _this.min, "actual": controlValue } };
        };
        /**
         * The form control validator for the max date.
         */
        this._maxValidator = function (control) {
            var controlValue = _this._dateAdapter.getValidDateOrNull(_this._dateAdapter.deserialize(control.value));
            return (!_this.max || !controlValue ||
                _this._dateAdapter.compareDate(_this.max, controlValue) >= 0) ?
                null : { "matDatepickerMax": { "max": _this.max, "actual": controlValue } };
        };
        /**
         * The form control validator for the date filter.
         */
        this._filterValidator = function (control) {
            var controlValue = _this._dateAdapter.getValidDateOrNull(_this._dateAdapter.deserialize(control.value));
            return !_this._dateFilter || !controlValue || _this._dateFilter(controlValue) ?
                null : { "matDatepickerFilter": true };
        };
        /**
         * The combined form control validator for this input.
         */
        this._validator = Validators.compose([this._parseValidator, this._minValidator, this._maxValidator, this._filterValidator]);
        /**
         * Whether the last value set on the input was valid.
         */
        this._lastValueValid = false;
        if (!this._dateAdapter) {
            throw createMissingDateImplError("DatetimeAdapter");
        }
        if (!this._dateFormats) {
            throw createMissingDateImplError("MAT_DATETIME_FORMATS");
        }
        // Update the displayed date when the locale changes.
        this._localeSubscription = _dateAdapter.localeChanges.subscribe(function () {
            _this.value = _this.value;
        });
    }
    Object.defineProperty(MatDatetimepickerInput.prototype, "matDatetimepicker", {
        /**
         * The datepicker that this input is associated with.
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.registerDatepicker(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    MatDatetimepickerInput.prototype.registerDatepicker = function (value) {
        if (value) {
            this._datepicker = value;
            this._datepicker._registerInput(this);
        }
    };
    Object.defineProperty(MatDatetimepickerInput.prototype, "matDatepickerFilter", {
        /**
         * @param {?} filter
         * @return {?}
         */
        set: function (filter) {
            this._dateFilter = filter;
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerInput.prototype, "value", {
        /**
         * The value of the input.
         * @return {?}
         */
        get: function () {
            return this._value;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            var _this = this;
            value = this._dateAdapter.deserialize(value);
            this._lastValueValid = !value || this._dateAdapter.isValid(value);
            value = this._dateAdapter.getValidDateOrNull(value);
            var /** @type {?} */ oldDate = this.value;
            this._value = value;
            // use timeout to ensure the datetimepicker is instantiated and we get the correct format
            setTimeout(function () {
                _this._renderer.setProperty(_this._elementRef.nativeElement, "value", value ? _this._dateAdapter.format(value, _this.getDisplayFormat()) : "");
                if (!_this._dateAdapter.sameDatetime(oldDate, value)) {
                    _this._valueChange.emit(value);
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatDatetimepickerInput.prototype.getDisplayFormat = function () {
        switch (this._datepicker.type) {
            case "date":
                return this._dateFormats.display.dateInput;
            case "datetime":
                return this._dateFormats.display.datetimeInput;
            case "time":
                return this._dateFormats.display.timeInput;
            case "month":
                return this._dateFormats.display.monthInput;
        }
    };
    /**
     * @return {?}
     */
    MatDatetimepickerInput.prototype.getParseFormat = function () {
        var /** @type {?} */ parseFormat;
        switch (this._datepicker.type) {
            case "time":
                parseFormat = this._dateFormats.parse.timeInput;
                break;
            case "date":
                parseFormat = this._dateFormats.parse.dateInput;
                break;
            default:
                parseFormat = this._dateFormats.parse.dateInput;
                break;
        }
        if (!parseFormat) {
            parseFormat = this._dateFormats.parse.dateInput;
        }
        return parseFormat;
    };
    Object.defineProperty(MatDatetimepickerInput.prototype, "min", {
        /**
         * The minimum valid date.
         * @return {?}
         */
        get: function () {
            return this._min;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._min = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerInput.prototype, "max", {
        /**
         * The maximum valid date.
         * @return {?}
         */
        get: function () {
            return this._max;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._max = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerInput.prototype, "disabled", {
        /**
         * Whether the datepicker-input is disabled.
         * @return {?}
         */
        get: function () {
            return !!this._disabled;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            var /** @type {?} */ newValue = coerceBooleanProperty(value);
            if (this._disabled !== newValue) {
                this._disabled = newValue;
                this._disabledChange.emit(newValue);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatDatetimepickerInput.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this._datepicker) {
            this._datepickerSubscription =
                this._datepicker.selectedChanged.subscribe(function (selected) {
                    _this.value = selected;
                    _this._cvaOnChange(selected);
                    _this._onTouched();
                    _this.dateInput.emit(new MatDatetimepickerInputEvent(_this, _this._elementRef.nativeElement));
                    _this.dateChange.emit(new MatDatetimepickerInputEvent(_this, _this._elementRef.nativeElement));
                });
        }
    };
    /**
     * @return {?}
     */
    MatDatetimepickerInput.prototype.ngOnDestroy = function () {
        this._datepickerSubscription.unsubscribe();
        this._localeSubscription.unsubscribe();
        this._valueChange.complete();
        this._disabledChange.complete();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MatDatetimepickerInput.prototype.registerOnValidatorChange = function (fn) {
        this._validatorOnChange = fn;
    };
    /**
     * @param {?} c
     * @return {?}
     */
    MatDatetimepickerInput.prototype.validate = function (c) {
        return this._validator ? this._validator(c) : null;
    };
    /**
     * Gets the element that the datepicker popup should be connected to.
     * @return {?} The element to connect the popup to.
     */
    MatDatetimepickerInput.prototype.getPopupConnectionElementRef = function () {
        return this._formField ? this._formField.underlineRef : this._elementRef;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MatDatetimepickerInput.prototype.writeValue = function (value) {
        this.value = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MatDatetimepickerInput.prototype.registerOnChange = function (fn) {
        this._cvaOnChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MatDatetimepickerInput.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    /**
     * @param {?} disabled
     * @return {?}
     */
    MatDatetimepickerInput.prototype.setDisabledState = function (disabled) {
        this.disabled = disabled;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatDatetimepickerInput.prototype._onKeydown = function (event) {
        if (event.altKey && event.keyCode === DOWN_ARROW) {
            this._datepicker.open();
            event.preventDefault();
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MatDatetimepickerInput.prototype._onInput = function (value) {
        var /** @type {?} */ date = this._dateAdapter.parse(value, this.getParseFormat());
        this._lastValueValid = !date || this._dateAdapter.isValid(date);
        date = this._dateAdapter.getValidDateOrNull(date);
        this._value = date;
        this._cvaOnChange(date);
        this._valueChange.emit(date);
        this.dateInput.emit(new MatDatetimepickerInputEvent(this, this._elementRef.nativeElement));
    };
    /**
     * @return {?}
     */
    MatDatetimepickerInput.prototype._onChange = function () {
        this.dateChange.emit(new MatDatetimepickerInputEvent(this, this._elementRef.nativeElement));
    };
    return MatDatetimepickerInput;
}());
MatDatetimepickerInput.decorators = [
    { type: Directive, args: [{
                selector: "input[matDatetimepicker]",
                providers: [
                    MAT_DATETIMEPICKER_VALUE_ACCESSOR,
                    MAT_DATETIMEPICKER_VALIDATORS
                ],
                host: {
                    "[attr.aria-haspopup]": "true",
                    "[attr.aria-owns]": "(_datepicker?.opened && _datepicker.id) || null",
                    "[attr.min]": "min ? _dateAdapter.toIso8601(min) : null",
                    "[attr.max]": "max ? _dateAdapter.toIso8601(max) : null",
                    "[disabled]": "disabled",
                    "(focus)": "_datepicker._handleFocus()",
                    "(input)": "_onInput($event.target.value)",
                    "(change)": "_onChange()",
                    "(blur)": "_onTouched()",
                    "(keydown)": "_onKeydown($event)"
                },
                exportAs: "matDatepickerInput"
            },] },
];
/**
 * @nocollapse
 */
MatDatetimepickerInput.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: DatetimeAdapter, decorators: [{ type: Optional },] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATETIME_FORMATS,] },] },
    { type: MatFormField, decorators: [{ type: Optional },] },
]; };
MatDatetimepickerInput.propDecorators = {
    'matDatetimepicker': [{ type: Input },],
    'matDatepickerFilter': [{ type: Input },],
    'value': [{ type: Input },],
    'min': [{ type: Input },],
    'max': [{ type: Input },],
    'disabled': [{ type: Input },],
    'dateChange': [{ type: Output },],
    'dateInput': [{ type: Output },],
};
/* tslint:disable */
var DAYS_PER_WEEK = 7;
/**
 * An internal component used to display a single month in the datepicker.
 * \@docs-private
 */
var MatDatetimepickerMonthView = (function () {
    /**
     * @param {?} _adapter
     * @param {?} _dateFormats
     */
    function MatDatetimepickerMonthView(_adapter, _dateFormats) {
        this._adapter = _adapter;
        this._dateFormats = _dateFormats;
        this.type = "date";
        this._userSelection = new EventEmitter();
        /**
         * Emits when a new date is selected.
         */
        this.selectedChange = new EventEmitter();
        if (!this._adapter) {
            throw createMissingDateImplError("DatetimeAdapter");
        }
        if (!this._dateFormats) {
            throw createMissingDateImplError("MAT_DATETIME_FORMATS");
        }
        var firstDayOfWeek = this._adapter.getFirstDayOfWeek();
        var narrowWeekdays = this._adapter.getDayOfWeekNames("narrow");
        var longWeekdays = this._adapter.getDayOfWeekNames("long");
        // Rotate the labels for days of the week based on the configured first day of the week.
        var weekdays = longWeekdays.map(function (long, i) {
            return { long: long, narrow: narrowWeekdays[i] };
        });
        this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
        this._activeDate = this._adapter.today();
    }
    Object.defineProperty(MatDatetimepickerMonthView.prototype, "activeDate", {
        /**
         * The date to display in this month view (everything other than the month and year is ignored).
         * @return {?}
         */
        get: function () {
            return this._activeDate;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            var /** @type {?} */ oldActiveDate = this._activeDate;
            this._activeDate = value || this._adapter.today();
            if (oldActiveDate && this._activeDate &&
                !this._adapter.sameMonthAndYear(oldActiveDate, this._activeDate)) {
                this._init();
                if (this._adapter.isInNextMonth(oldActiveDate, this._activeDate)) {
                    this.calendarState("right");
                }
                else {
                    this.calendarState("left");
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerMonthView.prototype, "selected", {
        /**
         * The currently selected date.
         * @return {?}
         */
        get: function () {
            return this._selected;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._selected = value;
            this._selectedDate = this._getDateInCurrentMonth(this.selected);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatDatetimepickerMonthView.prototype.ngAfterContentInit = function () {
        this._init();
    };
    /**
     * Handles when a new date is selected.
     * @param {?} date
     * @return {?}
     */
    MatDatetimepickerMonthView.prototype._dateSelected = function (date) {
        this.selectedChange.emit(this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), date, this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate)));
        if (this.type === "date") {
            this._userSelection.emit();
        }
    };
    /**
     * Initializes this month view.
     * @return {?}
     */
    MatDatetimepickerMonthView.prototype._init = function () {
        this._selectedDate = this._getDateInCurrentMonth(this.selected);
        this._todayDate = this._getDateInCurrentMonth(this._adapter.today());
        var /** @type {?} */ firstOfMonth = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), 1, this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate));
        this._firstWeekOffset =
            (DAYS_PER_WEEK + this._adapter.getDayOfWeek(firstOfMonth) -
                this._adapter.getFirstDayOfWeek()) % DAYS_PER_WEEK;
        this._createWeekCells();
    };
    /**
     * Creates MdCalendarCells for the dates in this month.
     * @return {?}
     */
    MatDatetimepickerMonthView.prototype._createWeekCells = function () {
        var /** @type {?} */ daysInMonth = this._adapter.getNumDaysInMonth(this.activeDate);
        var /** @type {?} */ dateNames = this._adapter.getDateNames();
        this._weeks = [[]];
        for (var /** @type {?} */ i = 0, /** @type {?} */ cell = this._firstWeekOffset; i < daysInMonth; i++, cell++) {
            if (cell == DAYS_PER_WEEK) {
                this._weeks.push([]);
                cell = 0;
            }
            var /** @type {?} */ date = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), i + 1, this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate));
            var /** @type {?} */ enabled = !this.dateFilter ||
                this.dateFilter(date);
            var /** @type {?} */ ariaLabel = this._adapter.format(date, this._dateFormats.display.dateA11yLabel);
            this._weeks[this._weeks.length - 1]
                .push(new MatDatetimepickerCalendarCell(i + 1, dateNames[i], ariaLabel, enabled));
        }
    };
    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     * @param {?} date
     * @return {?}
     */
    MatDatetimepickerMonthView.prototype._getDateInCurrentMonth = function (date) {
        return this._adapter.sameMonthAndYear(date, this.activeDate) ?
            this._adapter.getDate(date) : null;
    };
    /**
     * @param {?} direction
     * @return {?}
     */
    MatDatetimepickerMonthView.prototype.calendarState = function (direction) {
        this._calendarState = direction;
    };
    /**
     * @return {?}
     */
    MatDatetimepickerMonthView.prototype._calendarStateDone = function () {
        this._calendarState = "";
    };
    return MatDatetimepickerMonthView;
}());
MatDatetimepickerMonthView.decorators = [
    { type: Component, args: [{
                selector: "mat-datetimepicker-month-view",
                template: "\n    <table class=\"mat-datetimepicker-calendar-table\">\n      <thead class=\"mat-datetimepicker-calendar-table-header\">\n        <tr><th *ngFor=\"let day of _weekdays\" [attr.aria-label]=\"day.long\">{{day.narrow}}</th></tr>\n      </thead>\n      <tbody [@slideCalendar]=\"_calendarState\"\n             (@slideCalendar.done)=\"_calendarStateDone()\"\n             mat-datetimepicker-calendar-body\n             role=\"grid\"\n             [rows]=\"_weeks\"\n             [todayValue]=\"_todayDate\"\n             [selectedValue]=\"_selectedDate\"\n             [activeCell]=\"_adapter.getDate(activeDate) - 1\"\n             (selectedValueChange)=\"_dateSelected($event)\"></tbody>\n    </table>\n  ",
                animations: [slideCalendar],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/**
 * @nocollapse
 */
MatDatetimepickerMonthView.ctorParameters = function () { return [
    { type: DatetimeAdapter, decorators: [{ type: Optional },] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATETIME_FORMATS,] },] },
]; };
MatDatetimepickerMonthView.propDecorators = {
    'type': [{ type: Input },],
    '_userSelection': [{ type: Output },],
    'activeDate': [{ type: Input },],
    'selected': [{ type: Input },],
    'dateFilter': [{ type: Input },],
    'selectedChange': [{ type: Output },],
};
/* tslint:disable */
/**
 * An internal component used to display a single year in the datepicker.
 * \@docs-private
 */
var MatDatetimepickerYearView = (function () {
    /**
     * @param {?} _adapter
     * @param {?} _dateFormats
     */
    function MatDatetimepickerYearView(_adapter, _dateFormats) {
        this._adapter = _adapter;
        this._dateFormats = _dateFormats;
        this._userSelection = new EventEmitter();
        this.type = "date";
        /**
         * Emits when a new month is selected.
         */
        this.selectedChange = new EventEmitter();
        if (!this._adapter) {
            throw createMissingDateImplError("DatetimeAdapter");
        }
        if (!this._dateFormats) {
            throw createMissingDateImplError("MAT_DATETIME_FORMATS");
        }
        this._activeDate = this._adapter.today();
    }
    Object.defineProperty(MatDatetimepickerYearView.prototype, "activeDate", {
        /**
         * The date to display in this year view (everything other than the year is ignored).
         * @return {?}
         */
        get: function () {
            return this._activeDate;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            var /** @type {?} */ oldActiveDate = this._activeDate;
            this._activeDate = value || this._adapter.today();
            if (oldActiveDate && this._activeDate &&
                !this._adapter.sameYear(oldActiveDate, this._activeDate)) {
                this._init();
                // if (oldActiveDate < this._activeDate) {
                //  this.calendarState('right');
                // } else {
                //  this.calendarState('left');
                // }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerYearView.prototype, "selected", {
        /**
         * The currently selected date.
         * @return {?}
         */
        get: function () {
            return this._selected;
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._selected = value;
            this._selectedMonth = this._getMonthInCurrentYear(this.selected);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatDatetimepickerYearView.prototype.ngAfterContentInit = function () {
        this._init();
    };
    /**
     * Handles when a new month is selected.
     * @param {?} month
     * @return {?}
     */
    MatDatetimepickerYearView.prototype._monthSelected = function (month) {
        this.selectedChange.emit(this._adapter.createDatetime(this._adapter.getYear(this.activeDate), month, this._adapter.getDate(this.activeDate), this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate)));
        if (this.type === "month") {
            this._userSelection.emit();
        }
    };
    /**
     * Initializes this month view.
     * @return {?}
     */
    MatDatetimepickerYearView.prototype._init = function () {
        var _this = this;
        this._selectedMonth = this._getMonthInCurrentYear(this.selected);
        this._todayMonth = this._getMonthInCurrentYear(this._adapter.today());
        this._yearLabel = this._adapter.getYearName(this.activeDate);
        var /** @type {?} */ monthNames = this._adapter.getMonthNames("short");
        // First row of months only contains 5 elements so we can fit the year label on the same row.
        this._months = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9, 10, 11]].map(function (row) { return row.map(function (month) { return _this._createCellForMonth(month, monthNames[month]); }); });
    };
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     * @param {?} date
     * @return {?}
     */
    MatDatetimepickerYearView.prototype._getMonthInCurrentYear = function (date) {
        return this._adapter.sameYear(date, this.activeDate) ?
            this._adapter.getMonth(date) : null;
    };
    /**
     * Creates an MdCalendarCell for the given month.
     * @param {?} month
     * @param {?} monthName
     * @return {?}
     */
    MatDatetimepickerYearView.prototype._createCellForMonth = function (month, monthName) {
        var /** @type {?} */ ariaLabel = this._adapter.format(this._adapter.createDatetime(this._adapter.getYear(this.activeDate), month, 1, this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate)), this._dateFormats.display.monthYearA11yLabel);
        return new MatDatetimepickerCalendarCell(month, monthName.toLocaleUpperCase(), ariaLabel, this._isMonthEnabled(month));
    };
    /**
     * Whether the given month is enabled.
     * @param {?} month
     * @return {?}
     */
    MatDatetimepickerYearView.prototype._isMonthEnabled = function (month) {
        if (!this.dateFilter) {
            return true;
        }
        var /** @type {?} */ firstOfMonth = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), month, 1, this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate));
        // If any date in the month is enabled count the month as enabled.
        for (var /** @type {?} */ date = firstOfMonth; this._adapter.getMonth(date) == month; date = this._adapter.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }
        return false;
    };
    /**
     * @return {?}
     */
    MatDatetimepickerYearView.prototype._calendarStateDone = function () {
        this._calendarState = "";
    };
    return MatDatetimepickerYearView;
}());
MatDatetimepickerYearView.decorators = [
    { type: Component, args: [{
                selector: "mat-datetimepicker-year-view",
                template: "\n    <table class=\"mat-datetimepicker-calendar-table\">\n      <thead class=\"mat-datetimepicker-calendar-table-header\"></thead>\n      <tbody [@slideCalendar]=\"_calendarState\"\n             (@slideCalendar.done)=\"_calendarStateDone()\"\n             mat-datetimepicker-calendar-body\n             role=\"grid\"\n             allowDisabledSelection=\"true\"\n             [label]=\"_yearLabel\"\n             [rows]=\"_months\"\n             [todayValue]=\"_todayMonth\"\n             [selectedValue]=\"_selectedMonth\"\n             [labelMinRequiredCells]=\"2\"\n             [activeCell]=\"_adapter.getMonth(activeDate)\"\n             (selectedValueChange)=\"_monthSelected($event)\"></tbody>\n    </table>\n  ",
                animations: [slideCalendar],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/**
 * @nocollapse
 */
MatDatetimepickerYearView.ctorParameters = function () { return [
    { type: DatetimeAdapter, decorators: [{ type: Optional },] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATETIME_FORMATS,] },] },
]; };
MatDatetimepickerYearView.propDecorators = {
    '_userSelection': [{ type: Output },],
    'type': [{ type: Input },],
    'activeDate': [{ type: Input },],
    'selected': [{ type: Input },],
    'dateFilter': [{ type: Input },],
    'selectedChange': [{ type: Output },],
};
var MatDatetimepickerModule = (function () {
    function MatDatetimepickerModule() {
    }
    return MatDatetimepickerModule;
}());
MatDatetimepickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatButtonModule,
                    MatDialogModule,
                    MatIconModule,
                    OverlayModule,
                    A11yModule
                ],
                entryComponents: [
                    MatDatetimepickerContent
                ],
                declarations: [
                    MatDatetimepickerCalendar,
                    MatDatetimepickerCalendarBody,
                    MatDatetimepickerClock,
                    MatDatetimepicker,
                    MatDatetimepickerToggle,
                    MatDatetimepickerInput,
                    MatDatetimepickerContent,
                    MatDatetimepickerMonthView,
                    MatDatetimepickerYearView
                ],
                exports: [
                    MatDatetimepickerCalendar,
                    MatDatetimepickerCalendarBody,
                    MatDatetimepickerClock,
                    MatDatetimepicker,
                    MatDatetimepickerToggle,
                    MatDatetimepickerInput,
                    MatDatetimepickerContent,
                    MatDatetimepickerMonthView,
                    MatDatetimepickerYearView
                ]
            },] },
];
/**
 * @nocollapse
 */
MatDatetimepickerModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */
export { NativeDatetimeModule, MatNativeDatetimeModule, DatetimeAdapter, MAT_DATETIME_FORMATS, NativeDatetimeAdapter, MAT_NATIVE_DATETIME_FORMATS, MatDatetimepickerModule, MatDatetimepickerCalendar, MatDatetimepickerCalendarCell, MatDatetimepickerCalendarBody, MatDatetimepickerContent, MatDatetimepicker, MAT_DATETIMEPICKER_VALUE_ACCESSOR, MAT_DATETIMEPICKER_VALIDATORS, MatDatetimepickerInputEvent, MatDatetimepickerInput, MatDatetimepickerToggle, MatDatetimepickerMonthView, MatDatetimepickerYearView, MatDatetimepickerClock as ɵb, slideCalendar as ɵa };
//# sourceMappingURL=core.es5.js.map