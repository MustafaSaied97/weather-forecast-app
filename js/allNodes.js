//define all nodes-------------------------------------------------------------------
export  const root=document.querySelector(":root");
export  const body=document.querySelector("body");
export  const clouds=document.querySelectorAll(".cloud img")
//define  nodes of page0-------------------------------------------------------------------
export  const page0=document.querySelector(".page0");
export  const apiBtn=document.querySelector(".page0 .api");
export  const dbBtn=document.querySelector(".page0 .database");

//define  nodes of home page-------------------------------------------------------------------
export  const homePage=document.querySelector(".homepage");
//nav bar nodes
    export  const btnDay=document.querySelector(".day-week .day");
    export  const btnWeek=document.querySelector(".day-week .week");
    export  const tempUnit=[document.querySelector(".short-weather .status span") , ...document.querySelectorAll(".daily .card .temp span") ]
    export  const tempDeg=[document.querySelector(".short-weather .status h2") , ...document.querySelectorAll(".daily .card .temp h2") ]

    export  const btnC=document.querySelector(".temp-unit .celcius");
    export  const btnF=document.querySelector(".temp-unit  .fahrenheit");

    export  const btnLight=document.querySelector(".mode .light");
    export  const btnDark=document.querySelector(".mode  .dark");


    export  const backBtn=document.querySelector(".back ");

    //at seacrh
        export  const allSearchInput=document.querySelectorAll(".search .search-text")
        export  const searchInput=document.querySelector(".search .search-text.by-api")
        export  const searchInputDB=document.querySelector(".search .search-text.by-database")
        export  const searchBtn=document.querySelector(".search .search-icon.by-api ")
        export  const searchBtnDB=document.querySelector(".search .search-icon.by-database ")
        export  const ul = document.querySelector("nav .search .suggesstion")
        
//

// container node
    export  const container=document.querySelector(".container")
// short wather section nodes
    export  const date=document.querySelector(".short-weather .time .by-api")
    export  const dateDB=document.querySelector(".short-weather .time .by-database")
    // export  const dateDB=document.querySelector(".short-weather .time>h2")
   

    export  const Location=document.querySelector(".short-weather .location span")
    export  const mainImg=document.querySelector(".short-weather .status img")
    export  const mainTemp=document.querySelector(".short-weather .status h2")
    export  const mainCond=document.getElementById("mainCondition")
    export  const mainHum=document.getElementById("mainHumidity")
//

// daily section nodes
    export  const daily=document.querySelector(".daily")
    export  const slider=document.querySelector(".daily .slider")
    export  const btnSliderLeft=document.querySelector(".daily .slider  .left")
    export  const btnSliderRight=document.querySelector(".daily .slider  .right")
    export  const cards=document.querySelectorAll(".daily .slider  .card")
    export  const h2cards=document.querySelectorAll(".daily .slider  .card>h2")


    export  const days=document.querySelectorAll(".daily .slider .week");
    export  const daysTitle=document.querySelectorAll(".daily .slider .week>h2");
    export  const daysImg=document.querySelectorAll(".daily .slider .week>img");
    export  const daysTemp=document.querySelectorAll(".daily .slider .week>div>h2");
//

//daily details section
export  const HumidityCircle=document.querySelector(".Humidity .circle");
export  const humIndex=document.getElementById("humIndex")
export  const humStatus=document.getElementById("humStatus")

export  const uvDiv=document.querySelector(".day-details .uv");
export  const airDiv=document.querySelector(".day-details .air");
export  const visDiv=document.querySelector(".day-details .visibility");
export  const sunDiv=document.querySelector(".day-details .sun");


export  const uvCircle=document.querySelector(".uv .circle");
export  const uvIndex=document.querySelector(".uv .circle .index");
export  const uvStatus=document.getElementById("uvStatus")
export  const airIndex=document.getElementById("airIndex")
export  const airStatus=document.getElementById("airStatus")
export  const windIndex=document.getElementById("windIndex")
export  const windStatus=document.getElementById("windStatus")
export  const visIndex=document.getElementById("visIndex")
export  const visStatus=document.getElementById("visStatus")
export  const sunrise=document.getElementById("sunrise")
export  const sunset=document.getElementById("sunset")