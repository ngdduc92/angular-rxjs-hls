import { Player, PlayerStatus } from '../models/player.model';
import * as VideoPlayerActions from '../actions/player.action';

const initialState: Player = {
  status: PlayerStatus.PAUSED,
  duration: 0,
  currentTime: 0,
  playIcon: 'play_arrow',
  muted: false,
  volume: 1
};

export function playerReducer(state: Player = initialState, action: VideoPlayerActions.Actions) {
  switch (action.type) {
    case VideoPlayerActions.CHANGE_PLAYER_STATUS:
      return { ...state, status: action.payload };
    case VideoPlayerActions.CHANGE_PLAY_ICON:
      return { ...state, playIcon: action.payload };
    case VideoPlayerActions.SET_PLAYER_DURATION:
      return { ...state, duration: action.payload };
    case VideoPlayerActions.SET_PLAYER_CURRENT_TIME:
      return { ...state, currentTime: action.payload };
    case VideoPlayerActions.CHANGE_VOLUME_STATUS:
      return { ...state, muted: action.payload };
    case VideoPlayerActions.SET_VOLUME:
      return { ...state, volume: action.payload };
    default:
      return state;
  }
}
