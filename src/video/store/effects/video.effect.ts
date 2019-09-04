import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { Video } from '../models/video.model';
import * as VideoListActions from '../actions/video-list.action';

const _videoList: Video[] = [
    {
      idx: 0,
      title: 'Video 1',
      src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
    },
    {
      idx: 1,
      title: 'Video 2',
      src: 'https://test-streams.mux.dev/test_001/stream.m3u8'
    },
    {
      idx: 2,
      title: 'Video 3',
      src: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
    },
    {
      idx: 3,
      title: 'Video 4',
      src: 'https://mnmedias.api.telequebec.tv/m3u8/29880.m3u8'
    }
  ];

function getVideoList(): Observable<Video[]> {
  return new Observable(subscriber => {
    setTimeout(() => {
      subscriber.next(_videoList);
      subscriber.complete();
    }, 2000);
  });
}

@Injectable()
export class VideoEffects {
  @Effect()
  fetch$: Observable<Action> = this.actions$.pipe(
    ofType(VideoListActions.FETCH_VIDEO_LIST),
    flatMap(getVideoList),
    map(videoList => ({ type: VideoListActions.SET_VIDEO_LIST, payload: videoList }))
  );

  constructor(private actions$: Actions) {}
}
