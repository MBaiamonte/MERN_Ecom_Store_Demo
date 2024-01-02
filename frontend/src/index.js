import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import {PayPalScriptProvider} from '@paypal/react-paypal-js';
import { Provider } from 'react-redux';
import store from './store';
// import 'bootstrap/dist/css/bootstrap.min.css'; //default bootstrap file
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './views/HomeScreen';
import ProductScreen from './views/ProductScreen';
import CartScreen from './views/CartScreen';
import LoginScreen from './views/LoginScreen';
import RegisterScreen from './views/RegisterScreen';
import ShippingScreen from './views/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import PaymentScreen from './views/PaymentScreen';
import PlaceOrderScreen from './views/PlaceOrderScreen';
import OrderScreen from './views/OrderScreen';
import ProfileScreen from './views/ProfileScreen';
import OrderListScreen from './views/admin/OrderListScreen';
import ProductListScreen from './views/admin/ProductListScreen';
import ProductEditScreen from './views/admin/ProductEditScreen';

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route  index={true} path='/' element={<HomeScreen/>}/>
      <Route   path='/product/:id' element={<ProductScreen/>}/>
      <Route   path='/cart' element={<CartScreen/>}/>
      <Route   path='/login' element={<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>
      
      {/* all private user routes are below. everything above is public route. */}
      <Route path='' element={<PrivateRoute/>}> 
        <Route path='/shipping' element={<ShippingScreen/>}/>
        <Route path='/payment' element={<PaymentScreen/>}/>
        <Route path='/placeorder' element={<PlaceOrderScreen/>}/>
        <Route path='/order/:id' element={<OrderScreen/>}/>
        <Route path='/profile' element={<ProfileScreen/>}/>
      </Route>

      {/* all admin routes are below.*/}
      <Route path='' element={<AdminRoute/>}> 
        <Route path='/admin/orderList' element={<OrderListScreen/>}/>
        <Route path='/admin/productList' element={<ProductListScreen/>}/>
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}/>
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router}/>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
