const landingPage = document.querySelector('.landingPage');
const time = document.querySelector('#numbers');
const greetings = document.querySelector('#greetings');
const uName = document.querySelector('#userName');
const quot = document.querySelector('#quote');
const placeName =document.querySelector("#placeName"); 
const MAPBOX_API =
  "pk.eyJ1IjoiZ29waWtybSIsImEiOiJjbGVjamdlcTYwNDVkM29tdW84ZXM0OHJzIn0.QFjEknxbT-y6iB_ZPJb1-w";

const quotes = [
    "I am capable of achieving my goals.",
    "Today is going to be a great day.",
    "I am doing my best, and that's good enough.",
    "Good things are coming my way.",
    "My thoughts and feelings matter.",
  ];


const images = ["Assets/Images/landing-bg-1.jpg",
                "Assets/Images/landing-bg-2.jpg",
                "Assets/Images/landing-bg-3.jpg",
                "Assets/Images/landing-bg-4.jpg",
                "Assets/Images/landing-bg-5.jpg"];



                  


function getImage(){
    const n = Math.floor(Math.random() * images.length);

    quot.innerText = quotes[n];

    landingPage.style.backgroundImage=`url(${images[n]}),linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))`;
    
}



 
function addZero(time){

    if(parseInt(time) < 10){

        return `0${time}`;
    }
    else{
         
        return time;
    }

}

setInterval(() =>{

    let newTime =new Date();
    let hours = newTime.getHours();
    let minutes = newTime.getMinutes();
    let seconds = newTime.getSeconds();

    let amPm= (hours >=12)? "PM" : "AM"

    
    time.innerHTML=`${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)} ${amPm}`;

    

}, 1000);


function greetByDay(){

    let hour = new Date().getHours();
    if (parseInt(hour) < 12){

        greetings.innerHTML=`Good Morning, `;

    }
    else if(parseInt(hour) < 16 ){
        greetings.innerHTML=`Good Afternoon, `;
    }
    else{

        greetings.innerHTML=`Good Evening, `;
    }
}

const getLocationData = () => {
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      getData(latitude, longitude);
    };
    const error = () => {
      placeName.innerText = "nothing";
    };
    navigator.geolocation.getCurrentPosition(success, error);
  };
  
  // API call to convert latitude & longitude to place
  const getData = async (lat, long) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?types=place&access_token=${MAPBOX_API}`;
    const response = await fetch(url);
    const locationData = await response.json();
    if (locationData.features && locationData.features.length > 0) {
      placeName.innerText = "Place - " + locationData.features[0].place_name;
    }
  };
  

function setName(e){

    if(e.type === 'keypress'){

        if(e.keyCode == 13 || e.which == 13)
        {
            if(uName.innerText.trim().length == 0){
               uName.textContent="[EnterValidName]";
                
            }
            else{
                localStorage.setItem('name',e.target.innerText);
                uName.blur();
            }

        }
        

        
    }
    

}

function getName(){

    if(localStorage.getItem('name') === null || localStorage.getItem('name') === ""){

        uName.innerHTML='[Enter Name]';
    }
    else{
        
        uName.innerHTML=localStorage.getItem('name');
    }
}

function mouseClick(){

    uName.innerHTML= '[enter name]';
    localStorage.setItem('name','[enter name]')
   
}



uName.addEventListener('keypress',setName);
uName.addEventListener('click',mouseClick);

getName();
greetByDay();
getImage();






