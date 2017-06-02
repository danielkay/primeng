import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
var ConfirmationService = (function () {
    function ConfirmationService() {
        this.requireConfirmationSource = new Subject();
        this.acceptConfirmationSource = new Subject();
        this.requireConfirmation$ = this.requireConfirmationSource.asObservable();
        this.accept = this.acceptConfirmationSource.asObservable();
    }
    ConfirmationService.prototype.confirm = function (confirmation) {
        this.requireConfirmationSource.next(confirmation);
        return this;
    };
    ConfirmationService.prototype.onAccept = function () {
        this.acceptConfirmationSource.next();
    };
    return ConfirmationService;
}());
export { ConfirmationService };
ConfirmationService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ConfirmationService.ctorParameters = function () { return []; };
//# sourceMappingURL=confirmationservice.js.map