//style variables for the whole dash

export const screen = {
  xs: '320',
  sm: '500',
  md: '768',
  lg: '1200',
  xl: '1400',
  xxl: '1500',
}

export const fonts = {
  headerFont: 'Open Sans',
  contentFont: 'Roboto',
}

export const darkThemeColors = {
  lightGrey: '#363636',
  grey: '#252525',
  darkGrey: '#212121',
  darkerGrey: '#1d1d1d',
  blue: '#42857D',
  orange: '#FFCDB2',
  black: '#000000',
  purple: '#6D6875',
  lighterPurple: '#B5838D',
  pinkish: '#E5989B',
  peach: '#FFB4A2',
  darkModePanel: '#f29d8a',
  lightOrange: '#ffb9a7',
  darkOrange: '#ce988a',
}

export const darkTheme = {
  style: {
    mainBorder: `0.2rem solid ${darkThemeColors.lightGrey}`,
    smallBorder: `0.1rem solid ${darkThemeColors.lightGrey}`,
    buttonBoxShadow: `.35rem 0.35rem 0px ${darkThemeColors.lightGrey}`,
    buttonDisabledBackground: `${darkThemeColors.lightOrange}`,
    buttonDisabledFontColor: `${darkThemeColors.darkOrange}`,
    buttonFontColor: `${darkThemeColors.black}`,
    panelBackground: `${darkThemeColors.lighterPurple}`,
    panelBoxShadow: `0.35rem 0.2rem 0px ${darkThemeColors.lightGrey}`,
    innerBoxShadow: `0.15rem 0.1rem 0px ${darkThemeColors.lightGrey}`,
    panelTabBackground: `${darkThemeColors.blue}`,
    panelTabBoxShadow: `0.35rem 0.35rem 0px ${darkThemeColors.lightGrey}`,
    panelTabLinkColor: `${darkThemeColors.lightGrey}`,
    wikiTabBackground: `${darkThemeColors.peach}`,
    lightBackground: `${darkThemeColors.peach}`,
    blueBackground: `${darkThemeColors.darkModePanel}`,
    highlight: `${darkThemeColors.orange}`,
    bodyBackground: `${darkThemeColors.purple}`,
    primaryFontColor: '#333',
    secondaryFontColor: `${darkThemeColors.black}`,
    linkColor: `${darkThemeColors.blue}`,
    headerColor: `${darkThemeColors.darkBlue}`,
    alertColor: `${darkThemeColors.blue}`,
    themeSwitchBackground: `${darkThemeColors.blueBackground}`,
    brandTextColor: `${darkThemeColors.peach}`,
    scrollBarColor: `${darkThemeColors.lighterPurple}`,
  },

  table: {
    tableBackground: '#000',
    tableHeadBackground: `${darkThemeColors.grey}`,
    tableItemBoxShadow: `0.35rem 0.35rem 0px ${darkThemeColors.lightGrey}`,
    tableRowBackground: `${darkThemeColors.darkerGrey}`,
  },
}

export const lightThemeColors = {
  offwhite: '#F5F1DE',
  blue: '#ABE4E2',
  darkBlue: '#A2E7DB',
  orange: '#FFCD8D',
  lightOrange: '#dcd4bc',
  darkOrange: '#a29583',
  black: '#000',
}

export const lightTheme = {
  style: {
    mainBorder: `0.2rem solid ${lightThemeColors.black}`,
    smallBorder: `0.1rem solid ${lightThemeColors.black}`,
    buttonBoxShadow: `.35rem 0.35rem 0px ${lightThemeColors.black}`,
    buttonDisabledBackground: `${lightThemeColors.lightOrange}`,
    buttonDisabledFontColor: `${lightThemeColors.darkOrange}`,
    buttonFontColor: `${lightThemeColors.black}`,
    panelBackground: `${lightThemeColors.offwhite}`,
    panelBoxShadow: `0.35rem 0.35rem 0px ${lightThemeColors.black}`,
    panelTabBackground: `${lightThemeColors.darkBlue}`,
    panelTabBoxShadow: `0.35rem 0.35rem 0px ${lightThemeColors.black}`,
    innerBoxShadow: `0.15rem 0.1rem 0px ${darkThemeColors.black}`,
    panelTabLinkColor: `${lightThemeColors.black}`,
    wikiTabBackground: `${lightThemeColors.offwhite}`,
    lightBackground: `${lightThemeColors.offwhite}`,
    blueBackground: `${lightThemeColors.darkBlue}`,
    highlight: `${lightThemeColors.orange}`,
    bodyBackground: `${lightThemeColors.blue}`,
    primaryFontColor: `${lightThemeColors.black}`,
    secondaryFontColor: `${lightThemeColors.black}`,
    linkColor: `${lightThemeColors.black}`,
    headerColor: `${lightThemeColors.black}`,
    alertColor: `${darkThemeColors.blue}`,
    themeSwitchBackground: `${lightThemeColors.orange}`,
    brandTextColor: `${lightThemeColors.black}`,
    scrollBarColor: `${lightThemeColors.blue}`,
  },

  table: {
    tableBackground: `${lightThemeColors.offwhite}`,
    tableHeadBackground: `${lightThemeColors.offwhite}`,
    tableItemBoxShadow: `0.3rem 0.3rem 0px ${lightThemeColors.black}`,
    tableRowBackground: `${lightThemeColors.offwhite}`,
  },
}
