import * as nod from './allNodes.js'
/*--------------------------------------------pages system----------------------------------------------------------------------*/
export function turnToApiPage(){
    nod.homePage.style.setProperty("display","block")
    nod.searchInput.style.setProperty("display","block")
    nod.searchBtn.style.setProperty("display","block")
    nod.date.style.setProperty("display","block")

    
    nod.page0.style.setProperty("display","none")
    nod.searchInputDB.style.setProperty("display","none")
    nod.searchBtnDB.style.setProperty("display","none")
    nod.dateDB.style.setProperty("display","none")

    nod.container.classList.remove("not-api")
    nod.btnDay.classList.remove("not-api")
    nod.btnWeek.classList.remove("not-api")
    nod.daily.classList.remove("not-api")
    nod.uvDiv.classList.remove("not-api")
    nod.airDiv.classList.remove("not-api")
    nod.visDiv.classList.remove("not-api")
    nod.sunDiv.classList.remove("not-api")
    nod.clouds.forEach((cloud)=>{
        cloud.style.setProperty("animation-play-state","paused")
    })
}
export function turnToDBPage(){
    nod.homePage.style.setProperty("display","block")
    nod.searchInputDB.style.setProperty("display","block")
    nod.searchBtnDB.style.setProperty("display","block")
    nod.dateDB.style.setProperty("display","block")


    nod.page0.style.setProperty("display","none")
    nod.searchInput.style.setProperty("display","none")
    nod.searchBtn.style.setProperty("display","none")
    nod.date.style.setProperty("display","none")

    nod.container.classList.add("not-api")
    nod.btnDay.classList.add("not-api")
    nod.btnWeek.classList.add("not-api")
    nod.daily.classList.add("not-api")
    nod.uvDiv.classList.add("not-api")
    nod.airDiv.classList.add("not-api")
    nod.visDiv.classList.add("not-api")
    nod.sunDiv.classList.add("not-api")
    nod.clouds.forEach((cloud)=>{
        cloud.style.setProperty("animation-play-state","paused")
    })
}
export function turnToPage0(){
    nod.homePage.style.setProperty("display","none")
    nod.page0.style.setProperty("display","block")
    
    nod.clouds.forEach((cloud)=>{
        cloud.style.setProperty("animation-play-state","running")
    })
}    



