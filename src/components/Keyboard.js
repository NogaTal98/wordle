import {Key, LargeKey} from "./Key";

function Keyboard({states, pressKey}) {
    const keyBordValues = [["Q","W","E","R","T","Y","U","I","O","P"],
                            ["A","S","D","F","G","H","J","K","L"],
                            ["ENTER", "Z","X","C","V","B","N","M", "DELETE"]];
    return (
      <div className="keyboard">
        {keyBordValues.map((row, index) => {
            return (
                <div className="keyboard-row" key={index}>
                    {row.map((key, index) => {
                        if (key === "ENTER") {
                            return (
                                <LargeKey value={key} pressKey={pressKey} key={index}/>
                            );
                        }
                        else if (key === "DELETE") {
                            return (
                                <LargeKey value={key} pressKey={pressKey} key={index}/>
                            );
                        }
                        return (
                            <Key value={key} state={states[key]} pressKey={pressKey} key={index}/>
                        );
                    })}
                </div>
            );
        }
        )}
      </div>
    );
  }

  export default Keyboard;