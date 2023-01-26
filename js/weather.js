//define all nodes-------------------------------------------------------------------
const root=document.querySelector(":root");
const body=document.querySelector("body");
const clouds=document.querySelectorAll(".cloud img")
//define  nodes of page0-------------------------------------------------------------------
const page0=document.querySelector(".page0");
const apiBtn=document.querySelector(".page0 .api");
const dbBtn=document.querySelector(".page0 .database");

//define  nodes of home page-------------------------------------------------------------------
const homePage=document.querySelector(".homepage");
//nav bar nodes
    const btnDay=document.querySelector(".day-week .day");
    const btnWeek=document.querySelector(".day-week .week");
    const tempUnit=[document.querySelector(".short-weather .status span") , ...document.querySelectorAll(".daily .card .temp span") ]
    const tempDeg=[document.querySelector(".short-weather .status h2") , ...document.querySelectorAll(".daily .card .temp h2") ]

    const btnC=document.querySelector(".temp-unit .celcius");
    const btnF=document.querySelector(".temp-unit  .fahrenheit");

    const btnLight=document.querySelector(".mode .light");
    const btnDark=document.querySelector(".mode  .dark");


    const backBtn=document.querySelector(".back ");

    //at seacrh
        const allSearchInput=document.querySelectorAll(".search .search-text")
        const searchInput=document.querySelector(".search .search-text.by-api")
        const searchInputDB=document.querySelector(".search .search-text.by-database")
        const searchBtn=document.querySelector(".search .search-icon.by-api ")
        const searchBtnDB=document.querySelector(".search .search-icon.by-database ")
        const ul = document.querySelector("nav .search .suggesstion")
        
//

// container node
    const container=document.querySelector(".container")
// short wather section nodes
    const date=document.querySelector(".short-weather .time .by-api")
    const dateDB=document.querySelector(".short-weather .time .by-database")
    // const dateDB=document.querySelector(".short-weather .time>h2")
   

    const Location=document.querySelector(".short-weather .location span")
    const mainImg=document.querySelector(".short-weather .status img")
    const mainTemp=document.querySelector(".short-weather .status h2")
    const mainCond=document.getElementById("mainCondition")
    const mainHum=document.getElementById("mainHumidity")
//

// daily section nodes
    const daily=document.querySelector(".daily")
    const slider=document.querySelector(".daily .slider")
    const btnSliderLeft=document.querySelector(".daily .slider  .left")
    const btnSliderRight=document.querySelector(".daily .slider  .right")
    const cards=document.querySelectorAll(".daily .slider  .card")
    const h2cards=document.querySelectorAll(".daily .slider  .card>h2")


    const days=document.querySelectorAll(".daily .slider .week");
    const daysTitle=document.querySelectorAll(".daily .slider .week>h2");
    const daysImg=document.querySelectorAll(".daily .slider .week>img");
    const daysTemp=document.querySelectorAll(".daily .slider .week>div>h2");
//

//daily details section
const HumidityCircle=document.querySelector(".Humidity .circle");
const humIndex=document.getElementById("humIndex")
const humStatus=document.getElementById("humStatus")

const uvDiv=document.querySelector(".day-details .uv");
const airDiv=document.querySelector(".day-details .air");
const visDiv=document.querySelector(".day-details .visibility");
const sunDiv=document.querySelector(".day-details .sun");


const uvCircle=document.querySelector(".uv .circle");
const uvIndex=document.querySelector(".uv .circle .index");
const uvStatus=document.getElementById("uvStatus")
const airIndex=document.getElementById("airIndex")
const airStatus=document.getElementById("airStatus")
const windIndex=document.getElementById("windIndex")
const windStatus=document.getElementById("windStatus")
const visIndex=document.getElementById("visIndex")
const visStatus=document.getElementById("visStatus")
const sunrise=document.getElementById("sunrise")
const sunset=document.getElementById("sunset")
//----------------------------------------------refresh system---to stay in same page after refreshing---------------------

var tracer;

body.onload=()=>{
    
    let pageStr=document.cookie
    let page=pageStr.split("=")[1] 
    if(page=="page0"){
        turnToPage0()
    }else if(page=="DBpage"){
        turnToDBPage()
    }else if(page=="apiPage"){
        turnToApiPage()
    }
}

