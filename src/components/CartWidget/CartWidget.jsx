import { useContext } from 'react';
import { CarritoContext } from '../../context/CarritoContext';
import { Link } from 'react-router-dom';
import './CartWidget.css'

const CartWidget = () => {
  const { cantidadTotal } = useContext(CarritoContext);
  const imgCarroCompras = "../img/carrito.png";

  return (
    <div>
      <Link style={{textDecoration:"none"}} to='/cart'>
        <img className='imgCarroCompras' src={imgCarroCompras} alt="Carro de Compras" />
        {
          cantidadTotal > 0 && <strong className='itemsIndicador'> {cantidadTotal} </strong>
        }
      </Link>
    </div>
  )
}

export default CartWidget