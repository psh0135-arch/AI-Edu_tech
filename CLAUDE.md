# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Frontend (project root)
```bash
npm run dev        # 로컬 개발 서버 (Vite, http://localhost:5173)
npm run build      # TypeScript 검사 + Vite 프로덕션 빌드 → dist/
npm run lint       # ESLint 검사
npm run preview    # dist/ 빌드 결과물 미리보기
```

### Firebase 배포
```bash
# 프론트엔드는 GitHub push → Actions 자동 배포 (main 브랜치)

# DB 보안 규칙만 배포
firebase deploy --only database

# Cloud Functions만 배포 (functions/ 디렉터리에서)
cd functions && npm run build  # TS 컴파일
firebase deploy --only functions

# 전체 Firebase 배포 (Functions + DB rules)
firebase deploy
```

### Cloud Functions 개발
```bash
cd functions
npm install
npm run build      # tsc 컴파일 → lib/
```

## 아키텍처

### 라우팅 — 해시 기반 SPA (GitHub Pages 호환)
`App.tsx`에서 `window.location.hash`를 감지해 페이지를 전환합니다. URL router 라이브러리 없음.

| 해시 | 렌더링 |
|------|--------|
| (없음) | 메인 랜딩페이지 |
| `#admin` | `AdminPage` — Firebase Auth 로그인 후 CRM 대시보드 |
| `#webinar` | `WebinarPage` — 웨비나 전용 랜딩페이지 |

### 데이터 흐름
```
사용자 신청 폼
  → Firebase Realtime DB (asia-southeast1)
    ├── /enrollments/{id}         수강신청 (ApplyModal)
    └── /webinar_registrations/{id}  웨비나 신청 (WebinarPage)
  → Cloud Function onEnrollmentCreated 트리거
    ├── nodemailer + Gmail → 신청자 확인 이메일 + 관리자 알림 이메일
    └── solapi (SMS) → 신청자 문자 + 관리자 문자
```

### Firebase 프로젝트
- **ID**: `vibe-coding-backend-a96b0`
- **DB URL**: `https://vibe-coding-backend-a96b0-default-rtdb.asia-southeast1.firebasedatabase.app`
- **Cloud Function 리전**: `asia-southeast1` (DB와 반드시 동일해야 함)
- **DB 규칙**: `database.rules.json` — enrollments/webinar_registrations는 비인증 쓰기 허용, 읽기는 인증 필요

### 핵심 파일
| 파일 | 역할 |
|------|------|
| `src/lib/firebase.ts` | Firebase 초기화, DB 헬퍼 함수 (`saveEnrollment`, `saveWebinarRegistration`, `subscribeWebinarCount`) |
| `src/components/ApplyModal.tsx` | 수강신청 모달 — Firebase 저장 + formsubmit 백업 알림 |
| `src/pages/AdminPage.tsx` | CRM 대시보드 — 실시간 신청자 목록, 상태 관리, CSV 다운로드 |
| `src/pages/WebinarPage.tsx` | 웨비나 랜딩페이지 — 카운트다운 타이머, 실시간 신청자 수, 신청폼 |
| `functions/src/index.ts` | Cloud Function — enrollment 생성 시 이메일+SMS 자동 발송 |

### 환경변수
**프론트엔드** (`.env.local`, GitHub Secrets에도 등록):
- `VITE_FIREBASE_API_KEY`

**Cloud Functions** (`functions/.env`, gitignore됨):
- `GMAIL_USER` / `GMAIL_PASS` — Gmail App Password
- `SOLAPI_API_KEY` / `SOLAPI_API_SECRET` / `SOLAPI_SENDER` — 솔라피 SMS

### 빌드 특이사항
- `vite.config.ts`의 `base: '/AI-Edu_tech/'` — GitHub Pages 서브패스 배포
- `sitemapPlugin()` — 빌드 시 `dist/sitemap.xml` 자동 생성 (lastmod = 빌드 날짜)
- `public/robots.txt` — Sitemap URL 포함

### Tailwind CSS v4
`@tailwindcss/vite` 플러그인 방식 (설정 파일 없음). 커스텀 유틸리티(`glass`, `glass-card`, `gradient-text`, `animate-float`)는 `src/index.css`에 정의됨.

### Cloud Functions 주의사항
- RTDB 트리거 함수는 **반드시 DB와 같은 리전**(`asia-southeast1`)을 명시해야 함
- `functions/.env`는 gitignore됨 — 로컬 배포 시 직접 파일 생성 필요
- solapi v6 사용: `import { SolapiMessageService } from 'solapi'`, 메서드는 `send()` (sendOne 아님)
