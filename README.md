# AI 디지털 마케팅 강의 — 개인 강사 랜딩페이지

생성형 AI × 디지털 마케팅 실무 교육 전문 강사의 프리미엄 개인 웹사이트입니다.

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | React 19 + Vite 8 |
| 언어 | TypeScript 6 |
| 스타일링 | Tailwind CSS v4 (`@tailwindcss/vite`) |
| 애니메이션 | Framer Motion 12 |
| 아이콘 | Lucide React |
| 폼 백엔드 | FormSubmit.co (이메일 자동 전송) |
| 폰트 | Space Grotesk, Inter (Google Fonts) |

---

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 빌드

```bash
npm run build
```

`dist/` 폴더에 정적 파일이 생성됩니다. Vercel, Netlify 등에 바로 배포 가능합니다.

---

## 프로젝트 구조

```
333/
├── public/
│   ├── profile.jpg               # 강사 프로필 사진 (파비콘 겸용)
│   ├── leader.jpg                # Leader 매거진 커버 이미지
│   └── leader.png                # Leader 매거진 커버 (PNG 원본)
├── src/
│   ├── components/
│   │   ├── Navbar.tsx            # 고정 네비게이션 바 (스크롤 감지)
│   │   ├── Hero.tsx              # 히어로 섹션 (메인 CTA)
│   │   ├── About.tsx             # 강사 소개 (경력, 자격증, Leader 매거진)
│   │   ├── Curriculum.tsx        # 7단계 커리큘럼 카드 슬라이더
│   │   ├── CurriculumRoadmap.tsx # 24회차 로드맵 (Phase 1·2)
│   │   ├── AITools.tsx           # 실습 AI 툴 소개
│   │   ├── Projects.tsx          # 수강생 프로젝트 사례
│   │   ├── Outcomes.tsx          # 수강 후 성과
│   │   ├── Testimonials.tsx      # 수강생 후기
│   │   ├── FAQ.tsx               # 자주 묻는 질문 (아코디언)
│   │   ├── Contact.tsx           # 문의 채널 (카카오·수강신청·이메일)
│   │   ├── ApplyModal.tsx        # 수강 신청 모달 폼
│   │   └── Footer.tsx            # 푸터
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                 # Tailwind v4 + 커스텀 유틸리티
└── index.html                    # SEO 메타, Google Fonts, 파비콘
```

---

## 주요 기능

### 섹션 구성 (10개)

1. **Navbar** — 스크롤 시 글래스모피즘 전환, 모바일 햄버거 메뉴 (AnimatePresence)
2. **Hero** — 그라디언트 헤드라인, 4개 통계 카드, 카카오톡·커리큘럼 CTA
3. **About** — 강사 실물 프로필 사진, 21년+ 경력 타임라인, 자격증 4종, Leader 매거진 커버
4. **Curriculum** — 7단계 수평 스크롤 카드 + 진행도 바 + 24회차 상세 로드맵
5. **AITools** — 실습 AI 툴 마퀴 무한 스크롤 애니메이션
6. **Projects** — 수강생 완성 프로젝트 갤러리
7. **Outcomes** — 수강 성과 지표 카드
8. **Testimonials** — 수강생 후기 슬라이더
9. **FAQ** — 아코디언 형식 6문항 (오프라인·온라인 병행 수업 안내 포함)
10. **Contact** — 카카오톡 상담 / 수강 신청 모달 / 이메일 문의

### 수강 신청 모달 (ApplyModal)

- 입력 필드: 성함\*, 연락처\*, 이메일\*, 소속·직함, AI 활용 수준(드롭다운)\*, 수강 목표, 개인정보 동의\*
- 제출 시 `psh0135@gmail.com` 으로 자동 발송 (FormSubmit.co AJAX)
- 제출 완료 후 성공 화면 전환

### 디자인 시스템

| 항목 | 값 |
|------|-----|
| 배경색 | `#020617` (딥 네이비) |
| 주 컬러 | 보라 `#7C3AED` |
| 보조 컬러 | 시안 `#06B6D4` |
| 그라디언트 텍스트 | `.gradient-text` (보라 → 시안) |
| 글래스모피즘 | `.glass`, `.glass-card` (`backdrop-filter: blur`) |
| 마퀴 애니메이션 | `.animate-marquee` (AI 툴 로고 무한 스크롤) |

---

## 커리큘럼 개요

**총 100시간 · 7단계 · 24회차**

| 단계 | 주제 | 주요 툴 | 시간 |
|------|------|---------|------|
| STEP 1 | AI 리터러시 | ChatGPT, Claude, Gemini | 8H |
| STEP 2 | 멀티모달 AI 이해 | DALL·E, Midjourney, Runway, SUNO | 12H |
| STEP 3 | 디지털 콘텐츠 제작 | Canva AI, Gamma, CapCut | 16H |
| STEP 4 | AI 마케팅 자동화 | Make, Zapier, ChatGPT API | 16H |
| STEP 5 | 디지털 마케팅 전략 | SEO, Meta Ads, Google Analytics | 18H |
| STEP 6 | 바이브코딩 실습 | Cursor AI, Claude Code, Vercel | 18H |
| STEP 7 | 포트폴리오 프로젝트 | GitHub, Notion, Behance | 12H |

---

## 강사 주요 경력

- 메가스터디 김영 평생교육원 — 운영교수 (현재)
- 유비온 — 교수 (경영지도사 마케팅)
- 여성인력개발원 — 강사 (디지털 마케팅)
- 한국정보통신진흥협회 — 컨설턴트
- 대명스테이션 — 마케팅기획팀 차장
- 중앙일보마케팅 — 마케팅기획팀 과장
- 롯데쇼핑 — 마케팅기획팀 대리
- KTCS — 마케팅기획팀

**자격 및 학력:** 경희대학교 경영학 석사 · 경영지도사 · 직업능력개발훈련교사 · 용인시 산업진흥원 전문위원

---

## 연락처

| 채널 | 정보 |
|------|------|
| 이메일 | psh0135@gmail.com |
| 카카오톡 채널 | http://pf.kakao.com/_xecRAG |

---

© 2026 AI마케팅 강의. All rights reserved.
