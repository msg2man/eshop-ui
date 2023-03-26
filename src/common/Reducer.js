import { combineReducers } from "@reduxjs/toolkit";

const initialState={
    user: {},
    productPage: {
        allProductsList: [],
        search: ''
    }
};

const UserReducer = (state = initialState.user, action) => {
    switch(action.type) {
        case 'login':
            sessionStorage.setItem('currentUser', JSON.stringify(action.payload));
            return action.payload;
        case 'logout':
            sessionStorage.removeItem('currentUser');
            return {};
        default:
            return state;
    }
}

const productPageReducer = (state = initialState.productPage, action) => {
    switch(action.type) {
        case 'getAllProducts':
            return {...state, allProductsList: [...action.payload]};
        case 'setSearch':
            return {...state, search: action.payload};
        case 'setCategory':
            return {...state, category: action.payload};
        default:
            return state;
    }
}

const AppReducer = combineReducers({
    user: UserReducer,
    productPage: productPageReducer
  });
    
export default AppReducer;
