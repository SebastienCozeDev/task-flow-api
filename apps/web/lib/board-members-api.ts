import { apiFetch, DeletionMessageResponse } from "./api";
import { UserResponse } from "./users-api";

export enum BoardMemberRole {
    READER = 'reader',
    EDITOR = 'editor',
    MAINTAINER = 'maintainer',
    OWNER = 'owner',
}



/**
 * Data for short board member response.
 */
export type ShortBoardMemberResponse = {
    boardId: string;
    userId: string;
    invitedById: string;
    role: string;
}



/**
 * Data for board member response.
 */
export type BoardMemberResponse = {
    invitedBy: UserResponse;
    user: UserResponse;
    role: string;
}



/**
 * Data for invite board member request.
 */
export type InviteBoardMemberRequest = {
    boardId: string;
    email: string;
    role?: BoardMemberRole;
}



/**
 * Data for update board member request.
 */
export type UpdateBoardMemberRequest = {
    boardId: string;
    userId: string;
    role: BoardMemberRole;
}



/**
 * Invite a board member with API.
 * @param data The data used to invite the board member
 * @param token The access token
 * @returns The invited board member
 */
export async function inviteBoardMember(data: InviteBoardMemberRequest, token: string): Promise<ShortBoardMemberResponse | null> {
  return apiFetch<ShortBoardMemberResponse>("/boards/members", {
    method: "GET",
    token,
    body: JSON.stringify(data),
  });
}



/**
 * Update a board member with API.
 * @param data The data used to update the board member
 * @param token The access token
 * @returns The updated board member
 */
export async function updateBoardMember(data: UpdateBoardMemberRequest, token: string): Promise<ShortBoardMemberResponse | null> {
  return apiFetch<ShortBoardMemberResponse>("/boards/members", {
    method: "PATCH",
    token,
    body: JSON.stringify(data),
  });
}



/**
 * Delete a board member with API.
 * @param boardId The ID of the board
 * @param userId The ID of the user
 * @param token The access token
 * @returns The deletion message
 */
export async function deleteBoardMember(boardId: string, userId: string, token: string): Promise<DeletionMessageResponse | null> {
  return apiFetch<DeletionMessageResponse>(`/boards/${boardId}/members/${userId}`, {
    method: "PATCH",
    token,
  });
}
