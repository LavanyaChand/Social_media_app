//FOR LIKES AND SAVES

import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import type { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

type PostStatsProps = {
    post?: Models.Document;
    userId: string;
}

const PostStats = ({ post, userId }: PostStatsProps) => {

    const likesList = post?.likes.map((user: Models.Document) => user.$id) // This gives likes list

    const [ likes, setLikes ] = useState(likesList);
    const [ isSaved, setIsSaved ] = useState(false); 

    const { mutate: likePost } = useLikePost();
    const { mutate: savePost, isPending: isSavingPost } = useSavePost();
    const { mutate: deleteSavedPost, isPending: isDeleteingSaved } = useDeleteSavedPost();

    const { data: currentUser } = useGetCurrentUser();

    const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.post.$id === post?.$id);

    useEffect(() => {

        // { saved: true } => !savedPostRecord => !false = true;
        // 'test' => !'test' => !false = true;
        // '' => !'' => !true = false;

        setIsSaved(!!savedPostRecord) //truthy value 
         
    }, [currentUser])

    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation(); //so u can only click like button and it will not affect anything else other than like button

        let newLikes = [...likes];

        const hasLiked = newLikes.includes(userId);

        if(hasLiked) {
            newLikes = newLikes.filter((id) => id !== userId );
        }

        else{
            newLikes.push(userId);
        }

        setLikes(newLikes);
        likePost({ postId: post?.$id || '', likesArray: newLikes })
    }

    const handleSavePost = (e: React.MouseEvent) => {
         e.stopPropagation(); //so u can only click like button and it will not affect anything else other than like button

         if(savedPostRecord){
            setIsSaved(false);
            deleteSavedPost(savedPostRecord.$id);
         }

         else{
             savePost({ postId: post?.$id || '', userId });
             setIsSaved(true);
         }
    }

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
          <img
            src={
              checkIsLiked(likes, userId)
                ? "/assets/icons/liked.svg"
                : "/assets/icons/like.svg"
            }
            alt="like"
            width={20}
            height={20}
            onClick={handleLikePost}
            className="cursor-pointer"
          />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        {isSavingPost || isDeleteingSaved ? (
          <Loader />
        ) : (
        <img // template string `` is not required while returning string
          src={`${
            isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"
          }`}
          alt="save"
          width={20}
          height={20}
          onClick={handleSavePost}
          className="cursor-pointer"
        />)}
      </div>
    </div>
  );
}

export default PostStats