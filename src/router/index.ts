import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";

const router = Router();

const moduleRoute = [
    {
        path: "/user",
        route: UserRoute,
    },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
