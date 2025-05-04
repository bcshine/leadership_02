document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded, initializing scripts...');
    
    // 모바일 메뉴 토글
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // 네비게이션 메뉴 항목 클릭 시 모바일 메뉴 닫기
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                navMenu.classList.remove('active');
            }
        });
    });

    // 페이드인 애니메이션
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // 리더십 유형 테스트
    const leadershipTestBtn = document.getElementById('leadership-test-btn');
    const leadershipTest = document.getElementById('leadership-test');
    const leadershipResult = document.getElementById('leadership-result');

    // 리더십 테스트 문항
    const questions = [
        {
            question: "1. 팀원이 실수를 했을 때 나는 가장 먼저 이렇게 반응한다.",
            options: [
                "\"괜찮아, 다시 할 수 있어.\"",
                "\"어디서 문제가 생겼는지 세밀히 분석한다.\"",
                "\"실수를 성장 기회로 삼게 격려한다.\"",
                "\"다음부터 이런 실수가 없게 명확한 지침을 준다.\""
            ]
        },
        {
            question: "2. 프로젝트를 시작할 때 나는 가장 중요하게 여기는 것은?",
            options: [
                "팀원 각자의 상황과 마음을 살핀다.",
                "완성도 높은 결과물을 계획한다.",
                "팀원 개개인의 성장을 염두에 둔다.",
                "목표 달성을 위한 명확한 역할과 일정을 설정한다."
            ]
        },
        {
            question: "3. 내가 주로 팀과 소통하는 방식은?",
            options: [
                "따뜻하고 편안한 분위기에서 이야기를 이끌어낸다.",
                "문제나 오류를 정확히 짚어내어 피드백한다.",
                "질문과 대화를 통해 스스로 답을 찾게 유도한다.",
                "필요한 정보와 지시를 명확히 전달한다."
            ]
        },
        {
            question: "4. 위기 상황에서 나는?",
            options: [
                "팀원을 먼저 안심시키고 감정을 수습한다.",
                "문제의 근본 원인을 찾아내고 수정하려 한다.",
                "상황을 학습 기회로 삼아 함께 성장 방향을 모색한다.",
                "신속하게 판단하고 지시를 내려 상황을 통제한다."
            ]
        },
        {
            question: "5. 팀원의 발전에 대해 나는 주로 어떻게 접근하는가?",
            options: [
                "정서적 지지와 응원을 보내준다.",
                "부족한 기술이나 전문성을 보완하게 돕는다.",
                "스스로 목표를 설정하고 달성할 수 있도록 돕는다.",
                "필요한 역량을 빠르게 습득하게끔 요구하고 관리한다."
            ]
        },
        {
            question: "6. 프로젝트가 잘 진행되지 않을 때 나는?",
            options: [
                "팀원들의 스트레스와 감정을 먼저 살핀다.",
                "과정을 다시 점검하고 품질을 높일 방법을 찾는다.",
                "팀원들이 스스로 문제를 인식하고 해결책을 찾게 돕는다.",
                "책임자를 지정하고 구체적 조치를 지시한다."
            ]
        },
        {
            question: "7. 내가 팀에 바라는 모습은?",
            options: [
                "서로를 믿고 응원하는 따뜻한 팀",
                "완성도 높은 결과를 만들어내는 전문 팀",
                "스스로 성장하며 자율적으로 움직이는 팀",
                "목표에 집중해 빠르고 정확하게 움직이는 팀"
            ]
        },
        {
            question: "8. 성공적인 리더십이란 무엇이라 생각하는가?",
            options: [
                "사람을 존중하고 돌보는 것",
                "뛰어난 결과를 만드는 것",
                "사람을 성장시키고 변화시키는 것",
                "목표를 달성하고 성과를 내는 것"
            ]
        }
    ];

    let currentQuestion = 0;
    let answers = [];

    // 리더십 테스트 시작
    leadershipTestBtn.addEventListener('click', function() {
        leadershipTest.classList.remove('hidden');
        leadershipTestBtn.classList.add('hidden');
        showQuestion(currentQuestion);
    });

    // 문항 표시 함수
    function showQuestion(index) {
        leadershipTest.innerHTML = '';
        
        if (index >= questions.length) {
            // 테스트 완료 - 결과 계산
            calculateResult();
            leadershipTest.classList.add('hidden');
            leadershipResult.classList.remove('hidden');
            
            // 결과 표시 후 페이드인 애니메이션 다시 적용
            setTimeout(() => {
                const resultElements = document.querySelectorAll('#leadership-result .fade-in');
                resultElements.forEach(element => {
                    element.classList.add('appear');
                });
            }, 100);
            
            return;
        }
        
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        
        const questionText = document.createElement('p');
        questionText.textContent = questions[index].question;
        questionDiv.appendChild(questionText);
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';
        
        questions[index].options.forEach((option, optionIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.textContent = option;
            optionDiv.dataset.value = optionIndex;
            
            optionDiv.addEventListener('click', function() {
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
                
                // 다음 버튼 활성화
                document.querySelector('.next-btn').disabled = false;
            });
            
            optionsDiv.appendChild(optionDiv);
        });
        
        questionDiv.appendChild(optionsDiv);
        leadershipTest.appendChild(questionDiv);
        
        // 컨트롤 버튼
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'test-controls';
        
        if (index > 0) {
            const prevBtn = document.createElement('button');
            prevBtn.textContent = '이전';
            prevBtn.className = 'btn prev-btn';
            prevBtn.addEventListener('click', function() {
                currentQuestion--;
                showQuestion(currentQuestion);
            });
            controlsDiv.appendChild(prevBtn);
        }
        
        const nextBtn = document.createElement('button');
        nextBtn.textContent = index === questions.length - 1 ? '결과 보기' : '다음';
        nextBtn.className = 'btn next-btn';
        nextBtn.disabled = true; // 선택하기 전에는 비활성화
        
        nextBtn.addEventListener('click', function() {
            const selectedOption = document.querySelector('.option.selected');
            if (selectedOption) {
                answers[index] = parseInt(selectedOption.dataset.value);
                currentQuestion++;
                showQuestion(currentQuestion);
            }
        });
        
        controlsDiv.appendChild(nextBtn);
        leadershipTest.appendChild(controlsDiv);
    }

    // 결과 계산 함수
    function calculateResult() {
        let scores = [0, 0, 0, 0]; // 엄마형, 장인형, 코치형, 지휘관형 점수
        
        answers.forEach(answer => {
            scores[answer]++;
        });
        
        // 가장 높은 점수를 가진 유형 찾기
        let maxScore = Math.max(...scores);
        let mainType = scores.indexOf(maxScore);
        
        // 두 번째로 높은 점수를 가진 유형 찾기
        let tempScores = [...scores];
        tempScores[mainType] = -1;
        let secondMaxScore = Math.max(...tempScores);
        let secondaryType = tempScores.indexOf(secondMaxScore);
        
        // 타입 이름
        const typeNames = ['엄마형', '장인형', '코치형', '지휘관형'];

        // 타입 상세 설명
        const typeDescriptions = [
            { // 엄마형
                title: "엄마형 리더십",
                description: `엄마형 리더는 조직의 따뜻한 보호자입니다. 팀원의 감정과 필요를 민감하게 인식하고, 서로 돕는 가족과 같은 환경을 조성합니다. 이들은 심리적 안정감을 제공하는데 뛰어나며, 팀원 개개인의 개인적 상황과 감정을 진심으로 이해하고 배려합니다.

엄마형 리더는 공감 능력이 뛰어나 구성원들의 마음을 읽고 소통하는 데 탁월하며, 이로 인해 팀원들의 신뢰와 충성심을 얻습니다. 특히 팀 내 갈등을 중재하고, 서로 다른 의견을 존중하며 포용적인 환경을 만드는 능력이 뛰어납니다.

또한 모든 사람이 편안하게 의견을 나눌 수 있는 안전한 문화를 만들어, 자유로운 아이디어 교환이 가능하게 합니다. 어려운 시기에도 팀원들에게 정서적 지지를 제공하며, 더 나은 결과를 위해 함께 성장할 수 있도록 격려합니다.`,
                strengths: "• 뛰어난 공감 능력으로 팀원 신뢰 구축\n• 포용적이고 심리적으로 안전한 환경 조성\n• 팀 갈등 중재 및 관계 회복 능력\n• 팀원의 정서적 필요 파악 및 지지",
                weaknesses: "• 어려운 결정이나 책임 추궁을 피하는 경향\n• 너무 관대한 태도로 기준이 약화될 수 있음\n• 모든 사람을 만족시키려다 의사결정이 지연됨\n• 때로는 팀원에게 불필요한 간섭으로 보일 수 있음"
            },
            { // 장인형
                title: "장인형 리더십",
                description: `장인형 리더는 전문성과 완벽주의를 추구하는 정밀함의 대가입니다. 이들은 철저한 분석, 세부 사항에 대한 꼼꼼한 주의력, 그리고 품질에 대한 높은 기준을 가지고 있습니다. 데이터와 사실에 근거하여 의사결정을 내리며, 체계적이고 논리적인 접근 방식을 선호합니다.

장인형 리더는 지식과 전문성을 지속적으로 개발하는 평생 학습자로, 자신의 분야에서 최고의 전문가가 되기 위해 노력합니다. 이들은 문제의 근본 원인을 파악하고 효율적인 프로세스를 설계하는 데 뛰어납니다.

또한 복잡한 상황을 체계적으로 분석하고 장기적 관점에서 견고한 해결책을 제시합니다. 팀에 명확한 기준과 방법론을 제공하여 일관된 결과물을 만들어내며, 품질 관리와 오류 예방에 있어 타의 추종을 불허하는 안목을 갖추고 있습니다.`,
                strengths: "• 철저한 분석과 데이터 기반 의사결정\n• 높은 품질 기준과 일관된 결과물 도출\n• 복잡한 문제해결과 프로세스 최적화 능력\n• 정확성과 전문성을 바탕으로 한 신뢰성",
                weaknesses: "• 지나친 완벽주의로 의사결정 지연\n• 세부사항에 집중하여 큰 그림을 놓칠 수 있음\n• 변화에 대한 저항과 위험 회피 성향\n• 기술적 측면을 인간적 측면보다 우선시할 수 있음"
            },
            { // 코치형
                title: "코치형 리더십",
                description: `코치형 리더는 팀원의 성장과 잠재력 개발에 초점을 맞추는 영감을 주는 멘토입니다. 이들은 개개인의 강점을 파악하고 발전시키며, 자율성과 책임감을 부여하여 주도적으로 성장할 수 있도록 돕습니다.

코치형 리더는 질문을 통해 팀원들이 스스로 답을 찾도록 안내하는 소크라테스식 접근법을 활용합니다. 단순히 해결책을 제시하기보다 팀원이 직접 문제를 해결하는 과정에서 배우고 성장할 수 있도록 지원합니다.

또한 정기적인 피드백과 적절한 도전 과제를 제공하여 팀원들이 자신의 편안함 영역을 넘어설 수 있도록 격려합니다. 실패를 배움의 기회로 인식하고, 팀원들이 실험하고 혁신할 수 있는 환경을 조성합니다.

장기적 관점에서 팀원들의 역량 개발을 통해 지속가능한 조직 성장의 기반을 마련하며, 개인의 목표와 조직의 목표를 연계시켜 상호 발전할 수 있는 윈-윈 전략을 구사합니다.`,
                strengths: "• 팀원의 잠재력과 강점 발견 및 개발 능력\n• 자율성과 주인의식 부여를 통한 내적 동기 유발\n• 효과적인 질문과 피드백으로 성장 촉진\n• 개인의 성장을 통한 조직 발전 도모",
                weaknesses: "• 모든 상황에 코칭 접근법이 적합하지 않을 수 있음\n• 단기적 성과가 필요한 상황에서 시간 소요\n• 자기주도성이 부족한 팀원에게 효과적이지 않을 수 있음\n• 지나친 성장 압박으로 부담을 줄 수 있음"
            },
            { // 지휘관형
                title: "지휘관형 리더십",
                description: `지휘관형 리더는 목표 달성과 결과 지향적인 접근으로 조직을 이끄는 결단력 있는 지휘자입니다. 이들은 명확한 방향과 기대치를 설정하고, 효율적인 실행을 통해 신속하게 성과를 창출합니다.

지휘관형 리더는 빠른 판단력과 결정력으로 위기 상황에서 특히 강점을 발휘합니다. 복잡한 상황을 단순화하고 우선순위를 명확히 하여 팀이 핵심 목표에 집중할 수 있도록 합니다.

또한 도전적인 목표 설정을 통해 팀의 잠재력을 최대한 끌어내며, 책임감 있는
업무 배분과 성과 관리로 높은 기준의 결과물을 만들어냅니다. 장애물을 극복하고
난관을 헤쳐나가는 강인한 추진력으로 팀을 성공으로 이끕니다.

직접적이고 명확한 커뮤니케이션 스타일로 혼란을 최소화하며, 책임감 있는 
리더로서 최종 결정과 그 결과에 대한 책임을 망설임 없이 수용합니다.`,
                strengths: "• 명확한 목표 설정과 결과 지향적 실행력\n• 빠른 판단력과 위기 대응 능력\n• 효율적인 자원 배분과 성과 관리\n• 강한 추진력과 장애물 극복 능력",
                weaknesses: "• 지나친 통제로 팀원의 창의성과 자율성 제한\n• 인간적 측면보다 성과에 집중하여 관계 소홀\n• 단기 성과에 집중하여 장기적 발전 간과\n• 다양한 의견 수렴 없이 독단적 결정 위험"
            }
        ];
        
        console.log(`주 유형: ${typeNames[mainType]}, 보조 유형: ${typeNames[secondaryType]}`);
        console.log('점수:', scores);
        
        // 결과 표시 로직
        document.querySelectorAll('.type').forEach((type, index) => {
            // 모든 유형 기본 스타일 초기화
            type.style.borderColor = '#ddd';
            type.style.borderWidth = '1px';
            type.style.transform = 'none';
            type.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            type.innerHTML = ''; // 내용 초기화
            
            // 모든 유형에 상세 정보 추가
            const typeInfo = typeDescriptions[index];
            
            // 유형별 순서와 스타일 결정
            let orderLabel = '';
            let className = '';
            
            if (index === mainType) {
                orderLabel = '<span class="type-label" style="background-color: #2180de; box-shadow: 0 2px 6px rgba(33, 128, 222, 0.25);">주 유형</span>';
                className = 'main-type-card';
                type.style.borderColor = '#2180de';
                type.style.borderWidth = '3px';
                type.style.transform = 'scale(1.05)';
                type.style.boxShadow = '0 5px 15px rgba(33, 128, 222, 0.2)';
            } else if (index === secondaryType) {
                orderLabel = '<span class="type-label">보조 유형</span>';
                className = 'secondary-type-card';
                type.style.borderColor = '#2ecc71';
                type.style.borderWidth = '2px';
                type.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.15)';
            }
            
            // 상세 내용 구성
            type.innerHTML = `
                <h3>${typeInfo.title} <span>${['🤗', '🔍', '🏆', '🎯'][index]}</span> ${orderLabel}</h3>
                <div class="type-description ${className}">
                    <p>${typeInfo.description}</p>
                    <div class="type-points">
                        <div class="strengths">
                            <h4>강점</h4>
                            <pre>${typeInfo.strengths}</pre>
                        </div>
                        <div class="weaknesses">
                            <h4>개발 영역</h4>
                            <pre>${typeInfo.weaknesses}</pre>
                        </div>
                    </div>
                </div>
            `;
        });
        
        // 결과 메시지 추가
        const resultIntro = document.createElement('div');
        resultIntro.className = 'result-intro';
        resultIntro.innerHTML = `
            <p>당신의 리더십 유형 분석 결과</p>
            <p><span class="result-type-label main-type" style="background-color: #2180de; box-shadow: 0 3px 8px rgba(33, 128, 222, 0.3);">주 유형</span> <strong>${typeNames[mainType]}</strong> 리더십</p>
            <p><span class="result-type-label secondary-type">보조 유형</span> <strong>${typeNames[secondaryType]}</strong> 리더십</p>
        `;
        
        leadershipResult.insertBefore(resultIntro, document.querySelector('.leadership-types'));
    }

    // 직원 스타일 시작
    const employeeStyleBtn = document.getElementById('employee-style-btn');
    const employeeStyles = document.getElementById('employee-styles');

    employeeStyleBtn.addEventListener('click', function() {
        employeeStyles.classList.toggle('hidden');
        
        // 표시될 때 애니메이션 적용
        if (!employeeStyles.classList.contains('hidden')) {
            setTimeout(() => {
                const styleElements = document.querySelectorAll('#employee-styles .fade-in');
                
                // 순차적 애니메이션 적용 (100ms 간격)
                styleElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('appear');
                    }, 100 * index);
                });
            }, 100);
            
            this.textContent = '직원 스타일 닫기';
        } else {
            // 카드 숨기기 전에 모든 카드의 애니메이션 클래스 제거
            const styleElements = document.querySelectorAll('#employee-styles .fade-in');
            styleElements.forEach(element => {
                element.classList.remove('appear');
            });
            
            this.textContent = '직원 스타일 알아보기';
        }

        // 모든 "자세히 보기" 버튼에 이벤트 리스너 추가
        const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
        viewDetailsBtns.forEach(btn => {
            // 기존 이벤트 리스너 제거 (중복 방지)
            btn.removeEventListener('click', showDetails);
            // 새 이벤트 리스너 추가
            btn.addEventListener('click', showDetails);
        });
        
        // 모든 "접기" 버튼에 이벤트 리스너 추가
        const closeDetailsBtns = document.querySelectorAll('.close-details-btn');
        closeDetailsBtns.forEach(btn => {
            // 기존 이벤트 리스너 제거 (중복 방지)
            btn.removeEventListener('click', hideDetails);
            // 새 이벤트 리스너 추가
            btn.addEventListener('click', hideDetails);
        });
    });
    
    // 상세정보 표시 함수
    function showDetails() {
        // 현재 카드의 스타일 유형 얻기
        const card = this.closest('.employee-style-card');
        const styleType = card.getAttribute('data-style');
        
        // 해당 유형의 상세 페이지로 이동
        window.location.href = `employee-styles/${styleType}.html`;
    }
    
    // 상세정보 숨기기 함수
    function hideDetails() {
        // 현재 카드의 상세정보 요소 찾기
        const detailedInfo = this.closest('.detailed-info');
        detailedInfo.classList.add('hidden');
    }
    
    // 페이지 로드 시 자세히 보기/접기 버튼에 이벤트 리스너 추가
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', showDetails);
    });
    
    const closeDetailsBtns = document.querySelectorAll('.close-details-btn');
    closeDetailsBtns.forEach(btn => {
        btn.addEventListener('click', hideDetails);
    });

    // 챗봇 관련 기능
    const chatbotBtn = document.getElementById('chatbot-btn');
    const floatingChatBtn = document.querySelector('.floating-chat-btn');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.querySelector('.chat-messages');

    console.log('Chatbot elements:', {
        chatbotBtn: !!chatbotBtn,
        floatingChatBtn: !!floatingChatBtn,
        chatbotContainer: !!chatbotContainer,
        closeChatBtn: !!closeChatBtn
    });

    // 챗봇 열기
    function openChatbot() {
        console.log('Opening chatbot');
        chatbotContainer.classList.add('visible');
        // 포커스 설정
        setTimeout(() => {
            userInput.focus();
        }, 300);
    }

    // 챗봇 닫기
    function closeChatbot() {
        console.log('Closing chatbot');
        chatbotContainer.classList.remove('visible');
    }

    // 이벤트 리스너 직접 등록 (모든 방식 시도)
    if (chatbotBtn) {
        chatbotBtn.addEventListener('click', openChatbot);
    }
    
    if (floatingChatBtn) {
        floatingChatBtn.addEventListener('click', openChatbot);
    }
    
    if (closeChatBtn) {
        // 방법 1: addEventListener
        closeChatBtn.addEventListener('click', closeChatbot);
        
        // 방법 2: onclick 프로퍼티
        closeChatBtn.onclick = closeChatbot;
        
        // 방법 3: 직접 함수 정의
        closeChatBtn.onclick = function() {
            document.getElementById('chatbot-container').classList.remove('visible');
        };
        
        console.log('Close button event handlers attached');
    } else {
        console.error('Close button not found!');
    }

    // 메시지 전송
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // 사용자 메시지 추가
        addMessage(message, 'user');
        userInput.value = '';

        // 챗봇 응답 (간단한 예시)
        setTimeout(() => {
            const botResponses = {
                '팀원 갈등': '팀원 간 갈등이 있을 때는 각자의 입장을 공감하고 중립적인 자세로 대화를 촉진하세요. 공통된 목표를 상기시키는 것도 효과적입니다.',
                '업무 과부하': '업무 과부하 상황에서는 우선순위를 명확히 하고, 불필요한 업무는 과감히 줄이세요. 팀원들에게 권한을 위임하는 것도 중요합니다.',
                '동기부여': '팀원들의 동기부여를 위해서는 개인의 성장 기회를 제공하고, 성과를 인정해주며, 업무의 의미와 영향력을 명확히 전달하세요.',
                '의사결정': '중요한 의사결정에는 관련 이해관계자의 의견을 수렴하고, 데이터에 기반한 판단을 하되, 최종 결정은 리더로서 책임감 있게 내리세요.',
                '성과관리': '효과적인 성과관리를 위해 명확한 목표 설정, 정기적인 피드백, 개인별 맞춤형 코칭이 필요합니다.',
                '리더십': '좋은 리더십은 비전 제시, 솔선수범, 의사소통, 공감능력, 책임감이 핵심입니다.',
                '피드백': '효과적인 피드백은 구체적이고, 행동에 초점을 맞추며, 개선 방향을 제시하는 것이 중요합니다.',
                '회의': '효율적인 회의를 위해 명확한 목적과 안건, 시간 제한, 참석자 역할을 미리 정하세요.',
                '팀 문화': '긍정적인 팀 문화는 신뢰, 소통, 상호 존중을 기반으로 형성됩니다. 리더가 솔선수범하여 문화를 만들어가야 합니다.'
            };

            let botReply = '죄송합니다. 해당 주제에 대한 답변을 준비 중입니다. 다른 질문을 해주세요.';
            
            // 키워드 매칭 (간단한 구현)
            for (const [keyword, reply] of Object.entries(botResponses)) {
                if (message.includes(keyword)) {
                    botReply = reply;
                    break;
                }
            }
            
            addMessage(botReply, 'bot');
        }, 1000);
    }

    // 메시지 추가 함수
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        
        // 스크롤 아래로
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 메시지 전송 이벤트
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // 스크롤 이벤트 - 네비게이션 메뉴 활성화
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const navItems = document.querySelectorAll('.nav-menu a');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === currentSection) {
                item.classList.add('active');
            }
        });
    });
}); 