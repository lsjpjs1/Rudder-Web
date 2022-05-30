import * as React from "react";
import {PostDetailType, PostPreview} from "../modules/post";

type PostDetailProps = {
    postDetail: PostDetailType
}
const PostDetail = (postDetailProps:PostDetailProps) =>{
    console.log(postDetailProps)
    const {postDetail} = postDetailProps
    return (
       <div>
           {postDetail.postTime}<br/>
           {postDetail.categoryAbbreviation}<br/>
           {postDetail.userNickname}<br/>
           {postDetail.postBody}<br/>
           {
               postDetail.imageUrls&&postDetail.imageUrls.map((url)=>
                   (
                       <img src={url} height={"200px"} alt={""}/>
                   )
               )
           }

       </div>
    );
}


export default PostDetail