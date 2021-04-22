import webpush from 'web-push';

const publicVapidKey = 'BJU2OuUfxn0z3CWPOJ98DRoTvqyfLlZi5S2BQtnxJgJp_4KDzw6WxngOnOvfiqI04b_W9RGTQcFQdSZPE85MJSM';
const privateVapidKey = 'bwTHoLU-taONZMGLkrM_Hyq1bJiPOvdx27AdKnwq3rM';

export default (): void => {
  webpush.setVapidDetails(
    'mailto:test@test.com',
    publicVapidKey,
    privateVapidKey,
  );
};
