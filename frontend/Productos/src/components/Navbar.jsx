import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import "./Navbar.css"

export const Navbar = () => {
  return (
    <AppBar position="static">
        <Toolbar>
        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h6' noWrap component='div' className="white">
                    Productos
                    </Typography>
                </Grid>
        </Toolbar>
    </AppBar>
  );
};