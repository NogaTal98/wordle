import {auth, db} from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"; 

const emptyBoard =  [[["", ""],["", ""],["", ""],["", ""],["", ""]]
                    ,[["", ""],["", ""],["", ""],["", ""],["", ""]]
                    ,[["", ""],["", ""],["", ""],["", ""],["", ""]]
                    ,[["", ""],["", ""],["", ""],["", ""],["", ""]]
                    ,[["", ""],["", ""],["", ""],["", ""],["", ""]]
                    ,[["", ""],["", ""],["", ""],["", ""],["", ""]]];

export const addData = async (history={}) => {
    try {
        await setDoc(doc(db, "users", auth.currentUser.uid),{
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
            history: history
        });
        console.log("Document written with ID: ", auth.currentUser.uid);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const setBoard = async (board) => {
    try {
        if (!auth.currentUser) return;
        const date = new Date();
        const todaysDate = date.getDate().toString()+"."+date.getMonth().toString()+"."+date.getFullYear().toString();
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            if (!data.history) {
                data.history = {};
            }
            data.history[todaysDate] = BoardToSring(board);
            await setDoc(docRef, data);
        } else {
            await addData({[todaysDate]: BoardToSring(board)});
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const getBoard = async () => {
    try {
        if (!auth.currentUser) return emptyBoard;
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const date = new Date();
            const todaysDate = date.getDate().toString()+"."+(date.getMonth()+1).toString()+"."+date.getFullYear().toString();
            const data = docSnap.data();
            if (data.history && data.history[todaysDate]) {
                return StringToBoard(data.history[todaysDate]);
            } else {
                return emptyBoard;
            }
        } else {
            return emptyBoard;
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const BoardToSring = (board) => {
    let stringArray = [];
    for (let i = 0; i < board.length; i++) {
        let word = "";
        for (let j = 0; j < board[i].length; i++) {
            word = word + board[i][j][0];
        }
        stringArray.push(word);
    }
}

const StringToBoard = (stringArray) => {
    let board = emptyBoard;
    for (let i = 0; i < stringArray.length; i++) {
        for (let j = 0; j < stringArray[i].length; j++) {
            board[i][j][0] = stringArray[i][j];
        }
    }
    return board;
}