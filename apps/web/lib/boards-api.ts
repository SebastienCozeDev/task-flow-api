import { apiFetch } from "./api";

/**
 * Data for the user response.
 */
export type UserResponse = {
    id: string;
    displayName: string;
    email: string;
}



/**
 * Data for the board response.
 */
export type BoardResponse = {
    id: string;
    title: string;
    description: string;
    owner: UserResponse;
    members: UserResponse[];
}



/**
 * Data for create board request.
 */
export type CreateBoardRequest = {
    title: string;
    description?: string;
}



/**
 * Get boards from API.
 * @param token The access token
 * @returns The boards
 */
export async function getBoards(token: string): Promise<BoardResponse[] | null> {
    return apiFetch<BoardResponse[]>("/boards", {
        method: "GET",
        token,
    });
}



/**
 * Create a board with API
 * @param data The data used to create the board
 * @param token The access token
 * @returns The new board
 */
export async function createBoard(data: CreateBoardRequest, token: string): Promise<BoardResponse | null> {
    return apiFetch<BoardResponse>("/boards", {
        method: "POST",
        token,
        body: JSON.stringify(data),
    });
}