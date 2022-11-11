import axios from "axios";

const getRefreshMember = async () => {
  try {
    const result = await axios.get(
      "http://203.241.228.50:18082/api/waka/update"
    );
    return result.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export default getRefreshMember;