//page0---------------------------------------------------------------------------------------
apiBtn.addEventListener("click",()=>{  
    turnToApiPage()
    tracer="apiPage"
    document.cookie="page="+tracer;
    // console.log(document.cookie)
})
dbBtn.addEventListener("click",()=>{
  turnToDBPage()
  tracer="DBpage"
  document.cookie="page="+tracer;
//   console.log(document.cookie)
})
//home page---------------------------------------------------------------------------------------
backBtn.addEventListener("click",()=>{
    turnToPage0()
    tracer="page0"
    document.cookie="page="+tracer;
    // console.log(document.cookie)
})
//nav bar controlling-------------------------------------------------------------------------

function togglingWeekDay(btnDay,btnWeek){
    const dailyOrHourly=document.querySelector(".daily .title")
    btnDay.onclick=function(){  
        dailyOrHourly.innerText="Hourly"
        this.classList.add("active")
        btnWeek.classList.remove("active")
        for(let i=0;i<cards.length;i++){
            if(i<7){
                cards[i].style.display="none"
            }else{
                cards[i].style.display="flex" 
            } 
        }
    }
    btnWeek.onclick=function(){  
        dailyOrHourly.innerText="Daily"
        this.classList.add("active")
        btnDay.classList.remove("active")
        for(let i=0;i<cards.length;i++){
            if(i>=7){
                cards[i].style.display="none"
            }else{
                cards[i].style.display="flex"
            }
            
        }
       
    }
 }
 

function togglingTemp(btnC,btnF){
    btnC.onclick=function(){  
        this.classList.add("active")
        btnF.classList.remove("active")
        tempUnit.forEach((unit)=>{
            unit.innerHTML="°C"
        })
        tempDeg.forEach((deg)=>{
            deg.innerHTML=Math.round ( convertTempTo(deg.innerHTML,"F-C") )
        })
    }
    btnF.onclick=function(){  
        this.classList.add("active")
        btnC.classList.remove("active")
        tempUnit.forEach((unit)=>{
            unit.innerHTML="°F"
        })
        tempDeg.forEach((deg)=>{
            deg.innerHTML=Math.round ( convertTempTo(deg.innerHTML,"C-F") )
        })
    }
 }


function togglingLightDark(btnLight,btnDark){
    btnLight.onclick=function(){  
        this.classList.add("active")
        btnDark.classList.remove("active")
        root.style.setProperty('--backColor','linear-gradient(rgb(240, 233, 233) 100px,rgb(129, 178, 218))') 
        root.style.setProperty('--dayDetailsColor','rgb(188, 210, 228)') 

    }
    btnDark.onclick=function(){  
        this.classList.add("active")
        btnLight.classList.remove("active")
        root.style.setProperty('--backColor','linear-gradient(rgba(255, 255, 255, 0.567),rgba(3, 7, 105, 0.852)') 
        root.style.setProperty('--dayDetailsColor','rgb(203, 204, 246)') 
    }
}




 

togglingWeekDay(btnDay,btnWeek)
togglingTemp(btnC,btnF)
togglingLightDark(btnLight,btnDark)









/*----------------------------input  search----------------------------------------------------*/

allSearchInput.forEach((inpt)=>{
    inpt.addEventListener("click",()=>{
        inpt.style.setProperty("width","250px")
        ul.style.setProperty("display","block")   
    })
})

container.addEventListener("click",()=>{
    searchInput.style.setProperty("width","0px")
    searchInputDB.style.setProperty("width","0px")
    ul.style.setProperty("display","none")   
})

// control search width


allSearchInput.forEach((inpt)=>{
    inpt.addEventListener("input", () =>{
        if(inpt.value){
            inpt.style.setProperty("width","250px")
        }else{
            // inpt.style.setProperty("width","0px")
        }
    })
})

