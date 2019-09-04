import { Action } from '@ngrx/store';
import { PlayerStatus } from '../models/player.model';

export const CHANGE_PLAYER_STATUS = 'CHANGE_PLAYER_STATUS';
export const CHANGE_PLAY_ICON = 'CHANGE_PLAY_ICON';
export const SET_PLAYER_DURATION = 'SET_PLAYER_DURATION';
export const SET_PLAYER_CURRENT_TIME = 'SET_PLAYER_CURRENT_TIME';
export const CHANGE_VOLUME_STATUS = 'CHANGE_VOLUME_STATUS';
export const SET_VOLUME = 'SET_VOLUME';
export const CHANGE_FULL_SCREEN_STATUS = 'CHANGE_FULL_SCREEN_STATUS';
export const CHANGE_FULLSCREEN_ICON = 'CHANGE_FULLSCREEN_ICON';

export class ChangePlayerStatus implements Action {
  readonly type = CHANGE_PLAYER_STATUS;

  constructor(public payload: PlayerStatus) {}
}

export class ChangePlayIcon implements Action {
  readonly type = CHANGE_PLAY_ICON;

  constructor(public payload: string) {}
}

export class SetDuration implements Action {
  readonly type = SET_PLAYER_DURATION;

  constructor(public payload: number) {}
}

export class SetCurrentTime implements Action {
  readonly type = SET_PLAYER_CURRENT_TIME;

  constructor(public payload: number) {}
}

export class ChangeVolumeStatus implements Action {
  readonly type = CHANGE_VOLUME_STATUS;

  constructor(public payload: boolean) {}
}

export class SetVolume implements Action {
  readonly type = SET_VOLUME;

  constructor(public payload: number) {}
}

export class ChangeFullScreenStatus implements Action {
  readonly type = CHANGE_FULL_SCREEN_STATUS;

  constructor(public payload: boolean) {}
}

export class ChangeFullScreenIcon implements Action {
  readonly type = CHANGE_FULLSCREEN_ICON;

  constructor(public payload: string) {}
}

export type Actions =
  ChangePlayerStatus      |
  ChangePlayIcon          |
  SetDuration             |
  SetCurrentTime          |
  ChangeVolumeStatus      |
  SetVolume               |
  ChangeFullScreenStatus  |
  ChangeFullScreenIcon;

