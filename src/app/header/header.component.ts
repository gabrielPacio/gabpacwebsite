import {Component, Input} from "@angular/core";
import {HeaderService} from "./header.service";

@Component({
    selector: 'blog-header',
    templateUrl: './header.component.html',

})
export class HeaderComponent {

    @Input() title: string;
    @Input() subtitle: string = '';
    public titleState: string = 'done'; // done, entering, switching, outing
    public subtitleState: string = 'done'; // done, entering, switching, outing

    constructor(private headerService: HeaderService) {
        this.headerService.titleChange.subscribe(res => {
            setTimeout(() => {
                this.setSubtitle(res.description);
            }, 400);
            this.setTitle(res.title);

        });
    }

    private setTitle(title: string) {
        this.titleState = 'outing';

        setTimeout(() => {
            this.title = title;
            this.titleState = 'done';
        }, 1000);
    }

    private setSubtitle(subtitle: string) {
        this.subtitleState = 'outing'

        setTimeout(() => {
            this.subtitle = subtitle;
            this.subtitleState = 'done';
        }, 1000);

    }
}
