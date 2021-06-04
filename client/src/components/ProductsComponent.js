import React from 'react';
import ProductComponent from "./ProductComponent";

const ProductsComponent = ({products, fetching, loading}) => {
	return (
		<>
			{fetching ? (
				loading
			) : (
				<>
					{products.map((product) => {
						return (
							<ProductComponent
								key={product.id_product}
								product={product}
							/>
						)
					})}
				</>
			)}
		</>
	);
};

export default ProductsComponent;
