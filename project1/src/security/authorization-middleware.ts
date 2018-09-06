
export function authMiddleware(...roles: string[]) {
  return (req, resp, next) => {
    const user = req.session.user;
    // PUT A ! BACK LIFE THIS WHEN DONE WITh POSTMAN if(!user)
    if (user) {
      resp.sendStatus(401);
      return;
    }
    const hasPermission = roles.some(role => {
      /*if (user.role === role) {
        return true;
      } else {
        //CHANGE THIS BACK WHEN DONE WITH POSTMAN TESTING
        return false;
      }*/ return true;
    })
    if (hasPermission) {
      next();
    } else {
      resp.sendStatus(403);
    }
  }
}