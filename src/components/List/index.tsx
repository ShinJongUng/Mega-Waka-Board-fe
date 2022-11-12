import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import getAllMemberWaka from "../../apis/getAllMemberWaka";

type dto = {
  username: string;
  last_7_days: string;
  last_14_days: string;
  last_30_days: string;
};

const LeaderBoardList = ({ day }: { day: number }) => {
  const { isLoading, data } = useQuery(["waka"], getAllMemberWaka, {
    refetchOnWindowFocus: false,
    retry: 0,
    onError: (e: any) => {
      console.log(e.message);
    },
  });

  const knowDaysValue = (data) => {
    return data.sort((a: dto, b: dto) => {
      const sortA =
        day === 7
          ? a.last_7_days
          : day === 14
          ? a.last_14_days
          : a.last_30_days;
      const sortB =
        day === 7
          ? b.last_7_days
          : day === 14
          ? b.last_14_days
          : b.last_30_days;
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
        knowDaysValue(data).map((value: any) => {
          // const svg = await getRandomImage(value.username);
          const time =
            day === 7
              ? value.last_7_days.split(/:|-/g)
              : day === 14
              ? value.last_14_days.split(/:|-/g)
              : value.last_30_days.split(/:|-/g);

          return (
            <Grid container key={value.username} sx={{ mt: 5 }}>
              <Grid item xs={10} sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={`https://avatars.dicebear.com/api/human/${value.username}.svg`}
                  alt=""
                  width={150}
                  style={{ width: "15%", borderRadius: "50%" }}
                />
                <div>
                  <h3 className="name text-dark">{value.username}</h3>
                  <span>Megabrain 정회원</span>
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
                <Typography sx={{ fontSize: "2vh" }}>
                  {time[0].toString() + "시간 " + time[1].toString() + "분 "}
                </Typography>
              </Grid>
            </Grid>
          );
        })
      )}
    </Container>
  );
};

export default LeaderBoardList;
