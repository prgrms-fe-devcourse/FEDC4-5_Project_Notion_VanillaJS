const Pathname = {
  isRoot: (pathname) => pathname === '/',
  isDocument: (pathname) => /\/documents\/\d/.test(pathname),
};

export default Pathname;
