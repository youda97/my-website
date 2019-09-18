import { Component, ViewEncapsulation } from "@angular/core";

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
	onClick(event) {
		const items = document.querySelectorAll("li");
		items.forEach(item => item.classList.remove("selected"));
		event.target.parentNode.classList.add("selected");
	}
}
