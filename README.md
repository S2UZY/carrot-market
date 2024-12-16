# 소셜 미디어 웹 애플리케이션

## 🚀 Project Overview

Next.js, Prisma, Tailwind CSS를 사용하여 개발된 풀스택 소셜 미디어 웹 애플리케이션입니다. 사용자 인증, 트윗 작성, 프로필 관리, 댓글 및 좋아요 기능을 제공합니다.

## 🤖 Deploy

[carrot-market-woad.vercel.app](carrot-market-woad.vercel.app)

## 📸 Preview

![프로젝트 스크린샷](https://github.com/user-attachments/assets/1b12e333-bb43-499b-8286-5de8bfe0fe86)

## ✨ Features

### User Authentication

- 이메일 검증을 통한 사용자 등록
- 비밀번호 암호화를 통한 보안 로그인
- 세션 관리 및 보호된 라우트

### User Profile

- 사용자 프로필 생성 및 수정
- 사용자 전용 페이지 보기
- 로그아웃 기능

### Tweets

- 새 트윗 작성
- 무한 스크롤을 통한 트윗 목록 보기
- 트윗 상세 정보 보기
- 트윗에 좋아요 및 댓글 작성

### Additional Components

- 반응형 헤더 및 탭 바
- 토스트 알림
- Zod를 이용한 폼 검증
- 시간 기반 트윗 게시 시간 포맷팅

## 🛠 Technologies Used

- **프론트엔드**:

  - Next.js
  - Tailwind CSS
  - Heroicons

- **백엔드**:

  - Prisma (SQLite)
  - Server Actions
  - Zod (Validation)

- **인증**:
  - Bcrypt (Password Encrption)
  - Iron-session

## 🏁 Getting Started

### 필수 조건

- Node.js
- npm 또는 yarn

### 설치 방법

1. 저장소 클론

```bash
git clone https://github.com/S2UZY/carrot-market.git
cd your-project-name
```

2. 의존성 설치

```bash
npm install
# 또는
yarn install
```

3. Prisma 설정

```bash
npx prisma generate
npx prisma migrate dev
```

4. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```
