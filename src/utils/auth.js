import {getCookie, setCookie, removeCookie} from '../utils/cookieUtils';
import moment from 'moment';
import jwtDecode from 'jwt-decode';


const AUTH_COOKIE_NAME = 'access_token';

export const getAuthToken = () => getCookie(AUTH_COOKIE_NAME) || null;

export const setAuthToken = (token) => {
    const expires = getFromAccessToken('exp', token);
    setCookie(AUTH_COOKIE_NAME, token, {
        path: '/',
        expires: moment(expires * 1000).toDate(),
        secure: 'production' === process.env.NODE_ENV
    });
    
};

export const clearAuthToken = () => removeCookie({name: AUTH_COOKIE_NAME});

export const isAuthenticated = () => null !== getAuthToken();

export const getUserName = () => getFromAccessToken('name', getAuthToken()) || '';

export const getUserEmail = () => getFromAccessToken('email', getAuthToken()) || '';

export const getUserId = () => getFromAccessToken('id', getAuthToken()) || null;


/**
 * Fetches data from access token
 *
 * @param propertyName
 * @param token
 */
export const getFromAccessToken = (propertyName, token) => {
    if (null === token) {
        return null;
    }
    const decodedToken = jwtDecode(token);
    return decodedToken[propertyName];
};