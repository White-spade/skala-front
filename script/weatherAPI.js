// 외부에서 가져다 쓸 수 있도록 export를 함수 맨 앞에 붙입니다.
export async function getLiveWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m`;
    //옳은 요청 비교https://api.open-meteo.com/v1/forecast?latitude=37.57&longitude=126.98&current_weather=true&hourly=relativehumidity_2m

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("서버 응답 불안정");
        
        // await를 붙여서 데이터가 인터넷 너머에서 다 올 때까지 안전하게 기다림
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
        
        // 필요한 데이터만 깔끔한 객체로 패킹해서 리턴
        return {
            temp: currentTemp,
            humidity: currentHumidity
        };
    } catch (error) {
        console.error("API 모듈 에러:", error);
        return null; // 에러 시 빈 값 던지기
    }
}