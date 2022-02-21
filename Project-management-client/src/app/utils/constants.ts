export const BASE_URL = 'http://atisit.com:5000/api';

export const REQUEST_TYPE = {
  GET: '1',
  POST: '2',
  PUT: '3',
  DELETE: '4',
};

export const API_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ADD_PROJECT: '/project/add',
  FETCH_PROJECT: '/project/fetch',
  ADD_DEVELOPER: '/user/developer?id=2',
  FETCH_DEVELOPER: '/user?role=2',
  FETCH_MODULES: '/requirements/module?id=',
  ADD_MODULE : '/requirements/module/add',
  FETCH_REQUIREMENTS: '/requirements/module/requirements?id=',
  ADD_REQUIREMENT: '/requirements/project/requirement/add',
  PROJECT_DETAILS  : '/project/details?id=',
  ADD_BUILD : '/project/build',
  ADD_RELEASE : '/project/release',
  FETCH_RELEASE : '/project/release?id=',
  FETCH_BUILD : '/project/build',
  FETCH_USER : '/user/details?id=',
  UPDATE_USER : '/user'
};

export const ALERT_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
};


export const ROLES = {
  ADMIN: '1',
  DEVELOPER: '2',
  TESTER: '3',
  PROJECT_MANAGER: '4',
};
