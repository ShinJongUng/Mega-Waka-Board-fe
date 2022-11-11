import axios from "./../../node_modules/axios/index.d";
const getRandomImage = async (name: string) => {
  try {
    const result = await axios.get(
      `https://avatars.dicebear.com/api/human/${name}.svg`
    );
    if (result === undefined) {
      return;
    }
    return result.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default getRandomImage;
