import axios from "axios";
import { PersonData } from "../components/SettingBoard";

const postAddMember = async (personData: PersonData) => {
  try {
    const result = await axios.post(
      `http://203.241.228.50:18083/api/user/add-user`,
      {},
      {
        params: {
          username: personData.userName,
          apikey: btoa(personData.apiKey),
          organization: personData.organization,
        },
      }
    );
    return Promise.resolve(result.data);
  } catch (error: any) {
    console.log(error);
    return Promise.resolve(error.response.data);
  }
};

export default postAddMember;
