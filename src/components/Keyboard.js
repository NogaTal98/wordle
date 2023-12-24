import {Key, LargeKey} from "./Key";

function Keyboard({pressKey}) {
    return (
      <div className="keyboard">
        <div className="keyboard-row">
            <Key value="Q" pressKey={pressKey}/>
            <Key value="W" pressKey={pressKey}/>
            <Key value="E" pressKey={pressKey}/>
            <Key value="R" pressKey={pressKey} />
            <Key value="T" pressKey={pressKey}/>
            <Key value="Y" pressKey={pressKey}/>
            <Key value="U" pressKey={pressKey}/>
            <Key value="I" pressKey={pressKey}/>
            <Key value="O" pressKey={pressKey}/>
            <Key value="P" pressKey={pressKey}/>
        </div>
        <div className="keyboard-row">
            <Key value="A" pressKey={pressKey}/>
            <Key value="S" pressKey={pressKey}/>
            <Key value="D" pressKey={pressKey}/>
            <Key value="F" pressKey={pressKey}/>
            <Key value="G" pressKey={pressKey} />
            <Key value="H" pressKey={pressKey}/>
            <Key value="J" pressKey={pressKey}/>
            <Key value="K" pressKey={pressKey}/>
            <Key value="L" pressKey={pressKey}/>
        </div>
        <div className="keyboard-row">
            <LargeKey value="ENTER" pressKey={pressKey}/>
            <Key value="Z" pressKey={pressKey}/>
            <Key value="X" pressKey={pressKey}/>
            <Key value="C" pressKey={pressKey}/>
            <Key value="V" pressKey={pressKey}/>
            <Key value="B" pressKey={pressKey}/>
            <Key value="N" pressKey={pressKey}/>
            <Key value="M" pressKey={pressKey}/>
            <LargeKey value="DELETE" pressKey={pressKey}/>
        </div>
      </div>
    );
  }

  export default Keyboard;