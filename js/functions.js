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