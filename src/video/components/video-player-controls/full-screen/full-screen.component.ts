import { Component } from '@angular/core';

@Component({
  selector: 'app-video-player-control-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.scss']
})
export class FullScreenComponent {

  icon = 'fullscreen';

  constructor() {
    document.onfullscreenchange = () => {
      this.icon = this.icon === 'fullscreen' ? 'fullscreen_exit' : 'fullscreen';
    }
  }

  toogleFullScreen() {
    const element = document.getElementById('video-player');
    if (!document.fullscreenElement) {
      element.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
}
