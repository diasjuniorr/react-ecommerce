import { UserState } from "./user.types";

export const userSelector = (state: UserState) => state.user;
