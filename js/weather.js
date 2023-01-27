import * as nod from './allNodes.js'
import * as f from './functions.js'

//----------------------------------------------refresh system---to stay in same page after refreshing---------------------

var tracer;

nod.body.onload=()=>{
    
    let pageStr=document.cookie
    let page=pageStr.split("=")[1] 
    if(page=="page0"){
        f.turnToPage0()
    }else if(page=="DBpage"){
        f.turnToDBPage()
    }else if(page=="apiPage"){
        f.turnToApiPage()
    }
}

//page0---------------------------------------------------------------------------------------
nod.apiBtn.addEventListener("click",()=>{  
    f.turnToApiPage()
    tracer="apiPage"
    document.cookie="page="+tracer;
    // console.log(document.cookie)
})
nod.dbBtn.addEventListener("click",()=>{
  f.turnToDBPage()
  tracer="DBpage"
  document.cookie="page="+tracer;
//   console.log(document.cookie)
})
//home page---------------------------------------------------------------------------------------
nod.backBtn.addEventListener("click",()=>{
    f.turnToPage0()
    tracer="page0"
    document.cookie="page="+tracer;
    // console.log(document.cookie)
})
//nav bar controlling-------------------------------------------------------------------------

f.togglingWeekDay(nod.btnDay,nod.btnWeek)
f.togglingTemp(nod.btnC,nod.btnF)
f.togglingLightDark(nod.btnLight,nod.btnDark)


/*----------------------------input  search----------------------------------------------------*/

nod.allSearchInput.forEach((inpt)=>{
    inpt.addEventListener("click",()=>{
        inpt.style.setProperty("width","250px")
        nod.ul.style.setProperty("display","block")   
    })
})

nod.container.addEventListener("click",()=>{
    nod.searchInput.style.setProperty("width","0px")
    nod.searchInputDB.style.setProperty("width","0px")
    nod.ul.style.setProperty("display","none")   
})

// control search width


nod.allSearchInput.forEach((inpt)=>{
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
    
        f.suggesstion(nod.allSearchInput[0],citiesName) 
        f.suggesstion(nod.allSearchInput[1],spCitiesName) 
    })
         


 
//---------------------------------------------------------------functions---------------------------------------------------------------------------------------------------------------------------

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



async function getmylocation() {
    let response =await fetch("https://geolocation-db.com/json/", {method: "GET",})
    let coord =await response.json()
    return coord
}
/*----------------------------updating time----------------------------------------------------*/

//for updating time every second
setInterval(()=>{nod.dateDB.innerText=f.getDateTime()},1000)

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
f.updatingHumCircle()

f.updatingUvCircle()



   
// ------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------for using api-----------------------------------------------------------------------------------------
//when click on icon search
nod.searchBtn.addEventListener("click",()=>{
    let cityCoord=f.getCityCoordinates(nod.searchInput.value,allCitiesData)
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
        let img_data=f.getIcon(cond_data,currentWeather.weather[0].icon)
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
        nod.date.innerText= "updated at "+f.convertUnixtotime(time_data)

        
            
        //display today data in daily details section
        nod.humIndex.innerText=Hum_data
        nod.humStatus.innerText=f.getHumidityStatus(Hum_data)
        f.updatingHumCircle()


        nod.windIndex.innerText=wind_data
        nod.windStatus.innerText=f.getWindDirection(wind_deg_data)
        // when i used Math.random because id didnt have this data in database 
        nod.visIndex.innerText=vis_data
        nod.visStatus.innerText=f.getVisibilityStatus(vis_data)
       
        nod.sunrise.innerText=f.convertUnixtotime(sunrise_data)
        nod.sunset.innerText=f.convertUnixtotime(sunset_data)

        })
        .catch((err)=>{})     
}




// -----------------------------------------------------------------------------------------------------------------------------------------------------






// ------------------------------------------for using database-----------------------------------------------------------------------------------------
//when click on icon search
nod.searchBtnDB.addEventListener("click",()=>{
    
    let cityCoord_Db=f.getCityCoordinates(nod.searchInputDB.value,spCitiesData)
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
        let temp_data=Math.round( f.convertTempTo(currentWeather.main.temp,"k-c") )
        let cond_data=currentWeather.weather[0].main
        let img_data=f.getIcon(cond_data,currentWeather.weather[0].icon)
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
        let currentDay=f.getDateTime().substring(0,3)
        for(let i=0;i<allDays_data.length;i++){
            let firstDay=f.convertUnixtotime(allDays_data[i].dt,"day").substring(0,3)
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
            nod.daysTitle[i].innerText =f.convertUnixtotime(days_data[i].dt ,"day").substring(0,3)
            nod.daysImg[i].src=f.getIcon(days_data[i].weather[0].main,days_data[i].weather[0].icon)
            nod.daysTemp[i].innerText= Math.round ( f.convertTempTo(days_data[i].temp.day ,"K-C") )
        }

        //display today data in day details
        function displayDailyDetails(onThisDay){
            //display day details
            nod.humIndex.innerText=onThisDay.humidity+"%"
            nod.humStatus.innerText=f.getHumidityStatus(onThisDay.humidity)
            f.updatingHumCircle()
            nod.windIndex.innerText=f.convertspeedTo(onThisDay.speed)
            nod.windStatus.innerText=f.getWindDirection(onThisDay.deg)
            // when i used Math.random because id didnt have this data in database 
            nod.visIndex.innerText=(Math.random()*10).toFixed(2)
            nod.visStatus.innerText=f.getVisibilityStatus((Math.random()*10).toFixed(2))
            nod.uvIndex.innerText=onThisDay.uvi
            nod.uvStatus.innerText=f.measureUvIndex(onThisDay.uvi)
            f.updatingUvCircle()
            nod.airIndex.innerText=(Math.random()*100).toFixed(0)
            nod.airStatus.innerText=f.getAirQualityStatus((Math.random()*100).toFixed(0))
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
                    let daysName_data=f.convertUnixtotime(days_data[i].dt,"day").substring(0,3).toUpperCase()
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
            hoursTitle[i].innerText =f.convertUnixtotime(hours_data[i].dt)
            hoursImg[i].src=f.getIcon(hours_data[i].weather[0].main,hours_data[i].weather[0].icon)
            hoursTemp[i].innerText= Math.round  ( f.convertTempTo(hours_data[i].main.temp ,"K-C") )
        }

    }getWeatherData()
}



