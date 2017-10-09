import React from 'react';
import samplePosts from './op.js';
import PostCreator from './PostCreator';

class PostEditor extends React.Component {
	constructor() {
		super();
		this.renderOriginalPostsForm = this.renderOriginalPostsForm.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}


	handleChange(e, key) {
		const originalPost = this.props.originalPosts[key]
		const updatedPost = {...originalPost, [e.target.name]: e.target.value}
		this.props.verifyUser(key, updatedPost, this.props.editPost)
	}

	renderOriginalPostsForm(key) {
		const originalPost = this.props.originalPosts[key]
		return(
			<div className='originalPostForm' key={key}>
				<input name='originalPost'
					value={originalPost.originalPost}
					type='text'
					placeholder='Post Content'
					onChange={(e) => this.handleChange(e, key)}
				/>
				<button onClick={() => this.props.verifyDelete(key, this.props.deletePost)}>Remove Post</button>
			</div>
			)
	}

	render() {
		return (
			<div>
			<h3 className='PostEditor'>Post Editor</h3>
			{
				Object.keys(this.props.originalPosts)
				.map(this.renderOriginalPostsForm)
			}
			<h3>Create Post</h3>
       		<PostCreator addPost={this.props.addPost}/>

			</div>
		)
	}
}

export default PostEditor;