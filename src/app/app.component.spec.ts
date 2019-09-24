import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";

import { HomeComponent } from "./home/home.component";
import { ProjectsComponent } from "./projects/projects.component";
import { AboutMeComponent } from "./about-me/about-me.component";
import { ContactInfoComponent } from "./contact-info/contact-info.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavigationModule } from "./home/navigation/navigation.module";

describe("AppComponent", () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				BrowserAnimationsModule,
				NavigationModule
			],
			declarations: [
				AppComponent,
				HomeComponent,
				ProjectsComponent,
				AboutMeComponent,
				ContactInfoComponent
			],
		}).compileComponents();
	}));

	it("should create the app", () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});
});
