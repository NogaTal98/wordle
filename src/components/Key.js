function Key({value, pressKey}) {
    return (
      <div className="key" onClick={() => pressKey(value)}>
        {value}
      </div>
    );
  }

  function LargeKey({value, pressKey}) {
    return (
      <div className="largekey" onClick={() => pressKey(value)}>
        {value}
      </div>
    );
  }

  export {Key, LargeKey};
  export default Key;