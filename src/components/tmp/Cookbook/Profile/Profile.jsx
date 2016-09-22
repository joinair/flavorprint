
import React, { PropTypes } from 'react';

import pinterest from 'helpers/pinterest';
import twitter from 'helpers/twitter';

import iconPen from 'assets/images/icons/icon-pen.svg';
import iconShare from 'assets/images/icons/icon-share.svg';
import './styles.css';

import Avatar from 'components/ui-elements/Avatar';
import Button from 'components/ui-elements/Button';
import SharingIcons from 'components/tmp/SharingIcons';
import Icon from 'components/ui-elements/Icon';
import { Popup, PopupContent, PopupTrigger } from 'components/ui-elements/Popup';

const ShareButton = ({ sharingConfig, username }) =>
  <Popup className="Cookbook-userProfile-meta-item Cookbook-userProfile-share">
    <PopupTrigger>
      <Button media="xxxs-normal m-small" outline>
        <Icon
          className="Cookbook-userProfile-share-link-icon"
          glyph={iconShare}
        />
        Share
      </Button>
    </PopupTrigger>
    <PopupContent className="Cookbook-userProfile-share-dropdown">
      <SharingIcons
        config={sharingConfig}
        path={`/${username}`}
        rounded
      />
    </PopupContent>
  </Popup>;

const Profile = ({ isShared, profile, onProfileEdit }) => {
  const {
    avatar,
    cookbookVisibility,
    description,
    firstName,
    username,
  } = profile;

  const editLink = !isShared && (
    <span
      className="Cookbook-userProfile-editDescriptionLink"
      onClick={onProfileEdit}
    >
      <Icon
        className="Cookbook-userProfile-editDescriptionLink-icon"
        glyph={iconPen}
      />
      {description ? 'Edit' : 'Add description'}
    </span>
  );

  const sharingConfig = {
    pinterest: pinterest.profileToConfig(profile),
    twitter: twitter.profileToConfig(profile),
  };

  const canShare = isShared || cookbookVisibility === 'public';
  const shareButton = canShare && (
    <ShareButton sharingConfig={sharingConfig} username={username} />
  );

  return (
    <div className="Cookbook-userProfile">
      <div className="Cookbook-userProfile-avatarContainer">
        <Avatar
          changeable={!isShared}
          className="Cookbook-userProfile-avatar"
          height={106}
          iconClassName="Cookbook-userProfile-avatar-icon"
          url={avatar}
          width={106}
          onClick={isShared ? undefined : onProfileEdit}
        />
      </div>

      <div className="Cookbook-userProfile-info">
        <h1 className="Cookbook-userProfile-info-title">
          {firstName}'s cookbook
        </h1>

        {
          (description || !isShared) &&
            <div className="Cookbook-userProfile-info-description">
              {
                description &&
                  <span className="Cookbook-userProfile-info-text">{description}</span>
              }
              {editLink}
            </div>
        }
      </div>

      <div className="Cookbook-userProfile-meta">
        {shareButton}
      </div>
    </div>
  );
};

ShareButton.propTypes = {
  sharingConfig: PropTypes.object,
  username: PropTypes.string,
};

Profile.propTypes = {
  isShared: PropTypes.bool.isRequired,

  profile: PropTypes.shape({
    avatar: PropTypes.string,
    cookbookVisibility: PropTypes.string,
    description: PropTypes.string,
    firstName: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,

  onProfileEdit: PropTypes.func.isRequired,
};

export default Profile;

// FIXME: FOLLOWS
// import { Link } from 'react-router';
// import FollowButton from 'components/tmp/FollowButton';

// Props:
// isFollowTarget,
// numFollowing,
// numFollowers,

// const followButton = isShared &&
//   <FollowButton
//     className="Cookbook-userProfile-followButton"
//     isFollowing={isFollowTarget || false}
//     username={username}
//   />;

// const followLinks = username &&
//   <div className="Cookbook-userProfile-followList">
//     <div className="Cookbook-userProfile-followList-item">
//       <Link
//         className="Cookbook-userProfile-followList-link"
//         to={{ pathname: `/${username}/following` }}
//       >
//         <div className="Cookbook-userProfile-followList-item-count">{numFollowing | 0}</div>
//         following
//       </Link>
//     </div>
//     <div className="Cookbook-userProfile-followList-dot"></div>
//     <div className="Cookbook-userProfile-followList-item">
//       <Link
//         className="Cookbook-userProfile-followList-link"
//         to={{ pathname: `/${username}/followers` }}
//       >
//         <div className="Cookbook-userProfile-followList-item-count">{numFollowers | 0}</div>
//         followers
//       </Link>
//     </div>
//   </div>;

// <div className="Cookbook-userProfile-meta-item">
//   {followLinks}
// </div>

// <div className="Cookbook-userProfile-meta-item Cookbook-userProfile-meta-item--flex">
//   {followButton}
// </div>

// PropTypes:
// isFollowTarget: PropTypes.bool,
// numFollowing: PropTypes.number,
// numFollowers: PropTypes.number,
