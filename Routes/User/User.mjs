import express from 'express';
import { DeleteUser, ForgotPassword, GetAllUser, GetSingleUser, GetUserDetail, Login, Logout, RegisterUser, ResetPassword, UpdatePassword, UpdateProfile, UpdateUserRole } from '../../Controller/UserController.mjs';
import { AuthenticatedUserRole, checkToken } from '../../middleware/Auth/auth.mjs';
const UserRoute = express.Router()


UserRoute.route("/register").post(RegisterUser)

UserRoute.route("/login").post(Login)

UserRoute.route("/logout").get(Logout)

UserRoute.route("/resetPassword").post(ForgotPassword)

UserRoute.route("/resetPassword/:token").put(ResetPassword)

UserRoute.route("/userDetails").get(checkToken, GetUserDetail)

UserRoute.route("/UpdatePassword").put(checkToken, UpdatePassword)

UserRoute.route("/GetAllUser").get(checkToken, AuthenticatedUserRole("Admin"), GetAllUser)

UserRoute.route("/GetSingleUser/:id").get(checkToken, AuthenticatedUserRole("Admin"), GetSingleUser)

UserRoute.route("/DeleteUser/:id").delete(checkToken, AuthenticatedUserRole("Admin"), DeleteUser)

UserRoute.route("/UpdateUserProfile").put(checkToken, UpdateProfile)

UserRoute.route("/UpdateUserRole/:id").put(checkToken, AuthenticatedUserRole("Admin"), UpdateUserRole)



export default UserRoute