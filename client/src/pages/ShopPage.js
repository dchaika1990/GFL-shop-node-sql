import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setProducts, startLoad, endLoad} from '../actions';
import {useHttp} from "../hooks/http.hook";
import {Container, Row} from "reactstrap";
import ProductsComponent from "../components/ProductsComponent";

const ShopPage = () => {
	const dispatch = useDispatch();
	const {request} = useHttp()
	let products = useSelector(state => state.products);
	let fetching = useSelector(state => state.fetching);
	const loading = <p>Loading...</p>;

	useEffect(() => {
		request('/api/product').then(data => {
			dispatch(startLoad())
			dispatch(setProducts(data))
			dispatch(endLoad())
		})
	}, [])


	return (
		<Container>
			<Row>
				<ProductsComponent
					products={products}
					fetching={fetching}
					loading={loading}
				/>
			</Row>
		</Container>
	);
};

export default ShopPage;
