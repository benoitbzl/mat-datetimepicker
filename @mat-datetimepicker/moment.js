import { Inject, Injectable, NgModule, Optional } from '@angular/core';
import { MatMomentDateModule, MomentDateModule } from '@angular/material-moment-adapter';
import { DatetimeAdapter, MAT_DATETIME_FORMATS } from '@mat-datetimepicker/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material';
import * as _rollupMoment from 'moment';
import _rollupMoment__default from 'moment';

// import * as moment from "moment";
// import { Moment } from "moment";
// can't get this to build... ><
const moment = _rollupMoment__default || _rollupMoment;
/**
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range(length, valueFunction) {
    const /** @type {?} */ valuesArray = Array(length);
    for (let /** @type {?} */ i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
class MomentDatetimeAdapter extends DatetimeAdapter {
    /**
     * @param {?} matDateLocale
     * @param {?} _delegate
     */
    constructor(matDateLocale, _delegate) {
        super(_delegate);
        this.setLocale(matDateLocale || moment.locale());
    }
    /**
     * @param {?} locale
     * @return {?}
     */
    setLocale(locale) {
        super.setLocale(locale);
        const /** @type {?} */ momentLocaleData = moment.localeData(locale);
        this._localeData = {
            firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
            longMonths: momentLocaleData.months(),
            shortMonths: momentLocaleData.monthsShort(),
            dates: range(31, (i) => super.createDate(2017, 0, i + 1).format("D")),
            hours: range(24, (i) => this.createDatetime(2017, 0, 1, i, 0).format("H")),
            minutes: range(60, (i) => this.createDatetime(2017, 0, 1, 1, i).format("m")),
            longDaysOfWeek: momentLocaleData.weekdays(),
            shortDaysOfWeek: momentLocaleData.weekdaysShort(),
            narrowDaysOfWeek: momentLocaleData.weekdaysMin()
        };
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getHour(date) {
        return super.clone(date).hour();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMinute(date) {
        return super.clone(date).minute();
    }
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    isInNextMonth(startDate, endDate) {
        const /** @type {?} */ nextMonth = this.getDateInNextMonth(startDate);
        return super.sameMonthAndYear(nextMonth, endDate);
    }
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hour
     * @param {?} minute
     * @return {?}
     */
    createDatetime(year, month, date, hour, minute) {
        // Check for invalid month and date (except upper bound on date which we have to check after
        // creating the Date).
        if (month < 0 || month > 11) {
            throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
        }
        if (date < 1) {
            throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
        }
        if (hour < 0 || hour > 23) {
            throw Error(`Invalid hour "${hour}". Hour has to be between 0 and 23.`);
        }
        if (minute < 0 || minute > 59) {
            throw Error(`Invalid minute "${minute}". Minute has to be between 0 and 59.`);
        }
        // const result = moment({year, month, date, hour, minute}).locale(this.locale);
        const /** @type {?} */ result = moment({ year, month, date, hour, minute });
        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid()) {
            throw Error(`Invalid date "${date}" for month with index "${month}".`);
        }
        return result;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDateInNextMonth(date) {
        return super.clone(date).date(1).add({ month: 1 });
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getFirstDateOfMonth(date) {
        return super.clone(date).startOf("month");
    }
    /**
     * @return {?}
     */
    getHourNames() {
        return this._localeData.hours;
    }
    /**
     * @return {?}
     */
    getMinuteNames() {
        return this._localeData.minutes;
    }
    /**
     * @param {?} date
     * @param {?} hours
     * @return {?}
     */
    addCalendarHours(date, hours) {
        return super.clone(date).add({ hours });
    }
    /**
     * @param {?} date
     * @param {?} minutes
     * @return {?}
     */
    addCalendarMinutes(date, minutes) {
        return super.clone(date).add({ minutes });
    }
    /**
     * @param {?} value
     * @return {?}
     */
    deserialize(value) {
        return this._delegate.deserialize(value);
    }
}
MomentDatetimeAdapter.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
MomentDatetimeAdapter.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATE_LOCALE,] },] },
    { type: DateAdapter, },
];

const MAT_MOMENT_DATETIME_FORMATS = {
    parse: {
        dateInput: "l",
        timeInput: "LT"
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

class MomentDatetimeModule {
}
MomentDatetimeModule.decorators = [
    { type: NgModule, args: [{
                imports: [MomentDateModule],
                providers: [
                    {
                        provide: DatetimeAdapter,
                        useClass: MomentDatetimeAdapter
                    }
                ]
            },] },
];
/**
 * @nocollapse
 */
MomentDatetimeModule.ctorParameters = () => [];
class MatMomentDatetimeModule {
}
MatMomentDatetimeModule.decorators = [
    { type: NgModule, args: [{
                imports: [MomentDatetimeModule, MatMomentDateModule],
                providers: [{ provide: MAT_DATETIME_FORMATS, useValue: MAT_MOMENT_DATETIME_FORMATS }]
            },] },
];
/**
 * @nocollapse
 */
MatMomentDatetimeModule.ctorParameters = () => [];

/**
 * Generated bundle index. Do not edit.
 */

export { MomentDatetimeModule, MatMomentDatetimeModule, MomentDatetimeAdapter, MAT_MOMENT_DATETIME_FORMATS };
//# sourceMappingURL=moment.js.map
