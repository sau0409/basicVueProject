// script

// document.getElementById("id1").innerText = 'Hello'; vanialla javascript


// creating vue instance

var app = new Vue({
	el: '#app',  // mounts vue to root div id 
	data() {
		return {
		heading: "Email Subscribe",
		email: "example@hulk.com",
		submitted: false
		}
	},
	methods: {
		submitEmail(){
			alert(`Submitted your mail ${this.email}`);
			this.submitted = true; // changing submiited value once email is submited successfully to shoe message.
		}
	}
})