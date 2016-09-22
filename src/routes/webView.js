
import { MOBILE_WEB_VIEW } from 'constants/Routes';

import WebView from 'components/pages/WebView';

export const webView = () => ({
  component: WebView,
  path: MOBILE_WEB_VIEW,
});

export default webView;
