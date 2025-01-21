
import { getUser } from "../service/auth.js";

async function restrictToLoggedInUserOnly(req, res, next) {
    const userSessionId = req.cookies.session_id
    if (!userSessionId) {
        return res.redirect("/login");
    }
    const user = getUser(userSessionId); 
    if (!user) {
        return res.redirect("/login");
    }
    req.user = user;
    next();
}
export default restrictToLoggedInUserOnly;