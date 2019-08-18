import { Action } from '@ngrx/store';
import { Video } from '../models/video';

export const SET_SELECTED_VIDEO  = 'SET_SELECTED_VIDEO';

export class setSelectedVideo implements Action {
  readonly type = SET_SELECTED_VIDEO;

  constructor(public payload: Video) { }
}

export type Actions = setSelectedVideo;
