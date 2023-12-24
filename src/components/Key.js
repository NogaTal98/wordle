function Key({value}) {
    return (
      <div className="key">
        {value}
      </div>
    );
  }

  function LargeKey({value}) {
    return (
      <div className="largekey">
        {value}
      </div>
    );
  }

  export {Key, LargeKey};
  export default Key;