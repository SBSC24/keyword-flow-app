import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./logo.svg";

// Flow 유형별 키워드 세트
const flowTypes = [
  {
    id: 'problem',
    title: '문제 중심 Flow 구성 실습',
    description: '문제 → 해결 → 실행 → 확장',
    steps: [
      {
        title: "문제 키워드",
        keywords: ["고령화", "탄소중립", "정보격차", "폐기물", "저출생", "도시난개발", "에너지위기", "물가상승", "노후인프라", "디지털격차", "사회적 고립", "의료공백"]
      },
      {
        title: "솔루션 키워드",
        keywords: ["앱", "플랫폼", "키트", "센터", "공간", "구독서비스", "데이터베이스", "알고리즘", "AI 분석", "모니터링 시스템", "오디오콘텐츠", "체험프로그램"]
      },
      {
        title: "실행 전략 키워드",
        keywords: ["시범 운영", "제휴 연계", "커뮤니티 구축", "인재 양성", "정기 구독", "지역 조직화", "온오프 연계", "프로토타입 제작", "이벤트 운영", "캠페인 전개", "마을단위 실행", "교육연계"]
      },
      {
        title: "확장 키워드",
        keywords: ["타지역 확산", "전국 네트워크화", "지자체 협력 모델", "민간투자 유치", "글로벌 수출", "사회적기업 전환", "공공기관 협력 확대", "플랫폼 고도화", "후속 프로그램 연계", "거버넌스 구축", "클러스터 형성", "정책 제도화"]
      }
    ]
  },
  {
    id: 'user',
    title: '수요자 중심 Flow 구성 실습',
    description: '수요자 → 변화 → 수익 → 정책 효과',
    steps: [
      {
        title: "수요자 키워드",
        keywords: ["시니어", "청년", "여성", "아동청소년", "소상공인", "장애인", "농어민", "외국인 노동자", "N잡러", "1인가구", "돌봄인력", "플랫폼노동자"]
      },
      {
        title: "변화 키워드",
        keywords: ["정보 접근성 향상", "건강 증진", "정서 안정", "기술 활용 역량 향상", "일상 참여 증가", "교육 수준 향상", "커뮤니티 소속감 증가", "자기표현 기회 증가", "행동 습관 형성", "진로 탐색 활성화", "경제활동 참여 증가", "의사결정 자율성 증가"]
      },
      {
        title: "수익 키워드",
        keywords: ["콘텐츠 판매", "구독 수익", "체험 참가비", "광고 수익", "교육비 수익", "마켓 판매 수익", "라이센싱 수익", "협찬 수익", "데이터 기반 서비스 수익", "멤버십 가입 수익", "파트너 수수료 수익", "온라인 플랫폼 매출"]
      },
      {
        title: "성과 키워드",
        keywords: ["일자리 창출", "ESG 강화", "디지털 포용", "복지향상", "지역활성화", "기술자립", "공공문제 해결", "생활질 개선", "기후대응", "사회통합", "돌봄체계 강화", "자립역량 향상"]
      }
    ]
  },
  {
    id: 'policy',
    title: '정책 중심 Flow 구성 실습',
    description: '정책 배경 → 서비스 구조 → 실행 전략 → 정책 효과',
    steps: [
      {
        title: "정책 키워드",
        keywords: ["탄소중립 정책", "디지털 전환 전략", "지방소멸 대응 정책", "복지 사각 해소 계획", "고령사회 대응 정책", "청년정책 기본계획", "장애인 접근성 개선 계획", "지역균형 뉴딜", "중소기업 지원 정책", "지속가능발전목표(SDGs)", "스마트도시 추진 전략", "인구 구조 대응 종합계획"]
      },
      {
        title: "서비스 키워드",
        keywords: ["통합 플랫폼 운영", "AI 기반 매칭 시스템", "오프라인 체험 공간", "지역 커뮤니티 허브", "모바일 앱 기반 서비스", "온디맨드 키트 배송", "실시간 모니터링 시스템", "온오프 연계 학습", "지역 센터 협력 운영", "챗봇 응대 서비스", "영상 콘텐츠 기반 플랫폼", "데이터 기반 맞춤 서비스"]
      },
      {
        title: "실행 전략 키워드",
        keywords: ["시범 운영", "제휴 연계", "커뮤니티 구축", "인재 양성", "정기 구독", "지역 조직화", "온오프 연계", "프로토타입 제작", "이벤트 운영", "캠페인 전개", "마을단위 실행", "교육연계"]
      },
      {
        title: "성과 키워드",
        keywords: ["일자리 창출", "ESG 강화", "디지털 포용", "복지향상", "지역활성화", "기술자립", "공공문제 해결", "생활질 개선", "기후대응", "사회통합", "돌봄체계 강화", "자립역량 향상"]
      }
    ]
  }
];

