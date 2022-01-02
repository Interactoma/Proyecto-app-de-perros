import { NavLink } from 'react-router-dom';
import style from './LandinPage.module.css';

export default function LandinPage(){
    return(
        <div className={style.container}>
            <NavLink exact to='/home'>Go to Home</NavLink>
        </div>
    )
}
