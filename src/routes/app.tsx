import DeleteUserPage from "@/pages/DeleteUserPage";
import HomePage from "@/pages/HomePage";
import RegisterPage from "@/pages/RegisterPage";
import UpdateNamePage from "@/pages/UpdateNamePage";
import UpdatePasswordPage from "@/pages/UpdatePasswordPage";
import UpdateUserNamePage  from "@/pages/UpdateUserNamePage";
import Userpage from "@/pages/UserPage";


const appRouter = [
    {
        path: "/",
        element: <HomePage/>,
    },
    {
        path: "/user",
        element :<Userpage/>,
    },
    {
        path: "/update-name/:userId",
        element: <UpdateNamePage />,
    },
    {
        path: "/update-username/:userId",
        element: <UpdateUserNamePage />,
    },
    {
        path: "/update-password/:userId",
        element: <UpdatePasswordPage/>,
    },
    {
        path: "/register",
        element: <RegisterPage/>,
    },
    {
        path: "/delete-account/:userId",
        element: <DeleteUserPage/>,
    }
];

export default appRouter;
