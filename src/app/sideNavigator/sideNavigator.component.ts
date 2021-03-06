import {AfterViewChecked, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {SideNavigatorModel} from "./sideNavigator.model";
import * as _ from 'lodash';
import {CategoryService} from '../category/category.service';

@Component({
    selector: 'blog-side-navigator-component',
    templateUrl: './sideNavigator.component.html'
})
export class SideNavigatorComponent implements AfterViewChecked {

    @Input() postList: SideNavigatorModel[];
    @Input() morePostsAfter: boolean;

    @ViewChild('linksList') elementRef: ElementRef;

    private posts: HTMLCollectionOf<Element>;
    private postsTopPositions: Array<number> = [];
    public currentId: string;

    constructor(private categoryService: CategoryService) {
        document.addEventListener('scroll', this.handleOnScroll.bind(this));
    }

    ngAfterViewChecked() {
        if (!this.postsTopPositions.length) {
            this.setPostsHeight();
        }
    }

    private setPostsHeight() {

        this.posts = document.getElementsByClassName('post-content');
        this.postsTopPositions = Array.from(this.posts).map(element => {
            return element.getBoundingClientRect().top + window.innerHeight / 2 + (document.documentElement.scrollTop  || document.body.scrollTop);
        })
    }

    private handleOnScroll() {
        _.debounce(this.setPostsHeight, 100)();
        this.setPostsHeight();
        const position: number = (document.documentElement.scrollTop  || document.body.scrollTop);

        if (!this.posts) {
            return;
        }
        let currentId: string;
        const arr = Array.from(this.posts).filter((element, key) => {
            return this.postsTopPositions[key] > position /*&& this.postsTopPositions[key + 1] < position*/;
        });
        if (arr && arr[0] && arr[0].getElementsByTagName('h2')) {
            const selected = this.elementRef.nativeElement.getElementsByClassName('selected')[0];
            if (selected) {
                selected.scrollIntoView();
            }

            const array = arr[0].getElementsByTagName('h2')[0];
            if (array) {
                currentId = array.id;
            }

            if (this.currentId !== currentId) {
                this.currentId = currentId;
            }

        } else {
            return;
        }
    }
}
