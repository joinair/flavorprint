
import { Navigator } from 'react-native';

import { MOBILE_AVOIDANCES_MODAL } from 'constants/Routes';

import AvoidancesModal from 'components/modals/AvoidancesModal';

export default () => ({
  component: AvoidancesModal,
  path: MOBILE_AVOIDANCES_MODAL,
  configureScene: () => Navigator.SceneConfigs.FloatFromBottom,
});
