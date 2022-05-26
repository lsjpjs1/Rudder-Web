import {PostPreview} from "../modules/post";
import {Button, Typography} from "@mui/material";


type PostListProps = {
    postPreviews: Array<PostPreview>
}

const PostList = (postListProps: PostListProps) => {

    const elements = postListProps.postPreviews.map((postPreview) => {
            const simpleDate = new Date(postPreview.postTime)
            return (
                <div key={postPreview.postId}>
                    <Button>
                        <div>
                            <img height={"50px"} src={postPreview.userProfileImageUrl}/>
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
        </div>

    );
}


export default PostList