// get cities data
    //global variables
    var allCitiesData=[],spCitiesData=[];
    var citiesName=[],spCitiesName=[];
    var citiesId=[],spCitiesId=[];
    
        //fucntion to get all cities data and cities name and put then in previous global variables
    async function getCitiesData(){

        //to get all cities Data
        let response1=await fetch("mock server/allCities.json" ,{method: "GET"}) 
        allCitiesData=await response1.json()
        citiesName= allCitiesData.map((obj)=> {return `${obj.name},${obj.country}`})
        citiesId= allCitiesData.map((obj)=> {return  obj.id })

        //to get specfic cities Data
        let response2=await fetch("mock server/specificCities.json" ,{method: "GET"}) 
        spCitiesData=await response2.json()
        spCitiesName= spCitiesData.map((obj)=> {return `${obj.name},${obj.country}`})
        spCitiesId= spCitiesData.map((obj)=> {return  obj.id })
        
    }

    getCitiesData()
    .then(()=>{
            
        // make Suggestions in search 
        
        // make Suggestions in search and control search width
    
        function suggesstion(inpt,citiesName){
            inpt.addEventListener("input", function () {
        
                removeSuggestions()
                let li,i;
                let Inptval = inpt.value;
                if (!Inptval) {
                    return false;
                }
            
                let liNum=0;
                
                for (i = 0; i < citiesName.length; i++) {
                    if ( Inptval.toUpperCase()== citiesName[i].substring(0, Inptval.length).toUpperCase())  {
                        li=document.createElement("li");
                        li.innerHTML=citiesName[i] 
                        if(liNum<15){
                            ul.appendChild(li);
                        }
                        liNum++
                        li.addEventListener("click", function () {
                            //on click set the search input value with th clicked suggestion value
                            inpt.value = this.innerText;
                            removeSuggestions()
                        });  
                    }  
                } 
            
                
            })
        }
        function removeSuggestions() {
            //select the ul which is being adding on search input
            let u = document.querySelector("nav .search .suggesstion"); 
            //if ul exists remove it
            if (u){
                u.innerHTML=""
            };
        }


        suggesstion(allSearchInput[0],citiesName) 
        suggesstion(allSearchInput[1],spCitiesName) 
    })
         

    
    // take value of search after clicking in search icon
    
        //fucntion to that get and return city CityCoordinates 
    function getCityCoordinates(cityWithCountryCode,citiesData){ 
    
        if(cityWithCountryCode!==""){
            let founded=false;
            for(let i=0;i<citiesData.length;i++) {
                if(`${citiesData[i].name},${citiesData[i].country}` ==cityWithCountryCode){
                  founded=true;
                  return citiesData[i].coord
                }
            }
    
            if(!founded){
                alert("not found in database!")
            }
        }else{
            console.log(getComputedStyle(searchBtnDB).display)
            console.log(getComputedStyle(searchBtn).display)
            alert("no input for search yet! ")
            
        }
        
    
    }
    

    
// ------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------for using api-----------------------------------------------------------------------------------------
//when click on icon search
searchBtn.addEventListener("click",()=>{
    let cityCoord=getCityCoordinates(searchInput.value,allCitiesData)
    let lat;
    let lon;
    //error handling when user input incorrect or empty location and click on search button so that will display data of my current location 
    try{   
        lat=cityCoord.lat
        lon=cityCoord.lon
       
        getWeatherWithApi(lon,lat,"52726fb4078f8d3926c7f682c9341f90")
    }catch{ 

        
    }
    

});  

function getWeatherWithApi(lon,lat,apiKey="52726fb4078f8d3926c7f682c9341f90"){
    
        
    // let response=await fetch()    
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then((response)=>{
            if(response.ok){
                return response.json()
            }else{
                if(response.statusText="Unauthorized"){//status code=401
                    alert (`${response.statusText}\nplease add correct api key`)
                }
            }   
        }) 
    .then((currentWeather)=>{
        let location_data=`${currentWeather.name},${currentWeather.sys.country}`
        let temp_data=Math.round(currentWeather.main.temp)   
        let cond_data=currentWeather.weather[0].main
        let img_data=getIcon(cond_data,currentWeather.weather[0].icon)
        let Hum_data=currentWeather.main.humidity

        let vis_data=currentWeather.visibility/1000
        let wind_data=currentWeather.wind.speed
        let wind_deg_data=currentWeather.wind.deg
        let sunrise_data=currentWeather.sys.sunrise
        let sunset_data=currentWeather.sys.sunset

        let time_data =currentWeather.dt
        
        //display today data in short weather section
        Location.innerText=location_data
        mainImg.src=img_data
        mainTemp.innerText=Math.round(temp_data)   
        mainCond.innerText=cond_data
        mainHum.innerText=Hum_data+"%"
        date.innerText= "updated at "+convertUnixtotime(time_data,"day")

        //display today data in daily details section
        humIndex.innerText=Hum_data
        humStatus.innerText=getHumidityStatus(Hum_data)
        updatingHumCircle()


        windIndex.innerText=wind_data
        windStatus.innerText=getWindDirection(wind_deg_data)
        // when i used Math.random because id didnt have this data in database 
        visIndex.innerText=vis_data
        visStatus.innerText=getVisibilityStatus(vis_data)
       
        sunrise.innerText=convertUnixtotime(sunrise_data)
        sunset.innerText=convertUnixtotime(sunset_data)

        })
        .catch((err)=>{})     
}




