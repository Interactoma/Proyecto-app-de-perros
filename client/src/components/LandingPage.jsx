import { NavLink } from 'react-router-dom';
import style from './LandinPage.module.css';

export default function LandinPage(){
    return(
        <div className={style.container}>
            <div className={style.botonContainer}>
                <NavLink exact to='/home' className={style.boton}>Go to Home</NavLink>
                
            </div>
        </div>
    )
}
