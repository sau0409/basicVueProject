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
		},
		remove(index, ind) {
			this.astData[ind].splice(index,1);
		},
		getMyStyle(data) {
            if(data.is_potentially_hazardous_asteroid === true) {
				return [{ border: 'solid 2px red'}, {color: 'red'}]
			}
		}
	},
	computed: {
		closestObj(){
			let closestDist = 999999999999999999999999999999999;
			let closestName = "";
			console.log('in computed');
			for(let astArr in this.astData) {
				console.log(this.astData[astArr]);
				console.log(this.astData[astArr].length);
				for(let ast=0; ast< this.astData[astArr].length; ast++) {
					console.log(this.astData[astArr][ast]);
					if(this.astData[astArr][ast].close_approach_data.length > 0) {
                   if(parseInt(this.astData[astArr][ast].close_approach_data[0].miss_distance.kilometers) < closestDist) {
					   console.log('in check');
					   console.log(closestName);
					   console.log(closestDist);
					   closestDist = this.astData[astArr][ast].close_approach_data[0].miss_distance.kilometers;
					   closestName = this.astData[astArr][ast].name;
				   }
				}
				}
			}
			return closestName;
		},

		astNum() {
			let count =0;
			for(let astArr in this.astData) {
				for(let ast=0; ast< this.astData[astArr].length; ast++) {
                  count++;
				}
			}
			return count;
		},
		closestObjPass() {
			let filteredArr = [];
            for(let astArr in this.astData) {
					let objHasMissdata = this.astData[astArr].filter((obj) => {
                         return obj.close_approach_data.length > 0
					});
					filteredArr = filteredArr.concat(objHasMissdata);
			}
			console.log(filteredArr);

			let simpleFilteredArr = filteredArr.map((obj) => {
                 return {name: obj.name, missDist: obj.close_approach_data[0].miss_distance.kilometers}
			});

			console.log(simpleFilteredArr);

			let sortedSimFilArr = simpleFilteredArr.sort((a,b) => {
				return a.missDist - b.missDist;
			})

			return sortedSimFilArr[0];
		}
	}
})
