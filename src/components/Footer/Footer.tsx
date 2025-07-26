import styles from './Footer.module.scss';
import logo from '../../assets/img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faFacebook, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import FadeInOnScroll from '../FadeInOnScoll/FadeInOnScroll';

function Footer() {

    return (
        <>
        <FadeInOnScroll>
            <div className={`${styles.footer} ${styles.line}`}>
                <div className={styles.row}>
                    <div className={styles.col_4}>
                        <div className={styles.info}>
                            <div className={styles.logo_name}>
                                <img src={logo} alt='logo'></img>
                                <span>DataWarehouse</span>
                            </div>
                            <p>
                                <FontAwesomeIcon className={styles.icon} icon={faLocationDot}/>
                                Warehouse Society, 234 Bahagia Ave Street PRBW 29281
                            </p>
                            <p>
                                <FontAwesomeIcon className={styles.icon} icon={faEnvelope}/>
                                info@warehouse.project
                            </p>
                            <p>
                                <FontAwesomeIcon className={styles.icon} icon={faPhone}/>
                                1-232-3434 (Main)
                            </p>
                        </div>
                    </div>
                    <div className={styles.col_6}>
                        <div className={styles.row_list}>
                            <div className={styles.col_3}>
                                <div className={styles.about}>
                                    <h3>About</h3>
                                    <Link to='/link'>
                                        <span>Profile</span>
                                    </Link>
                                    <Link to='/link'>
                                        <span>Features</span>
                                    </Link>
                                    <Link to='/link'>
                                        <span>Carrers</span>
                                    </Link>
                                    <Link to='/link'>
                                        <span>DW News</span>
                                    </Link>
                                </div>
                            </div>

                            <div className={styles.col_3}>
                                <div className={styles.help}>
                                    <h3>Help</h3>
                                    <Link to='/link'>
                                        <span>Support</span>
                                    </Link>
                                    <Link to='/link'>
                                        <span>Sign up</span>
                                    </Link>
                                    <Link to='/link'>
                                        <span>Guide</span>
                                    </Link>
                                    <Link to='/link'>
                                        <span>Reports</span>
                                    </Link>
                                    <Link to='/link'>
                                        <span>Q&A</span>
                                    </Link>
                                </div>
                            </div>

                            <div className={styles.col_3}>
                                <div className={styles.social}>
                                    <h3>Social Media</h3>
                                    <div className={styles.container_social}>
                                        <Link to='/link'>
                                            <div>
                                                <FontAwesomeIcon icon={faFacebook}/>
                                            </div>
                                        </Link>
                                        <Link to='/link'>
                                            <div>
                                                <FontAwesomeIcon icon={faInstagram}/>
                                            </div>
                                        </Link>
                                        <Link to='/link'>
                                            <div>
                                                <FontAwesomeIcon icon={faGithub}/> 
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FadeInOnScroll>

        <FadeInOnScroll>
            <div className={styles.grid}>
                <div className={styles.row_last}>
                        <div className={styles.col_2}>
                            <div className={styles.copy}>
                                <div>
                                    <p>© Datawarehouse™, 2020. All rights reserved.</p>
                                    <p>Company Registration Number: 21479524.</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.col_2}>
                            <div className={styles.chat}>
                                <div>
                                    <FontAwesomeIcon icon={faCommentDots} className={styles.icon_chart} />
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </FadeInOnScroll>
        </>
    );
}

export default Footer;