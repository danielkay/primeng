import { NgModule, Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var RATING_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Rating; }),
    multi: true
};
var Rating = (function () {
    function Rating() {
        this.stars = 5;
        this.cancel = true;
        this.onRate = new EventEmitter();
        this.onCancel = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Rating.prototype.ngOnInit = function () {
        this.starsArray = [];
        for (var i = 0; i < this.stars; i++) {
            this.starsArray[i] = i;
        }
    };
    Rating.prototype.rate = function (event, i) {
        if (!this.readonly && !this.disabled) {
            this.value = (i + 1);
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onRate.emit({
                originalEvent: event,
                value: (i + 1)
            });
        }
        event.preventDefault();
    };
    Rating.prototype.clear = function (event) {
        if (!this.readonly && !this.disabled) {
            this.value = null;
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onCancel.emit(event);
        }
        event.preventDefault();
    };
    Rating.prototype.writeValue = function (value) {
        this.value = value;
    };
    Rating.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Rating.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Rating.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    return Rating;
}());
export { Rating };
Rating.decorators = [
    { type: Component, args: [{
                selector: 'p-rating',
                template: "\n        <div class=\"ui-rating\" [ngClass]=\"{'ui-state-disabled': disabled}\">\n            <a href=\"#\" *ngIf=\"cancel\" (click)=\"clear($event)\">\n                <span class=\"fa fa-ban\"></span>\n            </a>\n            <a href=\"#\" *ngFor=\"let star of starsArray;let i=index\" (click)=\"rate($event,i)\">\n                <span class=\"fa\" [ngClass]=\"{'fa-star-o': (!value || i >= value), 'fa-star':(i < value)}\"></span>\n            </a>\n        </div>\n    ",
                providers: [RATING_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
Rating.ctorParameters = function () { return []; };
Rating.propDecorators = {
    'disabled': [{ type: Input },],
    'readonly': [{ type: Input },],
    'stars': [{ type: Input },],
    'cancel': [{ type: Input },],
    'onRate': [{ type: Output },],
    'onCancel': [{ type: Output },],
};
var RatingModule = (function () {
    function RatingModule() {
    }
    return RatingModule;
}());
export { RatingModule };
RatingModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Rating],
                declarations: [Rating]
            },] },
];
/** @nocollapse */
RatingModule.ctorParameters = function () { return []; };
//# sourceMappingURL=rating.js.map