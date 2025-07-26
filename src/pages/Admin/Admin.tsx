import styles from './Admin.module.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPen, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import Announce from '../../components/Annouce/Announce';
import { useNavigate } from 'react-router-dom';
import Authorization from '../../components/Authorization/Authorization';
import ReactPaginate from 'react-paginate';

function Admin() {
    type Post = {
        id: string;
        title: string;
        description: string;
        tags: string[];
    };

    type PostsResponse = {
        posts: Post[];
        current_page: number;
        total_page: number;
        page_size: number;
        total: number;
    };
    const [posts, setPosts] = useState<Post[]>([]);
    const [title, setTitle] = useState<Post[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [curPage, setCurPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [titleFilter, setTitleFilter] = useState<string>('');
    const [tagFilter, setTagFilter] = useState<string>('');
    const getToken = localStorage.getItem('token');
    const [announce, setAnnounce] = useState(false);
    const [show, setShow] = useState<{ state: boolean; id: string }>({state: false, id: ''});
    const navigate = useNavigate();
    const [cb, setCb] = useState(false);
    const token = getToken ? JSON.parse(getToken)  : null;
    const API = import.meta.env.VITE_API_URL;
    
    useEffect(() => {        
        Authorization({url: `${API}/posts?page=${curPage}&title=${titleFilter}&tags=${tagFilter}`, options: {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }})
            .then((data : PostsResponse) => {
                console.log(data);
                
                setPosts(data.posts);
                setCurPage(data.current_page);
                setTotalPage(data.total_page);
            })

    }, [titleFilter, tagFilter, cb, curPage])

    useEffect(() => {
        Authorization({url: `${API}/posts?page=${curPage}&title=&tags=`, options: {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }})
        .then(data => {
            setTitle(data.posts);
        })

        Authorization({url: `${API}/posts/tags`, options: {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }})
        .then(data => setTags(data))

    }, [curPage])

    const handleEdit = (id : string, title : string, description : string, tags : string[]) => {
        navigate(`/profile/post/edit?Id=${id}`, {
            state: {
                title, description, tags
            }
        });
    }

    const handleDelete = (id : string) => {
        setShow({state: true, id: id});
    }

    const handleConfirm = () => {
        console.log(`${API}/posts/${show.id}`);
        
        setShow({ state: false, id: '' });
        setAnnounce(true);
        fetch(`${API}/posts/${show.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.text())
            .then(data => console.log('delete:', data))
        
        setTimeout(() => {
            setAnnounce(false);
        }, 2000);

        setCb(prev => !prev);
    }

    const handleAdd = () => {
        navigate('/profile/post/add')
    }

    // const handleSearch = (e) => {
    //     e.preventDefault();

    //     setTitleFilter(search);
    // }

    const handlePageChange = (e : {selected : number}) => {
        setCurPage(e.selected + 1);
    }
    
    return (
        <>
            <div className={styles.admin}>
                    <div className={styles.container_manage}>
                        <div className={styles.select}>
                            <button className={styles.add_new} onClick={handleAdd}>Add new</button>
                            {/* <form onSubmit={handleSearch}>
                                <input 
                                className={styles.search}
                                placeholder='Nhập title muốn tìm'
                                onChange={e => setSearch(e.target.value)}
                                ></input>
                                <button type='submit'></button>
                                </form> */}
                            <div className={styles.title}>
                                <select value={titleFilter} onChange={e => setTitleFilter(e.target.value)}>
                                    <option value=''>Title</option>
                                    {title.map((post, index) => (
                                        <option value={post.title} key={index}>{post.title}</option>
                                    ))}
                                </select>
                                <select onChange={e => setTagFilter(e.target.value)} className={styles.select_tag_none}>
                                    <option value=''>Tags</option>
                                    {tags.map((tag, index) => (
                                        <option value={tag} key={index}>{tag}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={styles.paginate_phone}>
                            <ReactPaginate
                                pageCount={totalPage}
                                onPageChange={handlePageChange}
                                containerClassName={styles.paginate}
                                pageLinkClassName={styles.link_page}
                                activeClassName={styles.active}
                                pageClassName={styles.page}
                                previousClassName={curPage === 1 ? styles.op_previous : styles.previous}
                                nextClassName={curPage === totalPage ? styles.op_next : styles.next}
                                previousLinkClassName={curPage === 1 ? styles.op_previous : styles.previous}
                                nextLinkClassName={curPage === totalPage ? styles.op_next : styles.next}
                                previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
                                nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
                            ></ReactPaginate>
                        </div>
                        {posts.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th className={styles.id_phone}>ID</th>
                                        <th className={styles.stt_phone}>STT</th>
                                        <th>Title</th>
                                        <th className={styles.des}>Description</th>
                                        <th>Tags</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((post, index) => (
                                        <tr key={post.id}>
                                            <td className={styles.id_phone}>{post.id}</td>
                                            <td className={styles.stt_phone}>{index + 1}</td>
                                            <td>{post.title}</td>
                                            <td className={styles.des}>{post.description}</td>
                                            <td>{post.tags.length > 0 && post.tags.join(', ')}</td>
                                            <td>
                                                <div className={styles.btn_action}>
                                                    <button onClick={() => handleEdit(post.id, post.title, post.description, post.tags)}>
                                                        <FontAwesomeIcon icon={faPen}/>
                                                    </button>
                                                    <button onClick={() => handleDelete(post.id)}>
                                                        <FontAwesomeIcon icon={faTrash}/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Không tìm thấy</p>
                        )}
                    </div>

                {announce && <Announce title='Bạn đã xóa thành công!!!' />}
                {show.state && (
                    <>
                        <div className={styles.show} onClick={() => setShow({state: false, id: ''})}>
                            <FontAwesomeIcon icon={faXmark} className={styles.icon_xmark}/>
                        </div>
                        <div className={styles.confirm}>
                            <h3>Bạn có chắc chắn muốn xóa post ID là: <span>{show.id}</span> không?</h3>
                            <div>
                                <button onClick={handleConfirm} className={styles.btn_confirm}>Đồng ý</button>
                                <button className={styles.btn_cancel} onClick={() => setShow({state: false, id: ''})}>Hủy</button>
                            </div>
                        </div>
                    </>
                )}

            </div>
            <div className={styles.paginate_lap}>
                <ReactPaginate
                    pageCount={totalPage}
                    onPageChange={handlePageChange}
                    containerClassName={styles.paginate}
                    pageLinkClassName={styles.link_page}
                    activeClassName={styles.active}
                    pageClassName={styles.page}
                    previousClassName={curPage === 1 ? styles.op_previous : styles.previous}
                    nextClassName={curPage === totalPage ? styles.op_next : styles.next}
                    previousLinkClassName={curPage === 1 ? styles.op_previous : styles.previous}
                    nextLinkClassName={curPage === totalPage ? styles.op_next : styles.next}
                    previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
                    nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
                ></ReactPaginate>
            </div>
        </>
    );
}

export default Admin;