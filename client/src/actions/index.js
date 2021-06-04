export const setProducts = products => {
	return {
		type: 'SET_PRODUCTS',
		payload: products,
	};
};

export const startLoad = () => ({
	type: 'FETCH_TODOS_START',
});

export const endLoad = () => ({
	type: 'FETCH_TODOS_END',
});
