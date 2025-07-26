import { useEffect, useState } from "react";
import FadeInOnScroll from "../FadeInOnScoll/FadeInOnScroll";
import styles from './Slider.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Slider() {
    type Galleries = {
        name: {
            first: string,
            last: string
        },
        email: string,
        picture: {
            large: string
        },
        location: {
            street: {
                number: Number,
                name: string
            }
            country: string,
            city: string,
            state: string
        },
        university: string
    };

    const [gallery, setGallery] = useState<Galleries[]>([]);
    const [curIndex, setCurIndex] = useState<number>(0);
    useEffect(() => {
        fetch("https://randomuser.me/api/?results=4&seed=4")
            .then(res => res.json())
            .then(data => {
                setGallery(data.results);
            })
    }, [])

    const nextSlider = (index : number) => {
        console.log('index', index, typeof index);
        
        setCurIndex(index)
    }

    const handleNextBtn = () => {        
        setCurIndex(prev => prev + 1);
    }

    const handlePrevBtn = () => {
        setCurIndex(prev => prev - 1)
    }

    return (
        <div className={styles.container_testimonials}>
            <FadeInOnScroll>
                <h1>Testimonials</h1>
            </FadeInOnScroll>

            <FadeInOnScroll>
                {curIndex !== 0 && (
                    <button 
                        className={styles.prev_btn}
                        onClick={handlePrevBtn}
                        >
                        <FontAwesomeIcon icon={faArrowLeft}/>
                    </button>
                )}

                {curIndex !== gallery.length - 1 && (
                    <button
                        onClick={handleNextBtn}
                        className={styles.next_btn}
                    >
                        <FontAwesomeIcon icon={faArrowRight}/>
                    </button>
                )}
                <div className={styles.testimonials}>

                    <div style={{display: 'flex', transform: `translateX(-${curIndex * 25}%)`, margin: '0px 20px'}}>
                        {gallery?.map((galler, index) => (
                            <div 
                                className={styles.items} 
                                key={index} 
                            >
                                <img src={galler?.picture?.large}></img>
                                <div>
                                    <h4>{galler.name.first} {galler.name.last}</h4>
                                    <span>{galler.email}</span>
                                    <p>{`${galler.name.first} ${galler.name.last} currently lives at ${galler.location.street.number} ${galler.location.street.name}, ${galler.location.city}, ${galler.location.state}, ${galler.location.country}.`}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </FadeInOnScroll>
            <div className={styles.container_dot}>
                {gallery?.map((_, index) => (
                    <div 
                        className={`${styles.dot} ${curIndex === index && styles.active}`}
                        onClick={() => nextSlider(index)}
                        key={index}
                    ></div>
                ))}
                {/* <div className={`${styles.dot} ${styles.active}`}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div> */}
            </div>
        </div>
    );
}

export default Slider;