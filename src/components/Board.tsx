import { Alert, message } from 'antd';
import { FC, useEffect } from 'react';
import { calculateWinner } from '../utils/calculateWinner';
import { SequareInterface } from './Game';
import { Square } from './Square';

interface BoardProps {
  squares: SequareInterface;
  xIsNext: boolean;
  onPlay: (sequares: SequareInterface) => void;
}
export const Board: FC<BoardProps> = ({ onPlay, squares, xIsNext }) => {
  const [messageApi, contextHolder] = message.useMessage();
  let status;
  const winner = calculateWinner(squares);
  status = <Alert showIcon message={winner ? 'Winner: ' + winner : 'Next Player: ' + (xIsNext ? 'X' : 'O')} type={winner ? 'success' : 'info'} />;
  useEffect(() => {
    if (winner) {
      messageApi.open({
        type: 'success',
        content: `恭喜${winner}获得了胜利！👍🏻`,
        className: 'custom-class',
        style: {
          marginTop: '20vh',
        },
      });
    }
  }, [winner]);

  const handleClick = (i: number) => {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  };

  return (
    <>
      {contextHolder}
      <div className="board-container">
        <div>{status}</div>
        <section className="board">
          {squares.map((square, i) => (
            <Square value={square} key={i} onClick={() => handleClick(i)} />
          ))}
        </section>
      </div>
    </>
  );
};
