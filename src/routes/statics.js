
import {
  TERMS_OF_SERVICE,
  PRIVACY_POLICY,
} from 'constants/Routes';

import TermsOfService from 'components/pages/Statics/TermsOfService';
import PrivacyPolicy from 'components/pages/Statics/PrivacyPolicy';

export default () => [
  {
    path: TERMS_OF_SERVICE,
    component: TermsOfService,
    analyticsTag: 'Terms of service',
  },
  {
    path: PRIVACY_POLICY,
    component: PrivacyPolicy,
    analyticsTag: 'Privacy policy',
  },
];
