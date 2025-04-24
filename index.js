// 질문 데이터 - 유형별로 5개씩 총 20문항
const questions = [
    { text: "1번. 매장의 운영 방식은 매뉴얼처럼 체계적이어야 한다고 본다.", type: "장인형" },
    { text: "2번. 일보다 사람 사이의 관계가 더 중요하다고 생각한다.", type: "엄마형" },
    { text: "3번. 업무보다 사람의 성장에 더 큰 의미를 둔다.", type: "코치형" },
    { text: "4번. 직원이 힘들어 보이면 일보다 감정부터 살핀다.", type: "엄마형" },
    { text: "5번. 중요한 결정은 빠르게 내려야 한다고 생각한다.", type: "지휘관형" },
    { text: "6번. 작은 실수도 그냥 넘어가지 않고 정확히 짚는 편이다.", type: "장인형" },
    { text: "7번. 팀원이 스스로 생각하고 성장하도록 기다린다.", type: "코치형" },
    { text: "8번. 위기 상황에서는 빠르게 판단하고 강하게 이끈다.", type: "지휘관형" },
    { text: "9번. 직원과 정서적으로 친밀한 관계를 유지하는 편이다.", type: "엄마형" },
    { text: "10번. 매뉴얼이나 체크리스트를 철저히 활용한다.", type: "장인형" },
    { text: "11번. 직원이 스스로 해결책을 찾도록 기다리는 편이다.", type: "코치형" },
    { text: "12번. 직원의 감정을 이해하기 위해 개인적인 이야기를 먼저 꺼낸 적이 있다.", type: "엄마형" },
    { text: "13번. 문제 상황에서는 신속하게 방향을 지시한다.", type: "지휘관형" },
    { text: "14번. 일의 기준과 원칙이 지켜졌는지를 중요하게 본다.", type: "장인형" },
    { text: "15번. 질문을 통해 직원 스스로 답을 찾게 한다.", type: "코치형" },
    { text: "16번. 혼자서라도 먼저 실행하고 결과로 보여주는 편이다.", type: "지휘관형" },
    { text: "17번. 감정적으로 힘들어하는 직원에게 위로와 공감을 자주 표현한다.", type: "엄마형" },
    { text: "18번. 작업 품질이나 서비스의 완성도가 항상 중요하다.", type: "장인형" },
    { text: "19번. 팀원과 자주 대화하며 의견을 수렴하려 한다.", type: "코치형" },
    { text: "20번. 결정은 빠르게 내리고 책임은 내가 진다.", type: "지휘관형" }
];

// 현재 질문 인덱스
let currentQuestion = 0;
const container = document.getElementById("questions");
const resultDiv = document.getElementById("result");
const nextQuestionBtn = document.getElementById("nextQuestion");
const submitBtn = document.getElementById("submitQuiz");
const progressDiv = document.getElementById("progress");

// 각 질문에 대한 응답 저장 배열
const answers = [];

// 질문 렌더링 함수
function renderQuestion(index) {
    const q = questions[index];
    const div = document.createElement("div");
    div.className = "question active";
    div.innerHTML = `<strong>${q.text}</strong><div class="scale">` +
        [1,2,3,4,5].map(n =>
            `<label><input type="radio" name="q${index}" value="${n}" required /> ${n}</label>`
        ).join("") +
        `</div>`;
    
    // 이전 질문 숨기기
    const prevQuestion = container.querySelector('.question.active');
    if (prevQuestion) {
        prevQuestion.classList.remove('active');
    }
    
    container.appendChild(div);
    
    // 이미 답변한 질문인 경우 체크 표시
    if (answers[index]) {
        document.querySelector(`input[name="q${index}"][value="${answers[index]}"]`).checked = true;
    }
    
    // 진행 상황 업데이트
    progressDiv.textContent = `${index + 1}/20`;
    
    // 응답이 선택되면 다음 버튼 활성화
    const radioButtons = div.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            answers[index] = parseInt(radio.value);
            nextQuestionBtn.style.display = 'block';
        });
    });
}

// 초기 질문 렌더링
renderQuestion(0);

