import { Video } from './models/video';
import { Player } from './models/player'

export interface VideoPlayerState {
  readonly selectedVideo: Video,
  readonly videoList: Video[],
  readonly player: Player
}
