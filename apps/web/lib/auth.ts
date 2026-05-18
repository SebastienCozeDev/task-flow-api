import { login, LoginRequest, register, RegisterRequest } from "./api/auth-api";
import { removeAccessToken, saveAccessToken } from "./auth-storage";



/**
 * Login the current user.
 * @param data The data used to login
 * @returns true or false
 */
export async function loginUser(data: LoginRequest): Promise<boolean> {
    const response = await login(data);

    if (!response?.access_token) {
        removeAccessToken();
        return false;
    }

    saveAccessToken(response.access_token);
    return true;
}



/**
 * Register and login the current user.
 * @param data The data used to register
 * @returns true or false
 */
export async function registerUser(data: RegisterRequest): Promise<boolean> {
    const response = await register(data);
    
    if (!response?.displayName) {
        removeAccessToken();
        return false
    }

    return loginUser({ email: data.email, password: data.password });
}



/**
 * Logout the current user.
 */
export function logoutUser(): void {
    removeAccessToken();
}
