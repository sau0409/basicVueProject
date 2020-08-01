// script

// document.getElementById("id1").innerText = 'Hello'; vanialla javascript


// creating vue instance

//repushing




var app = new Vue({
	el: '#app', // mounts vue to root div id 
	data() {
		return {
			heading: "Integrating with NASA",
			heading1: "Astronomy Picture By NASA",
			heading2: "Near Objects To Earth By NASA",
			email: "example@hulk.com",
			submitted: false,
			imgTitle: "",
			imgDate: "",
			imgUrl: "",
			startDate: "",
			endDate: "",
			astData: {},
			astDataKey: []
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
		},
		async getNearAstFromNasa(startDate, endDate) {
			const url = "https://api.nasa.gov/neo/rest/v1/feed?api_key=DEMO_KEY";
			try{
			   
				const response = await axios.get(`${url}&start_date=${startDate}&end_date=${endDate}`);
					console.log(response.data.near_earth_objects);
					this.astData = response.data.near_earth_objects;
					for (date in response.data.near_earth_objects) {
						this.astDataKey.push(date)
					}
			}
			catch(err){
				console.log(err);
			}
		},
		getCloseAppDate(data) {

			if(data.close_approach_data[0].close_approach_date_full != null) {
				return data.close_approach_data[0].close_approach_date_full;
			}
			else {
				return 'NA';
			}
		}
	}
})
