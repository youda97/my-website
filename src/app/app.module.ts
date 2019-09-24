import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { ProjectsComponent } from "./projects/projects.component";

import { NavigationModule } from "./home/navigation/navigation.module";
import { AboutMeComponent } from "./about-me/about-me.component";
import { ContactInfoComponent } from "./contact-info/contact-info.component";

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		ProjectsComponent,
		AboutMeComponent,
		ContactInfoComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		NavigationModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
