export const apiUrl = process.env.REACT_APP_API_URL;

export const loginPath = `${apiUrl}/auth/login`;
export const getCurrentUserPath = `${apiUrl}/auth/current-user`;
export const changePasswordPath = `${apiUrl}/auth/change-password`;

export const getChoreWeekPath = (date) => `${apiUrl}/chores/week/${date}`;
export const getChoreWeekDetailsPath = (weekId) =>
  `${apiUrl}/chores/week/${weekId}/details`;

export const incrementChoreStatsPath = (weekId, choreId, value) =>
  `${apiUrl}/chores/week/${weekId}/chore/${choreId}?inc=${value}`;
export const addChoreToWeekPath = `${apiUrl}/chores`;
export const deleteChoreFromWeekPath = (weekId, choreId) =>
  `${apiUrl}/chores/week/${weekId}/chore/${choreId}`;
