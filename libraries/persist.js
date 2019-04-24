import cookies from 'js-cookie';

export default class persist {
  static get ACCESS_TOKEN_KEY() {
    return 'accessToken';
  }

  static async willGetAccessToken() {
    const token = await cookies.get(persist.ACCESS_TOKEN_KEY);
    return token;
  }

  static async willSetAccessToken(value) {
    const status = await cookies.set(persist.ACCESS_TOKEN_KEY, value, {
      expires: 4
    });
    return status;
  }

  static async willRemoveAccessToken() {
    const status = await cookies.remove(persist.ACCESS_TOKEN_KEY);
    return status;
  }
}
