import Cookies from 'cookie-universal';
import moment from 'moment/moment';

const cookies = new Cookies();

/**
 * Keeps the cookies values inside of one request
 */
const cookieValues = {};

/**
 * Fetches value from cookie. Looks in cookieValues first
 *
 * @param name
 *
 * @returns {*}
 */
export const getCookie = name => cookieValues[name] || cookies.get(name);

/**
 * Sets cookies
 *
 * @param name
 * @param value
 * @param options
 */
export const setCookie = (name, value, options = {}) => {
    cookies.set(name, value, getOptions(options));

    cookieValues[name] = value;

    return true;
};

/**
 * Removes a cookie
 *
 * @param name
 * @param options
 */
export const removeCookie = ({name}, options = {}) => {
    cookies.remove(name, getOptions(options));

    delete cookieValues[name];

    return true;
};

export const getExpiresDate = (value, unit = 'days') => moment().add(value, unit).toDate();


const defaultOptions = {
    path: '/',
    expires: getExpiresDate(30, 'days'),
    secure: 'production' === process.env.NODE_ENV
};
const getOptions = options => ({
    ...defaultOptions,
    ...options
});
