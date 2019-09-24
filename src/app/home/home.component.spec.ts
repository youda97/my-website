import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeComponent } from "./home.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavigationModule } from "./navigation/navigation.module";

describe("HomeComponent", () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				NavigationModule,
				BrowserAnimationsModule
			],
			declarations: [ HomeComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
