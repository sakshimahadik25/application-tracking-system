import fetch from './handler';

export const getToken = (params) => {
    // console.log(params)
  return fetch({
    method: 'POST',
    url: '/users/login',
    body: params,
  })
};

export const signUp = (params) => {
  return fetch({
    method: 'POST',
    url: '/users/signup',
    body: params
  })
}