// 다음 질문 버튼 이벤트
nextQuestionBtn.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion(currentQuestion);
        nextQuestionBtn.style.display = 'none';
        
        // 마지막 질문(20번)에 도달하면 다음 버튼 대신 결과 보기 버튼 표시
        if (currentQuestion === questions.length - 1) {
            const radioButtons = document.querySelectorAll(`input[name="q${currentQuestion}"]`);
            radioButtons.forEach(radio => {
                radio.addEventListener('change', () => {
                    answers[currentQuestion] = parseInt(radio.value);
                    // 마지막 질문에 답하면 바로 결과 보기
                    showResult();
                });
            });
        }
    }
});

// 섹션 전환 함수
function showSection(sectionId, leaderType = null) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    // 특정 유형만 표시 (비교 페이지로 이동할 때)
    if (sectionId === 'comparison' && leaderType) {
        // 모든 유형 비교 항목 숨기기
        document.querySelectorAll('.type-comparison').forEach(comp => {
            comp.style.display = 'none';
        });
        
        // 제목 변경
        document.querySelector("#comparison h1").textContent = `${leaderType} 리더의 특성`;
        
        // 해당 유형만 표시
        let targetTypeElement;
        if (leaderType === "엄마형") {
            targetTypeElement = document.querySelector(".type-comparison:nth-child(2)");
        } else if (leaderType === "코치형") {
            targetTypeElement = document.querySelector(".type-comparison:nth-child(3)");
        } else if (leaderType === "장인형") {
            targetTypeElement = document.querySelector(".type-comparison:nth-child(4)");
        } else if (leaderType === "지휘관형") {
            targetTypeElement = document.querySelector(".type-comparison:nth-child(5)");
        }
        
        if (targetTypeElement) {
            targetTypeElement.style.display = 'block';
        }
        
        // 버튼 텍스트 변경
        document.querySelector("#comparison button").textContent = `${leaderType} 리더의 개선 방향 보기`;
    }
    
    // 특정 유형만 표시 (개선 방향 페이지로 이동할 때)
    if (sectionId === 'improvement' && leaderType) {
        // 모든 개선 방향 항목 숨기기
        document.querySelectorAll('.improvement').forEach(imp => {
            imp.style.display = 'none';
        });
        
        // 제목 변경
        document.querySelector("#improvement h1").textContent = `${leaderType} 리더의 개선 방향`;
        
        // 해당 유형만 표시
        let targetImprovementElement;
        if (leaderType === "엄마형") {
            targetImprovementElement = document.querySelector(".improvement:nth-child(2)");
        } else if (leaderType === "코치형") {
            targetImprovementElement = document.querySelector(".improvement:nth-child(3)");
        } else if (leaderType === "장인형") {
            targetImprovementElement = document.querySelector(".improvement:nth-child(4)");
        } else if (leaderType === "지휘관형") {
            targetImprovementElement = document.querySelector(".improvement:nth-child(5)");
        }
        
        if (targetImprovementElement) {
            targetImprovementElement.style.display = 'block';
        }
        
        // 팔로우십 버튼이 있으면 표시
        const followButton = document.querySelector("#improvement button:nth-child(7)");
        if (followButton) {
            followButton.style.display = 'block';
        }
        
        // 버튼 텍스트 변경 및 다른 유형 보기 버튼 추가
        const backButton = document.querySelector("#improvement button:first-of-type");
        backButton.textContent = "처음으로 돌아가기";
        
        // 다른 유형 보기 버튼이 없으면 추가
        if (!document.getElementById("showAllTypesButton")) {
            const showAllButton = document.createElement("button");
            showAllButton.id = "showAllTypesButton";
            showAllButton.textContent = "다른 리더십 유형도 살펴보기";
            showAllButton.style.marginTop = "15px";
            showAllButton.style.backgroundColor = "#2ecc71";
            
            showAllButton.onclick = function() {
                // 모든 개선 방향 표시
                document.querySelectorAll('.improvement').forEach(imp => {
                    imp.style.display = 'block';
                });
                
                // 제목 원래대로 변경
                document.querySelector("#improvement h1").textContent = "4가지 리더십 유형별 향후 개선 방향";
                
                // 현재 버튼 숨기기
                this.style.display = "none";
                
                // 리더십 유형 선택 섹션 추가
                const typeSelectionSection = document.createElement("div");
                typeSelectionSection.id = "typeSelectionSection";
                typeSelectionSection.style.marginTop = "40px";
                typeSelectionSection.style.marginBottom = "40px";
                typeSelectionSection.style.textAlign = "center";
                typeSelectionSection.innerHTML = `
                    <h2 style="margin-bottom: 20px;">다른 리더십 유형 탐색하기</h2>
                    <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; margin-bottom: 30px;">
                        <button onclick="showSpecificType('엄마형')" style="width: calc(50% - 10px); margin-top: 5px; background-color: #f8d7da; color: #721c24;">💖 엄마형 리더</button>
                        <button onclick="showSpecificType('코치형')" style="width: calc(50% - 10px); margin-top: 5px; background-color: #cfe2ff; color: #084298;">🧭 코치형 리더</button>
                        <button onclick="showSpecificType('장인형')" style="width: calc(50% - 10px); margin-top: 5px; background-color: #e2d4f0; color: #5a348b;">🔧 장인형 리더</button>
                        <button onclick="showSpecificType('지휘관형')" style="width: calc(50% - 10px); margin-top: 5px; background-color: #fff3cd; color: #856404;">🚩 지휘관형 리더</button>
                    </div>
                    <button id="showAllTypesComparisonButton" onclick="showAllTypes()" style="background-color: #e2e3e5; color: #383d41;">모든 유형 한 번에 비교하기</button>
                `;
                
                // 버튼 앞에 삽입
                document.querySelector("#improvement").insertBefore(typeSelectionSection, backButton);
            };
            
            // 기존 버튼 앞에 새 버튼 추가
            backButton.parentNode.insertBefore(showAllButton, backButton);
        }
        
        // 모든 유형 보기 함수 추가 (글로벌 스코프에)
        window.showAllTypes = function() {
            // 모든 유형 표시로 변경
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            
            document.getElementById("comparison").classList.add('active');
            document.querySelector("#comparison h1").textContent = "리더십 유형별 행동과 삶의 차이";
            
            // 모든 유형 표시
            document.querySelectorAll('.type-comparison').forEach(comp => {
                comp.style.display = 'block';
            });
            
            // 버튼 원래대로
            document.querySelector("#improvementButton").textContent = "유형별 개선 방향 보기";
            
            window.scrollTo(0, 0);
        };
        
        // 특정 유형 보기 함수 추가 (글로벌 스코프에)
        window.showSpecificType = function(leaderType) {
            // 먼저 특성 페이지로 이동
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            
            document.getElementById("comparison").classList.add('active');
            document.querySelector("#comparison h1").textContent = `${leaderType} 리더의 특성`;
            
            // 모든 유형 숨기기
            document.querySelectorAll('.type-comparison').forEach(comp => {
                comp.style.display = 'none';
            });
            
            // 해당 유형만 표시
            let targetTypeElement;
            if (leaderType === "엄마형") {
                targetTypeElement = document.querySelector(".type-comparison:nth-child(2)");
            } else if (leaderType === "코치형") {
                targetTypeElement = document.querySelector(".type-comparison:nth-child(3)");
            } else if (leaderType === "장인형") {
                targetTypeElement = document.querySelector(".type-comparison:nth-child(4)");
            } else if (leaderType === "지휘관형") {
                targetTypeElement = document.querySelector(".type-comparison:nth-child(5)");
            }
            
            if (targetTypeElement) {
                targetTypeElement.style.display = 'block';
            }
            
            // 버튼 텍스트 변경
            document.querySelector("#improvementButton").textContent = `${leaderType} 리더의 개선 방향 보기`;
            
            window.scrollTo(0, 0);
        };
    }
    
    // 결과 페이지에 팔로우십 버튼 추가
    if (sectionId === 'assessment' && document.querySelector("#result").innerHTML !== '') {
        const resultButtons = document.querySelector("#result");
        
        // 팔로우십 버튼이 없으면 추가
        if (!document.querySelector("#followshipButton")) {
            const followshipButton = document.createElement("button");
            followshipButton.id = "followshipButton";
            followshipButton.textContent = "팔로우십 유형 알아보기";
            followshipButton.style.marginTop = "15px";
            followshipButton.style.backgroundColor = "#a8e6cf";
            followshipButton.onclick = function() {
                showSection('followership');
            };
            
            // 리더십-팔로우십 관계 버튼으로 변경
            followshipButton.textContent = "리더십-팔로우십 관계";
            followshipButton.onclick = function() {
                showSection('leadership_followership_relation');
            };
            
            // 기존 버튼 뒤에 새 버튼 추가
            resultButtons.appendChild(followshipButton);
            
            // 팔로우십 유형 버튼 추가
            const followshipTypeButton = document.createElement("button");
            followshipTypeButton.id = "followshipTypeButton";
            followshipTypeButton.textContent = "팔로우십 유형";
            followshipTypeButton.style.marginTop = "15px";
            followshipTypeButton.style.backgroundColor = "#b5d8ff";
            followshipTypeButton.onclick = function() {
                showSection('followership');
            };
            
            // 팔로우십 버튼 뒤에 유형 버튼 추가
            resultButtons.appendChild(followshipTypeButton);
            
            // 매트릭스 버튼 추가
            const matrixButton = document.createElement("button");
            matrixButton.id = "matrixButton";
            matrixButton.textContent = "리더십-팔로우십 매트릭스";
            matrixButton.style.marginTop = "15px";
            matrixButton.style.backgroundColor = "#d3b5e5";
            matrixButton.onclick = function() {
                showSection('leadership_followership_matrix');
            };
            
            // 팔로우십 유형 버튼 뒤에 매트릭스 버튼 추가
            resultButtons.appendChild(matrixButton);
        }
    }
    
    window.scrollTo(0, 0);
}

