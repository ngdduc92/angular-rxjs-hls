import { Action } from '@ngrx/store';
import { Player, PlayerStatus } from '../models/player'

export const CHANGE_PLAYER_STATUS = 'CHANGE_PLAYER_STATUS';
export const CHANGE_PLAY_ICON = 'CHANGE_PLAY_ICON';
export const SET_PLAYER_DURATION = 'SET_PLAYER_DURATION';
export const SET_PLAYER_CURRENT_TIME = 'SET_PLAYER_CURRENT_TIME';
export const CHANGE_VOLUME_STATUS = 'CHANGE_VOLUME_STATUS';
export const SET_VOLUME = 'SET_VOLUME';
export const CHANGE_FULL_SCREEN_STATUS = 'CHANGE_FULL_SCREEN_STATUS';

export class changePlayerStatus implements Action {
  readonly type = CHANGE_PLAYER_STATUS;

  constructor(public payload: PlayerStatus) {}
}

export class changePlayIcon implements Action {
  readonly type = CHANGE_PLAY_ICON;

  constructor(public payload: string) {}
}

export class setDuration implements Action {
  readonly type = SET_PLAYER_DURATION;

  constructor(public payload: number) {}
}

export class setCurrentTime implements Action {
  readonly type = SET_PLAYER_CURRENT_TIME;

  constructor(public payload: number) {}
}

export class changeVolumeStatus implements Action {
  readonly type = CHANGE_VOLUME_STATUS;

  constructor(public payload: boolean) {}
}

export class setVolume implements Action {
  readonly type = SET_VOLUME;

  constructor(public payload: number) {}
}

export class changeFullScreenStatus implements Action {
  readonly type = CHANGE_FULL_SCREEN_STATUS;

  constructor(public payload: boolean) {}
}

export type Actions =
  changePlayerStatus |
  changePlayIcon     |
  setDuration        |
  setCurrentTime     |
  changeVolumeStatus |
  setVolume          |
  changeFullScreenStatus

