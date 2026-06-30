import {configureStore} from '@reduxjs/toolkit';
import arithmetics from './Slices/ArithmeticSlice.js';
export default configureStore({
    reducer:{
        arithmeticFunc : arithmetics
    }
});