import * as VideoActions from '../actions/selected-video.action';
import { Video } from '../models/video.model';

export function selectedVideoReducer(state: Video, action: VideoActions.Actions) {
  switch (action.type) {
    case VideoActions.SET_SELECTED_VIDEO:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
