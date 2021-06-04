import {BASKET_ROUTER, LOGIN_ROUTER, PRODUCT_ROUTER, REGISTRATION_ROUTER, SHOP_ROUTER} from "./utils/consts";
import BasketPage from "./pages/BasketPage";
import ShopPage from "./pages/ShopPage";
import AuthPage from "./pages/AuthPage";
import ProductPage from "./pages/ProductPage";

export const authRoutes = [
	{
		path: BASKET_ROUTER,
		Component: BasketPage
	}
]
export const publicRoutes = [
	{
		path: SHOP_ROUTER,
		Component: ShopPage
	},
	{
		path: PRODUCT_ROUTER + '/:id',
		Component: ProductPage
	},
	{
		path: REGISTRATION_ROUTER,
		Component: AuthPage
	},
	{
		path: LOGIN_ROUTER,
		Component: AuthPage
	},
]
