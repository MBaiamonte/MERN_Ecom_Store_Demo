// export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';  //checking for if its in production or not // use if you dont have a proxy set up (We do look in package.json to see.)
export const BASE_URL = '';
export const PRODUCTS_URL = '/api/products'
export const USERS_URL = '/api/users'
export const ORDERS_URL = '/api/orders'
export const PAYPAL_URL = '/api/config/paypal'