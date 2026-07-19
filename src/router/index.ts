import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { PropertyRoute } from "../modules/property/property.route";
import { HotelRoute } from "../modules/hotel/hotel.route";
import { VillaRoute } from "../modules/villa/villa.route";
import { ApartmentRoute } from "../modules/apartment/apartment.route";
import { ResortRoute } from "../modules/resort/resort.route";
import { LocationRoute } from "../modules/location/location.route";
import { BookingRoute } from "../modules/booking/booking.route";
import { SearchRoute } from "../modules/search/search.route";
import { SettingRoute } from "../modules/setting/setting.route";

const router = Router();

const moduleRoute = [
    {
        path: "/user",
        route: UserRoute,
    },
    {
        path: "/property",
        route: PropertyRoute,
    },
    {
        path: "/hotel",
        route: HotelRoute,
    },
    {
        path: "/villa",
        route: VillaRoute,
    },
    {
        path: "/apartment",
        route: ApartmentRoute,
    },
    {
        path: "/resort",
        route: ResortRoute,
    },
    {
        path: "/location",
        route: LocationRoute,
    },
    {
        path: "/booking",
        route: BookingRoute,
    },
    {
        path: "/search",
        route: SearchRoute,
    },
    {
        path: "/setting",
        route: SettingRoute,
    },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
