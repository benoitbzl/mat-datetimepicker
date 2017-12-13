import { InjectionToken } from "@angular/core";
export declare type MatDatetimeFormats = {
    parse: {
        dateInput: any;
    };
    display: {
        dateInput: any;
        monthInput: any;
        timeInput: any;
        datetimeInput: any;
        monthYearLabel: any;
        dateA11yLabel: any;
        monthYearA11yLabel: any;
    };
};
export declare const MAT_DATETIME_FORMATS: InjectionToken<MatDatetimeFormats>;
