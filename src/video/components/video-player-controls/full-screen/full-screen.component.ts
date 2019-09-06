import { Component } from '@angular/core';

@Component({
  selector: 'app-video-player-control-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.scss']
})
export class FullScreenComponent {

  icon = 'fullscreen';
  fullscreenMode = false;
  doc: any = document;

  constructor() {
    this.doc.onfullscreenchange = () => {
      this.setFullscreenIcon();
    }
    this.doc.onwebkitfullscreenchange = () => {
      this.setFullscreenIcon();
    }
  }

  setFullscreenIcon() {
    this.fullscreenMode = !this.fullscreenMode;
    this.icon = this.icon === 'fullscreen' ? 'fullscreen_exit' : 'fullscreen';
  }

  toogleFullScreen() {
    const element: any = this.doc.getElementById('video-player');
    if (!this.fullscreenMode) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
      }
    } else {
      if (this.doc.exitFullscreen) {
        this.doc.exitFullscreen();
      } else if (this.doc.webkitCancelFullScreen) {
        this.doc.webkitCancelFullScreen();
      }
    }
  }
}
