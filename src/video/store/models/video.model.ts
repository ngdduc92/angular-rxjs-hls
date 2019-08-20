export enum VideoStatus {
  LOADING,
  ERROR,
  PLAYING,
  PAUSED,
  SEEKING
}

export interface Video {
  idx: number;
  src: string;
  title: string;
}
