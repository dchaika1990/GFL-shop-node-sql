const defaultState = {
	fetching: true,
	products: null,
	product: null
}

const reducer = (state = defaultState, action) => {
	switch (action.type) {
		case "SET_PRODUCTS":
			return {...state, products: state.products = action.payload}
		case 'FETCH_TODOS_START':
			return {...state, fetching: true};
		case 'FETCH_TODOS_END':
			return {...state, fetching: false};
		default:
			return state
	}
}

export default reducer;
