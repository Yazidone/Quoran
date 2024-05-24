import * as React from "react";
import { useState, useEffect,useRef } from "react";
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
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



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
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
export default function CreateQuran() {
    const [load , setLoad] = useState(false)
    const handleSubmit = (event) => {
        setLoad(true)
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);
        const fileInput = document.getElementById('audio_file');
        const file = fileInput.files[0];
        formData.append('audio_file', file);
    
        fetch("http://127.0.0.1:8000/api/sowar-quran/store", {
            method: "POST",
            // Do not set the Content-Type header manually when using FormData
            body: formData
        })
        .then((res) => res.json())
        .then((result) => {
            if(result.message==='created'){
                setLoad(false)
                console.log('test')
            }

            })
        .catch((err) => console.log(err));
    };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Sorat quran
          </Typography>
          <Box
            component="form"
            encType= "multipart/form-data"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="title Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={16}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      
                    </InputLabel>
                    <NativeSelect
                      defaultValue={30}
                      inputProps={{
                        name: "voice_reader",
                        id: "uncontrolled-native",
                      }}
                    >
                      <option value={''} disabled>sheikh</option>
                      <option value={'sodayssi'}>sodayssi</option>
                      <option value={'abd lbassit abd assamad'}>abd lbassit abd assamad</option>
                      <option value={'nabolssi'}>nabolssi</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="duration"
                  label="duration"
                  name="duration"
                  autoComplete="duration"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                >
                Upload file
                <VisuallyHiddenInput type="file" name="audio_file" id="audio_file" />
                </Button>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              create {
                load && (<div className="lds-dual-ring"> loading...</div>)
                
              }
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Al sowar
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

