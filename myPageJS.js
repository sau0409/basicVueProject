// script

// document.getElementById("id1").innerText = 'Hello'; vanialla javascript


// creating vue instance

//repushing

let mycomponent = {
	props: ['msg'],
	data() {
		return{
           colIn: ""
		}
	},
	methods: {
		btnclicked(colIn){
			console.log(colIn);
		   this.$emit('btnclicked', colIn);
	   }
	},
	template: '<div class="card mt-5 p-2">\
	<slot :msg="msg" name="above">\
		<h3 class="card-header">Untitiled</h3>\
		</slot>\
		<div class="card-body">\
		<h1>Hello {{ msg }}!</h1>\
		<div>\
		<label for="colIn">Enter the color for main Heading.</label>\
		<input id="colIn" v-model="colIn" type="text">\
		</div>\
		<div>\
		<button class="btn btn-primary" @click="btnclicked(colIn)">ChangeAppHeadingColor</button>\
		</div>\
		<slot name="below">\
		<p>Default Footer</p>\
		</slot>\
		</div>\
		</div>'
	
}


//not loaded yet

let astronomyimage = {
	data() {
		return {
			heading1: "Astronomy Picture By NASA",
			imgTitle: "",
			imgDate: "",
			imgUrl: ""
		}
	},
	methods: {
		async getImageFromNasa(date) {
			const url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";
			try {
				const response = await axios.get(`${url}&date=${date}`);
				this.imgUrl = response.data.url;
				this.imgTitle = response.data.title;
			} catch (err) {
				console.log(err);
			}
		}
	},
	watch: {
		imgDate(newValue, oldValue) {

			if (newValue == undefined) {

			} else {
				this.getImageFromNasa(newValue);
			}

			return oldValue;

		}
	},
	template: '<div class="card mt-5 p-2">\
	<div class="astronomyImg">\
		<h3 class="card-header">{{heading1}}</h3>\
        <div class="card-body">\
          <div class="dateInput">\
            <label for="date">Date</label>\
            <input v-model="imgDate" type="date" id="date">\
		  </div>\
		  <p class="info font-weight-light">*Image will be shown for selected date</p>\
          <div v-if="imgTitle" v-cloak class="mt-5">\
            <h3>{{ imgTitle }}</h3>\
            <div>\
              <img :class="{imgClass: true}" :src="imgUrl">\
            </div>\
          </div>\
        </div>\
      </div>\
	</div>'
}

