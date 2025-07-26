
async function Authorization({ url, options = {} } : {url : string, options: RequestInit}) {
    const tokenString = localStorage.getItem('token');
    const accessToken = tokenString ? JSON.parse(tokenString) : null;
    const refreshTokenString = localStorage.getItem('refreshToken');
    const refreshToken = refreshTokenString ? JSON.parse(refreshTokenString) : null;
    const API = import.meta.env.VITE_API_URL;

    const defaultHeaders = {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`
    };

    let response = await fetch(url, {
        ...options,
        headers: defaultHeaders
    });

    // Nếu accessToken hết hạn
    if (!response.ok) {
        const refreshResponse = await fetch(`${API}/auth/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken })
        });

        if (!refreshResponse.ok) {
            throw new Error('Lỗi refreshToken');
        }

        const data = await refreshResponse.json();
        localStorage.setItem('token', JSON.stringify(data.accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));

        // Gọi lại fetch với token mới
        response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${data.accessToken}`
            }
        });
    }

    return response.json();
}

export default Authorization;