// -----------------------------------------------------------------------------------------------------------------------------------------------------






// ------------------------------------------for using database-----------------------------------------------------------------------------------------
//when click on icon search
searchBtnDB.addEventListener("click",()=>{
    
    let cityCoord_Db=getCityCoordinates(searchInputDB.value,spCitiesData)
    let lat_Db;
    let lon_Db;
    //error handling when user input incorrect or empty location and click on search button so that will display data of my current location 
    try{   
        lat_Db=cityCoord_Db.lat
        lon_Db=cityCoord_Db.lon 
        getWeatherWithDB(lon_Db,lat_Db)
    }catch{ 

    }
   

});  


//get And Display Weather  fucntion with database
function getWeatherWithDB(lon_Db,lat_Db){
       
    async function getWeatherData(){
        
        let response;
        let arrOfResponses;
        let currentWeather,dailyWeather,hourlyWeather;

        //-----get current weather   
        response=await fetch(`mock server/weatherEdit.json`);
        arrOfResponses=await response.json() 
      
        currentWeather=getCorrectResponse(lat_Db,lon_Db,arrOfResponses)
        // if my location not found in database so that will display data of my current location
        if(typeof(currentWeather)=="undefined"){
            currentWeather=getClosestResponse(lat_Db,lon_Db,arrOfResponses)
            console.log(currentWeather)
        }
        let location_data=`${currentWeather.city.name},${currentWeather.city.country}`
        let temp_data=Math.round( convertTempTo(currentWeather.main.temp,"k-c") )
        let cond_data=currentWeather.weather[0].main
        let img_data=getIcon(cond_data,currentWeather.weather[0].icon)
        let Hum_data=currentWeather.main.humidity
        
        
        //display today data in short weather
        

        Location.innerText=location_data
        mainImg.src=img_data
        mainTemp.innerText=temp_data
        mainCond.innerText=cond_data
        mainHum.innerText=Hum_data

    //-----get daily weather for 7days
    response=await fetch(`mock server/dailyEdit.json`);
    arrOfResponses=await response.json()
    
    dailyWeather=getCorrectResponse(lat_Db,lon_Db,arrOfResponses)
    if(typeof(dailyWeather)=="undefined"){
        dailyWeather=getClosestResponse(lat_Db,lon_Db,arrOfResponses)
    }

    let allDays_data=dailyWeather.data
    function return7DaysFromNow(allDays_data){
        let days=[]
        let currentDay=getDateTime().substring(0,3)
        for(let i=0;i<allDays_data.length;i++){
            let firstDay=convertUnixtotime(allDays_data[i].dt,"day").substring(0,3)
            if(currentDay.toUpperCase()==firstDay.toUpperCase()){
                for(let j=i;j<(i+7);j++){
                    days.push(allDays_data[j])
                }
                return days
            }
        }

        let backupDays=[]
        for(let i=0;i<7;i++){
            backupDays.push(allDays_data[i])
        }
        return backupDays
            
    }
    let days_data=return7DaysFromNow(allDays_data)
        //display today data in daily sections
        


        for(let i=0; i<days_data.length; i++){
            daysTitle[i].innerText =convertUnixtotime(days_data[i].dt ,"day").substring(0,3)
            daysImg[i].src=getIcon(days_data[i].weather[0].main,days_data[i].weather[0].icon)
            daysTemp[i].innerText= Math.round ( convertTempTo(days_data[i].temp.day ,"K-C") )
        }

        //display today data in day details
        function displayDailyDetails(onThisDay){
            //display day details
            humIndex.innerText=onThisDay.humidity+"%"
            humStatus.innerText=getHumidityStatus(onThisDay.humidity)
            updatingHumCircle()
            windIndex.innerText=convertspeedTo(onThisDay.speed)
            windStatus.innerText=getWindDirection(onThisDay.deg)
            // when i used Math.random because id didnt have this data in database 
            visIndex.innerText=(Math.random()*10).toFixed(2)
            visStatus.innerText=getVisibilityStatus((Math.random()*10).toFixed(2))
            uvIndex.innerText=onThisDay.uvi
            uvStatus.innerText=measureUvIndex(onThisDay.uvi)
            updatingUvCircle()
            airIndex.innerText=(Math.random()*100).toFixed(0)
            airStatus.innerText=getAirQualityStatus((Math.random()*100).toFixed(0))
        }
        
        displayDailyDetails(days_data[0])
        
        days.forEach((day)=>{
           
            day.addEventListener("click",()=>{
                for(let i=0;i<days.length;i++){
                    days[i].classList.remove("active")
                }
                day.classList.add("active")
                dayName=day.innerText.substring(0,3).trim().toUpperCase()
                for(let i=0;i<days_data.length;i++){
                    let daysName_data=convertUnixtotime(days_data[i].dt,"day").substring(0,3).toUpperCase()
                    if(daysName_data==dayName){ 
                        displayDailyDetails(days_data[i])
                    }
                }
            })
            
        })
       
        //get today data in hourly
        response=await fetch(`mock server/hourlyEdit.json`);
        arrOfResponses=await response.json()
        
        hourlyWeather=getCorrectResponse(lat_Db,lon_Db,arrOfResponses)
        if(typeof(hourlyWeather)=="undefined"){
            hourlyWeather=getClosestResponse(lat_Db,lon_Db,arrOfResponses)
        }
        let allHours_data=hourlyWeather.data
        
        function return24HoursFromNow(allHours_data){
            let hours=[]
            let currentHour=new Date().getHours()

            for(let i=0;i<allHours_data.length;i++){
                let firstHour=new Date(allHours_data[i].dt* 1000).getHours()
                    
                if(currentHour == firstHour ||(currentHour+1) == firstHour||(currentHour+2) == firstHour ){
                    for(let j=i;j<(i+24);j++){
                        hours.push(allHours_data[j])
                    }
                    return hours
                }
            }
    
            let backupHours=[]
            for(let i=0;i<24;i++){
                backupHours.push(allHours_data[i])
            }
            
            return backupHours      
        }
        let hours_data=return24HoursFromNow(allHours_data)
        


        //display today data in hourly sections
       
        const hours=document.querySelectorAll(".daily .slider .today");
        const hoursTitle=document.querySelectorAll(".daily .slider .today>h2");
        const hoursImg=document.querySelectorAll(".daily .slider .today>img");
        const hoursTemp=document.querySelectorAll(".daily .slider .today>div>h2");

        for(let i=0; i<hours_data.length; i++){
            hoursTitle[i].innerText =convertUnixtotime(hours_data[i].dt)
            hoursImg[i].src=getIcon(hours_data[i].weather[0].main,hours_data[i].weather[0].icon)
            hoursTemp[i].innerText= Math.round  ( convertTempTo(hours_data[i].main.temp ,"K-C") )
        }

    }getWeatherData()
}