function shuffle(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export default function KeywordFlowApp() {
  const [step, setStep] = useState(-1);
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [selected, setSelected] = useState({});
  const [shuffledKeywords, setShuffledKeywords] = useState([]);

  useEffect(() => {
    if (selectedFlow && step >= 0 && step < selectedFlow.steps.length) {
      const original = selectedFlow.steps[step].keywords;
      setShuffledKeywords(shuffle(original));
    }
  }, [step, selectedFlow]);

  const handleCardClick = (word) => {
    setSelected({ ...selected, [step]: word });
  };

  const handleFlowSelect = (flow) => {
    setSelectedFlow(flow);
    setStep(0);
    setSelected({});
  };

  const resetApp = () => {
    setStep(-1);
    setSelectedFlow(null);
    setSelected({});
  };

  // 시작 화면
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

  // Flow 유형 선택 화면
  if (step === 0 && !selectedFlow) {
    return (
      <div className="flow-selection-screen">
        <h1 className="flow-selection-title">Flow 유형 선택</h1>
        <p className="flow-selection-description">실습할 Flow 유형을 선택해주세요</p>
        <div className="flow-grid">
          {flowTypes.map((flow, idx) => (
            <div
              key={flow.id}
              onClick={() => handleFlowSelect(flow)}
              className="flow-card"
            >
              <h3 className="flow-card-title">{flow.title}</h3>
              <p className="flow-card-description">{flow.description}</p>
            </div>
          ))}
        </div>
        <button
          className="back-button"
          onClick={() => setStep(-1)}
        >
          뒤로 가기
        </button>
      </div>
    );
  }

  // Flow 완료 화면
  if (selectedFlow && step >= selectedFlow.steps.length) {
    return (
      <div className="result-screen">
        <h1 className="result-title">🎉 {selectedFlow.title} 완료</h1>
        <div className="result-container">
          <table className="result-table">
            <thead>
              <tr>
                <th>단계</th>
                <th>선택 키워드</th>
              </tr>
            </thead>
            <tbody>
              {selectedFlow.steps.map((stepData, idx) => (
                <tr key={idx}>
                  <td className="category-cell">{stepData.title}</td>
                  <td className="keyword-cell">{selected[idx]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="restart-button"
          onClick={resetApp}
        >
          다시 시작하기
        </button>
      </div>
    );
  }

  // 키워드 선택 화면
  const currentStep = selectedFlow.steps[step];

  return (
    <div className="game-screen">
      <h1 className="step-title">{currentStep.title}</h1>
      <p className="instruction">카드를 클릭해 키워드를 선택해 주세요</p>
      <div className="progress-indicator">
        <span className="progress-text">{step + 1} / {selectedFlow.steps.length}</span>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((step + 1) / selectedFlow.steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
      <div className="card-grid">
        {shuffledKeywords.map((word, idx) => (
          <div
            key={idx}
            onClick={() => handleCardClick(word)}
            className={`card ${selected[step] === word ? 'selected' : ''}`}
          >
            <span className={selected[step] === word ? 'card-selected-text' : 'card-placeholder'}>
              {selected[step] === word ? word : '카드 선택'}
            </span>
          </div>
        ))}
      </div>
      <button
        className={`next-button ${!selected[step] ? 'disabled' : ''}`}
        onClick={() => setStep(step + 1)}
        disabled={!selected[step]}
      >
        {step === selectedFlow.steps.length - 1 ? '완료하기' : '다음 단계로'}
      </button>
    </div>
  );
}
