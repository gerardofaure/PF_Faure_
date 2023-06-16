import './Item.css'
import { Link } from 'react-router-dom'

const Item = ({id, nombre, img, stock, preciorender}) => {
  return (
    <div className='tarjetaProducto'>
        <img className='cardProd' src={img} alt={nombre} />
        <h2>{nombre} </h2>
        <h3>{preciorender} c/u</h3>
        <h5>Sku: CH000{id} </h5>
        <h3>Stock:{stock} un.</h3>
        <Link className='miBtn' to={`/item/${id}`}> Ver Detalles </Link>
    </div>
  )
}

export default Item

