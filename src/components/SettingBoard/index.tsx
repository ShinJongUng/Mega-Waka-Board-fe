import {
  Box,
  Button,
  Container,
  IconButton,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import postAddMember from "../../apis/postAddMember";
import CloseIcon from "@mui/icons-material/Close";

export type PersonData = {
  apiKey: string;
  userName: string;
};

const SettingBoard = () => {
  const [personData, setPersonData] = useState<PersonData>({
    apiKey: "",
    userName: "",
  });

  const [toastText, setToastText] = useState("");

  const { mutate } = useMutation(postAddMember, {
    onSuccess: () => {
      setToastText("등록 완료");
    },
    onError: (error) => {
      setToastText(error.toString());
    },
  });

  const clickRegister = async () => {
    if (personData.apiKey.length <= 0 || personData.userName.length <= 0) {
      setToastText("이름 또는 api key를 입력해주세요");
    } else {
      mutate(personData);
    }
  };
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setToastText("");
  };
  return (
    <div>
      <Toolbar />
      <Snackbar
        open={toastText.length > 0}
        autoHideDuration={3000}
        onClose={handleClose}
        message={toastText}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      <Container>
        <Typography variant="h4" sx={{ mt: 5 }} fontWeight="700" align="center">
          Add Person
        </Typography>
        <Box textAlign={"center"} sx={{ mt: 2 }}>
          <TextField
            value={personData.userName}
            onChange={(text) => {
              setPersonData({
                apiKey: personData.apiKey,
                userName: text.target.value,
              });
            }}
            id="standard-basic"
            label="이름"
            variant="standard"
            sx={{ m: 1, width: "25ch" }}
          />
        </Box>

        <Box textAlign={"center"} sx={{ mt: 2 }}>
          <TextField
            value={personData.apiKey}
            onChange={(text) =>
              setPersonData({
                apiKey: text.target.value,
                userName: personData.userName,
              })
            }
            id="standard-basic"
            label="api key"
            variant="standard"
            sx={{ m: 1, width: "25ch" }}
          />
        </Box>

        <Box textAlign={"center"} sx={{ mt: 8 }}>
          <Button
            variant="contained"
            sx={{ pr: 10, pl: 10 }}
            onClick={clickRegister}
          >
            등록
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default SettingBoard;
