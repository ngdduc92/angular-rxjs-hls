import * as VideoActions from '../actions/selected-video';
import { Video } from '../models/video';

export const selectedVideoReducer = (state: Video, action: VideoActions.Actions) => {
  switch (action.type) {
    case VideoActions.SET_SELECTED_VIDEO:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
