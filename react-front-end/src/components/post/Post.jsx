import React, { useState, useEffect, useContext } from 'react';
import { MoreVert } from '@material-ui/icons'
import './post.css'
import heart from '../../assets2/heart.png'
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';




const Post = ({ post }) => {
    const [ like, setLike ] = useState(post.likes.length);
    const [ isLiked, setIsLiked ] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext);


    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes]);

    useEffect(() => {
        const fetchUser = async () => {
          try {
            
            const res = await axios.get(`https://freedomnet-node-backend.herokuapp.com/api/users?userId=${post.userId}`);
            setUser(res.data);
    
          } catch (err) {
            console.log(err);
          }
        }
        
        fetchUser();
      },[post.userId])

    const likeHandler = () => {
        try {
            axios.put('https://freedomnet-node-backend.herokuapp.com/api/posts/' + post._id + 'https://freedomnet-node-backend.herokuapp.com/api/like', {userId:currentUser._id})
        } catch (err) {
            
        }
        setLike( isLiked ? like-1 : like+1);
        setIsLiked(!isLiked);
    }

    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                        <img className='postProfileImg' src={ user.profilePicture ? PF + user.profilePicture : PF+"person/noAvatar.png"} alt="" />
                        </Link>
                        <span className="postUsername">
                            {user.username}
                        </span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                     <span className="postText">{post?.desc}</span>

                     <img className='postImg' src={PF+post.img} alt="" />
                     {/* <video className='postImg' controls >
                        <source src={PF+post.img} type='video/mp4' />
                    </video> */}
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className='likeIcon' src={heart} alt="" onClick={likeHandler}/>
                        <span className='postLikeCounter'>{like} { like === 1 ? 'like' : 'likes' }</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;