import { Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import getRefreshMember from "../../apis/getRefreshMember";
import LeaderBoardList from "../List";

const MainBoard = () => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["updataWaka"],
    queryFn: getRefreshMember,
    refetchOnWindowFocus: false,
    enabled: false,
    onError: (e: any) => {
      console.log(e.message);
    },
  });
  const handleRefresh = () => {
    refetch();
  };
  return (
    <Container maxWidth="lg">
      <Toolbar />
      <Typography variant="h4" sx={{ mt: 5 }} fontWeight="700" align="center">
        Coding LeaderBoard
      </Typography>
      <Box className="duration" sx={{ mt: 5 }} textAlign="center">
        <Button
          data-id="7"
          color="inherit"
          variant="contained"
          sx={{ mr: 2, ml: 2 }}
        >
          7 Days
        </Button>
        <Button
          data-id="30"
          color="inherit"
          variant="outlined"
          sx={{ mr: 2, ml: 2 }}
        >
          14 Days
        </Button>
        <Button
          data-id="0"
          color="inherit"
          variant="outlined"
          sx={{ mr: 2, ml: 2 }}
        >
          30 Days
        </Button>
        <Button
          disabled={isFetching}
          onClick={handleRefresh}
          data-id="0"
          color="inherit"
          variant="outlined"
          sx={{ mr: 2, ml: 2 }}
        >
          {!isFetching ? (data !== undefined ? "갱신완료" : "갱신") : "로딩중"}
        </Button>
      </Box>
      <LeaderBoardList />
    </Container>
  );
};

export default MainBoard;
