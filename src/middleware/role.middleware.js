export function roleMiddleware(allowedRoles) {
  return async function (req, res, next) {
    try {
      const user = req.user; // Assuming the authenticated user is stored in the `req.user` property

      // Check if the user has any of the allowed roles
      const hasRole = allowedRoles.filter((role) => user.roles.includes(role));
      if (!hasRole) {
        return res.status(403).send("Access denied");
      }

      next();
    } catch (error) {
      console.error("Error checking user roles:", error);
      return res.status(500).send("Internal server error");
    }
  };
}