//---------------------------------------------------------------functions---------------------------------------------------------------------------------------------------------------------------

//function to get specific city data depend on its longitudinal and latitudinal from array of cities data  in (arrOfResponses) //this function made for local weather function without api 
function getCorrectResponse(lat,lon,arrOfResponses){
    for (const res of arrOfResponses) {
        if(res.city.coord.lon==lon &&res.city.coord.lat==lat ){
               return res
        }
    }    
}
//this function made for local weather function without api 
function getClosestResponse(lat,lon,arrOfResponses){
    
    for (const res of arrOfResponses) {
        if( Math.round(res.city.coord.lon) == Math.round(lon) && Math.round(res.city.coord.lat) == Math.round(lat) ){
               return res
        }
    }    
}

function getIcon(condition,nORd) {
    //check for nORd 
  if (nORd.indexOf("n")){
        nORd="n"
  }
  else{
        nORd="d"
  }

  //check for condition 
  let conditions=["Clear","Clouds","Rain","Drizzle","Snow","Thunderstorm"]
    conditions.forEach((cond)=>{
        if(condition ==cond){
            return `images/overcast.png`;
        }    
    })

    return `images/${condition}-${nORd}.png`;
  
}
 

function measureUvIndex(uvIndex) {
    if (uvIndex <= 2) {
        return "Low";
    } else if (uvIndex <= 5) {
        return "Moderate";
    } else if (uvIndex <= 7) {
        return "High";
    } else if (uvIndex <= 10) {
        return "Very High";
    } else {
        return "Extreme";
    }
  }

  function getHumidityStatus(humidity) {
    if (humidity <= 30) {
      return "Low";
    } else if (humidity <= 60) {
        return "Moderate";
    } else {
        return "High";
    }
  }
  function getWindStatus(windIndex) {
    if (humidity <= 30) {
      return "Low";
    } else if (humidity <= 60) {
        return "Moderate";
    } else {
        return "High";
    }
  }




  function getVisibilityStatus(visibility) {
    if (visibility <= 0.3) {
      return"Dense Fog";
    } else if (visibility <= 0.16) {
      return"Moderate Fog";
    } else if (visibility <= 0.35) {
      return"Light Fog";
    } else if (visibility <= 1.13) {
      return"Very Light Fog";
    } else if (visibility <= 2.16) {
      return"Light Mist";
    } else if (visibility <= 5.4) {
      return"Very Light Mist";
    } else if (visibility <= 10.8) {
      return"Clear Air";
    } else {
      return"Very Clear Air";
    }
  }
  

  function getAirQualityStatus(airQuality) {
    if (airQuality <= 50) {
      return"Good";
    } else if (airQuality <= 100) {
      return"Moderate";
    } else if (airQuality <= 150) {
      return"Unhealthy for Sensitive Groups";
    } else if (airQuality <= 200) {
      return"Unhealthy";
    } else if (airQuality <= 250) {
      return"Very Unhealthy";
    } else {
      return"Hazardous";
    }
  }
  


