import styles from './Navbar.module.scss';
import logo from '../../assets/img/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import Authorization from '../Authorization/Authorization';

function Navbar() {
    const navigate = useNavigate();
    const tokenString = localStorage.getItem('token');
    const token = tokenString ? JSON.parse(tokenString) : null;
    const API = import.meta.env.VITE_API_URL;

    const handleLogout = () => {
        Authorization({url: `${API}/auth/logout`, options: {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }})
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        navigate('/');
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.container_logo}>
                <Link to='/'>
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <p>Posts</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Navbar;