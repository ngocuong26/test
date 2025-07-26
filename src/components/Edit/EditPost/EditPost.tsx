import { useLocation, useNavigate } from 'react-router-dom';
import styles from './EditPost.module.scss';
import { useState } from 'react';
import Announce from '../../Annouce/Announce';

function EditPost() {
    const location = useLocation();
    const state = location.state;
    console.log(state);
    const [title, setTitle] = useState<string>(state.title);
    const [description, setDescription] = useState<string>(state.description);
    const navigate = useNavigate();
    const [announce, setAnnounce] = useState(false);

    const handleEdit = () => {
        setAnnounce(true);

        setTimeout(() => {
            setAnnounce(false);
            navigate('/profile')
        }, 1000)
    }

    const handleCancel = () => {
        navigate('/profile');
    }
    

    return (
        <div className={styles.container_edit}>
            <label>Title</label>
            <input value={title} type="text" onChange={e => setTitle(e.target.value)}/>
            <label>Description</label>
            <input value={description} type="text" onChange={e => setDescription(e.target.value)}/>
            <label>Tags</label>
            {/* {tags?.map(tag => (
                <input value={tag} type="text" onChange={e => setTags([...e.target.value])} className={styles.tags}/>
            ))} */}

            <div className={styles.container_btn}>
                <button onClick={handleEdit} className={styles.btn_edit}>Sửa</button>
                <button onClick={handleCancel} className={styles.btn_cancel}>Xóa</button>
            </div>

            {announce && <Announce title='Đã sửa thành công!!!' />}
        </div>
    );
}

export default EditPost;