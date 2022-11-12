import axios from "axios";

const getRefreshMember = async (day = 7) => {
  try {
    const result = await axios.post(
      `http://203.241.228.50:18082/api/waka/update?range=${
        day === 7 ? "last_7_days" : day === 14 ? "last_14_days" : "last_30_days"
      }`
    );
    return result.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export default getRefreshMember;
