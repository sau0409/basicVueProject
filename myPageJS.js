// script

// document.getElementById("id1").innerText = 'Hello'; vanialla javascript


// creating vue instance



var app = new Vue({
	el: '#app', // mounts vue to root div id 
	data() {
		return {
			heading: "Astronomy Picture By NASA",
			email: "example@hulk.com",
			submitted: false,
			imgTitle: "",
			imgDate: "",
			imgUrl: ""
		}
	},
	methods: {
		submitEmail() {
			alert(`Submitted your mail ${this.email}`);
			this.submitted = true; // changing submiited value once email is submited successfully to shoe message.
		},
		async getImageFromNasa(date) {
			const url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";
			try{
			   
				const response = await axios.get(`${url}&date=${date}`);
				    this.imgUrl = response.data.url;
					this.imgTitle = response.data.title;
			}
			catch(err){
				console.log(err);
			}
		}
	}
})

/*
async function getImageFromNasa(date) {

	try {

		const response2 = await axios.get(`${url}`);
		console.log(response2);

		const response = await axios.get(`${url}&date=${date}`);
		console.log(response);
		this.imgUrl = response;

	}
	catch(err){
        console.log(err);
	}

}
*/