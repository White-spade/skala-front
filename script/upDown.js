function updownGame() {
    let randomNum = Math.floor(Math.random()*50)+1;
    let count = 0;

    console.log("이번 게임의 비밀숫자: "+randomNum);

    while(true){
        var userGuess = Number(prompt("1~50사이의 숫자 추측"));

        if(userGuess==0){alert("Game Canceled"); break;}
        count += 1;

        if(userGuess==randomNum){
            alert("정답입니다! \n 시도횟수: "+count);
            break;

        } else if(userGuess > randomNum){
            alert("Down! 숫자를 줄여보세요 (현재 "+count+"회 시도 중)");
        } else if(userGuess < randomNum){
            alert("Up! 숫자를 올려보세요 (현재 "+count+"회 시도 중)");
        } else {
            alert("⚠️ 올바른 숫자가 아닙니다. (현재 "+count+"회 시도 중)");
        }
    }
}