import { CarritoContext } from "../../context/CarritoContext"
import { useContext } from "react"
import { Link } from "react-router-dom"
import CartItem from "../CartItem/CartItem"
import './Cart.css'


const Cart = () => {
    const { carrito, vaciarCarrito, total, cantidadTotal } = useContext(CarritoContext);

    if (cantidadTotal === 0) {
        return (
            <>
                <div className="stpedido" >

                    <h2> Tu carro de compras está vacío</h2>

                </div>

                <Link className="miBtn" to='/'> Ver Productos </Link>
            </>
        )
    }
    return (
        <div  >
            {carrito.map(producto => <CartItem key={producto.id} {...producto} />)}
            <div className="stCart" >
                <h3>Total: ${total} </h3>
                <h3>Cantidad total: {cantidadTotal} </h3>
            </div>

            <button className="miBtn" onClick={() => vaciarCarrito()}> Vaciar carro de compras</button>
            <Link className="miBtn" to='/checkout'> Realizar Pedido </Link>

        </div>
    )
}

export default Cart