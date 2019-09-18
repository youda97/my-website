import {
	Component,
	ViewChildren,
	AfterViewInit,
	HostListener
} from "@angular/core";

@Component({
	selector: "app-projects",
	templateUrl: "./projects.component.html",
	styleUrls: ["./projects.component.scss"]
})
export class ProjectsComponent implements AfterViewInit {
	@ViewChildren("block") blocks;
	@ViewChildren("img") images;
	@ViewChildren("content") contents;

	offset = 0.8;


	ngAfterViewInit() {
		this.hideBlocks();
	}

	// hide timeline blocks which are outside the viewport
	hideBlocks() {
		for (let i = 0; i < this.blocks.toArray().length; i++) {
			if (this.blocks.toArray()[i].nativeElement.getBoundingClientRect().top > window.innerHeight * this.offset) {
				this.images.toArray()[i].nativeElement.classList.add("cd-timeline__img--hidden");
				this.contents.toArray()[i].nativeElement.classList.add("cd-timeline__content--hidden");
			}
		}
	}

	// show timeline blocks on scrolling
	@HostListener("window:scroll")
	showBlocks() {
		for (let i = 0; i < this.blocks.toArray().length; i++) {
			if (this.contents.toArray()[i].nativeElement.classList.contains("cd-timeline__content--hidden") &&
				this.blocks.toArray()[i].nativeElement.getBoundingClientRect().top <= window.innerHeight * this.offset) {
				// add bounce-in animation
				this.images.toArray()[i].nativeElement.classList.add("cd-timeline__img--bounce-in");
				this.contents.toArray()[i].nativeElement.classList.add("cd-timeline__content--bounce-in");
				this.images.toArray()[i].nativeElement.classList.remove("cd-timeline__img--hidden");
				this.contents.toArray()[i].nativeElement.classList.remove("cd-timeline__content--hidden");

			}
		}
	}
}
