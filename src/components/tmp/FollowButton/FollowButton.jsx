
import React, { PropTypes } from 'react';

import classnames from 'classnames';

const FollowButton = ({
  className, isFollowing, isHidden,
  onFollow, onUnfollow,
}) => {
  if (isHidden) { return null; }

  return isFollowing
    ? (
      <div
        onClick={onUnfollow}
        className={classnames('is-following', className)}
      >
        Following
      </div>
    ) : (
      <div
        onClick={onFollow}
        className={classnames(className)}
      >
        Follow
      </div>
    );
};

FollowButton.propTypes = {
  className: PropTypes.string,
  isFollowing: PropTypes.bool.isRequired,
  isHidden: PropTypes.bool.isRequired,

  onFollow: PropTypes.func.isRequired,
  onUnfollow: PropTypes.func.isRequired,
};

export default FollowButton;
