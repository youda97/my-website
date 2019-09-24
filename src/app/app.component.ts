import { Component, HostListener } from "@angular/core";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent {
	distance = 100;
	anchorElement = document.documentElement;

	windowScrolled = false;

	scrollToTop() {
		this.anchorElement.scrollIntoView({behavior: "smooth"});
	}

	@HostListener("window:scroll")
	onWindowScroll() {
		if (this.anchorElement.scrollTop > this.distance) {
			this.windowScrolled = true;
		} else if (this.windowScrolled && this.anchorElement.scrollTop < this.distance) {
			this.windowScrolled = false;
		}
	}
}
