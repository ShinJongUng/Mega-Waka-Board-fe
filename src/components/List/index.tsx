import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import GoldMedal from "../../images/goldmedal.png";
import SilverMedal from "../../images/silvermedal.png";
import BronzeMedal from "../../images/bronzemedal.png";

type dto = {
  username: string;
  last_7_days: string;
  last_14_days: string;
  last_30_days: string;
};

type Props = {
  day: number;
  isLoading: boolean;
  data: any;
};

const LeaderBoardList = ({ day, isLoading, data }: Props) => {
  const dayReplaceFunc = (sortData) => {
    if (day === 7) {
      return sortData.last_7_days
        .replace("H", ":")
        .replace("M", "")
        .replace(" ", "");
    } else if (day === 14) {
      return sortData.last_14_days
        .replace("H", ":")
        .replace("M", "")
        .replace(" ", "");
    } else {
      return sortData.last_30_days
        .replace("H", ":")
        .replace("M", "")
        .replace(" ", "");
    }
  };

  const knowDaysValue = (data) => {
    return data.sort((a: dto, b: dto) => {
      const sortA = dayReplaceFunc(a);
      const sortB = dayReplaceFunc(b);

      if (sortA.indexOf(":") === -1) return 1;
      if (sortB.indexOf(":") === -1) return -1;
      return parseInt(sortB.split(":")[0]) < parseInt(sortA.split(":")[0])
        ? -1
        : parseInt(sortB.split(":")[0]) > parseInt(sortA.split(":")[0])
        ? 1
        : parseInt(sortB.split(":")[1]) < parseInt(sortA.split(":")[1])
        ? -1
        : 1;
    });
  };

  return (
    <Container id="profile">
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 10,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        data &&
        knowDaysValue(data).map((value, index) => {
          // const svg = await getRandomImage(value.username);
          const time =
            day === 7
              ? value.last_7_days
              : day === 14
              ? value.last_14_days
              : value.last_30_days;
          const nTime = time.toString().replace("H", "시간").replace("M", "분");
          return (
            <Grid container key={value.username} sx={{ mt: 5 }}>
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {index + 1 === 1 ? (
                  <img src={GoldMedal} width={60} alt="금메달"></img>
                ) : index + 1 === 2 ? (
                  <img src={SilverMedal} width={60} alt="은메달"></img>
                ) : index + 1 === 3 ? (
                  <img src={BronzeMedal} width={60} alt="동메달"></img>
                ) : (
                  <Typography variant="h6">{index + 1}등</Typography>
                )}
              </Grid>
              <Grid item xs={8} sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={`https://avatars.dicebear.com/api/croodles-neutral/${value.username}.svg`}
                  alt=""
                  style={{ width: 80, borderRadius: "50%" }}
                />
                <div>
                  <h3 className="name text-dark">{value.username}</h3>
                  <span>Megabrain</span>
                </div>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography>{nTime}</Typography>
              </Grid>
            </Grid>
          );
        })
      )}
    </Container>
  );
};

export default LeaderBoardList;
