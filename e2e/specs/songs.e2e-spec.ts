import { SongsPo } from '../pos/songs.po';

describe('music songs', () => {
  let page: SongsPo;

  beforeEach(() => {
    page = new SongsPo();
  });

  it('should select song with title "So High" and show song details', () => {
    page.navigateToSongs();
    page.getButtonBySongName('So High').click();
    expect(page.getInputSongName()).toContain('So High');
  });

});
