import React, { useState } from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import NavigationContainer from './navigation/NavigationContainer';

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: orderReducer,
    auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchEvents = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    const handleFontLoaded = () => {
        setFontLoaded(true);
    }

    if (!fontLoaded) {
        return <AppLoading startAsync={fetchEvents} onFinish={handleFontLoaded} />
    }

    return (
        <Provider store={store}>
            <NavigationContainer />
        </Provider>
    );
}