function convertUnixtotime(unixTimeStamp,include="nothing"){
    
    let fulltime =new Date(unixTimeStamp* 1000).toString();
    let dayName=fulltime.substring(0,3)

    let time =new Date(unixTimeStamp* 1000).toLocaleString();
    let allTime=time.split(",")[1].trim().split(":");
    let hours=allTime[0]
    let minutes=allTime[1]
    let seconds=allTime[2].split(" ")[0]
    let AMorPM=allTime[2].split(" ")[1]

    if(include.toUpperCase()=="nothing".toUpperCase())
    {
        return `${hours}:${minutes}${AMorPM}`
    }
    else if(include.toUpperCase() == "day".toUpperCase()){
        return `${dayName} ${hours}:${minutes}${AMorPM}`
    } 
    
}

 //convert  temperature to Celcius or Fahrenheit Kelvin
function convertTempTo(temp,convertToUnit="C-F") {
    
    if(convertToUnit.toUpperCase()==="C-F"){
        return ((temp * 9) / 5 + 32).toFixed(1);
    }else if(convertToUnit.toUpperCase()==="F-C"){
        return ((temp-32)/1.8).toFixed(1);
    }else if(convertToUnit.toUpperCase()==="K-F"){
        return (((294.97*temp)-273.15)*(9/5)+32).toFixed(1);
    }else if(convertToUnit.toUpperCase()==="F-K"){ 
        return (((294.97*temp)-32)*(5/9)+273.15).toFixed(1);;
    }else if(convertToUnit.toUpperCase()==="K-C"){
        return (temp-273.15).toFixed(1);
    }else if(convertToUnit.toUpperCase()==="C-K"){
        return (temp+273.15).toFixed(1);
    }
    
  }  
function convertspeedTo(speed,convertToUnit="metric") {
    if(convertToUnit.toLowerCase()==="metric"){
        return (speed/2.23694).toFixed(1);
    }else if(convertToUnit.toLowerCase()==="imperial"){
        return (speed*2.23694).toFixed(1);
    }
  }  


