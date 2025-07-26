// import FadeInOnScroll from "../../components/FadeInOnScoll/FadeInOnScroll";
import styles from './Home.module.scss';

import banner from '../../assets/img/banner_save_data.png';
import icon1 from '../../assets/img/icon_feature1.png';
import icon2 from '../../assets/img/icon_feature2.png';
import icon3 from '../../assets/img/icon_feature3.png';
import icon4 from '../../assets/img/icon_feature4.png';
import bg1 from '../../assets/img/bg_feature1.png';
import bg2 from '../../assets/img/bg_feature2.png';
import bg3 from '../../assets/img/bg_feature3.png';
import bg4 from '../../assets/img/bg_feature4.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import FadeInOnScroll from '../../components/FadeInOnScoll/FadeInOnScroll';
import Slider from '../../components/Slider/Slider';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {

  return (
    <div>
        <div className={styles.container}>
            <div className={styles.text_center}>
                <FadeInOnScroll>
                    <h1>Save your data storage here.</h1>
                    <p>Data Warehouse is a data storage area that has been tested for security, so you can store your data here safely but not be afraid of being stolen by others.</p>
                    <button>Learn more</button>
                </FadeInOnScroll>
            </div>
            <div className={styles.container_img}>
                <img src={banner} alt="save your data" />
            </div>
        </div>

        <div className={styles.container_feature}>
            <FadeInOnScroll>
                <div className={styles.title}>
                    <h2>Features</h2>
                    <p className={styles.feature_intro}>Some of the features and advantages that we provide for those of you who store data in this Data Warehouse.</p>
                </div>
            </FadeInOnScroll>
                <div className={styles.row}>
                    <div className={styles.col_6}>
                        <FadeInOnScroll>
                            <div className={styles.items_feature}>
                                <img src={bg1} alt="" className={styles.img_bg} />
                                <div className={styles.content_feature}>
                                    <div className={styles.col_6_item}>
                                        <div className={styles.container_icon}>
                                            <img src={icon1}></img>
                                        </div>
                                    </div>
                                    <div className={styles.col_6_item}>
                                        <div className={styles.content}>
                                            <h3>Search Data</h3>
                                            <p>Don’t worry if your data is very large, the Data Warehoue provides a search engine, which is useful for making it easier to find data effectively saving time.</p>
                                            <Link to='/link'>
                                                <span className={styles.learn_more}>Learn more</span>
                                                <span>
                                                    <FontAwesomeIcon icon = {faArrowRight} className={styles.icon_right}/>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInOnScroll>
                    </div>
                    
                    <div className={styles.col_6}>
                        <FadeInOnScroll>
                            <div className={styles.items_feature}>
                                <img src={bg2} alt="" className={styles.img_bg} />
                                <div className={styles.content_feature}>
                                    <div className={styles.col_6_item}>
                                        <div className={styles.container_icon}>
                                            <img src={icon2}></img>
                                        </div>
                                    </div>
                                    <div className={styles.col_6_item}>
                                        <div className={styles.content}>
                                            <h3>24 Hours Access</h3>
                                            <p>Access is given 24 hours a full morning to night and meet again in the morning, giving you comfort when you need data when urgent.</p>
                                            <Link to='/link'>
                                                <span className={styles.learn_more}>Learn more</span>
                                                <span>
                                                    <FontAwesomeIcon icon = {faArrowRight} className={styles.icon_right}/>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInOnScroll>
                    </div>

                    <div className={styles.col_6}>
                        <FadeInOnScroll>
                            <div className={styles.items_feature}>
                                <img src={bg3} alt="" className={styles.img_bg}/>
                                <div className={styles.content_feature}>
                                    <div className={styles.col_6_item}>
                                        <div className={styles.container_icon}>
                                            <img src={icon3}></img>
                                        </div>
                                    </div>
                                    <div className={styles.col_6_item}>
                                        <div className={styles.content}>
                                            <h3>Print Out</h3>
                                            <p>Print out service gives you convenience if someday you need print data, just edit it all and just print it.</p>
                                            <Link to='/link'>
                                                <span className={styles.learn_more}>Learn more</span>
                                                <span>
                                                    <FontAwesomeIcon icon = {faArrowRight} className={styles.icon_right}/>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInOnScroll>
                    </div>

                    <div className={styles.col_6}>
                        <FadeInOnScroll>
                            <div className={styles.items_feature}>
                                <img src={bg4} alt="" className={styles.img_bg} />
                                <div className={styles.content_feature}>
                                    <div className={styles.col_6_item}>
                                        <div className={styles.container_icon}>
                                            <img src={icon4}></img>
                                        </div>
                                    </div>
                                    <div className={styles.col_6_item}>
                                        <div className={styles.content}>
                                            <h3>Security Code</h3>
                                            <p>Data Security is one of our best facilities. Allows for your files to be safer. The file can be secured with a code or password that  you created, so only you can open the file.</p>
                                            <Link to='/link'>
                                                <span className={styles.learn_more}>Learn more</span>
                                                <span>
                                                    <FontAwesomeIcon icon = {faArrowRight} className={styles.icon_right}/>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInOnScroll>
                    </div>
                </div>
        </div>

        <FadeInOnScroll>
            <Slider />
        </FadeInOnScroll>

        {/* <FadeInOnScroll>
            <FadeInOnScroll>
                <h2>Tiêu đề 1</h2>
            </FadeInOnScroll>
            <FadeInOnScroll>
                <p className={styles.content}>Nội dung ẩn hiện khi cuộn</p>
                <h1>Hello 1</h1>
                <h2>Hello 2</h2>
                <h3>Hello 3</h3>
            </FadeInOnScroll>
        </FadeInOnScroll> */}
        </div>
  );
}
