export const checkRouteValidation = (pathname) => {
  if (pathname.startsWith('/documents') === false) {
    return false;
  }

  return true;
};
