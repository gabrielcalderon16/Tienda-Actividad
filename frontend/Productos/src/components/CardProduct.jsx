import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export const CardProduct = ( { handleClickOpenDelete, handleOpenModalEdit, product } ) => {

  
  return (
    <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column'}}>
      <img  style={{ height: 140 }} src={product.img} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {product.nombre}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
        Categoria: {product.categoria}
        </Typography>
        <Typography variant="body1" component="div" color="text.secondary">
        Descripción: {product.descripcion}
        </Typography>
        <Typography variant="body1" component="div" color="text.secondary">
        Cant. Disponible: {product.precio}
        </Typography>
        <Typography variant="body1" component="div" color="text.secondary">
        Precio: ${product.precio}
        </Typography>
      </CardContent>
      <CardActions sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <IconButton onClick={() => handleOpenModalEdit(product)}>
        <EditRoundedIcon color="primary" sx={{fontSize: 30}}/>
        </IconButton>
        <IconButton onClick={() => handleClickOpenDelete(product)}>
        <DeleteRoundedIcon    color="primary" sx={{fontSize: 30}}/>
        </IconButton>
      </CardActions>
    </Card>
  );
}