let closestasteroid = {
	data() {
		return {
			heading2: "Near Objects To Earth By NASA",
			startDate: "",
			endDate: "",
			astData: {},
			astDataKey: []
		}
	},
	methods: {
		async getNearAstFromNasa(startDate, endDate) {
			const url = "https://api.nasa.gov/neo/rest/v1/feed?api_key=DEMO_KEY";
			try {

				const response = await axios.get(`${url}&start_date=${startDate}&end_date=${endDate}`);
				console.log(response.data.near_earth_objects);
				this.astData = response.data.near_earth_objects;
				for (date in response.data.near_earth_objects) {
					this.astDataKey.push(date)
				}
			} catch (err) {
				console.log(err);
			}
		},
		getCloseAppDate(data) {

			if (data.close_approach_data[0].close_approach_date_full != null) {
				return data.close_approach_data[0].close_approach_date_full;
			} else {
				return 'NA';
			}
		},
		remove(index, ind) {
			this.astData[ind].splice(index, 1);
		},
		getMyStyle(data) {
			if (data.is_potentially_hazardous_asteroid === true) {
				return [{
					border: 'solid 2px red'
				}, {
					color: 'red'
				}]
			}
		}
	},
	computed: {
		closestObj() {
			let closestDist = 999999999999999999999999999999999;
			let closestName = "";
			console.log('in computed');
			for (let astArr in this.astData) {
				console.log(this.astData[astArr]);
				console.log(this.astData[astArr].length);
				for (let ast = 0; ast < this.astData[astArr].length; ast++) {
					console.log(this.astData[astArr][ast]);
					if (this.astData[astArr][ast].close_approach_data.length > 0) {
						if (parseInt(this.astData[astArr][ast].close_approach_data[0].miss_distance.kilometers) < closestDist) {
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
			let count = 0;
			for (let astArr in this.astData) {
				for (let ast = 0; ast < this.astData[astArr].length; ast++) {
					count++;
				}
			}
			return count;
		},
		closestObjPass() {
			let filteredArr = [];
			for (let astArr in this.astData) {
				let objHasMissdata = this.astData[astArr].filter((obj) => {
					return obj.close_approach_data.length > 0
				});
				filteredArr = filteredArr.concat(objHasMissdata);
			}
			console.log(filteredArr);

			let simpleFilteredArr = filteredArr.map((obj) => {
				return {
					name: obj.name,
					missDist: obj.close_approach_data[0].miss_distance.kilometers
				}
			});

			console.log(simpleFilteredArr);

			let sortedSimFilArr = simpleFilteredArr.sort((a, b) => {
				return a.missDist - b.missDist;
			})

			return sortedSimFilArr[0];
		}
	},

	template: '<div class="card nearAst mt-5 p-2">\
	<h3 class="card-header">{{ heading2 }}</h3>\
	<div class="card-body">\
	<div class="dateInput">\
	  <label for="date">Start Date</label>\
	  <input v-model="startDate" type="date" id="date">\
	  <label for="date">End Date</label>\
	  <input v-model="endDate" type="date" id="date">\
	  <button @click.prevent="getNearAstFromNasa(startDate, endDate)" class="btn btn-primary">Search</button>\
	</div>\
	<p class="info font-weight-light">*Date range can be of max 7 days.</p>\
	<div v-if="Object.keys(astData).length !== 0" v-cloak class="card mt-3 output p-2">\
	  <h3>Nearby Earth Objects</h3>\
	  <p>Showing {{ astNum }} results.</p>\
	  <p>Closest Asteroid {{ closestObjPass.name }} Missed Earth By {{ closestObjPass.missDist }} Kms</p>\
	  <div>\
		<table class="table table-striped">\
		  <thead class="thead-light">\
			<tr>\
			  <td>\
				<h5>Asteroid Name</h5>\
			  </td>\
			  <td>\
				<h5>Asteroid Diameter Max(meters)</h5>\
			  </td>\
			  <td>\
				<h5>Asteroid Approach Date</h5>\
			  </td>\
			  <td>\
				<h5>Is Potentially Hazordous</h5>\
			  </td>\
			  <td>\
				<h5>Miss Distance</h5>\
			  </td>\
			  <td>\
				<h5>Remove</h5>\
			  </td>\
			</tr>\
		  </thead>\
		  <tbody v-for="(date, ind) in astData">\
			<tr v-for="(data, index) in date" :style="getMyStyle(data)" style="color: green;">\
			  <td>{{ data.name }}</td>\
			  <td>{{ data.estimated_diameter.meters.estimated_diameter_max }}</td>\
			  <td>{{ getCloseAppDate(data) }}</td>\
			  <td>{{ data.is_potentially_hazardous_asteroid }}</td>\
			  <td>\
				<ul v-if="data.close_approach_data[0].close_approach_date_full != null">\
				  <li v-for="(value, key) in data.close_approach_data[0].miss_distance">{{key}} : {{ value }}</li>\
				</ul>\
			  </td>\
			  <td>\
				<button class="btn btn-warning" @click="remove(index, ind)">Remove</button>\
			  </td>\
			</tr>\
		  </tbody>\
		</table>\
	  </div>\
	</div>\
	</div>\
  </div>'
}

let sharefeedback = {
	data() {
		return {
			heading3: 'Share Your Feedback',
			email: "example@hulk.com",
			submitted: false,
			feedback: ""
		}
	},
	methods: {
		submitEmail() {
			alert(`Submitted your mail ${this.email}`);
			this.submitted = true; // changing submiited value once email is submited successfully to shoe message.
		}
	},
	template: '<div class="card subscribe mt-5 p-2">\
	<h3 class="card-header">{{heading3}}</h3>\
	<form v-if="!submitted" class="card-body">\
	  <div class="form-group">\
	  <div>\
	  <label for="feedbackArea">Feedback : </label>\
	  <textarea id="feedbackArea" v-model="feedback"></textarea>\
	  </div>\
	  <div>\
		<label for="email">Email</label>\
		<input type="email" id="email" v-model="email" class="form-control form-control-lg">\
		</div>\
	  </div>\
	  <button type="submit" v-on:click.prevent="submitEmail" class="btn btn-primary">Submit</button>\
	</form>\
	<h3 v-else v-cloak class="mt-5">Thankyou!</h3>\
	<h3 v-show="submitted" v-cloak class="mt-5">For shairing your feedback.</h3>\
  </div>'
}

var app = new Vue({
	el: '#app', // mounts vue to root div id
	components: {
		astronomyimage,
		closestasteroid,
		sharefeedback,
		mycomponent
	},
	data() {
		return {
			heading: "Integrating with NASA",
			headStyle: {color: 'green'}
		}
	},
	methods: {
		btnClicked(colIn){
			console.log(`button clicked in component ${colIn}`);
			this.headStyle.color = colIn;
		}
	}
})