/* global Raven */

import Rx from 'rx';

import noop from 'lodash/noop';

import appLaunch from './appLaunch';
import bannerClick from './bannerClick';
import collectionCreation from './collectionCreation';
import cookbookView from './cookbookView';
import onboardingImpression from './onboardingImpression';
import onboardingStart from './onboardingStart';
import onboardingStepAction from './onboardingStepAction';
import onlineCheckoutItemSearchStart from './onlineCheckoutItemSearchStart';
import onlineCheckoutView from './onlineCheckoutView';
import recipeCreation from './recipeCreation';
import recipeFeedView from './recipeFeedView';
import recipeOrigin from './recipeOrigin';
import recipePrint from './recipePrint';
import recipeSearch from './recipeSearch';
import recipeSelection from './recipeSelection';
import recipeView from './recipeView';
import urlSharing from './urlSharing';
import userAuthentication from './userAuthentication';
import userDeletion from './userDeletion';
import userLogOut from './userLogOut';
import userUpdate from './userUpdate';

export default actions$ => {
  actions$
    .tap(appLaunch)
    .tap(bannerClick)
    .tap(collectionCreation)
    .tap(cookbookView)
    .tap(onboardingImpression)
    .tap(onboardingStart)
    .tap(onboardingStepAction)
    .tap(onlineCheckoutItemSearchStart)
    .tap(onlineCheckoutView)
    .tap(recipeCreation)
    .tap(recipeFeedView)
    .tap(recipeOrigin)
    .tap(recipePrint)
    .tap(recipeSearch)
    .tap(recipeSelection)
    .tap(recipeView)
    .tap(urlSharing)
    .tap(userAuthentication)
    .tap(userDeletion)
    .tap(userLogOut)
    .tap(userUpdate)
    .catch(error => {
      if (typeof Raven !== 'undefined') {
        Raven.captureException(error);
      }

      return Rx.Observable.empty();
    })
    .subscribe(noop, noop);
};
