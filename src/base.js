import Rebase from 're-base';

    var firebase = require('firebase');
    var app = if (!firebase.apps.length) {
		firebase.initializeApp({
			apiKey: "AIzaSyDlfQpZcSLtxuuWp4jzMyy8D5Cr_eJOiyU",
			authDomain: "goat-heard.firebaseapp.com",
			databaseURL: "https://goat-heard.firebaseio.com",
			storageBucket: "goat-heard.appspot.com",
			messagingSenderId: "572663215225"
    });
	}

    const base = Rebase.createClass(app.database());

    export default base;