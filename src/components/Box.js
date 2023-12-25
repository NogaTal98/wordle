function Box({value}) {
    return (
      <div className={"box " + value[1]} >
        {value[0]}
      </div>
    );
  }

  export default Box;