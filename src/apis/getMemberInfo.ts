import axios from "axios";

const getMemberInfo = async (day, id: string) => {
  try {
    const result = await axios.get(
      `http://203.241.228.50:18083/api/user/user?day=${day}&id=${id}`
    );
    return Promise.resolve(result.data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export default getMemberInfo;