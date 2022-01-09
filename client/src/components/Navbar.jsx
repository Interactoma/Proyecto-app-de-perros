import style from './Navbar.module.css'
import { NavLink } from 'react-router-dom'

export default function Navbar(){
    return(
        <>
            <div className={style.container}>

                <div className={style.btnContainer}>
                    <NavLink exact to='/home' className={style.btn}>Home</NavLink>
                </div>

                <div>
                    <h1 className={style.title}>The Dogs Page</h1>
                </div>
                    
                <div className={style.btnContainer}>
                    <NavLink exact to='/create-dog' className={style.btn}>Crear un perro</NavLink>
                </div>

            </div>
        </>

    )
}