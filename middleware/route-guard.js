

const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/dashboard/:username');
    // TODO get the username dynamically current route is /:dashboard need it to be /Austin for example
  }
  next();
};

const isLoggedOut = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/");
  }
  next();
};

module.exports = {
  isLoggedIn,
};
