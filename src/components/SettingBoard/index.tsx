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
import { useState } from "react";
import postAddMember from "../../apis/postAddMember";
import CloseIcon from "@mui/icons-material/Close";

export type PersonData = {
  apiKey: string;
  userName: string;
  organization: string;
};

const SettingBoard = () => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [personData, setPersonData] = useState<PersonData>({
    apiKey: "",
    userName: "",
    organization: "",
  });

  const [toastText, setToastText] = useState("");

  const clickRegister = async () => {
    if (personData.apiKey.length <= 0 || personData.userName.length <= 0) {
      setToastText("이름 또는 api key를 입력해주세요");
    } else {
      setFetchLoading(true);
      postAddMember(personData).then((res) => {
        setToastText(res);
        setFetchLoading(false);
      });
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
                ...personData,
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
                ...personData,
                apiKey: text.target.value,
              })
            }
            id="standard-basic"
            label="api key"
            variant="standard"
            sx={{ m: 1, width: "25ch" }}
          />
        </Box>

        <Box textAlign={"center"} sx={{ mt: 2 }}>
          <TextField
            value={personData.organization}
            onChange={(text) =>
              setPersonData({
                ...personData,
                organization: text.target.value,
              })
            }
            id="standard-basic"
            label="organization"
            variant="standard"
            sx={{ m: 1, width: "25ch" }}
          />
        </Box>

        <Box textAlign={"center"} sx={{ mt: 8 }}>
          <Button
            disabled={fetchLoading}
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
