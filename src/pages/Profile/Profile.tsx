import { Link, useLocation, useNavigate } from "react-router-dom";
import Admin from "../Admin/Admin";
import styles from './Profile.module.scss';
import PostAdd from "../../components/Add/PostAdd/PostAdd";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import EditPost from "../../components/Edit/EditPost/EditPost";
import Navbar from "../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from '../../assets/img/logo.png';
import Authorization from "../../components/Authorization/Authorization";

function Profile() {
    const location = useLocation();
    const path = location.pathname;
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState<boolean>(false);
    const navigate = useNavigate();
    const tokenString = localStorage.getItem('token');
    const token = tokenString ? JSON.parse(tokenString) : null;
    const API = import.meta.env.VITE_API_URL;

    setTimeout(() => {
        setLoading(false)
    }, 1000)

    const handleShow = () => {
        setShow(prev => !prev);
    }

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
        <div className={styles.profile}>
            <Navbar />
            {loading ? (
                <div className={styles.container_loading}>
                    <BeatLoader color="#ccc" size={8}></BeatLoader>
                </div>
            ) : (
                <div className={styles.container_manage}>
                    <div className={styles.menu} onClick={handleShow}>
                        <Link to='/'>
                            <img src={logo} alt="" />
                        </Link>
                        <FontAwesomeIcon icon={faBars} /> 

                        {show && (
                            <div className={styles.show_nav}>
                                <Link to='/profile'>
                                    <p>Posts</p>
                                </Link>
                                <button onClick={handleLogout}>Log out</button>
                            </div>
                        )}
                    </div>
                    {path === '/profile' && <Admin />}
                    {path === '/profile/post/add' && <PostAdd />}
                    {path === '/profile/post/edit' && <EditPost />}
                </div>
            )}
        </div>
    );
}

export default Profile;