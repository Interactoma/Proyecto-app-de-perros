import { NavLink } from 'react-router-dom';


export default function Home(){
    return(
        <>
            {/* <button onClick={()=>dogo("husky")}>click</button> */}
            <NavLink exact to='/home' >Go to Home</NavLink>
        </>
    )
}