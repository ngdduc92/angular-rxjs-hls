import { createFeatureSelector, createSelector } from '@ngrx/store';
import { playerReducer } from './player.reducer';
import { videoListReducer } from './video-list.reducer';
import { selectedVideoReducer } from './selected-video.reducer';
import { VideoPlayerState } from '../state';

export const reducers = {
  videoList: videoListReducer,
  selectedVideo: selectedVideoReducer,
  player: playerReducer
};

export const getVideoPlayerState = createFeatureSelector<VideoPlayerState>('videoPlayer');
export const getSelectedVideoState = createSelector(getVideoPlayerState, (state: VideoPlayerState) => state.selectedVideo);
export const getVideoListState = createSelector(getVideoPlayerState, (state: VideoPlayerState) => state.videoList);
export const getPlayerState = createSelector(getVideoPlayerState, (state: VideoPlayerState) => state.player);
