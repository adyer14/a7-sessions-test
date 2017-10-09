import React from 'react';

class Comment extends React.Component {
	render() {
		const { details } = this.props;
		return (
			<p className='comment'>{details.comment}</p>
		)
	}
}

export default Comment;