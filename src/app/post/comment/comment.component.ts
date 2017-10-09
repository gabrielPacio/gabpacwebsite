import {Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';
import {CommentModel} from './comment.model';

@Component({
    templateUrl: 'comment.component.html',
    selector: 'blog-comment'
})
export class CommentComponent implements OnChanges {

    @Input() comment: CommentModel;
    @ViewChild('commentContent', {read: ElementRef}) commentContent: ElementRef;
    constructor(private element: ElementRef) {}

    ngOnChanges() {
        this.commentContent.nativeElement.innerHTML = this.comment.content['rendered'];
        console.log('ELEMENT!!!!',this.element.nativeElement)
    }
}
