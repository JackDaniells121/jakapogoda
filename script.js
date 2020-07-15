//-----------
function getWeather(){
    $("#spinner").show();
    $("#result-top").hide();
    $.ajax({
        url : 'get_weather.php',
        data : { city :  $("#city").val() },
        type : 'POST',
        dataType : 'json',
    
        success : function(json) {
            console.log(json);
            console.log(json.weather[0].description);
            $("#result").html("<h1>"+json.name+" ("+json.sys.country+")</h1>");
            $("#result-temp").html("<h1>"+getCelciusSpan(json.main.temp)+" </h1>");
            $("#result-icon").html(getWeatherIcon(json.weather[0].main,5));
            $("#result-sunrise").html("<h6>Godzina wschodu "+getTime(json.sys.sunrise)+"</h6></div>");
            $("#spinner").hide();
            $("#result-top").show();
        },
        error : function(xhr, status) {
            alert('Przepraszamy, wystąpił problem!');
        },
        complete : function(xhr, status) {
        }
    });
}
//-----------
function getForecast(){
    let temp=[];
    $("#spinner2").show();
    $("#result2").html("");

    $.ajax({
        url : 'get_forecast.php',
        data : { city :  $("#city").val() },
        type : 'POST',
        dataType : 'json',
    
        success : function(json) {
            console.log(json);
            json.list.forEach(e => {
                $("#result2").append("<tr><td>"+e.dt_txt.substring(0,16)+"</td><td>"+getWeatherIcon(e.weather[0].description,1.5)+"</td><td>"+getCelciusSpan(e.main.temp)+"</td><td>"+e.weather[0].description+"</td><td>"+getDirection(e.wind.deg)+' '+e.wind.speed+"m/s"+"</td></tr>");

                temp.push(e.main.temp);
            });
            $("#spinner2").hide();
        },
        error : function(xhr, status) {
            alert('Przepraszamy, wystąpił problem!');
        },
        complete : function(xhr, status) {
        }
    });
    console.log(temp);
    const sum = temp.reduce((a, b) => a + b, 0);
    const avg = (sum / temp.length) || 0;

    console.log(`The sum is: ${sum}. The average is: ${avg}.`);
}

function getCelcius(val){
    return Math.floor(val-272.15);
    //return Math.round((val-272.15 + Number.EPSILON) * 100) / 100;
}
function getCelciusSpan(val){
    return getCelcius(val)+'<span>&#8451;</span>';
}

$('#sprawdz-btn').click(function(){
    getWeather();
    getForecast();
})
//getWeather();
//getForecast();


function getWeatherIcon(description, size=1){
    let result='<i class=\"';
    switch (description)
    {
        case 'Clear':
        case'clear sky':
            result+='wi wi-day-sunny';
            break;
            
        case 'Rain':
        case 'moderate rain':
        case 'light rain':
            result+='wi wi-rain';
            break;
        
        case 'overcast clouds':
            result+='wi wi-cloudy';
            break;

        case 'Clouds':
        case 'broken clouds':
        case 'few clouds':
        case 'scattered clouds': 
            result+='wi wi-day-cloudy';
            break;

        default: 
            result+='wi wi-na';
    }
    if(size != 1)
        result+='\" style=\"font-size: '+size+'em;\"></>';
    else
        result+='\"></>';
    return result;

}

function getTime(val){
    let unix_timestamp = val;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    console.log(formattedTime);
    return formattedTime;
}

function getDirection(val){
    /*if(val >= 0 && val <= 90)
        return 'N';
    if(val > 90 && val <= 180)
        return 'E';
    if(val > 180 && val <= 270)
        return 'S';
    if(val > 270 && val <= 360)
        return 'W';*/
    let r ='<i class=\"wi wi-wind towards-'+val+'-deg\" style=\"font-size: 1.5em;\"></i>';

    return r;
}