const breakpoints = {
  small: "650px",
  medium: "768px",
  large: "1024px",
  xlarge: "1300px",
};

export const devices = {
  sm: `(min-width: ${breakpoints.small})`,
  md: `(min-width: ${breakpoints.medium})`,
  lg: `(min-width: ${breakpoints.large})`,
  xlg: `(min-width: ${breakpoints.xlarge})`,
};
