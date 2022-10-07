import React, { useState, useEffect } from "react";
import styles from "./Weather.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudBolt, faCloudRain, faCloudShowersHeavy, faSnowflake, faCloud, faSun, faSmog, faCircleExclamation,  } from '@fortawesome/free-solid-svg-icons'

const Weather = ({ weather, temp }) => {
  const [icon, setIcon] = useState(faCircleExclamation);
  useEffect(() => {
    if(weather === "Thunderstorm"){
      setIcon(faCloudBolt)
    }
    else if(weather === "Drizzle"){
      setIcon(faCloudShowersHeavy)
    }
    else if(weather === "Rain"){
      setIcon(faCloudRain)
    }
    else if(weather === "Snow"){
      setIcon(faSnowflake)
    }
    else if(weather === "Atmosphere"){
      setIcon(faSmog)
    }
    else if(weather === "Clear"){
      setIcon(faSun)
    }
    else if(weather === "Clouds"){
      setIcon(faCloud)
    }
    else{
      setIcon(faCircleExclamation)
    }
  }, [weather]);
  return(
    <div>
      <div className={styles.weather_icon}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className={styles.weather_info}>
        날씨 : {weather}
      </div>
      <div className={styles.weather_info}>
        온도 : {temp}
      </div>
    </div>
  )
}

export default Weather;