import { login, LoginRequest } from "./api/auth-api";
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
 * Logout the current user.
 */
export function logoutUser(): void {
    removeAccessToken();
}
