export enum PlayerStatus {
  LOADING,
  ERROR,
  PLAYING,
  PAUSED,
  SEEKING
}

export interface Player {
  status: PlayerStatus;
  duration: number;
  currentTime: number;
  playIcon: string;
  muted: boolean;
  volume: number;
  fullScreenStatus: boolean;
  fullscreenIcon: string;
}
