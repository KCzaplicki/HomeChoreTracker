import apiClient from "../../../common/configs/axiosConfig";

import {
  getChoreWeekPath,
  getChoreWeekDetailsPath,
  incrementChoreStatsPath,
  addChoreToWeekPath,
  deleteChoreFromWeekPath,
} from "../../../common/constants/apiPaths";
import { formatDate } from "../../../common/utils/dateUtils";

const ChoreService = {
  getChoreWeek: async (date) => {
    const parsedChoreWeekDate = formatDate(new Date(date));

    try {
      const response = await apiClient.get(
        getChoreWeekPath(parsedChoreWeekDate)
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  getChoreWeekDetails: async (weekId) => {
    try {
      const response = await apiClient.get(getChoreWeekDetailsPath(weekId));

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  incrementChoreStats: async (weekId, choreId, value) => {
    try {
      const response = await apiClient.post(
        incrementChoreStatsPath(weekId, choreId, value)
      );

      return response.status === 204;
    } catch (error) {
      console.error(error);
    }
  },

  addChoreToWeek: async (weekId, name) => {
    try {
      const response = await apiClient.post(addChoreToWeekPath, {
        weekId,
        name,
      });

      return response.status === 200;
    } catch (error) {
      console.error(error);
    }
  },

  deleteChoreFromWeek: async (weekId, choreId) => {
    try {
      const response = await apiClient.delete(
        deleteChoreFromWeekPath(weekId, choreId)
      );

      return response.status === 204;
    } catch (error) {
      console.error(error);
    }
  },
};

export default ChoreService;