function getWindDirection(windDeg) {
    const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
    return directions[Math.round(windDeg / 45) % 8];
}




async function getmylocation() {
    

    let response =await fetch("https://geolocation-db.com/json/", {method: "GET",})
    let coord =await response.json()
    return coord
}
/*----------------------------updating time----------------------------------------------------*/
function getDateTime(){
    let now=new Date(),
    dayIndex=now.getDay(),
    hour=now.getHours(),
    minute=now.getMinutes();

    let days=[
        "Sunday",
        "Monday",
        "Tuesday",  
        "Wednesday",   
        "Thursday",    
        "Friday",     
        "Saturday"
        
    ]
    // 12 hours system
    let PmOrAm='AM'
    if(hour>12){
        PmOrAm='PM'
    }

    hour=hour % 12;
    if(hour<10){
        hour="0"+hour
    }
    if(minute<10){
        minute="0"+minute
    }
   


    return `${days[dayIndex]},${hour}:${minute} ${PmOrAm}`
}

//for updating time every second
setInterval(()=>{dateDB.innerText=getDateTime()},1000)

/*--------------------------------------------when refreshing page stay in same page----------------------------------------------------------------------*/
function turnToApiPage(){
    homePage.style.setProperty("display","block")
    searchInput.style.setProperty("display","block")
    searchBtn.style.setProperty("display","block")
    date.style.setProperty("display","block")

    
    page0.style.setProperty("display","none")
    searchInputDB.style.setProperty("display","none")
    searchBtnDB.style.setProperty("display","none")
    dateDB.style.setProperty("display","none")

    container.classList.remove("not-api")
    btnDay.classList.remove("not-api")
    btnWeek.classList.remove("not-api")
    daily.classList.remove("not-api")
    uvDiv.classList.remove("not-api")
    airDiv.classList.remove("not-api")
    visDiv.classList.remove("not-api")
    sunDiv.classList.remove("not-api")
    clouds.forEach((cloud)=>{
        cloud.style.setProperty("animation-play-state","paused")
    })
}
function turnToDBPage(){
    homePage.style.setProperty("display","block")
    searchInputDB.style.setProperty("display","block")
    searchBtnDB.style.setProperty("display","block")
    dateDB.style.setProperty("display","block")


    page0.style.setProperty("display","none")
    searchInput.style.setProperty("display","none")
    searchBtn.style.setProperty("display","none")
    date.style.setProperty("display","none")

    container.classList.add("not-api")
    btnDay.classList.add("not-api")
    btnWeek.classList.add("not-api")
    daily.classList.add("not-api")
    uvDiv.classList.add("not-api")
    airDiv.classList.add("not-api")
    visDiv.classList.add("not-api")
    sunDiv.classList.add("not-api")
    clouds.forEach((cloud)=>{
        cloud.style.setProperty("animation-play-state","paused")
    })
}
function turnToPage0(){
    homePage.style.setProperty("display","none")
    page0.style.setProperty("display","block")
    
    clouds.forEach((cloud)=>{
        cloud.style.setProperty("animation-play-state","running")
    })
}



/*---------------------------------sliding------------------------------------------------------------------------ */
const innerSlider=document.querySelector(".daily .slider .inner-slider"),
firstImg = innerSlider.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".daily .slider .btn");

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 150; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the inner-slider scroll left else add to it
        innerSlider.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        // setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});


/*---------------------------------progress circle------------------------------------------------------------------------ */
function updatingHumCircle(){
    let humIndexNum=parseInt(humIndex.innerHTML.replace("%","")) ;
    HumidityCircle.style.background=` conic-gradient(#5e5ef3c0 ${(humIndexNum/100)*360}deg, rgb(190, 189, 189) 0deg )`
}updatingHumCircle()

function updatingUvCircle(){
    let uvIndexNum=parseInt(uvIndex.innerHTML.replace("+","")) ;
    uvCircle.style.background=` conic-gradient(#5e5ef3c0 ${(uvIndexNum*360)/11}deg, rgb(190, 189, 189) 0deg )`
}updatingUvCircle()

