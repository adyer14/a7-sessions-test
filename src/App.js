import React, { Component } from 'react';
import logo from './logo.svg';
import samplePosts from './op.js';
import './App.css';
import HeardFeed from './HeardFeed';
import PostEditor from './PostEditor';
import base from './base';
//import 'firebase/auth';

class App extends Component {

  constructor() {
    super ()
    this.loadSamples = this.loadSamples.bind(this);
    this.addPost = this.addPost.bind(this);
    this.editPost = this.editPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.verifyUser = this.verifyUser.bind(this);
    this.verifyDelete = this.verifyDelete.bind(this);
    this.state = {
      originalPosts: {}
    };


  }

  componentWillMount() {
    this.ref = base.syncState('Goat-Feed', {
      context: this,
      state: 'originalPosts'
    });

    //firebase log in
    const auth = base.initializedApp.auth();
    auth.signInAnonymously();

    auth.onAuthStateChanged(firebaseUser => {
      console.log(firebaseUser);
      console.log(auth.app.INTERNAL.getUid())
    });
  }

  componentWillUnMount() {
    base.removedBinding(this.ref);

    //firebase log out
    base.initializedApp.signOut();
  }


  loadSamples () {
    this.setState({
      originalPosts: samplePosts
    })
    console.log(samplePosts);
  }

  addPost(originalPost) {
    const originalPosts = {...this.state.originalPosts}
    var key = `originalPosts-${Date.now()}`;
    originalPosts[key] = originalPost
    base.post('Goat-Feed/' + key, { data: {User: base.initializedApp.auth().app.INTERNAL.getUid()}});
    this.setState( {originalPosts} )
  }


    verifyUser (key, updatedPost, callback) {
    base.initializedApp.database().ref('Goat-Feed/' + key).once('value').then(function(snapshot) {
    var username = (snapshot.val() && snapshot.val().User)
    if (snapshot.val().User === base.initializedApp.auth().app.INTERNAL.getUid()) {
      callback(key, updatedPost, true);
    }
    else {
      callback(key, updatedPost, false)
    }
  })
  }

  editPost(key, updatedPost, verified) {
    if (verified) {
      const originalPosts = {...this.state.originalPosts}
      originalPosts[key] = updatedPost;
      this.setState( {originalPosts} )
  } else {
    alert("You cannot edit that post. You did not create it.")
  }
}



    verifyDelete (key, callback) {
    base.initializedApp.database().ref('Goat-Feed/' + key).once('value').then(function(snapshot) {
    var username = (snapshot.val() && snapshot.val().User)
    if (snapshot.val().User === base.initializedApp.auth().app.INTERNAL.getUid()) {
      callback(key, true);
    }
    else {
      callback(key, false)
    }
  })
  }


  deletePost(key, verified) {
    if (verified) {
      const originalPosts = {...this.state.originalPosts}
      base.remove('Goat-Feed/' + key)
      delete originalPosts[key]
      this.setState( {originalPosts} )
  } else {
      alert("You cannot delete that post. You did not create it.")
    }
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Goat-Heard</h1>
        </header>
        <div className="heardformat">
          <HeardFeed 
            originalPosts = {this.state.originalPosts}
            loadSamples = {this.loadSamples}
            />
          <PostEditor 
            originalPosts = {this.state.originalPosts}
            addPost = {this.addPost}
            editPost = {this.editPost}
            deletePost = {this.deletePost}
            verifyUser = {this.verifyUser}
            verifyDelete = {this.verifyDelete}
          />
        </div>
      </div>
    );
  }
}

export default App;