//////at home page---------------

    ////nav bar controlling-------------------------------------------------------------------------
    export function togglingWeekDay(btnDay,btnWeek){
        const dailyOrHourly=document.querySelector(".daily .title")
        btnDay.onclick=function(){  
            dailyOrHourly.innerText="Hourly"
            this.classList.add("active")
            btnWeek.classList.remove("active")
            for(let i=0;i<nod.cards.length;i++){
                if(i<7){
                    nod.cards[i].style.display="none"
                }else{
                    nod.cards[i].style.display="flex" 
                } 
            }
        }
        btnWeek.onclick=function(){  
            dailyOrHourly.innerText="Daily"
            this.classList.add("active")
            btnDay.classList.remove("active")
            for(let i=0;i<nod.cards.length;i++){
                if(i>=7){
                    nod.cards[i].style.display="none"
                }else{
                    nod.cards[i].style.display="flex"
                }
                
            }
        
        }
    }
    

    export function togglingTemp(btnC,btnF){
        let ToggledTo="°C";

        
        btnC.onclick=function(){ 
            if(ToggledTo !=="°C"){
                this.classList.add("active")
                btnF.classList.remove("active")
        
                nod.tempUnit.forEach((unit)=>{
                    unit.innerHTML="°C"
                })
            
                nod.tempDeg.forEach((deg)=>{
                    deg.innerHTML=Math.round (convertTempTo(deg.innerHTML,"F-C") )
                })
            
                ToggledTo="°C"
            }


           
        }


        btnF.onclick=function(){  
            if (ToggledTo !=="°F"){
                this.classList.add("active")
                btnC.classList.remove("active")

                nod.tempUnit.forEach((unit)=>{
                    unit.innerHTML="°F"
                })

                nod.tempDeg.forEach((deg)=>{
                    deg.innerHTML=Math.round ( convertTempTo(deg.innerHTML,"C-F") )
                })
            }

            ToggledTo="°F"
        }
    
    }


    export function togglingLightDark(btnLight,btnDark){
        btnLight.onclick=function(){  
            this.classList.add("active")
            btnDark.classList.remove("active")
            nod.root.style.setProperty('--backColor','linear-gradient(rgb(240, 233, 233) 100px,rgb(129, 178, 218))') 
            nod.root.style.setProperty('--dayDetailsColor','rgb(188, 210, 228)') 

        }
        btnDark.onclick=function(){  
            this.classList.add("active")
            btnLight.classList.remove("active")
            nod.root.style.setProperty('--backColor','linear-gradient(rgba(255, 255, 255, 0.567),rgba(3, 7, 105, 0.852)') 
            nod.root.style.setProperty('--dayDetailsColor','rgb(203, 204, 246)') 
        }
    }


        
        // make Suggestions in search 
        
            export function suggesstion(inpt,citiesName){
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
                                nod.ul.appendChild(li);
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

            //no need to export removeSuggestion function because it is called here not but suggestion function called in weather.js
            function removeSuggestions() {
                //select the ul which is being adding on search input
                let u = document.querySelector("nav .search .suggesstion"); 
                //if ul exists remove it
                if (u){
                    u.innerHTML=""
                };
            }


            // take value of search after clicking in search icon
        
            //fucntion to that get and return city CityCoordinates 
        export function getCityCoordinates(cityWithCountryCode,citiesData){ 
        
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
                console.log(getComputedStyle(nod.searchBtnDB).display)
                console.log(getComputedStyle(nod.searchBtn).display)
                alert("no input for search yet! ")
                
            }
            
        
        }

    //

    ////for container-------------------
        export function getIcon(condition,nORd) {
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
        
        
        export function measureUvIndex(uvIndex) {
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
        
        export function getHumidityStatus(humidity) {
            if (humidity <= 30) {
            return "Low";
            } else if (humidity <= 60) {
                return "Moderate";
            } else {
                return "High";
            }
        }
        export function getWindStatus(windIndex) {
            if (humidity <= 30) {
            return "Low";
            } else if (humidity <= 60) {
                return "Moderate";
            } else {
                return "High";
            }
        }
        export function getWindDirection(windDeg) {
            const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
            return directions[Math.round(windDeg / 45) % 8];
        }
        
        
        
        
        export function getVisibilityStatus(visibility) {
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
        
        
        export function getAirQualityStatus(airQuality) {
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
        
        
        
        export function convertUnixtotime(unixTimeStamp,include="nothing"){
            
            let now = new Date(unixTimeStamp*1000),
                dayIndex = now.getDay(),
                hour = now.getHours(),
                minute = now.getMinutes();
            
            let days = [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat"
                ]
        
        
            // 12 hours system
            let PmOrAm = 'AM'
            if (hour > 12) {
                PmOrAm = 'PM'
            }
            hour = hour % 12;
        
            //edit format
            if (hour < 10) {
                hour = "0" + hour
            }
            if (minute < 10) {
                minute = "0" + minute
            }
                
                
        
            if(include.toUpperCase()=="nothing".toUpperCase())
            {
                return `${hour}:${minute} ${PmOrAm}`
            }
            else if(include.toUpperCase() == "day".toUpperCase()){
                return `${days[dayIndex]},${hour}:${minute} ${PmOrAm}`
            } 
                
        }
        
        
        //convert  temperature to Celcius or Fahrenheit or Kelvin
        export function convertTempTo(temp,convertToUnit="C-F") {
            
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
        
        
        export function convertspeedTo(speed,convertToUnit="metric") {
            if(convertToUnit.toLowerCase()==="metric"){
                return (speed/2.23694).toFixed(1);
            }else if(convertToUnit.toLowerCase()==="imperial"){
                return (speed*2.23694).toFixed(1);
            }
        }  
        
        
    
        
        /*----------------------------updating time----------------------------------------------------*/
        export function getDateTime(){
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





        /*---------------------------------progress circle------------------------------------------------------------------------ */
        export function updatingHumCircle(){
            let humIndexNum=parseInt(nod.humIndex.innerHTML.replace("%","")) ;
            nod.HumidityCircle.style.background=` conic-gradient(#5e5ef3c0 ${(humIndexNum/100)*360}deg, rgb(190, 189, 189) 0deg )`
        }

        export function updatingUvCircle(){
            let uvIndexNum=parseInt(nod.uvIndex.innerHTML.replace("+","")) ;
            nod.uvCircle.style.background=` conic-gradient(#5e5ef3c0 ${(uvIndexNum*360)/11}deg, rgb(190, 189, 189) 0deg )`
        }


    //

//



// ------------------------------------------for using api-----------------------------------------------------------------------------------------

//get And Display Weather  fucntion with Api

export function getWeatherWithApi(lon,lat,apiKey="52726fb4078f8d3926c7f682c9341f90"){
    
        
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
        nod.Location.innerText=location_data
        nod.mainImg.src=img_data
        nod.mainTemp.innerText=Math.round(temp_data)   
        nod.mainCond.innerText=cond_data
        nod.mainHum.innerText=Hum_data+"%"
        nod.date.innerText= "updated at "+convertUnixtotime(time_data)

        
            
        //display today data in daily details section
        nod.humIndex.innerText=Hum_data
        nod.humStatus.innerText=getHumidityStatus(Hum_data)
        updatingHumCircle()


        nod.windIndex.innerText=wind_data
        nod.windStatus.innerText=getWindDirection(wind_deg_data)
        // when i used Math.random because id didnt have this data in database 
        nod.visIndex.innerText=vis_data
        nod.visStatus.innerText= getVisibilityStatus(vis_data)
       
        nod.sunrise.innerText=convertUnixtotime(sunrise_data)
        nod.sunset.innerText=convertUnixtotime(sunset_data)

        })
        .catch((err)=>{})     
}




// -----------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------for using database-----------------------------------------------------------------------------------------
//get And Display Weather  fucntion with database
export function getWeatherWithDB(lon_Db,lat_Db){
       
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
        

        nod.Location.innerText=location_data
        nod.mainImg.src=img_data
        nod.mainTemp.innerText=temp_data
        nod.mainCond.innerText=cond_data
        nod.mainHum.innerText=Hum_data

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
        let currentDay= getDateTime().substring(0,3)
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
            nod.daysTitle[i].innerText =convertUnixtotime(days_data[i].dt ,"day").substring(0,3)
            nod.daysImg[i].src=getIcon(days_data[i].weather[0].main,days_data[i].weather[0].icon)
            nod.daysTemp[i].innerText= Math.round ( convertTempTo(days_data[i].temp.day ,"K-C") )
        }

        //display today data in day details
        function displayDailyDetails(onThisDay){
            //display day details
            nod.humIndex.innerText=onThisDay.humidity+"%"
            nod.humStatus.innerText=getHumidityStatus(onThisDay.humidity)
            updatingHumCircle()
            nod.windIndex.innerText=convertspeedTo(onThisDay.speed)
            nod.windStatus.innerText=getWindDirection(onThisDay.deg)
            // when i used Math.random because id didnt have this data in database 
            nod.visIndex.innerText=(Math.random()*10).toFixed(2)
            nod.visStatus.innerText=getVisibilityStatus((Math.random()*10).toFixed(2))
            nod.uvIndex.innerText=onThisDay.uvi
            nod.uvStatus.innerText=measureUvIndex(onThisDay.uvi)
            updatingUvCircle()
            nod.airIndex.innerText=(Math.random()*100).toFixed(0)
            nod.airStatus.innerText=getAirQualityStatus((Math.random()*100).toFixed(0))
        }
        
        displayDailyDetails(days_data[0])
        
        nod.days.forEach((day)=>{
           
            day.addEventListener("click",()=>{
                for(let i=0;i<nod.days.length;i++){
                    nod.days[i].classList.remove("active")
                }
                day.classList.add("active")
                let dayName=day.innerText.substring(0,3).trim().toUpperCase()
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
            hoursTitle[i].innerText = convertUnixtotime(hours_data[i].dt)
            hoursImg[i].src=getIcon(hours_data[i].weather[0].main,hours_data[i].weather[0].icon)
            hoursTemp[i].innerText= Math.round  ( convertTempTo(hours_data[i].main.temp ,"K-C") )
        }

    }getWeatherData()
}


//function to get specific city data depend on its longitudinal and latitudinal from array of cities data  in (arrOfResponses) //this function made for local weather function without api 
function getCorrectResponse(lat,lon,arrOfResponses){
    for (const res of arrOfResponses) {
        if(res.city.coord.lon==lon && res.city.coord.lat==lat ){
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
