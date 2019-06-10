import _ from 'lodash';
import cookies from 'next-cookies';
import persist from './persist';

const generateError = (Component, context) => {
  let error = null;
  const { isPublic } = Component;
  const tokenCookies = cookies(context)[persist.ACCESS_TOKEN_KEY];
  const roleCookies = cookies(context)[persist.ACCESS_ROLE_KEY];
  const { query, pathname } = context;
  let token = {};
  if (tokenCookies) {
    token = JSON.parse(tokenCookies);
  }
  if (!isPublic && _.isEqual(token, {})) {
    error = {
      statusCode: 401
    };
  }
  if (
    roleCookies === 'Collaborator' &&
    query.settingType === 'share' &&
    pathname === '/setting'
  ) {
    error = {
      statusCode: 403
    };
  }
  return error;
};

export default generateError;
