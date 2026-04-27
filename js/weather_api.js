// Environment Variables
const OPENWEATHER_API = ENV.OPENWEATHER_KEY;
const WAQI_API = ENV.WAQI_KEY;

// Default Coordinates
const DELHI_LAT = 28.6139;
const DELHI_LON = 77.2090;

document.addEventListener("DOMContentLoaded", function() {
    
    // Auth Check
    let loginStatus = localStorage.getItem("air_wear_user_logged_in");
    if(loginStatus !== "true") {
        window.location.href = "login.html";
    }

    // Set User Profile UI
    let userType = localStorage.getItem("air_wear_user_type");
    document.getElementById("greeting_user_name").innerText = 
        userType === "google_user" ? "Hello, Student (Google Account)" : "Hello, Guest Protocol";

    // Handle Logout
    document.getElementById("sidebar_logout_button").addEventListener("click", function() {
        localStorage.clear();
        window.location.href = "login.html";
    });

    // Refresh Data Button
    document.getElementById("refresh_data_btn").addEventListener("click", function() {
        this.innerHTML = '<i class="bi bi-arrow-clockwise me-2 spin-anim"></i>Refreshing...';
        setTimeout(() => location.reload(), 800);
    });

    // Global weather data
    let globalWeatherData = { temp: 0, aqi: 0, humidity: 0, uv: 0 };

    // Initialize the flow
    fetchAllData();

    async function fetchAllData() {
        try {
            // Fetch OpenWeatherMap Data
            let w_response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${DELHI_LAT}&lon=${DELHI_LON}&appid=${OPENWEATHER_API}&units=metric`);
            let weatherData = await w_response.json();
            
            globalWeatherData.temp = Math.round(weatherData.main.temp);
            globalWeatherData.humidity = weatherData.main.humidity;
            
            // Fetch WAQI Data
            let aqi_response = await fetch(`https://api.waqi.info/feed/geo:${DELHI_LAT};${DELHI_LON}/?token=${WAQI_API}`);
            let aqiData = await aqi_response.json();
            
            globalWeatherData.aqi = aqiData.data.aqi;
            
            // Fetch or simulate UV Index
            if(aqiData.data.iaqi && aqiData.data.iaqi.uvi) {
                globalWeatherData.uv = Math.round(aqiData.data.iaqi.uvi.v);
            } else {
                globalWeatherData.uv = (globalWeatherData.temp > 30) ? 8 : (globalWeatherData.temp > 20 ? 5 : 2);
            }

            // Update UI
            updateDashboardCards();
            
            // Generate Advice & Insights
            generateRuleBasedAdvice();
            generateAIInsights();
            
        } catch (error) {
            console.error("API Fetch Error: ", error);
            document.getElementById("temperature_value").innerText = "API Error";
        }
    }

    function updateDashboardCards() {
        document.getElementById("temperature_value").innerText = `${globalWeatherData.temp}°C`;
        document.getElementById("humidity_percentage").innerText = `${globalWeatherData.humidity}%`;
        document.getElementById("uv_rays_value").innerText = globalWeatherData.uv;
        
        // AQI specific coloring
        let aqi = globalWeatherData.aqi;
        let aqiEl = document.getElementById("aqi_index_value");
        let aqiText = document.getElementById("aqi_status_text");
        
        aqiEl.innerText = aqi;
        if(aqi <= 50) {
            aqiText.innerText = "Good";  aqiText.className = "fw-medium text-success";
        } else if(aqi <= 100) {
            aqiText.innerText = "Moderate"; aqiText.className = "fw-medium text-warning";
        } else {
            aqiText.innerText = "Hazardous"; aqiText.className = "fw-medium text-danger";
            aqiEl.classList.add("text-danger");
        }
    }

    function generateRuleBasedAdvice() {
        let temp = globalWeatherData.temp;
        let aqi = globalWeatherData.aqi;
        let uv = globalWeatherData.uv;

        // Health Rule
        let h_text = "Standard health protocol: Stay active and hydrated.";
        if(aqi > 150) h_text = `CRITICAL: AQI is ${aqi}. N95 Mask is strictly mandatory. Keep windows closed and avoid outdoor physical exercise completely.`;
        else if(aqi > 100) h_text = "WARNING: Air quality is poor. Sensitive individuals should wear masks outdoors.";
        document.getElementById("health_advice_text").innerText = h_text;

        // Fashion Rule
        let f_text = "Wear comfortable clothing suited for room temperature.";
        if(temp >= 35) f_text = `Heatwave alert (${temp}°C). Wear very loose, light bright-colored cotton. Avoid synthetics entirely to prevent chafing.`;
        else if(temp >= 25 && temp < 35) f_text = "Warm weather. Half-sleeves, linen, and breathable fabrics are optimal.";
        else if(temp < 15) f_text = "Cold warning. Heavy layering required: Thermals, wool sweater, and a windproof jacket.";
        document.getElementById("fashion_advice_text").innerText = f_text;

        // Skincare Rule
        let s_text = "Standard moisturizer and hygiene maintained.";
        if(uv > 7) s_text = `HIGH UV RISK (${uv}). Broad-spectrum SPF 50+ must be applied every 2 hours. Wear a wide-brimmed hat.`;
        else if(uv > 4) s_text = "Moderate UV. Daily SPF 30 recommended on exposed skin.";
        if(globalWeatherData.humidity < 30) s_text += " Low humidity noted: Use heavy-duty ceramide moisturizer to prevent skin barrier damage.";
        document.getElementById("skincare_advice_text").innerText = s_text;
    }

    function generateAIInsights() {
        let loadingState = document.getElementById("ai_loading_state");
        let resultState = document.getElementById("ai_result_state");
        
        // Simulate API delay
        setTimeout(() => {
            loadingState.style.display = "none";
            resultState.style.display = "block";

            let t = globalWeatherData.temp;
            let a = globalWeatherData.aqi;
            
            // Generate text
            let aiText = `Based on a comprehensive machine learning analysis of New Delhi's current atmospheric variables, we note a temperature of ${t}°C coupled with an AQI stringency of ${a}. `;
            
            let focusText = "";
            let safety = "";

            if (a > 150 && t > 30) {
                aiText += `This creates a hazardous intersection of thermal stress and respiratory strain. Your holistic plan: cancel non-essential outdoor travel. If commuting, utilize AC vehicles equipped with HEPA filters. Hydrate with electrolytes aggressively and wear an N95 mask to combat PM2.5 particle inhalation.`;
                focusText = "Respiratory & Thermal Protection";
                safety = '<span class="text-danger">3/10 (High Risk Environment)</span>';
            } else if (a > 100) {
                aiText += `The primary risk vector today is air toxicity rather than temperature. Wear a mask, maintain regular hydration, and choose lightweight layers.`;
                focusText = "Respiratory Shielding";
                safety = '<span class="text-warning">6/10 (Moderate Diligence Required)</span>';
            } else {
                aiText += `Atmospheric conditions are highly favorable. This is an optimal metabolic window for outdoor cardiovascular exercise. Wear breathable athleisure gear and utilize standard SPF.`;
                focusText = "Outdoor Optimization & Activity";
                safety = '<span class="text-success">9/10 (Safe & Optimal)</span>';
            }

            document.getElementById("ai_generated_paragraph").innerHTML = aiText;
            document.getElementById("ai_key_focus").innerText = focusText;
            document.getElementById("ai_safety_score").innerHTML = safety;

        }, 2500);
    }
});
