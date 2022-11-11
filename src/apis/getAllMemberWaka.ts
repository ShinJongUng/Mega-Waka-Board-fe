import axios from "axios";

const getAllMemberWaka = async () => {
  try {
    const result = await axios.get("http://203.241.228.50:18082/api/waka/rank");
    return result.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export default getAllMemberWaka;
