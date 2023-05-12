import { Button, List } from 'antd';
import { useState } from 'react';
import { Board } from './Board';

export type SequareInterface = (null | string)[];
export const Game = () => {
  const [history, setHistory] = useState<SequareInterface[]>([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const currentSquares = history[history.length - 1];

  const handlePlay = (sequares: SequareInterface) => {
    setHistory([...history, sequares]);
    setXIsNext(!xIsNext);
  };

  const jump = (i: number) => {
    setHistory([...history.slice(0, i + 1)]);
    setXIsNext(i % 2 === 0);
  };
  return (
    <div className="game-container">
      <Board squares={currentSquares} xIsNext={xIsNext} onPlay={handlePlay} />
      <div className="moves">
        <List
          size="small"
          header={<div>动作列表</div>}
          bordered
          dataSource={history}
          renderItem={(_, i) => (
            <List.Item>
              <span> {i === 0 ? '游戏开始！⭐️' : `第${i}步`}</span>
              <Button type="link" onClick={() => jump(i)}>
                回退
              </Button>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
