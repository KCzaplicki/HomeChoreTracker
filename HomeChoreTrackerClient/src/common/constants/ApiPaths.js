export const apiUrl = process.env.REACT_APP_API_URL;

export const loginPath = "auth/login";
export const getCurrentUserPath = "auth/current-user";
export const changePasswordPath = "auth/change-password";

export const getChoreWeekPath = (date) => `chores/week/${date}`;
export const getChoreWeekDetailsPath = (weekId) =>
  `chores/week/${weekId}/details`;

export const incrementChoreStatsPath = (weekId, choreId, value) =>
  `chores/week/${weekId}/chore/${choreId}?inc=${value}`;
export const addChoreToWeekPath = "chores";
export const deleteChoreFromWeekPath = (weekId, choreId) =>
  `chores/week/${weekId}/chore/${choreId}`;
