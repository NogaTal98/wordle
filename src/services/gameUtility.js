export const paintRow = (row, dailyWord) => {
    let newRow = row;
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