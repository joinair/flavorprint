/* eslint react/prefer-stateless-function: 0 */

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import classnames from 'classnames';
import map from 'lodash/map';

import Avatar from 'components/ui-elements/Avatar';
import FollowButton from 'components/tmp/FollowButton';

import { USER_FOLLOWERS, USER_FOLLOWING } from 'actions/follows';

const User = ({
  avatar,
  description,
  firstName,
  lastName,
  username,

  isFollowTarget,
}) => (
  <div className="item">
    <Avatar
      className="Follows-avatar ui avatar image"
      height={48}
      iconClassName="Follows-avatar-icon"
      url={avatar}
      width={48}
    />

   <div className="content">
     <Link className="header" to={{ pathname: `/${username}` }}>
       {firstName} {lastName}
     </Link>

     <div className="description">
       {description}
       <br />
       <FollowButton
         isFollowing={isFollowTarget}
         username={username}
       />
     </div>
   </div>
 </div>
);

class Follows extends Component {
  render() {
    const {
      category, follows,
      haveMore, isFetching, onLoadMore,
      numFollowers, numFollowing,
      pathnameBase,
    } = this.props;

    const loadMoreButton = haveMore &&
      <div
        className={
          classnames('ui fluid large basic button', { disabled: isFetching })
        }
        onClick={onLoadMore}
      >
        Show more
      </div>;

    const usersEls = map(follows, user =>
      <User {...user} key={user.username} />
    );

    return (
      <div className="ui container">
        <div className="ui vertical segment">
          <div className="ui secondary menu">
            <Link
              to={{ pathname: `${pathnameBase}/following` }}
              className={
                classnames('item', { active: category === USER_FOLLOWING })
              }
            >
              Following
              <div className="ui label">{numFollowing}</div>
            </Link>

            <Link
              to={{ pathname: `${pathnameBase}/followers` }}
              className={
                classnames('item', { active: category === USER_FOLLOWERS })
              }
            >
              Followers
              <div className="ui label">{numFollowers}</div>
            </Link>
          </div>
        </div>

        <div className="ui basic segment">
          <div className="ui massive divided list">
            {usersEls}
          </div>
        </div>

        <div className="ui basic center aligned segment">
          <div className="ui container">
            {loadMoreButton}
          </div>
        </div>
      </div>
    );
  }
}

User.propTypes = {
  avatar: PropTypes.string,
  description: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  username: PropTypes.string.isRequired,

  isFollowTarget: PropTypes.bool,
};

Follows.propTypes = {
  category: PropTypes.string.isRequired,
  follows: PropTypes.arrayOf(PropTypes.shape({
    avatar: PropTypes.string,
    description: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string.isRequired,

    isFollowTarget: PropTypes.bool,
  })).isRequired,
  haveMore: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  numFollowers: PropTypes.number.isRequired,
  numFollowing: PropTypes.number.isRequired,
  pathnameBase: PropTypes.string.isRequired,

  onLoadMore: PropTypes.func.isRequired,
};

export default Follows;
