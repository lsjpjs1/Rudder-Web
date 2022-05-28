import {PostPreview} from "../modules/post";
import {Button, Typography} from "@mui/material";


type PostListProps = {
    postPreviews: Array<PostPreview>
    onNextBtnClick: () => void
}

const PostList = (postListProps: PostListProps) => {

    const elements = postListProps.postPreviews.map((postPreview) => {
            const simpleDate = new Date(postPreview.postTime)
            return (
                <div key={postPreview.postId}>
                    <Button>
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