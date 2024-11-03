import axios from "axios";

import { getAccessToken } from "../../auth/utils/AccessTokenUtils";
import {
  getChoreWeekPath,
  getChoreWeekDetailsPath,
  incrementChoreStatsPath,
  addChoreToWeekPath,
  deleteChoreFromWeekPath,
} from "../../../common/constants/ApiPaths";
import { formatDate } from "../../../common/utils/DateUtil";

const ChoreService = {
  getChoreWeek: async (date) => {
    const parsedChoreWeekDate = formatDate(new Date(date));

    try {
      const response = await axios.get(getChoreWeekPath(parsedChoreWeekDate), {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  getChoreWeekDetails: async (weekId) => {
    try {
      const response = await axios.get(getChoreWeekDetailsPath(weekId), {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  incrementChoreStats: async (weekId, choreId, value) => {
    try {
      const response = await axios.post(
        incrementChoreStatsPath(weekId, choreId, value),
        null,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );

      return response.status === 204;
    } catch (error) {
      console.error(error);
    }
  },

  addChoreToWeek: async (weekId, name) => {
    try {
      const response = await axios.post(
        addChoreToWeekPath,
        { weekId, name },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );

      return response.status === 200;
    } catch (error) {
      console.error(error);
    }
  },

  deleteChoreFromWeek: async (weekId, choreId) => {
    try {
      const response = await axios.delete(
        deleteChoreFromWeekPath(weekId, choreId),
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );

      return response.status === 204;
    } catch (error) {
      console.error(error);
    }
  },
};

export default ChoreService;
