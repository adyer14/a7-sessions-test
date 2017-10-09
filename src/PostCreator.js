import React from 'react';

class PostCreator extends React.Component {
 createPost(event) {
   event.preventDefault();

   const thePost = {
     originalPost: this.originalPost.value,
   }

   this.props.addPost(thePost);
   this.postCreator.reset();
 }
 render() {
   return (
      <form ref={(input) => this.postCreator = input} className="postCreator" onSubmit={(e) => this.createPost(e)}>
        <input ref={(input) => this.originalPost = input} type="text" placeholder="Post Content" />
        <br />
        <button type="submit">Click to Create Post</button>
      </form>
   )
 }
}

export default PostCreator;