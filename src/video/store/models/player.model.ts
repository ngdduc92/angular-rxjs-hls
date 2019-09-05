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
  muted: boolean;
  volume: number;
}
