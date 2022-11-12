import {
  Box,
  Button,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import getRefreshMember from "../../apis/getRefreshMember";
import LeaderBoardList from "../List";
import RefreshIcon from "@mui/icons-material/Refresh";

const MainBoard = () => {
  const [day, setDay] = useState(7);

  const { mutate, isLoading, isSuccess } = useMutation(getRefreshMember, {
    onError: (error) => {
      console.log(error);
    },
  });

  const handleRefresh = () => {
    mutate(day);
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newDay: number | null
  ) => {
    if (newDay != null) setDay(newDay);
  };
  return (
    <Container maxWidth="lg">
      <Toolbar />
      <Typography variant="h4" sx={{ mt: 5 }} fontWeight="700" align="center">
        Coding LeaderBoard
      </Typography>
      <Box className="duration" sx={{ mt: 2 }} textAlign="center">
        <Button
          disabled={isLoading}
          onClick={handleRefresh}
          data-id="0"
          variant="contained"
          endIcon={<RefreshIcon />}
          sx={{ mr: 2, ml: 2 }}
        >
          {!isLoading ? "갱신" : "로딩중"}
        </Button>
      </Box>
      <Box className="duration" sx={{ mt: 3 }} textAlign="center">
        <ToggleButtonGroup
          color="primary"
          value={day}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value={7}>지난 7일</ToggleButton>
          <ToggleButton value={14}>지난 14일</ToggleButton>
          <ToggleButton value={30}>지난 30일</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <LeaderBoardList day={day} isRefetch={isSuccess} />
    </Container>
  );
};

export default MainBoard;
