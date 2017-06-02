import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
var TreeDragDropService = (function () {
    function TreeDragDropService() {
        this.dragStartSource = new Subject();
        this.dragStopSource = new Subject();
        this.dragStart$ = this.dragStartSource.asObservable();
        this.dragStop$ = this.dragStopSource.asObservable();
    }
    TreeDragDropService.prototype.startDrag = function (event) {
        this.dragStartSource.next(event);
    };
    TreeDragDropService.prototype.stopDrag = function (event) {
        this.dragStopSource.next(event);
    };
    return TreeDragDropService;
}());
export { TreeDragDropService };
TreeDragDropService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
TreeDragDropService.ctorParameters = function () { return []; };
//# sourceMappingURL=treedragdropservice.js.map