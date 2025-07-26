import { useState } from 'react';
import styles from './SignIn.module.scss';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const [username, setUsername] = useState<string>();
    const [err, setErr] = useState<string>('');
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_URL;
    
    const handleLogin = () => {
        fetch(`${API}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username})
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 401) {
                    setErr('*Không đúng, vui lòng nhập lại!');
                    return;
                }
                localStorage.setItem('token', JSON.stringify(data.accessToken));
                localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));
                navigate('/');
            })
    }

    return (
        <div className={styles.container_signin}>
            <h1>Sign In</h1>
            <label>Username</label>
            <input 
                onChange={e => setUsername(e.target.value)}
                onFocus={() => setErr('')}
            ></input>
            {err && <span>{err}</span>}
            <button onClick={handleLogin}>Sign In</button>
        </div>
    );
}

export default SignIn;