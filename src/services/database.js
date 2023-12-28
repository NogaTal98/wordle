import {auth, db} from "../firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore"; 
import { paintRow } from "../services/gameUtility";

let emptyBoard =  [[["", "", false],["", "", false],["", "", false],["", "", false],["", "", false]]
                    ,[["", "", false],["", "", false],["", "", false],["", "", false],["", "", false]]
                    ,[["", "", false],["", "", false],["", "", false],["", "", false],["", "", false]]
                    ,[["", "", false],["", "", false],["", "", false],["", "", false],["", "", false]]
                    ,[["", "", false],["", "", false],["", "", false],["", "", false],["", "", false]]
                    ,[["", "", false],["", "", false],["", "", false],["", "", false],["", "", false]]];

export const addData = async (history={}) => {
    try {
        await setDoc(doc(db, "users", auth.currentUser.uid),{
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
            history: history,
            winnings: 0,
            guess: {1:0, 2:0, 3:0, 4:0, 5:0, 6:0}
        });
        console.log("Document written with ID: ", auth.currentUser.uid);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const updateDataBaseBoard = async (board, didWon, guessNum) => {
    try {
        if (!auth.currentUser) return;
        const date = new Date();
        const todaysDate = date.getDate().toString()+"."+(date.getMonth()+1).toString()+"."+date.getFullYear().toString();
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            if (!data.history) {
                data.history = {};
            }
            data.history[todaysDate] = BoardToString(board);

            if (didWon) {
                if (!data.winnings) {
                    data.winnings = 0;
                }
                data.winnings += 1;
            }
            if (!data.guess) {
                data.guess = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0};
            }
            data.guess[guessNum] += 1;

            await updateDoc(docRef, data);
        } else {
            await addData({[todaysDate]: BoardToString(board)});
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const getBoard = async (dailyWord) => {
    try {
        if (auth.currentUser === null) {
            return ([[["", "", false],["", "", false],["", "", false],["", "", false],["", "", false]]
                    ,[["", "", false],["", "", false],["", "", false],["", "", false],["", "", false]]
                    ,[["", "", false],["", "", false],["", "", false],["", "", false],["", "", false]]
                    ,[["", "", false],["", "", false],["", "", false],["", "", false],["", "", false]]
                    ,[["", "", false],["", "", false],["", "", false],["", "", false],["", "", false]]
                    ,[["", "", false],["", "", false],["", "", false],["", "", false],["", "", false]]]);
        }
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const date = new Date();
            const todaysDate = date.getDate().toString()+"."+(date.getMonth()+1).toString()+"."+date.getFullYear().toString();
            const data = docSnap.data();
            if (data.history && data.history[todaysDate]) {
                return StringToBoard(data.history[todaysDate], dailyWord);
            } else {
                return emptyBoard.concat();
            }
        } else {
            return emptyBoard.concat();
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const BoardToString = (board) => {
    let stringArray = [];
    for (let i = 0; i < board.length; i++) {
        let word = "";
        for (let j = 0; j < board[0].length; j++) {
            word = word + board[i][j][0];
        }
        if (word !== ""){
            stringArray.push(word);
        }
    }
    return stringArray;
}

const StringToBoard = (stringArray, dailyWord) => {
    let board = emptyBoard;
    for (let i = 0; i < stringArray.length; i++) {
        for (let j = 0; j < stringArray[i].length; j++) {
            board[i][j][0] = stringArray[i][j];
            board[i][j][2] = true;
        }
        board[i] = paintRow(board[i], dailyWord);
    }
    return board;
}