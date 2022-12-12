import axios from "axios";

const getRefreshMember = async (day = 7) => {
  try {
    const result = await axios.post(
      `https://wakaserver.megabrain.kr/api/user/update?updateDay=${day}`,
      {
        headers: {
          "Content-Type": "	application/json",
        },
      }
    );
    return Promise.resolve(result.data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export default getRefreshMember;
