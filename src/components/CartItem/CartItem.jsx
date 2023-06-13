import { useContext } from "react"
import { CarritoContext } from "../../context/CarritoContext"

const CartItem = ({item, cantidad}) => {
    const {eliminarProducto} = useContext(CarritoContext);
  return (
    <div className="itemCarro" >
      <h3 className="prodCarro" > {item.nombre} </h3>
        <h3>Unidades:{cantidad} </h3>
        <h3>Precio Unitario: {item.preciorender} </h3>
        <button className="miBtn" onClick={()=> eliminarProducto(item.id)}> Eliminar </button>
    </div>
  )
}

export default CartItem