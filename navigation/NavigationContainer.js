import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import ShopNavigator from './ShopNavigator';
const NavigationContainer = props => {
    const navRef = useRef();
    const token = useSelector(state => state.auth.token);
   
    useEffect(() => {
        if (!token) {
            navRef.current.dispatch(NavigationActions.navigate({routeName : 'Auth'}));
        }
    }, [token]);
    return (
        <ShopNavigator ref={navRef} />
    )
};

export default NavigationContainer;