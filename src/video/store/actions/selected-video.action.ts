import { Action } from '@ngrx/store';
import { Video } from '../models/video.model';

export const SET_SELECTED_VIDEO  = 'SET_SELECTED_VIDEO';

export class SetSelectedVideo implements Action {
  readonly type = SET_SELECTED_VIDEO;

  constructor(public payload: Video) { }
}

export type Actions = SetSelectedVideo;
