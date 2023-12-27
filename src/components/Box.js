function Box({value}) {
    return (
        <div className={"flip-box " + (value[2] && "flip-control")}>
            <div className="flip-box-inner">
                <div className={"box " + (value[0] !== "" ? "filled" : "") + " flip-box-front"}>
                    {value[0]}
                </div>
                <div className={"box " + value[1] + " flip-box-back"}>
                    {value[0]}
                </div>
            </div>
        </div>
    );
  }

  export default Box;