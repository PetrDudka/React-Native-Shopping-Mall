import React, { useState } from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { composeWithDevTools } from 'redux-devtools-extension';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/orders';
import ShopNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: orderReducer
});

const store = createStore(rootReducer, composeWithDevTools());

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
            <ShopNavigator />
        </Provider>
    );
}
