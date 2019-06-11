import cookies from 'js-cookie';

export default class persist {
  static get ACCESS_TOKEN_KEY() {
    return 'accessToken';
  }

  static get ACCESS_ROLE_KEY() {
    return 'role';
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

  static async willGetProjectRole() {
    const projectRole = await cookies.get(persist.ACCESS_ROLE_KEY);
    return projectRole;
  }

  static async willSetProjectRole(value) {
    const status = await cookies.set(persist.ACCESS_ROLE_KEY, value, {
      expires: 4
    });
    return status;
  }

  static async willRemoveProjectRole() {
    const status = await cookies.remove(persist.ACCESS_ROLE_KEY);
    return status;
  }
}
