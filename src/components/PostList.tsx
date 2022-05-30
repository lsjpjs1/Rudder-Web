import {clickPost, PostPreview, showPostRestore} from "../modules/post";
import {Button, Typography} from "@mui/material";
import {callLogin} from "../modules/login";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {RootState} from "../modules";
import {useNavigate} from "react-router-dom";


type PostListProps = {
    postPreviews: Array<PostPreview>
    onNextBtnClick: () => void
}

const PostList = (postListProps: PostListProps) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onClickPost = (postPreview: PostPreview) => {
        navigate("/post")
        // @ts-ignore
        dispatch(clickPost(postPreview))
    }

    const selectedPost = useSelector((state: RootState) => state.postReducer.selectedPost)
    const showPostFlag = useSelector((state: RootState) => state.postReducer.showPostFlag)


    const elements = postListProps.postPreviews.map((postPreview) => {
            const simpleDate = new Date(postPreview.postTime)
            return (
                <div key={postPreview.postId}>
                    <Button onClick={()=>onClickPost(postPreview)}>
                        <div>
                            <img height={"50px"} alt={""} src={postPreview.userProfileImageUrl}/>
                            <div style={{display:"inline"}}>
                                {postPreview.userNickname}<br/>
                                {postPreview.categoryName}<br/>
                                {simpleDate.toDateString()}
                            </div>
                        </div>
                        <br/>

                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            {postPreview.postBody}
                        </Typography>
                    </Button>
                    <br/>
                </div>
            )
        }
    );

    return (
        <div>
            {elements}
            <div>
                <Button onClick={postListProps.onNextBtnClick}>Next</Button>
            </div>
        </div>

    );
}


export default PostList