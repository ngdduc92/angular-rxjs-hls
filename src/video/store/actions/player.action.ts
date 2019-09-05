import { Action } from '@ngrx/store';
import { PlayerStatus } from '../models/player.model';

export const CHANGE_PLAYER_STATUS = 'CHANGE_PLAYER_STATUS';
export const SET_PLAYER_DURATION = 'SET_PLAYER_DURATION';
export const SET_PLAYER_CURRENT_TIME = 'SET_PLAYER_CURRENT_TIME';
export const CHANGE_VOLUME_STATUS = 'CHANGE_VOLUME_STATUS';
export const SET_VOLUME = 'SET_VOLUME';

export class ChangePlayerStatus implements Action {
  readonly type = CHANGE_PLAYER_STATUS;

  constructor(public payload: PlayerStatus) {}
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

export type Actions =
  ChangePlayerStatus      |
  SetDuration             |
  SetCurrentTime          |
  ChangeVolumeStatus      |
  SetVolume;

