export const paintRow = (row, dailyWord) => {
    let newRow = row.concat();
    let coppyWord = dailyWord;
    for (let i = 0; i < dailyWord.length; i++) {
        let char = newRow[i][0];
        // correct letter and place 
        if (char === dailyWord[i]) {
            newRow[i][1] = "correct";
            coppyWord = coppyWord.replace(char, "");
        }
        else if (coppyWord.indexOf(char) >= 0) {
            newRow[i][1] = "missed";
        }
        else {
            newRow[i][1] = "wrong";
        }
      }
      return newRow;
}

export const paintKeyBoard = (boardState) => {
    let keyBoardState = {"Q":"","W":"","E":"","R":"","T":"","Y":"","U":"","I":"","O":"","P":"",
                        "A":"","S":"","D":"","F":"","G":"","H":"","J":"","K":"","L":"",
                        "Z":"","X":"","C":"","V":"","B":"","N":"","M":""};
    for (let i = 0; i < boardState.length; i++) {
        for (let j = 0; j < boardState[0].length; j++) {
            let char = boardState[i][j][0];
            if (char !== "" && keyBoardState[char] !== "correct") {
                keyBoardState[char] = boardState[i][j][1];
            }
        }
    }
    return keyBoardState;
}

export const concatGuess = (row) => {
    let guess = "";
    if (row === undefined) {
        return guess;
    }
    for (let i = 0; i < row.length; i++) {
        guess = guess + row[i][0];
    }
    return guess;
}