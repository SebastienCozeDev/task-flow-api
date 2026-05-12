import { apiFetch } from "./api";

/**
 * Data for the login request.
 */
export type LoginRequest = {
  email: string;
  password: string;
}



/**
 * Data for the login response.
 */
export type LoginResponse = {
  access_token: string;
}



/**
 * Data for the register request.
 */
export type RegisterRequest = {
  displayName: string;
  email: string;
  password: string;
}



/**
 * Data for the register response.
 */
export type RegisterResponse = {
  id: string;
  displayName: string;
  email: string,
}



/**
 * Login the current user.
 * @param data The data used to login the current user
 * @returns The login response
 */
export async function login(data: LoginRequest): Promise<LoginResponse | null> {
  return apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}



/**
 * Register the current user.
 * @param data The data used to register the current user
 * @returns The register response
 */
export async function register(data: RegisterRequest): Promise<RegisterResponse | null> {
  return apiFetch<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
