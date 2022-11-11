import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import getAllMemberWaka from "../../apis/getAllMemberWaka";

const LeaderBoardList = () => {
  const { isLoading, data } = useQuery(["waka"], getAllMemberWaka, {
    refetchOnWindowFocus: false,
    retry: 0,
    onError: (e: any) => {
      console.log(e.message);
    },
  });
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
        data
          .sort((a: { wakatime: string }, b: { wakatime: string }) => {
            return parseInt(b.wakatime.split(":")[0]) <
              parseInt(a.wakatime.split(":")[0])
              ? -1
              : parseInt(b.wakatime.split(":")[0]) >
                parseInt(a.wakatime.split(":")[0])
              ? 1
              : parseInt(b.wakatime.split(":")[1]) <
                parseInt(a.wakatime.split(":")[1])
              ? -1
              : 1;
          })
          .map((value: any) => {
            // const svg = await getRandomImage(value.username);
            const time = value.wakatime.split(/:|-/g);
            return (
              <Grid container key={value.username} sx={{ mt: 5 }}>
                <Grid
                  item
                  xs={10}
                  sx={{ display: "flex", alignItems: "center" }}
                >
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
