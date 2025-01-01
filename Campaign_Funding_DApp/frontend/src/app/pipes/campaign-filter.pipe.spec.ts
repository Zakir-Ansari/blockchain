import { CampaignFilterPipe } from './campaign-filter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new CampaignFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
