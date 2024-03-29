import axios from "axios";

const getAllMemberWaka = async () => {
  try {
    const result = await axios.get(
      "https://wakaserver.megabrain.kr:32443/api/user/users"
    );
    return Promise.resolve(result.data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export default getAllMemberWaka;
