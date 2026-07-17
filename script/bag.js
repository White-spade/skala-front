function inMybag(){
    let myBag= [
        { name: "콜라", count: 1 },
        { name: "물병", count: 2 },
        { name: "에너지음료수", count: 1 }
    ];
    let resultText = "🎒 [내 가방 속 물품 목록]\n-----------------------\n";

    // iterator
    for (let i in myBag) {
        resultText = resultText + "- " + myBag[i].name + " : " + myBag[i].count + "개\n";
    }

    resultText += "-----------------------\n";
    resultText += "총 물품 종류: " + myBag.length + "가지";
    alert(resultText);
}