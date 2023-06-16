import './ItemDetail.css'
import ItemCount from '../ItemCount/ItemCount'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CarritoContext } from '../../context/CarritoContext'
import { useContext } from 'react';

const ItemDetail = ({ id, nombre, precio, img, stock, desc, preciorender }) => {

  const [agregarCantidad, setAgregarCantidad] = useState(0);

  const { agregarProducto } = useContext(CarritoContext);

  
  const manejadorCantidad = (cantidad) => {
    setAgregarCantidad(cantidad);
    
    const item = { id, nombre, precio, preciorender };
    agregarProducto(item, cantidad);
  }

  return (
    <div className='contenedorItem'>
      <h2>{nombre} </h2>
      <h2>{preciorender} </h2>
      <p >Sku: CH000{id} </p>
      <p> {desc}</p>
      <img src={img} alt={nombre} />

      {
        agregarCantidad > 0 ? (<Link to="/cart" className='miBtn'> Orden de Compra </Link>) : (<ItemCount inicial={1} stock={stock} funcionAgregar={manejadorCantidad} />)
      }
    </div>
  )
}

export default ItemDetail