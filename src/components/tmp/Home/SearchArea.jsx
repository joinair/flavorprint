
import React from 'react';

import RecipeSearchField from 'components/tmp/RecipeSearchField';

const styles = {
  header: {
    fontSize: '3em',
    marginTop: '1em',
    fontWeight: 'normal',
  },
};

const SearchArea = () =>
  <div className="ui text container">
    <h1 className="ui inverted header" style={styles.header}>
      Personalize your dishes
    </h1>
    <RecipeSearchField placeholder="Search recipes..." />
  </div>;

export default SearchArea;
