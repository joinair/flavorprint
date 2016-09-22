
export const PRINT_LIST_EXTRA_LINES_SHOW = 'PRINT_LIST_EXTRA_LINES_SHOW';
export const PRINT_LIST_EXTRA_LINES_HIDE = 'PRINT_LIST_EXTRA_LINES_HIDE';

export const PRINT_LIST_FONT_SIZE_SMALL = 'PRINT_LIST_FONT_SIZE_SMALL';
export const PRINT_LIST_FONT_SIZE_LARGE = 'PRINT_LIST_FONT_SIZE_LARGE';

export const PRINT_LIST_KEY_SHOW = 'PRINT_LIST_KEY_SHOW';
export const PRINT_LIST_KEY_HIDE = 'PRINT_LIST_KEY_HIDE';


// Extra Lines
export const showExtraLines = () => ({
  type: PRINT_LIST_EXTRA_LINES_SHOW,
});

export const hideExtraLines = () => ({
  type: PRINT_LIST_EXTRA_LINES_HIDE,
});


// Font Size toggle
export const fontSizeSmall = () => ({
  type: PRINT_LIST_FONT_SIZE_SMALL,
});

export const fontSizeLarge = () => ({
  type: PRINT_LIST_FONT_SIZE_LARGE,
});


// Recipe Key toggle
export const showKey = () => ({
  type: PRINT_LIST_KEY_SHOW,
});

export const hideKey = () => ({
  type: PRINT_LIST_KEY_HIDE,
});

export default {
  showExtraLines,
  hideExtraLines,

  fontSizeSmall,
  fontSizeLarge,

  showKey,
  hideKey,
};
