import { useState, useContext } from "react";
import {CarritoContext} from '../../context/CarritoContext';
import {db} from '../../services/config';
import {collection, addDoc, updateDoc, doc, getDoc} from 'firebase/firestore';
import './Checkout.css'



const Checkout = () => {
    const {carrito, vaciarCarrito, total} = useContext(CarritoContext);
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmacion, setEmailConfirmacion] = useState("");
    const [error, setError] = useState("");
    const [ordenId, setOrdenId] = useState("");

    //--------------------------------------------
    const vaciarFormulario = () => {
        setNombre("");
        setDireccion("");
        setTelefono("");
        setEmail("");
        setEmailConfirmacion("");
        };
    
    //funciones y validaciones: 

    const manejadorFormulario = (event) => {
        event.preventDefault();
        


        //Verificamos que los campos esten completos:
       


        if(!nombre || !direccion || !telefono || !email || !emailConfirmacion) {
            setError("Complete todos los campos"); 
            return;
        }

        //Validamos que los campos del email coincidan 
        if(email !== emailConfirmacion) {
            setError("Los correos electrónicos deben ser iguales");
            
            return;
        }

        

        //Paso 1: Creamos el objeto de la orden: 

        const orden = {
            items: carrito.map(producto => ({
                id: producto.item.id,
                nombre: producto.item.nombre,
                cantidad: producto.cantidad
            })),
            total: carrito.reduce((total, producto)=> total + producto.item.precio * producto.cantidad, 0),
            nombre,
            direccion, 
            telefono,
            email,
            fecha: new Date(),
        };

        //Vamos a modificar el código para que ejecute varias promesas en paralelo, por un lado que actualice el stock de productos y por otro que genere una orden de compras. Promise.All me permite esto: 

        Promise.all(
            orden.items.map(async (productoOrden) => {
                //Por cada producto en la colección inventario obtengo una referencia, y a partir de esa referencia obtengo el doc. 
                const productoRef = doc(db, "inventario", productoOrden.id);
                const productoDoc = await getDoc(productoRef);
                const stockActual = productoDoc.data().stock;
                //Data es un método qu eme permite acceder a la información del Documento. 
                await updateDoc(productoRef, {
                    stock: stockActual - productoOrden.cantidad,
                });
                //Modifico el stock y subo la información actualizada. 
            })
        )
            .then(() => {
                //Guardan la orden de compra en la base de datos: 
                addDoc(collection(db, "ordenes"), orden)
                    .then((docRef) => {
                        setOrdenId(docRef.id);
                        vaciarCarrito();
                        vaciarFormulario();
                        
                    
                    })
                    .catch((error) => {
                        console.error("Error al crear la orden", error);
                        setError("Se produjo un error al crear la orden");
                    })
            })
            .catch((error) => {
                console.error("Error al actualizar el stock", error);
                setError("Se produjo un error al actualizar el stock de los productos, vuelva más tarde");
                
                
            });
            
        

       
    }
    

    return(


    <div>
        <div className="stpedido" >
             <h2>Pedido de compra</h2>
        </div>
            <form onSubmit={manejadorFormulario} className="formulario">
            {carrito.map(producto => (
                <div className="itemPedido" key={producto.item.id}>
                    <p>
                        {producto.cantidad} x {producto.item.nombre}
                    </p>
                    <p> Precio $: {producto.item.precio} </p>
                </div>
            ))}
            
            <hr />

                <div className="form-group">
                    <label htmlFor=""> Nombre </label>
                    <input type="text" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
                </div>
                
                <div className="form-group">
                    <label htmlFor=""> Dirección de Envío </label>
                    <input type="text" value={direccion} onChange={(e)=>setDireccion(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor=""> Telefono </label>
                    <input type="text" value={telefono} onChange={(e)=>setTelefono(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor=""> Email </label>
                    <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor=""> Email Confirmación </label>
                    <input type="email" value={emailConfirmacion} onChange={(e)=> setEmailConfirmacion(e.target.value)} />
                </div>
                <hr />
                <p className="tuCompra" >Total de tu Compra: ${total} </p>

                {error && <p className="sterror"> {error} </p>}
                <button className="miBtn" type="submit"  > Finalizar Compra </button>
        </form>
        {
            ordenId && (
                    
                    <strong className="ordenId" >¡Gracias por tu compra! Tu número de Orden es {ordenId} </strong>
               
            )
            
        }        
    </div>
    
  )
  
}

export default Checkout

