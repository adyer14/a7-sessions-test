import React from 'react';

class OriginalPost extends React.Component {
	render() {
		const { details } = this.props;
		return (
			<h3 className='originalPost'>{details.originalPost}</h3>
		)
	}
}

export default OriginalPost;