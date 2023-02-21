import "./styles.css";
import { useState, useEffect } from "react";
// 아이콘
import { FaHandRock } from "react-icons/fa";
import { FaHandPaper } from "react-icons/fa";
import { FaHandScissors } from "react-icons/fa";
import LoadingIcons from "react-loading-icons";

export default function App() {
  const [com, setCom] = useState(-1);
  const [user, setUser] = useState(-1);
  const [comText, setComText] = useState(""); // 컴 가위바위보 텍스트
  const [userText, setUserText] = useState(""); // 유저 가위바위보 텍스트
  const [result, setResult] = useState("결과");
  const gameIcons = [<FaHandScissors />, <FaHandRock />, <FaHandPaper />];
  const [score, setScore] = useState(0); // 승리 점수
  // Interval 함수 버튼 중복 클릭 실행 방지
  const [hasClick, setHasClick] = useState(false); // 버튼 클릭 확인(true 클릭한 상태)

  useEffect(() => {
    console.log("effect");
  }, []);

  const game = (userNum) => {
    setCom(-1); // 빈화면
    /*** 게임 규칙 ***/
    // 숫자가 같으면 비김
    // 가위(0)는 보(3)에 이김   0 >> 2
    // 바위(1)은 가위(0)에 이김 1 >> 0
    // 보(2)는 바위(1)에 이김 2 >> 1
    setTimeout(() => {
      if (hasClick) return; // 클릭한 상태이면 종료
      // com 가위바위보 숫자 생성
      let comNum = Math.floor(Math.random() * 3);
      console.log(`comNum: ${comNum} vs userNum: ${userNum}`);
      setCom(comNum); // 컴 number
      setUser(userNum); // user number
      // com
      if (comNum === 0) setComText("가위");
      if (comNum === 1) setComText("바위");
      if (comNum === 2) setComText("보");
      // user
      if (userNum === 0) setUserText("가위");
      if (userNum === 1) setUserText("바위");
      if (userNum === 2) setUserText("보");

      // 가위 판정
      if (userNum === 0) {
        if (comNum === 0) {
          console.log("비김");
          setResult("비김");
        } else if (comNum === 2) {
          console.log("나의 승리");
          setResult("나의 승리");
          setScore(score + 1);
        } else {
          console.log("패배(COM WIN)");
          setResult("패배(COM WIN)");
        }
      } // 가위 판정

      // 바위 판정 추가
      if (userNum === 1) {
        if (comNum === 1) {
          console.log("비김");
          setResult("비김");
        } else if (comNum === 0) {
          console.log("나의 승리");
          setResult("나의 승리");
          setScore(score + 1);
        } else {
          console.log("패배(COM WIN)");
          setResult("패배(COM WIN)");
        }
      } // 가위 판정

      // 보 판정 추가
      setHasClick(false); // 처리가 끝난 후 클릭 가능한 상태로 복원
    }, 1000);
  }; // game

  return (
    <div className="App">
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%"
        }}
      >
        <h1 style={{ marginBottom: "30px" }}>가위바위보 게임</h1>
        <p className="score">SCORE: {score}</p>
      </header>
      <figure>
        <div>
          <h4>COM</h4>
          <p className="gameIcon com">
            {com !== -1 ? (
              gameIcons[com]
            ) : (
              <LoadingIcons.Oval stroke="#98ff98" strokeWidth={10} />
            )}
          </p>
          {/* <p>
            com: {comText}({com}) VS user: {userText}({user})
          </p> */}
        </div>
        <div>
          <h4>User</h4>
          <span className="gameIcon user">{gameIcons[user]}</span>
        </div>
      </figure>
      <p style={{ fontSize: "28px" }}>{result}</p>
      <div className="inputBox">
        <button
          onClick={() => {
            setHasClick(true);
            setUser(0); // 내 패 표시
            game(0); // 게임 판정
          }}
        >
          {gameIcons[0]} 가위
        </button>
        <button
          onClick={() => {
            setHasClick(true);
            setUser(1);
            game(1);
          }}
        >
          {gameIcons[1]} 바위
        </button>
        <button
          onClick={() => {
            // game(2);
          }}
        >
          {gameIcons[2]} 보
        </button>
      </div>
    </div>
  );
}
