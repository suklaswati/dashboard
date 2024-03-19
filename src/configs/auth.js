export default {
  baseUrl: 'https://habitus-admin-api.applore.in/api/v1',
  meEndpoint: '/auth/me',

  // loginEndpoint: '/jwt/login',
  loginEndpoint: '/auth/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
