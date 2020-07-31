// script

// document.getElementById("id1").innerText = 'Hello'; vanialla javascript


// creating vue instance

var app = new Vue({
	el: '#app',  // mounts vue to root div id 
	data: {
		heading: "I am vue heading.",
		email: "example@hulk.com"
	}
})