import {Key, LargeKey} from "./Key";

function Keyboard() {
    return (
      <div className="keyboard">
        <div className="keyboard-row">
            <Key value="Q" />
            <Key value="W"/>
            <Key value="E"/>
            <Key value="R"/>
            <Key value="T"/>
            <Key value="Y"/>
            <Key value="U"/>
            <Key value="I"/>
            <Key value="O"/>
            <Key value="P"/>
        </div>
        <div className="keyboard-row">
            <Key value="A"/>
            <Key value="S"/>
            <Key value="D"/>
            <Key value="F"/>
            <Key value="G"/>
            <Key value="H"/>
            <Key value="J"/>
            <Key value="K"/>
            <Key value="L"/>
        </div>
        <div className="keyboard-row">
            <LargeKey value="ENTER"/>
            <Key value="Z"/>
            <Key value="X"/>
            <Key value="C"/>
            <Key value="V"/>
            <Key value="B"/>
            <Key value="N"/>
            <Key value="M"/>
            <LargeKey value="DELETE"/>
        </div>
      </div>
    );
  }

  export default Keyboard;