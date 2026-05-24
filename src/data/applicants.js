export const MOCK_APPLICANTS = [
  {
    id: 1,
    name: "김민준",
    position: "백엔드 개발자",
    appliedAt: "2025-03-28",
    school: "한국대학교 컴퓨터공학과",
    experience: "3년",
    matchingScore: 94,
    analysisStatus: "DONE",
    tags: ["#Spring_Boot", "#MySQL", "#문제해결능력", "#REST_API", "#팀워크"],
    summary: [
      "Spring Boot 기반 쇼핑몰 결제 시스템 설계 및 서비스 트래픽 3배 증가 대응 경험 보유.",
      "MySQL 쿼리 최적화로 응답 속도 40% 개선, 실제 운영 환경 장애 대응 경험 다수.",
      "애자일 스크럼 팀에서 백엔드 리드로 5인 팀을 이끌며 일정 내 프로젝트 완수.",
    ],
    resume: `저는 3년간 Spring Boot 생태계에서 백엔드 개발자로 성장해왔습니다. 
    
재직 중이던 스타트업에서 DAU 10만 규모의 쇼핑몰 결제 시스템을 처음부터 설계·구현하였으며, 특정 시즌에 트래픽이 3배 이상 급증하는 상황에서도 서비스 무중단을 유지하기 위해 수평 스케일링 전략과 Redis 캐싱을 도입했습니다.

MySQL 성능 개선 프로젝트에서는 슬로우 쿼리 로그를 분석하고 인덱스 재설계, 불필요한 JOIN 제거, 커버링 인덱스 적용을 통해 평균 응답 시간을 800ms에서 480ms로 단축했습니다.

팀 리더로서 매주 스프린트 회고를 주도하고, 코드 리뷰 문화를 정착시켜 버그 발생률을 30% 감소시켰습니다. 어떤 기술적 장벽도 팀원과의 협업과 지속적인 학습으로 극복할 수 있다고 믿습니다.`,
    status: "검토중",
  },
  {
    id: 2,
    name: "이서연",
    position: "풀스택 개발자",
    appliedAt: "2025-03-27",
    school: "서울과학기술대학교 소프트웨어학과",
    experience: "2년",
    matchingScore: 91,
    analysisStatus: "PENDING",
    tags: ["#React", "#Node.js", "#AWS", "#소통능력", "#TypeScript"],
    summary: [
      "React + TypeScript 기반 B2B SaaS 대시보드 프론트엔드 전체 구축 및 배포 경험.",
      "AWS EC2/S3/RDS 조합으로 인프라 직접 구성, CI/CD 파이프라인 GitHub Actions로 자동화.",
      "고객사 요구사항을 기술 스펙으로 번역하는 PM-개발자 브릿지 역할 수행.",
    ],
    resume: `풀스택 개발자로서 프론트엔드부터 클라우드 인프라까지 제품 전 영역을 다루는 것을 강점으로 삼고 있습니다.

전 직장에서 B2B SaaS 대시보드를 React와 TypeScript로 처음부터 구축했습니다. 컴포넌트 재사용성을 높이기 위한 디자인 시스템 구성, 상태관리를 위한 Zustand 도입, React Query를 활용한 서버 상태 최적화까지 담당했습니다.

백엔드는 Node.js + Express로 REST API를 설계했고, AWS EC2에 배포하며 RDS(PostgreSQL)와 연동했습니다. GitHub Actions를 통한 CI/CD로 배포 시간을 기존 수동 배포 대비 70% 단축했습니다.

비즈니스 이해를 바탕으로 고객사 미팅에 개발자로 직접 참여해 기술적 실현 가능성을 즉석에서 판단하고 스펙을 조율하는 역할도 맡았습니다.`,
    status: "서류통과",
  },
  {
    id: 3,
    name: "박도윤",
    position: "데이터 엔지니어",
    appliedAt: "2025-03-26",
    school: "연세대학교 산업공학과",
    experience: "4년",
    matchingScore: 88,
    analysisStatus: "DONE",
    tags: ["#Python", "#Spark", "#데이터파이프라인", "#문제해결능력", "#Airflow"],
    summary: [
      "Apache Spark + Airflow 기반 일 1억 건 배치 파이프라인 구축 및 운영 경험 4년.",
      "데이터 품질 이슈를 조기 탐지하는 자동화 모니터링 시스템 설계·구현.",
      "분석팀과 협업해 데이터 마트 구조 개선, 쿼리 비용 월 $12K 절감 달성.",
    ],
    resume: `데이터 엔지니어로서 '신뢰할 수 있는 데이터 인프라 구축'을 핵심 가치로 삼고 있습니다.

현 직장에서 일 평균 1억 건 이상의 이벤트 로그를 처리하는 배치 파이프라인을 Python과 Apache Spark로 설계·운영하고 있습니다. Airflow DAG 모듈화와 동적 태스크 매핑을 통해 파이프라인 관리 복잡도를 크게 낮췄습니다.

데이터 신뢰성 문제를 해결하기 위해 Great Expectations 기반 데이터 품질 검증 레이어를 파이프라인에 삽입하고, Slack 알림과 연동해 이슈 탐지부터 알림까지 완전 자동화했습니다.

분석팀과 협업으로 데이터 마트를 재설계하면서 BigQuery 파티션 전략을 최적화해 월 쿼리 비용을 12,000달러 절감했습니다.`,
    status: "검토중",
  },
  {
    id: 4,
    name: "최지아",
    position: "백엔드 개발자",
    appliedAt: "2025-03-25",
    school: "고려대학교 컴퓨터학과",
    experience: "1년",
    matchingScore: 84,
    analysisStatus: "FAILED",
    tags: ["#Spring_Boot", "#JPA", "#도전정신", "#MySQL", "#성장가능성"],
    summary: [
      "Spring Boot + JPA 기반 사이드 프로젝트 3개 완수, 실사용자 1,200명 서비스 운영 경험.",
      "JPA N+1 문제 직접 발견·해결하며 DB 쿼리 최적화 역량 실전 검증.",
      "오픈소스 기여 경험 있으며 기술 블로그 월 평균 2,000 PV 운영 중.",
    ],
    resume: `비록 경력은 1년이지만, 학부 시절부터 꾸준히 실전 프로젝트를 통해 역량을 쌓아왔습니다.

재학 중 Spring Boot와 JPA로 스터디 매칭 플랫폼을 개발해 실제 배포 후 1,200명의 사용자를 모았습니다. 서비스를 운영하면서 JPA N+1 문제로 인한 성능 저하를 직접 경험하고 Fetch Join과 EntityGraph를 통해 해결했습니다. 이 과정을 블로그에 정리해 많은 개발자들과 공유했습니다.

첫 직장에서는 레거시 서비스의 Spring MVC → Spring Boot 마이그레이션 프로젝트에 참여했고, 테스트 커버리지를 0%에서 60%로 높이는 데 기여했습니다.

항상 모르는 것을 인정하고 빠르게 학습하는 자세로 임하고 있습니다. 성장할 수 있는 환경이라면 어떤 도전도 마다하지 않겠습니다.`,
    status: "검토중",
  },
  {
    id: 5,
    name: "정현우",
    position: "DevOps 엔지니어",
    appliedAt: "2025-03-24",
    school: "KAIST 전산학부",
    experience: "5년",
    matchingScore: 96,
    analysisStatus: "DONE",
    tags: ["#Kubernetes", "#Docker", "#AWS", "#문제해결능력", "#CI/CD", "#팀워크"],
    summary: [
      "Kubernetes 클러스터 100+ 노드 운영 경험, 무중단 배포 자동화 파이프라인 구축.",
      "장애 대응 평균 MTTR 45분 → 8분으로 단축, 온콜 체계 및 런북 정비.",
      "개발팀과 인프라팀 간 커뮤니케이션 허브 역할로 배포 주기 2주 → 1일로 개선.",
    ],
    resume: `5년간 클라우드 네이티브 인프라를 설계·운영하며 개발 생산성과 서비스 안정성 두 가지를 모두 높이는 데 집중해왔습니다.

현 직장에서 EKS 기반 100개 이상의 마이크로서비스를 운영하고 있습니다. 카나리 배포와 롤링 업데이트 전략을 Argo CD로 구현해 배포 실패 시 자동 롤백이 가능한 파이프라인을 구축했습니다.

장애 대응 체계 개선 프로젝트에서는 Prometheus + Grafana 대시보드 재정비, PagerDuty 에스컬레이션 정책 수립, 주요 장애 시나리오별 런북 20개 작성을 통해 MTTR을 45분에서 8분으로 단축했습니다.

Platform Engineering 관점에서 개발자 경험(DX) 개선에도 관심이 많습니다. Internal Developer Portal 구축으로 신규 서비스 배포 준비 시간을 3일에서 2시간으로 줄였습니다.`,
    status: "서류통과",
  },
  {
    id: 6,
    name: "한소희",
    position: "프론트엔드 개발자",
    appliedAt: "2025-03-23",
    school: "이화여자대학교 컴퓨터공학과",
    experience: "2년",
    matchingScore: 93,
    analysisStatus: "PENDING",
    tags: ["#React", "#TypeScript", "#성능최적화", "#소통능력", "#접근성"],
    summary: [
      "React 성능 최적화 전문, Lighthouse 점수 32점 → 94점으로 개선한 실적 보유.",
      "WAI-ARIA 기반 접근성 개선 프로젝트 리드, 스크린리더 완전 지원 달성.",
      "디자이너·기획자와의 협업 경험 풍부, 디자인 시스템 10개 컴포넌트 제작.",
    ],
    resume: `사용자가 체감하는 성능과 접근성을 가장 중요한 가치로 여기는 프론트엔드 개발자입니다.

이전 직장에서 홈페이지 성능 개선 TF를 이끌었습니다. Core Web Vitals 분석을 시작으로 이미지 lazy loading 적용, 번들 사이즈 최적화(tree shaking, code splitting), 불필요한 리렌더링 제거(React.memo, useMemo)를 거쳐 Lighthouse 점수를 32점에서 94점으로 끌어올렸습니다.

접근성 프로젝트에서는 WCAG 2.1 가이드라인을 분석하고 스크린리더 테스트를 직접 진행하며 WAI-ARIA 속성을 전 페이지에 적용했습니다. 접근성 개선 후 장애인 사용자 유입이 약 15% 증가했습니다.

디자인 시스템 구축 프로젝트에서 Storybook을 활용해 10개의 공통 컴포넌트를 문서화하고, 디자이너와 개발자 간 소통 비용을 크게 줄였습니다.`,
    status: "최종합격",
  },
  {
    id: 7,
    name: "오준혁",
    position: "백엔드 개발자",
    appliedAt: "2025-03-22",
    school: "부산대학교 정보컴퓨터공학부",
    experience: "3년",
    matchingScore: 86,
    analysisStatus: "DONE",
    tags: ["#Spring_Boot", "#Kafka", "#MSA", "#문제해결능력", "#REST_API"],
    summary: [
      "MSA 전환 프로젝트 주도, 서비스 간 Kafka 이벤트 스트리밍 아키텍처 설계·구현.",
      "분산 트랜잭션 문제를 Saga 패턴으로 해결, 데이터 정합성 99.97% 유지.",
      "서비스 전체 API 문서화(OpenAPI 3.0) 및 API 버저닝 정책 수립.",
    ],
    resume: `모놀리식 시스템을 마이크로서비스 아키텍처로 전환하는 여정을 3년간 경험했습니다.

현 직장에서 기존 모놀리식 커머스 플랫폼을 7개의 마이크로서비스로 분리하는 프로젝트에 핵심 멤버로 참여했습니다. 주문·재고·결제 서비스 간 비동기 통신을 Kafka로 구현하고, 분산 트랜잭션의 복잡성을 Saga 패턴(Choreography)으로 해결했습니다.

장애 격리와 서킷 브레이커 패턴 적용으로 하나의 서비스 장애가 전체 시스템으로 전파되는 문제를 방지했습니다. Resilience4j를 활용해 Fallback 전략까지 구현했습니다.

API 거버넌스 측면에서 팀 내 API 설계 가이드를 문서화하고, OpenAPI 3.0 스펙 기반 자동 문서화 파이프라인을 구축해 백엔드-프론트엔드 협업 효율을 높였습니다.`,
    status: "불합격",
  },
  {
    id: 8,
    name: "윤지원",
    position: "AI/ML 엔지니어",
    appliedAt: "2025-03-21",
    school: "성균관대학교 인공지능학과",
    experience: "2년",
    matchingScore: 90,
    analysisStatus: "DONE",
    tags: ["#Python", "#PyTorch", "#LLM", "#문제해결능력", "#도전정신"],
    summary: [
      "LLM 파인튜닝 및 RAG 시스템 구축 경험, 내부 문서 검색 정확도 71% → 89% 개선.",
      "PyTorch 기반 추천 모델 A/B 테스트로 클릭률 18% 향상 실적.",
      "논문 3편 리뷰 및 사내 기술 세미나 주도, 팀 전체 ML 지식 수준 향상에 기여.",
    ],
    resume: `LLM과 전통적인 ML 모델을 실제 서비스에 적용하는 AI 엔지니어입니다.

현 직장에서 사내 문서 검색 시스템의 RAG(Retrieval-Augmented Generation) 파이프라인을 구축했습니다. OpenAI Embeddings를 활용한 벡터 DB 구성, 청킹 전략 최적화, 리랭킹 모델 적용을 통해 검색 정확도를 71%에서 89%로 향상시켰습니다.

추천 시스템 개선 프로젝트에서는 Two-Tower 모델을 PyTorch로 구현하고 A/B 테스트를 설계·운영해 클릭률을 18% 향상시켰습니다. 모델 서빙은 FastAPI + TorchServe 조합으로 P99 레이턴시 200ms 이하를 유지했습니다.

최신 논문을 항상 팔로업하며 Weekly Paper Review를 운영해 팀의 기술 수준을 함께 끌어올리고 있습니다.`,
    status: "검토중",
  },
];
