import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/img/logo.png';
import FadeInOnScroll from '../FadeInOnScoll/FadeInOnScroll';
import Authorization from '../Authorization/Authorization';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Header() {
    const getToken = localStorage.getItem('token');
    const token = getToken? JSON.parse(getToken) : null;
    const [show, setShow] = useState<boolean>(false);
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

    }

    console.log(token);
    

    const handleShow = () => {
        setShow(prev => !prev);
    }
    
    return (
        <FadeInOnScroll>
            <div className={styles.container_header}>
                <div>
                    <Link to='/' className={styles.logo}>
                        <img src={logo} alt="logo" />
                    </Link>
                    <div className={styles.menu}>
                                <Link to='/link'>
                                    <p>About</p>
                                </Link>
                                <Link to='/link'>
                                    <p>Help</p>
                                </Link>
                                <Link to='/link'>
                                    <p>Features</p>
                                </Link>
                    </div>
                </div>

                {token ? (
                            <div>
                                <Link to='/profile'>
                                    <button>Profile</button>
                                </Link>
                                <Link to='/'>
                                    <button onClick={handleLogout}>Logout</button>
                                </Link>
                            </div>
                    ) : (
                        <>
                            <Link to='/signin'>
                                <button>Sign in</button>
                            </Link>
                        </>
                )}

                <div className={styles.menu_phone} onClick={handleShow}>
                    <FontAwesomeIcon icon={faBars} />
                </div>

                {show && (
                    <p className={styles.show_menu}>
                        <Link to='/' className={styles.link}>
                            <p>Home</p>
                        </Link>
                        <Link to='/' className={styles.link}>
                            <p>About</p>
                        </Link>
                        <Link to='/' className={styles.link}>
                            <p>Help</p>
                        </Link>
                        <Link to='/' className={styles.link}>
                            <p>Features</p>
                        </Link>
                        <div className={styles.btn_phone}>
                            {token ? (
                                <>
                                    <Link to='/profile'>
                                        <p>Profile</p> 
                                    </Link>
                                    <Link to='/'>
                                        <p onClick={handleLogout}>Logout</p>
                                    </Link>
                                </>
                            ) :
                                <Link to='/signin'>
                                    <p>Sign in</p>
                                </Link>
                            }
                        </div>
                    </p>
                )}

                
            </div>
        </FadeInOnScroll>
    );
}

export default Header;