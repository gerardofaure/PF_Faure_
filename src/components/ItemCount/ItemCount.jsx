import { Link } from 'react-router-dom';
import { useState } from 'react'
import './ItemCount.css'

const ItemCount = ({inicial, stock, funcionAgregar}) => {
    const [contador, setContador] = useState(inicial);
    
    const incrementar = () => {
        if(contador < stock) {
            setContador(contador + 1);
        }
    }

    const decrementar = () => {
        if(contador > inicial){
            setContador(contador - 1);
        }
    }

  return (
    <>
        <div>
            <button className='miBtn' onClick={ decrementar }> - </button>
            <strong> {contador} </strong>
            <button className='miBtn' onClick={ incrementar }> + </button>
        </div>
        { stock > 0 && <button className='miBtn' onClick={()=> funcionAgregar(contador)}> Agregar al Carro de compras </button>}
        <Link to="/" className = "miBtn" > Seguir Comprando</Link>
    </>
  )
}

export default ItemCount