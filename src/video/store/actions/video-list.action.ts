import { Action } from '@ngrx/store';
import { Video } from '../models/video.model';

export const FETCH_VIDEO_LIST = 'FETCH_VIDEO_LIST';
export const SET_VIDEO_LIST   = 'SET_VIDEO_LIST';

export class FetchVideoList implements Action {
  readonly type = FETCH_VIDEO_LIST;
  constructor() {}
}

export class SetVideoList implements Action {
  readonly type = SET_VIDEO_LIST;
  constructor(public payload: Video[]) {}
}

export type Actions =
  FetchVideoList |
  SetVideoList;
