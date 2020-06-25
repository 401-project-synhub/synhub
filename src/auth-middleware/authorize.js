

/**
 * ACL middleware
 * @module authorize
 */

module.exports = (capability) => {
  return (req, res, next) => {
    // console.log(req.user.capabilities);
    try {
      if (req.user.capabilities.capabilities.includes(capability)) {
        next();
      } else {
        next('Access Denied!!');
      }
    } catch (e) {
      next('Invalid Login');
    }
  };
};