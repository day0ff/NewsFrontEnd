import {browser, by, element, promise, ElementFinder, ElementArrayFinder} from 'protractor';

export class SongsPo {
  navigateToSongs(): promise.Promise<any> {
    return browser.get('/songs');
  }

  getButtonBySongName(songName: string): ElementFinder {
    return element(by.cssContainingText('li a', songName));
  }

  getInputSongName(): promise.Promise<string> {
    return element(by.css('#songName')).getAttribute('value');
  }
}
