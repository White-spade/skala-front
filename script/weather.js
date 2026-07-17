const citySelect = document.querySelector('#city-select');
const weatherBox = document.querySelector('#weather-box');

// ★ 이벤트 핸들러 함수 앞에 async를 붙여줍니다!
citySelect.addEventListener('change', async function(event) {
    const selectedValue = event.target.value;
    
    if (selectedValue === "none") {
        weatherBox.innerHTML = "<p>도시를 선택하면 좌표가 표시됩니다.</p>";
        return;
    }

    const coords = selectedValue.split(',');
    console.log(coords) //공백문자 때문에 20이 삽입되는 에러가 있었음
    const lat = coords[0];
    const lon = coords[1];
    const cityName = citySelect.options[citySelect.selectedIndex].text;

    // [UX 개선] 서버에서 데이터를 가져오는 동안 로딩 표시 띄우기
    weatherBox.innerHTML = "<p>실시간 날씨 로딩 중... ⏳</p>";

    // try-catch 구문으로 네트워크 에러 방어벽 치기
    try {
        // Open-Meteo API에 비동기 요청 날리기
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m`;
        //옳은 요청 비교https://api.open-meteo.com/v1/forecast?latitude=37.57&longitude=126.98&current_weather=true&hourly=relativehumidity_2m


        // await를 붙여서 데이터가 인터넷 너머에서 다 올 때까지 안전하게 기다림
        const response = await fetch(url);
        const data = await response.json();

        //Parsing하는 부분
        const currentTemp = data.current_weather.temperature;
        console.log("현재 온도:", currentTemp);

        const currentTime = data.current_weather.time; // 예: "2026-07-16T07:15"
        const hourlyTimes = data.hourly.time;          // 시간 배열
        const humidityValues = data.hourly.relativehumidity_2m;
        // 현재 시간과 가장 가까운 인덱스 찾기
        // "2026-07-16T07" 같은 앞부분만 비교
        const index = hourlyTimes.findIndex(t => t.startsWith(currentTime.slice(0,13))); 
        const currentHumidity = humidityValues[index];
        console.log("현재 습도:", currentHumidity);



        // 최종 진짜 데이터를 DOM에 주입!
        weatherBox.innerHTML = `
            <div style="background-color: #f1f2f6; padding: 15px; border-radius: 6px; margin-top: 10px;">
                <h4>🌍 ${cityName} 실시간 날씨</h4>
                <p>🌡️ 현재 기온: <strong>${currentTemp}°C</strong></p>
                <p>💧 현재 습도: <strong>${currentHumidity}%</strong></p>
            </div>
        `;

    } catch (error) {
        weatherBox.innerHTML = "<p>⚠️ 날씨 정보를 가져오는데 실패했습니다.</p>";
        console.error(error);
    }
});