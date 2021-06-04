import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTER} from "../utils/consts";

const AppRouter = () => {
	const isAuth = false;
	return (
		<Switch>
			{isAuth === true && authRoutes.map(({path, Component}) =>
				<Route key={path} path={path} component={Component} exact/>
			)}
			{publicRoutes.map(({path, Component}) =>
				<Route key={path} path={path} component={Component} exact/>
			)}
			<Redirect to={SHOP_ROUTER}/>
		</Switch>
	);
};

export default AppRouter;
