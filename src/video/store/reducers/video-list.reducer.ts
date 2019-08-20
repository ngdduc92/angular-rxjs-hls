import * as VideoListActions from '../actions/video-list.action';
import { Video } from '../models/video.model';

export function videoListReducer(state: Video[] = [], action: VideoListActions.Actions) {
  switch (action.type) {
    case VideoListActions.SET_VIDEO_LIST:
      return [...state, ...action.payload];
    default:
      return state;
  }
}
