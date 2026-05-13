import { getAPIEntities, updateAPIEntity } from "./api";
import { RegisterRequest } from "./auth-api";

/**
 * Data for the user response.
 */
export type UserResponse = {
  id: string;
  displayName: string;
  email: string;
}



/**
 * Get the current user from API.
 * @param token The access token
 * @returns The current user
 */
export async function getCurrentUser(token: string): Promise<UserResponse | null> {
  return getAPIEntities<UserResponse>("/users/me", token);
}



/**
 * Update the current user from API.
 * @param token The access token
 * @returns The updated current user
 */
export async function updateCurrentUser(data: RegisterRequest, token: string): Promise<UserResponse | null> {
  return updateAPIEntity<UserResponse>("/users/me", data, token);
}