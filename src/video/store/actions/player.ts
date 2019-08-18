import { Action } from '@ngrx/store';
import { Player, PlayerStatus } from '../models/player'

export const CHANGE_PLAYER_STATUS = 'CHANGE_PLAYER_STATUS';
export const CHANGE_PLAY_ICON = 'CHANGE_PLAY_ICON';
export const SET_PLAYER_LEVELS = 'SET_PLAYER_LEVELS';
export const SET_PLAYER_DURATION = 'SET_PLAYER_DURATION';
export const SET_PLAYER_CURRENT_TIME = 'SET_PLAYER_CURRENT_TIME';

export class changePlayerStatus implements Action {
  readonly type = CHANGE_PLAYER_STATUS;

  constructor(public payload: PlayerStatus) {}
}

export class changePlayIcon implements Action {
  readonly type = CHANGE_PLAY_ICON;

  constructor(public payload: string) {}
}

export class setAvailableLevels implements Action {
  readonly type = SET_PLAYER_LEVELS;

  constructor(public payload: any) {}
}

export class setDuration implements Action {
  readonly type = SET_PLAYER_DURATION;

  constructor(public payload: number) {}
}

export class setCurrentTime implements Action {
  readonly type = SET_PLAYER_CURRENT_TIME;

  constructor(public payload: number) {}
}

export type Actions =
  changePlayerStatus |
  changePlayIcon     |
  setAvailableLevels |
  setDuration        |
  setCurrentTime

