import './App.css'
import { useEffect, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import { IconButton } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"
import { AppTheme } from './theme/AppTheme';
import { CardProduct } from './components/CardProduct';
import { Navbar } from './components/navbar';
import { Modal } from './components/Modal';
import { ModalDelete } from './components/ModalDelete';
import { ProductApi } from './api/api';


function App() {

  //Grupo de hooks useState para manejar el estado de las diferentes variables
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [producto2, setproducto2] = useState(false);
  const [productoDelete, setproductoDelete] = useState(false);
  const [productos, setproductos] = useState([]);
  const [Filter, setFilter] = useState(null);


// hook que realiza la peticion al cargar la pagina por primera vez
  useEffect(() => {
    getProducts()
  }, [])
  
  //Funcion que realiza la peticion get de los productos
  const getProducts = async () => {
    const resp = await ProductApi.get('/products')
    setproductos(resp.data.producto)
   }

  //Funcion que abre el modal de eliminar
  const handleClickOpenDelete = ( producto ) => {
    setproductoDelete(producto)
    setOpenModalDelete(true);
  };

   //Funcion que cierra el modal de eliminar
  const handleCloseDelete = () => {
    setOpenModalDelete(false);
  };

  //Funcion que abre el modal en modo agregar
  const handleClickOpen = () => {
    setproducto2(false);
    setOpenModal(true);
  };

  //Funcion que abre el modal en modo editar
  const handleOpenModalEdit = ( producto ) => {
    setproducto2(producto);
    setOpenModal(true);
}

  //Funcion que cierra el modal de crear/editar
  const handleClose = () => {
    setOpenModal(false);
  };
  
  //Funcion que realiza el filtro
  const filterProduct = useMemo (() => {
    return typeof Filter == 'string' && Filter.length > 0 ? productos.filter( producto => {
      return producto.nombre.toLocaleLowerCase().includes(Filter.toLocaleLowerCase()) || 
      producto.descripcion.toLocaleLowerCase().includes(Filter.toLocaleLowerCase()) || 
      producto.categoria.toLocaleLowerCase().includes(Filter.toLocaleLowerCase())
    }) : productos
  }, [productos, Filter]) 


  return (
    <AppTheme>
        <Navbar/>
      <div className="container mt-4">
        <div className="row mt-2">
            {/* Campo en el cual se captura el valor del filtrado */}
            <TextField
            placeholder="Filtra por nombre, categoria o descripción." 
            onChange={(e) => {
              setFilter(e.target.value)
            }}
              />
        </div>
        <div className="row rows-cols-1 row-cols-md-3 gap d-flex justify-content-center flex-wrap mt-4">
            {/* Iteracion para mostrar la cantidad de productos */}
          {
                filterProduct.map( (product) => (
                    <CardProduct key={product._id} handleClickOpenDelete={handleClickOpenDelete} handleOpenModalEdit={handleOpenModalEdit} product={product}/>
                ))
           }
          </div>
      </div>
      
            {/* Boton para habilitar el modal de crear nuevo producto */}
      <IconButton
        size='large'
        sx={{color: 'white',
        backgroundColor:'black',
        ':hover': {backgroundColor:'black', opacity:0.7}, 
        position:'fixed', 
        right:50, 
        bottom:50 }}
        onClick={handleClickOpen}
        >
          <AddOutlined 
          color="primary"
          sx={{fontSize: 30}}
          />
        </IconButton>

            {/* Modal de editar o crear */}
        <Modal openModal={openModal} handleClose={handleClose} producto2={producto2} getProducts={getProducts}/>
            {/* Modal de eliminar */}
        <ModalDelete openModalDelete={openModalDelete} handleCloseDelete={handleCloseDelete} productoDelete={productoDelete} getProducts={getProducts}/>

    </AppTheme>
  )
}

export default App
