
// function Authorization({url, options = {}}) {
//     const accessToken = JSON.parse(localStorage.getItem('token'));
//     const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
//     console.log('refreshToken:', refreshToken);
//     const defaultHeaders = {
//         ...options.headers,
//         'Authorization': `Bearer ${accessToken}`
//     };


//     return (
//         fetch(url, {
//             ...options,
//             headers: defaultHeaders
//         })
//             .then(res => {
//                 if (!res.ok) {
//                     fetch('https://nestjs-vercel-197.vercel.app/auth/refresh-token', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json'
//                         },
//                         body: JSON.stringify({refreshToken: refreshToken})
//                     })
//                         .then(res => {
//                             console.log(res);
//                             if (!res.ok) {
//                                 throw new Error('Lỗi refreshToken')
//                             }
//                             return res.json();
//                         })
//                         .then(data => {
//                             localStorage.setItem('token', JSON.stringify(data.accessToken));
//                             localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));
                            
//                             return fetch(url, {
//                                 ...options,
//                                 headers: {
//                                     ...options.headers,
//                                     'Authorization': `Bearer ${data.accessToken}`
//                                 }
//                             })
//                                 .then(res => res.json())
//                         })
//                         .catch(err => console.log(err.message))
//                 }
//                 return res.json();
//             })
//     )
// }

// export default Authorization;


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
