
export default {
  logIn: {
    email: {
      'auth.wrongEmail': 'Invalid email.',
      'auth.shouldBeNonEmpty': 'Invalid email.',
    },
    password: {
      'auth.shouldBeNonEmpty': 'Invalid password.',
    },
  },

  signUp: {
    general: {
      'auth.accountAlreadyExists': 'Email address is already in use. Did you mean to log in?',
    },
    email: {
      'auth.wrongEmail': 'That doesn\'t look like an email address.',
      'auth.shouldBeNonEmpty': 'Email is required.',
    },
    firstName: {
      'auth.shouldBeNonEmpty': 'First name is required.',
    },
    lastName: {
      'auth.shouldBeNonEmpty': 'Last name is required.',
    },
    password: {
      'auth.passwordTooSimple': 'Your password must be at least 4 characters.',
      'auth.shouldBeNonEmpty': 'Password is required',
    },
  },

  recipe: {
    data: {
      ingredients: {
        'recipe.nonEmptyRequired': 'Your recipe should have at least 1 ingredient',
      },
      name: {
        'recipe.nonEmptyRequired': 'You need to give this recipe a title',
      },
    },

    import: {
      internalError: "Sorry we can't import that link",
      'recipe.notFound': "Sorry we can't import that link",
      'recipe.invalidUrl': "That doesn't look like a URL",
    },
  },

  settings: {
    description: {
      'auth.fieldTooLong': 'Please enter no more than 140 characters.',
    },

    firstName: {
      'auth.shouldBeNonEmpty': 'First name is required',
    },

    lastName: {
      'auth.shouldBeNonEmpty': 'Last name is required',
    },
  },

  peapod: {
    zip: {
      'zip.invalid': 'Zip code is invalid',
      'zip.noStores': 'No stores found in that zip code',
    },
  },
};
