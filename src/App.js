import React, { useState, useEffect } from "react";

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
      <div className="p-12 text-center flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">지원사업전략연구소</h1>
        <h2 className="text-2xl font-semibold mb-2 text-blue-600">Flow 구성 실습</h2>
        <p className="text-xl text-gray-600 mb-8">시작해 볼까요?</p>
        <button
          onClick={() => setStep(0)}
          className="px-6 py-3 bg-blue-600 text-white text-lg rounded hover:bg-blue-700"
        >
          시작하기
        </button>
      </div>
    );
  }

  if (step >= keywordSets.length) {
    return (
      <div className="p-8 text-center bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">🎉 선택된 키워드 정리</h1>
        <div className="max-w-2xl mx-auto">
          <table className="w-full table-auto border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">영역</th>
                <th className="border px-4 py-2">선택 키워드</th>
              </tr>
            </thead>
            <tbody>
              {keywordSets.map((set, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="border px-4 py-2 font-semibold">{set.title}</td>
                  <td className="border px-4 py-2">{selected[idx]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
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
    <div className="p-8 min-h-screen bg-white flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-2">{currentSet.title}</h1>
      <p className="mb-6 text-gray-600">카드를 클릭해 키워드를 선택해 주세요</p>
      <div className="grid grid-cols-4 gap-6 mb-6 w-full max-w-4xl">
        {shuffledKeywords.map((word, idx) => (
          <div
            key={idx}
            onClick={() => handleCardClick(word)}
            className={`w-36 h-20 flex items-center justify-center text-center rounded-lg shadow cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 ${
              selected[step] === word ? "bg-blue-500 text-white scale-105" : "bg-gray-100 text-gray-800"
            }`}
          >
            {selected[step] === word ? word : <span className="text-sm text-gray-400">카드 선택</span>}
          </div>
        ))}
      </div>
      <button
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        onClick={() => setStep(step + 1)}
        disabled={!selected[step]}
      >
        다음 단계로
      </button>
    </div>
  );
}
