interface ThemeColors {
  primary?: {
    darker?: string;
    dark?: string;
    base?: string;
    lighter?: string;
    lightest?: string;
  };
  eventStandard?: string;
  eventPremium?: string;
  eventVip?: string;
  themeColor?: string;
  themeTextColor?: string;
  secondaryColor?: string;
  secondaryTextColor?: string;
}

export const updateThemeColors = (colors: ThemeColors) => {
  const root = document.documentElement;

  // Update primary colors
  if (colors.primary) {
    if (colors.primary.darker) root.style.setProperty('--color-primary-darker', colors.primary.darker);
    if (colors.primary.dark) root.style.setProperty('--color-primary-dark', colors.primary.dark);
    if (colors.primary.base) {
      root.style.setProperty('--color-primary-base', colors.primary.base);
      // Set theme color to match primary base if not explicitly set
      if (!colors.themeColor) {
        root.style.setProperty('--color-theme', colors.primary.base);
      }
    }
    if (colors.primary.lighter) root.style.setProperty('--color-primary-lighter', colors.primary.lighter);
    if (colors.primary.lightest) root.style.setProperty('--color-primary-lightest', colors.primary.lightest);
  }

  // Update event type colors
  if (colors.eventStandard) root.style.setProperty('--color-event-standard', colors.eventStandard);
  if (colors.eventPremium) root.style.setProperty('--color-event-premium', colors.eventPremium);
  if (colors.eventVip) root.style.setProperty('--color-event-vip', colors.eventVip);

  // Update theme colors
  if (colors.themeColor) root.style.setProperty('--color-theme', colors.themeColor);
  if (colors.themeTextColor) root.style.setProperty('--color-theme-text', colors.themeTextColor);
  if (colors.secondaryColor) root.style.setProperty('--color-secondary', colors.secondaryColor);
  if (colors.secondaryTextColor) root.style.setProperty('--color-secondary-text', colors.secondaryTextColor);
}; 