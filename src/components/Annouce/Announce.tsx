import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Announce.module.scss';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function Announce({title} : {title: string}) {

    return (
        <div className={styles.announce}>
            <div>
                <FontAwesomeIcon icon={faCircleCheck} className={styles.icon}/>
            </div>
            <div>
                <p>{title}</p>
            </div>
        </div>
    );
}

export default Announce;