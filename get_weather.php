<?php

//$appid = '19b1345986f66662e90416e3f50d5f24';
$appid = '1d5297c1e24779a0504b4a4dd67694a9';
//$url = 'http://samples.openweathermap.org/data/2.5/forecast?id=3081368&appid=1d5297c1e24779a0504b4a4dd67694a9';
$url= 'http://api.openweathermap.org/data/2.5/weather?q='.$_POST['city'].'&appid='.$appid;
$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_URL => $url,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_SSL_VERIFYPEER => false, //lack SSL certificate  error workaround - do not do this on production
  CURLOPT_HTTPHEADER => array(
    "x-rapidapi-host: community-open-weather-map.p.rapidapi.com",
    "x-rapidapi-key: [your rapidapi key]"
  ),
));

$response = curl_exec($curl);

$err = curl_error($curl);
curl_close($curl);
if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}

