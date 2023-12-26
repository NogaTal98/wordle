import Box from './Box';

function Board({state}) {
    return (
      <div className="board">
        {state.map((row, i) => {
            return (
                <div className="row" key={i}>
                    {row.map((box, j) => {
                        return (
                            <Box value={box} key={j}/>
                        );
                    })}
                </div>
            );
        })}
      </div>
    );
  }

  export default Board;