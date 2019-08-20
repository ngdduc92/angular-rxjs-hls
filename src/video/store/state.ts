import { Video } from './models/video.model';
import { Player } from './models/player.model';

export interface VideoPlayerState {
  readonly selectedVideo: Video;
  readonly videoList: Video[];
  readonly player: Player;
}