// 결과 표시 함수
function showResult() {
    const scores = { 엄마형: 0, 코치형: 0, 장인형: 0, 지휘관형: 0 };

    questions.forEach((q, i) => {
        const score = answers[i];
        scores[q.type] += score;
    });

    const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
    const leaderType = best[0]; // 유형 이름 저장
    
    // 질문 컨테이너 숨기기
    document.getElementById("questions").style.display = "none";
    document.getElementById("progress").style.display = "none";
    document.getElementById("submitQuiz").style.display = "none";
    document.getElementById("nextQuestion").style.display = "none";
    document.getElementById("quizForm").style.marginBottom = "0";
    
    // 섹션 타이틀 변경
    document.querySelector("#assessment h1").textContent = "리더십 유형 자가진단 결과";
    
    // 특성 및 개선 방향 가져오기
    let typeCharacteristics = "";
    let typeImprovement = "";
    
    // 해당 유형의 특성과 개선 방향 가져오기
    if (leaderType === "엄마형") {
        typeCharacteristics = document.querySelector(".type-comparison:nth-child(2)").outerHTML;
        typeImprovement = document.querySelector(".improvement:nth-child(2)").outerHTML;
    } else if (leaderType === "코치형") {
        typeCharacteristics = document.querySelector(".type-comparison:nth-child(3)").outerHTML;
        typeImprovement = document.querySelector(".improvement:nth-child(3)").outerHTML;
    } else if (leaderType === "장인형") {
        typeCharacteristics = document.querySelector(".type-comparison:nth-child(4)").outerHTML;
        typeImprovement = document.querySelector(".improvement:nth-child(4)").outerHTML;
    } else if (leaderType === "지휘관형") {
        typeCharacteristics = document.querySelector(".type-comparison:nth-child(5)").outerHTML;
        typeImprovement = document.querySelector(".improvement:nth-child(5)").outerHTML;
    }
    
    // 모든 유형의 점수를 보여주는 결과 표시
    // 점수 순위에 따라 정렬
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    
    // 최고 점수와 동일한 점수를 가진 유형들 찾기
    const highestScore = sortedScores[0][1];
    const highestTypes = sortedScores.filter(([_, score]) => score === highestScore)
                                   .map(([type, _]) => type);
    
    // 리더십 유형 표시 텍스트 생성
    let leadershipDisplay = '';
    if (highestTypes.length === 1) {
        leadershipDisplay = `<strong>${leaderType}</strong> 입니다`;
    } else {
        // 동점 유형들을 나열
        const typeIcons = {
            "엄마형": "💖",
            "코치형": "🧭",
            "장인형": "🔧",
            "지휘관형": "🚩"
        };
        
        // 동점 리더십 타입 텍스트 생성 시 타입명에 공백 추가로 줄바꿈 제어
        const typesText = highestTypes.map(type => {
            // 5글자 단어일 경우 (예: "엄마형리더") 중간에 공백 없는 줄바꿈 문자 삽입
            // 참고: 현재 typeIcons[type] + ' ' + type 이 표시되므로 5글자는 아니나 
            // 미래에 "형"을 뺀 "엄마리더"처럼 4글자 단어에 대비
            let displayType = type;
            if (type.length >= 4) {
                // 타입명 중간에 줄바꿈 제어용 공백 추가 (예: "엄마형", "코치형"에서 "형" 앞에)
                const insertAt = Math.ceil(type.length / 2);
                displayType = type.substring(0, insertAt) + '<wbr>' + type.substring(insertAt);
            }
            return `<strong>${typeIcons[type]} ${displayType}</strong>`;
        }).join(' / ');
        
        // 단어 사이에 줄바꿈이 자연스럽게 발생하도록 처리
        leadershipDisplay = `${typesText} <span style="display: inline-block;">입니다</span>`;
    }
    
    let scoreHtml = '';
    sortedScores.forEach(([type, score]) => {
        // 점수에 비례하는 막대 그래프 너비 계산 (최대 25점 기준)
        const barWidthPercent = Math.round((score / 25) * 100);
        const isHighest = highestTypes.includes(type);
        const barColor = isHighest ? "#cfe2ff" : "#95a5a6";
        const typeIcon = type === "엄마형" ? "💖" : 
                        type === "코치형" ? "🧭" : 
                        type === "장인형" ? "🔧" : 
                        "🚩";
        
        scoreHtml += `
        <div style="margin-bottom: 15px;">
            <div style="display: flex; align-items: center; margin-bottom: 5px; flex-wrap: wrap;">
                <div style="min-width: 80px; width: 25%; font-weight: ${isHighest ? 'bold' : 'normal'}; color: ${isHighest ? '#2980b9' : '#333'}; padding-right: 8px; white-space: nowrap;">
                    ${typeIcon} ${type}
                </div>
                <div style="flex-grow: 1; min-width: 100px;">
                    <div style="background-color: #eee; border-radius: 10px; height: 20px; width: 100%;">
                        <div style="background-color: ${barColor}; border-radius: 10px; height: 20px; width: ${barWidthPercent}%;"></div>
                    </div>
                </div>
                <div style="width: 60px; text-align: right; margin-left: 8px; font-weight: ${isHighest ? 'bold' : 'normal'};">
                    ${score}/25점
                </div>
            </div>
        </div>`;
    });
    
    resultDiv.innerHTML = `
        <div style="margin: 20px 0; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); width: 100%; box-sizing: border-box;">
            <h2 style="text-align: center; margin-bottom: 20px; font-size: 24px;">🎯 당신의 리더십 유형은</h2>
            <p style="font-size: ${highestTypes.length > 1 ? '24px' : '28px'}; text-align: center; color: #2980b9; margin-bottom: 25px;">
                ${leadershipDisplay}
            </p>
            
            <h3 style="text-align: center; margin-bottom: 20px; font-size: 20px;">유형별 점수</h3>
            <div style="width: 100%; margin: 0 auto 20px auto;">
                ${scoreHtml}
            </div>
        </div>
        
        <button onclick="showSection('comparison', '${leaderType}')">내 유형의 특성 보기</button>
        <button id="followshipButton" onclick="showSection('leadership_followership_relation')" style="margin-top: 15px; background-color: #a8e6cf;">리더십-팔로우십 관계</button>
        <button onclick="showSection('followership')" style="margin-top: 15px; background-color: #b5d8ff;">팔로우십 유형</button>
        <button onclick="showSection('leadership_followership_matrix')" style="margin-top: 15px; background-color: #d3b5e5;">리더십-팔로우십 매트릭스</button>
    `;
    
    // 맨 위로 스크롤
    window.scrollTo(0, 0);
}

// 폼 제출 처리 (결과 보기 버튼용)
document.getElementById("quizForm").addEventListener("submit", function(e) {
    e.preventDefault();
    showResult();
});