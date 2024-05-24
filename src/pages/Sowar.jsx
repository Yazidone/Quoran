import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Paper from '@mui/material/Paper';
// import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import SkipNextIcon from "@mui/icons-material/SkipNext";
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  SkipPrevious as SkipPreviousIcon,
  SkipNext as SkipNextIcon,
} from "@mui/icons-material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
//search navbar
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
export default function Sowar() {
  // audio run
  const [playingIndex, setPlayingIndex] = useState(null);
  const audioRefs = useRef([]);

  const handlePlayPause = (index) => {
    const currentAudio = audioRefs.current[index];

    if (playingIndex === index) {
      if (currentAudio.paused) {
        currentAudio.play();
      } else {
        currentAudio.pause();
      }
    } else {
      if (playingIndex !== null) {
        audioRefs.current[playingIndex].pause();
      }
      currentAudio.play();
      setPlayingIndex(index);
    }
  };

  const handleSkipPrevious = () => {
    if (playingIndex !== null) {
      const previousIndex = (playingIndex - 1 + sowar.length) % sowar.length;
      handlePlayPause(previousIndex);
    }
  };

  const handleSkipNext = () => {
    if (playingIndex !== null) {
      const nextIndex = (playingIndex + 1) % sowar.length;
      handlePlayPause(nextIndex);
    }
  };
  // end audio
  // api start
  const [sowar, steSowar] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/sowar-quran")
      .then((res) => res.json())
      .then((result) => {
        steSowar(result);
      })
      .catch((err) => console.log(err));
  }, []);
  // api end

  const theme = useTheme();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Grid container spacing={2}> */}
            {sowar.map((sora, i) => (
                  <Card sx={{ display: "flex", mb: 2, width: '1500px', justifyContent: "center", }} key={i}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h5">
                          {sora.title}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          {sora.voice_reader}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          {sora.duration}
                        </Typography>
                      </CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          pl: 1,
                          pb: 1,
                        }}
                      >
                        <IconButton
                          aria-label="previous"
                          onClick={handleSkipPrevious}
                        >
                          {theme.direction === "rtl" ? (
                            <SkipNextIcon />
                          ) : (
                            <SkipPreviousIcon />
                          )}
                        </IconButton>
                        <IconButton
                          aria-label="play/pause"
                          onClick={() => handlePlayPause(i)}
                        >
                          {playingIndex === i &&
                          !audioRefs.current[i]?.paused ? (
                            <PauseIcon sx={{ height: 38, width: 38 }} />
                          ) : (
                            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                          )}
                        </IconButton>
                        <IconButton aria-label="next" onClick={handleSkipNext}>
                          {theme.direction === "rtl" ? (
                            <SkipPreviousIcon />
                          ) : (
                            <SkipNextIcon />
                          )}
                        </IconButton>
                      </Box>
                    </Box>
                    <CardMedia
                      component="audio"
                      sx={{ width: 151 }}
                      src={sora.audio_file}
                      ref={(el) => (audioRefs.current[i] = el)}
                      alt="Audio player"
                    />
                  </Card>
            ))}
          {/* </Grid> */}
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
