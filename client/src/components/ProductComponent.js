import React from 'react';
import {Card, CardBody, CardText, CardTitle, Col} from "reactstrap";

const ProductComponent = ({product}) => {
	return (
		<Col lg={4}>
			<Card>
				<img src={'/' + product.image_name.split(',')[0]} alt=""/>
				<CardBody>
					<CardTitle>
						<a href={'/product/' + product.id_product}>{product.product_name}</a>
					</CardTitle>
					<CardText>{product.product_description}</CardText>
					<hr/>
					<p>Price: {product.product_price}$</p>
				</CardBody>
			</Card>
		</Col>
	);
};

export default ProductComponent;
