import axios, { AxiosError } from "axios";
import { PersonData } from "../components/SettingBoard";

const postAddMember = async (personData: PersonData): Promise<any> => {
  try {
    const { data } = await axios.post(
      `http://203.241.228.50:18082/api/member/add
    `,
      personData
    );
    return data;
  } catch (error: any) {
    const { response } = error as unknown as AxiosError;

    return Promise.reject(response.data);
  }
};

export default postAddMember;
