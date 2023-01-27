import * as nod from './allNodes.js'
import * as f from './functions.js'

//----------------------------------------------refresh system---to stay in same page after refreshing---------------------


// when refreshing get  weather data from mock server and display it 
function s(userCoords){
    f.getWeatherWithDB(userCoords.coords.longitude,userCoords.coords.latitude)
}
navigator.geolocation.getCurrentPosition(s,console.log)


// when refreshing stay in the same page  
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
// control search width
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




nod.allSearchInput.forEach((inpt)=>{
    inpt.addEventListener("input", () =>{
        if(inpt.value){
            inpt.style.setProperty("width","250px")
        }else{
            // inpt.style.setProperty("width","0px")
        }
    })
})


// get cities data and make suggestion 
    //global variables
    var allCitiesData=[],citiesName=[];
    var spCitiesData=[],spCitiesName=[];
    
        //fucntion to get all cities data and cities name and put then in previous global variables
    async function getCitiesData(){

        //to get all cities Data
        let response1=await fetch("mock server/allCities.json" ,{method: "GET"}) 
        allCitiesData=await response1.json()
        citiesName= allCitiesData.map((obj)=> {return `${obj.name},${obj.country}`})

        //to get specfic cities Data
        let response2=await fetch("mock server/specificCities.json" ,{method: "GET"}) 
        spCitiesData=await response2.json()
        spCitiesName= spCitiesData.map((obj)=> {return `${obj.name},${obj.country}`})

    }

    getCitiesData()
    .then(()=>{         
        // make Suggestions in search  
        f.suggesstion(nod.allSearchInput[0],citiesName) 
        f.suggesstion(nod.allSearchInput[1],spCitiesName) 
    })
 

// ---------------------------------for using api-----------------------------------------------------------------------------------------
//when click on icon search
nod.searchBtn.addEventListener("click",()=>{
    //error handling 
    try{  
        let cityCoord=f.getCityCoordinates(nod.searchInput.value,allCitiesData) 
        let lat=cityCoord.lat
        let lon=cityCoord.lon
       
        f.getWeatherWithApi(lon,lat)
    }catch{}

});  


// ------------------------------------------for using database-----------------------------------------------------------------------------------------
//when click on icon search
nod.searchBtnDB.addEventListener("click",()=>{   
    //error handling 
    try{  
        let cityCoord_Db=f.getCityCoordinates(nod.searchInputDB.value,spCitiesData)
        let lat_Db=cityCoord_Db.lat
        let lon_Db=cityCoord_Db.lon 
        f.getWeatherWithDB(lon_Db,lat_Db)
    }catch{}
   
});  


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

