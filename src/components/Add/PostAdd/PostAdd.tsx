import { useNavigate } from 'react-router-dom';
import styles from './PostAdd.module.scss';
import { useState } from 'react';
import Announce from '../../Annouce/Announce';

function PostAdd() {
    type ErrType = {
        errTitle?: string;
        errDes?: string;
        errTag?: string;
    };
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [tag, setTag] = useState<string>('');
    const [err, setErr] = useState<ErrType>({});
    const [announce, setAnnounce] = useState<boolean>(false);
    const tokenString = localStorage.getItem('token')
    const token = tokenString ? JSON.parse(tokenString) : null;
    const API = import.meta.env.VITE_API_URL;

    const handleAdd = () => {
        let newErr: ErrType = {};
        if (title.trim() === '') {
            newErr.errTitle = '* Vui lòng nhập title trước khi thêm!';
        }
        if (description.trim() === '') {
            newErr.errDes = '* Vui lòng nhập description trước khi thêm!'
        }
        if (tag.trim() === '') {
            newErr.errTag = '* Vui lòng nhập tag trước khi thêm!';
        }
        
        if (Object.keys(newErr).length > 0) {
            setErr(newErr);
            return;
        }

        fetch(`${API}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title,
                description: description,
                tags: [
                    tag
                ]
            })
        })
            .then(res => res.json())
            .then(data => console.log('post đã thêm:', data))
        setAnnounce(true);
        
        setTimeout(() => {
            navigate('/profile');
        }, 1000)
    }

    return (
        <div className={styles.add_post}>
            <h1>Add post</h1>
            <label>Title</label>
            <input 
                placeholder='Enter value'
                onChange={e => setTitle(e.target.value)}
                onFocus={() => setErr({})}
            >
            </input>
            {err.errTitle && <span>{err.errTitle}</span>}
            <label>Description</label>
            <input 
                placeholder='Enter value'
                onChange={e => setDescription(e.target.value)}
                onFocus={() => setErr({})}
            >
            </input>
            {err.errDes && <span>{err.errDes}</span>}
            <label>Tags</label>
            <input
                onChange={e => setTag(e.target.value)}
            ></input>
            {err.errTag && <span>{err.errTag}</span>}

            <div className={styles.container_btn}>
                <button 
                    className={styles.btn_add}
                    onClick={handleAdd}
                >
                    Add new
                </button>
                <button 
                    className={styles.btn_cancel}
                    onClick={() => navigate('/profile')}
                >
                    Cancel
                </button>
            </div>

            {announce && <Announce title='Bạn đã thêm thành công!!!' />}

        </div>
    );
}

export default PostAdd;