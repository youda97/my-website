import {
	Component,
	ViewEncapsulation,
	HostListener,
	ViewChild
} from "@angular/core";

@Component({
	selector: "app-navigation",
	templateUrl: "./navigation.component.html",
	styleUrls: [
		"./navigation.component.scss",
		"../../home.component.scss"
	],
	encapsulation: ViewEncapsulation.None
})
export class NavigationComponent {
	@ViewChild("home", {static: false}) home;
	@ViewChild("projects", {static: false}) projects;
	@ViewChild("aboutMe", {static: false}) aboutMe;
	@ViewChild("contactInfo", {static: false}) contactInfo;

	onClick(event) {
		const items = document.querySelectorAll("li");
		items.forEach(item => item.classList.remove("selected"));
		event.target.parentNode.classList.add("selected");
	}

	@HostListener("window:scroll")
	onScroll() {
		const items = document.querySelectorAll("li");
		if (document.getElementById("home").getBoundingClientRect().top === 0) {
			items.forEach(item => item.classList.remove("selected"));
			this.home.nativeElement.classList.add("selected");
		} else if (document.getElementById("projects").getBoundingClientRect().top < 0) {
			items.forEach(item => item.classList.remove("selected"));
			this.projects.nativeElement.classList.add("selected");
		} else if (document.getElementById("about-me").getBoundingClientRect().top < 0) {
			items.forEach(item => item.classList.remove("selected"));
			this.aboutMe.nativeElement.classList.add("selected");
		} else if (document.getElementById("contact-info").getBoundingClientRect().top < 0) {
			items.forEach(item => item.classList.remove("selected"));
			this.contactInfo.nativeElement.classList.add("selected");
		}
	}
}
