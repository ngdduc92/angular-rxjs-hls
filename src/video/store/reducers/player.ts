import { Player, PlayerStatus } from '../models/player'
import * as VideoPlayerActions from '../actions/player'

const initialState: Player = {
  status: PlayerStatus.PAUSED,
  selectedLevel: 0,
  duration: 0,
  currentTime: 0,
  playIcon: 'play_arrow',
  muted: false,
  volume: 1,
  fullScreenStatus: false
}

export const playerReducer = (state: Player = initialState, action: VideoPlayerActions.Actions) => {
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
    case VideoPlayerActions.CHANGE_FULL_SCREEN_STATUS:
      return { ...state, fullScreenStatus: action.payload };
    default:
      return state;
  }
}
