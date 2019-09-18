import {
	Component,
	ViewChild,
	AfterViewInit,
	HostListener
} from "@angular/core";

import {
	trigger,
	state,
	style,
	animate,
	transition
} from "@angular/animations";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
	animations: [
		trigger("onLoadingStateChange", [
			state("loadingStop", style({})),
			state("loadingDisappear", style({
				transform: "translateY(-50%) translateX(-50%) scale(0.001)"
			})),
			transition("loadingStop => loadingDisappear", [
				animate("0.2s")
			])
		]),

		trigger("onPreviewStateChange", [
			state("center", style({})),
			state("right", style({})),
			transition("center => right", [
				animate("5s")
			])
		])
	]
})
export class HomeComponent implements AfterViewInit {
	@ViewChild("loader", {static: false}) loader;
	@ViewChild("immersiveVideoWrapper", {static: false}) immersiveVideoWrapper;
	@ViewChild("productPreview", {static: false}) productPreview;
	@ViewChild("productVideoWrapper", {static: false}) productVideoWrapper;
	@ViewChild("productVideo", {static: false}) productVideo;
	@ViewChild("productIntro", {static: false}) productIntro;

	currentLoadingState = "loadingStop";
	currentPreviewState = "center";
	resizing = false;
	// isLoading = true;

	ngAfterViewInit() {
		// if video is in cache 'canplaythrough' won't be triggered
		if (this.productVideoWrapper.nativeElement.firstElementChild.readyState > 3) {
			this.readyToPlay();
		}
		this.productVideoWrapper.nativeElement.firstElementChild.muted = true;
		this.productVideoWrapper.nativeElement.firstElementChild.playbackRate = 0.5;
	}

	canPlay(event) {
		// if greater than 800px - we are not on a mobile device
		if (window.innerWidth > 800) {
			this.readyToPlay();
		}
	}

	readyToPlay() {
		this.loader.nativeElement.classList.add("no-animation");
		setTimeout(() => {
			this.currentLoadingState = "loadingDisappear";
		}, 1000);
	}

	startAnimation() {
		const preview = this.productPreview.nativeElement;
		const previewWidth = preview.clientWidth;
		const previewHeight = preview.clientHeight;
		const videoPreviewWidth = this.productVideoWrapper.nativeElement.clientWidth;
		const videoPreviewHeight = this.productVideoWrapper.nativeElement.clientHeight;

		const scaleX = window.innerWidth / videoPreviewHeight;
		const scaleY = window.innerHeight / videoPreviewWidth;

		const scale = ( scaleX > scaleY ) ? scaleX : scaleY;

		// scale up video to cover the entire viewport (no transition)
		this.transform(
			preview,
			`translateX(${window.innerWidth / 2 - previewWidth / 2}px)\
			translateY(${window.innerHeight / 2  - previewHeight / 2}px)\
			scale(${scale}) rotate(90deg)`);
		document.body.classList.add("cd-overflow-hidden");

		// reveal content and play video
		this.immersiveVideoWrapper.nativeElement.classList.add("video-is-loaded");

		const video = this.productVideoWrapper.nativeElement.firstElementChild;
		const playPromise = video.play();

		if (playPromise !== undefined) {
			playPromise.then(_ => {
				video.play();
			}).catch(error => {
				console.error("Name:", error.name, "\nMessage:", error.message, "\nCode:", error.code);
			});
		}

		this.productVideo.nativeElement.classList.add("has-bg-color");

		setTimeout(() => {
			preview.classList.remove("no-transition");
			// scale down the video
			this.transform(
				preview,
				`translateX(${(window.innerWidth / 2 - previewWidth / 2)}px)\
				translateY(${(window.innerHeight / 2 - previewHeight / 2)}px)\
				scale(1)`);
			preview.classList.add("video-zoomed-out");

			setTimeout(() => {
				const immersiveVideoWrapperPadding = window.getComputedStyle(this.immersiveVideoWrapper.nativeElement).paddingLeft;
				this.transform(
					preview,
					`translateX(${(window.innerWidth - previewWidth - parseInt(immersiveVideoWrapperPadding, 10))}px)
					translateY(${(window.innerHeight / 2 - previewHeight / 2)}px`);
				preview.style.transitionDuration = "0.4s";

				this.productIntro.nativeElement.classList.add("animate-content");
				this.productVideoWrapper.nativeElement.firstElementChild.playbackRate = 1.6;

				document.body.classList.remove("cd-overflow-hidden");
				this.currentPreviewState = "right";
			}, 1000);
		}, 3000);
	}

	transform(element, value) {
		element.style.transform = value;
	}

	onLoadingDone() {
		if (this.loader.nativeElement.classList.contains("no-animation")) {
			// this.isLoading = false;
			this.startAnimation();
		}
	}

	onPreviewDone() {
		if (this.productIntro.nativeElement.classList.contains("animate-content")) {
			this.productPreview.nativeElement.classList.add("no-transition");
		}
	}

	@HostListener("window:resize")
	onResize() {
		if (!this.resizing) {
			this.resizing = true;
			this.checkResize();
		}
	}

	checkResize() {
		if (window.innerWidth > 800) {
			// we are on desktop
			this.immersiveVideoWrapper.nativeElement.classList.add("video-is-loaded");
			const previewWidth = this.productPreview.nativeElement.clientWidth;
			const previewHeight = this.productPreview.nativeElement.clientHeight;
			const immersiveVideoWrapperPadding = window.getComputedStyle(this.immersiveVideoWrapper.nativeElement).paddingLeft;
			this.transform(
				this.productPreview.nativeElement,
				`translateX(${(window.innerWidth - previewWidth - parseInt(immersiveVideoWrapperPadding, 10))}px)
				translateY(${(window.innerHeight / 2 - previewHeight / 2)}px`);
			this.productIntro.nativeElement.classList.add("animate-content");
		} else {
			// we are on mobile
			this.productPreview.nativeElement.setAttribute("style", "");
			document.body.classList.remove("cd-overflow-hidden");
		}
		this.resizing = false;
	}
}
