import { AfterContentInit, ElementRef, EventEmitter, OnDestroy, Renderer2 } from "@angular/core";
import { AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatDatetimeFormats } from "../adapter/datetime-formats";
import { DatetimeAdapter } from "../adapter/datetime-adapter";
import { MatDatetimepicker } from "./datetimepicker";
export declare const MAT_DATETIMEPICKER_VALUE_ACCESSOR: any;
export declare const MAT_DATETIMEPICKER_VALIDATORS: any;
/**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use MatDatepickerInputEvent instead.
 */
export declare class MatDatetimepickerInputEvent<D> {
    target: MatDatetimepickerInput<D>;
    targetElement: HTMLElement;
    /** The new value for the target datepicker input. */
    value: D | null;
    constructor(target: MatDatetimepickerInput<D>, targetElement: HTMLElement);
}
/** Directive used to connect an input to a MatDatepicker. */
export declare class MatDatetimepickerInput<D> implements AfterContentInit, ControlValueAccessor, OnDestroy, Validator {
    private _elementRef;
    private _renderer;
    private _dateAdapter;
    private _dateFormats;
    private _formField;
    /** The datepicker that this input is associated with. */
    matDatetimepicker: MatDatetimepicker<D>;
    _datepicker: MatDatetimepicker<D>;
    private registerDatepicker(value);
    matDatepickerFilter: (date: D | null) => boolean;
    _dateFilter: (date: D | null) => boolean;
    /** The value of the input. */
    value: D | null;
    private getDisplayFormat();
    private getParseFormat();
    private _value;
    /** The minimum valid date. */
    min: D | null;
    private _min;
    /** The maximum valid date. */
    max: D | null;
    private _max;
    /** Whether the datepicker-input is disabled. */
    disabled: any;
    private _disabled;
    /** Emits when a `change` event is fired on this `<input>`. */
    dateChange: EventEmitter<MatDatetimepickerInputEvent<D>>;
    /** Emits when an `input` event is fired on this `<input>`. */
    dateInput: EventEmitter<MatDatetimepickerInputEvent<D>>;
    /** Emits when the value changes (either due to user input or programmatic change). */
    _valueChange: EventEmitter<D>;
    /** Emits when the disabled state has changed */
    _disabledChange: EventEmitter<boolean>;
    _onTouched: () => void;
    private _cvaOnChange;
    private _validatorOnChange;
    private _datepickerSubscription;
    private _localeSubscription;
    /** The form control validator for whether the input parses. */
    private _parseValidator;
    /** The form control validator for the min date. */
    private _minValidator;
    /** The form control validator for the max date. */
    private _maxValidator;
    /** The form control validator for the date filter. */
    private _filterValidator;
    /** The combined form control validator for this input. */
    private _validator;
    /** Whether the last value set on the input was valid. */
    private _lastValueValid;
    constructor(_elementRef: ElementRef, _renderer: Renderer2, _dateAdapter: DatetimeAdapter<D>, _dateFormats: MatDatetimeFormats, _formField: MatFormField);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    registerOnValidatorChange(fn: () => void): void;
    validate(c: AbstractControl): ValidationErrors | null;
    /**
     * Gets the element that the datepicker popup should be connected to.
     * @return The element to connect the popup to.
     */
    getPopupConnectionElementRef(): ElementRef;
    writeValue(value: D): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(disabled: boolean): void;
    _onKeydown(event: KeyboardEvent): void;
    _onInput(value: string): void;
    _onChange(): void;
}