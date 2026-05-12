import { apiFetch, DeletionMessageResponse } from "./api";
import { BoardMemberResponse } from "./board-members-api";
import { UserResponse } from "./users-api";


/**
 * Data for the board response.
 */
export type BoardResponse = {
  id: string;
  title: string;
  description: string;
  owner: UserResponse;
  members: BoardMemberResponse[];
}



/**
 * Data for create board request.
 */
export type CreateBoardRequest = {
  title: string;
  description?: string;
}



/**
 * Data for update board request.
 */
export type UpdateBoardRequest = {
  id: string;
  title?: string;
  description?: string;
  password: string;
}



/**
 * Data for delete board request.
 */
export type DeleteBoardRequest = {
  id: string;
  password: string;
  permanently?: boolean;
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
 * Create a board with API.
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




/**
 * Update a board with API.
 * @param data The data used to update the board
 * @param token The access token
 * @returns The updated board
 */
export async function updateBoard(data: UpdateBoardRequest, token: string): Promise<BoardResponse | null> {
  return apiFetch<BoardResponse>("/boards", {
    method: "PATCH",
    token,
    body: JSON.stringify(data),
  });
}



/**
 * Delete a board with API.
 * @param data The data used to delete the board
 * @param token The access token
 * @returns The deletion message
 */
export async function deleteBoard(data: DeleteBoardRequest, token: string): Promise<DeletionMessageResponse | null> {
    return apiFetch<DeletionMessageResponse>("/boards", {
        method: "DELETE",
        token,
        body: JSON.stringify(data),
    });
}
