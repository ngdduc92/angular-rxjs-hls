export enum VideoStatus {
  LOADING,
  ERROR,
  PLAYING,
  PAUSED,
  SEEKING
}

export interface Video {
  index: number,
  src:   string,
  title: string,
  levels?: any,
  playbackLevel?: any,
  status?: VideoStatus
}