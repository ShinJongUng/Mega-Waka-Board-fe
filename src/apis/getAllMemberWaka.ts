import axios from "axios";

const getAllMemberWaka = async () => {
  try {
    const result = await axios.get(
      "http://203.241.228.50:18083/api/user/users"
    );
    return Promise.resolve(result.data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export default getAllMemberWaka;
