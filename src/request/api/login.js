import { post,get } from '../http'

export function login(params) {
  return post("/login", params);
}

export function register(params) {
  return post("/register", params);
}