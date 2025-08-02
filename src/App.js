import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./logo.svg";

const keywordSets = [
  { title: "문제 키워드", keywords: ["고령화", "탄소중립", "정보격차", "폐기물", "저출생", "도시난개발", "에너지위기", "물가상승", "노후인프라", "디지털격차", "사회적 고립", "의료공백"] },
  { title: "수요자 키워드", keywords: ["시니어", "청년", "여성", "아동청소년", "소상공인", "장애인", "농어민", "외국인 노동자", "N잡러", "1인가구", "돌봄인력", "플랫폼노동자"] },
  { title: "솔루션 키워드", keywords: ["앱", "플랫폼", "키트", "센터", "공간", "구독서비스", "데이터베이스", "알고리즘", "AI 분석", "모니터링 시스템", "오디오콘텐츠", "체험프로그램"] },
  { title: "실행 전략 키워드", keywords: ["시범 운영", "제휴 연계", "커뮤니티 구축", "인재 양성", "정기 구독", "지역 조직화", "온오프 연계", "프로토타입 제작", "이벤트 운영", "캠페인 전개", "마을단위 실행", "교육연계"] },
  { title: "성과 키워드", keywords: ["일자리 창출", "ESG 강화", "디지털 포용", "복지향상", "지역활성화", "기술자립", "공공문제 해결", "생활질 개선", "기후대응", "사회통합", "돌봄체계 강화", "자립역량 향상"] },
];

function shuffle(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export default function KeywordFlowApp() {
  const [step, setStep] = useState(-1);
  const [selected, setSelected] = useState({});
  const [shuffledKeywords, setShuffledKeywords] = useState([]);

  useEffect(() => {
    if (step >= 0 && step < keywordSets.length) {
      const original = keywordSets[step].keywords;
      setShuffledKeywords(shuffle(original));
    }
  }, [step]);

  const handleCardClick = (word) => {
    setSelected({ ...selected, [step]: word });
  };

  if (step === -1) {
    return (
      <div className="start-screen">
        <img src={logo} alt="지원사업전략연구소 로고" className="logo" />
        <h1 className="main-title">지원사업전략연구소</h1>
        <h2 className="subtitle">Flow 구성 실습</h2>
        <p className="description">시작해 볼까요?</p>
        <button
          onClick={() => setStep(0)}
          className="start-button"
        >
          시작하기
        </button>
      </div>
    );
  }

  if (step >= keywordSets.length) {
    return (
      <div className="result-screen">
        <h1 className="result-title">🎉 선택된 키워드 정리</h1>
        <div className="result-container">
          <table className="result-table">
            <thead>
              <tr>
                <th>영역</th>
                <th>선택 키워드</th>
              </tr>
            </thead>
            <tbody>
              {keywordSets.map((set, idx) => (
                <tr key={idx}>
                  <td className="category-cell">{set.title}</td>
                  <td className="keyword-cell">{selected[idx]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="restart-button"
          onClick={() => {
            setSelected({});
            setStep(-1);
          }}
        >
          다시 시작하기
        </button>
      </div>
    );
  }

  const currentSet = keywordSets[step];

  return (
    <div className="game-screen">
      <h1 className="step-title">{currentSet.title}</h1>
      <p className="instruction">카드를 클릭해 키워드를 선택해 주세요</p>
      <div className="card-grid">
        {shuffledKeywords.map((word, idx) => (
          <div
            key={idx}
            onClick={() => handleCardClick(word)}
            className={`card ${selected[step] === word ? 'selected' : ''}`}
          >
            {selected[step] === word ? word : <span className="card-placeholder">카드 선택</span>}
          </div>
        ))}
      </div>
      <button
        className={`next-button ${!selected[step] ? 'disabled' : ''}`}
        onClick={() => setStep(step + 1)}
        disabled={!selected[step]}
      >
        다음 단계로
      </button>
    </div>
  );
}
