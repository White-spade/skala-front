function gradeCalc(){
    const subjects = ["HTML", "CSS", "JavsScript"];
    let total = 0;

    for(let i=0; i<subjects.length; i++){
        let score = Number(prompt(subjects[i]+"점수를 입력해주세요(0~100)"));
        if(isNaN(score)){
            alert("올바른 숫자가 아닙니다. 계산을 취소합니다.");
            return;
        }
        total += score;
    }
    let average = total/subjects.length;

    let result=""
    if(average >= 60){ result="합격입니다!" }
    else{ result= "불합격입니다." }

    alert(
        "====== 📊 성적 결과표 ======\n" +
        "• 총점: " + total + "점\n" +
        "• 평균: " + average.toFixed(1) + "점\n" + // toFixed(1)은 소수점 첫째 자리까지만 출력하는 팁입니다.
        "---------------------------\n" +
        "• 결과: " + result
    )
}