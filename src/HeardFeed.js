import React from 'react';
import OriginalPost from './OriginalPost';
import Comment from './Comment';

class HeardFeed extends React.Component {
	render() {
		return (
			<div className="postThread">
				<h2>HeardFeed</h2>
				<button onClick={this.props.loadSamples}>Load Samples</button>
				<ul className='listOfOPs'>
				{
					Object.keys(this.props.originalPosts)
					.map(key =>
					<OriginalPost
						key = {key}
						details = {this.props.originalPosts[key]}
						/>)
				}
				</ul>
			</div>
		)
	}
}

export default HeardFeed;