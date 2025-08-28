공책이 필요없는 필기 공간 (React, Express)

2025.08 (1人 팀 프로젝트)

## 📌 Summary

마크다운으로 텍스트를 구조화하고 코드 예제를 깔끔하게 렌더링합니다. 좌측에서 마크다운을 작성하면 우측에 실시간 미리보기가 표시됩니다.

구글의 오픈소스 API를 활용해 내가 읽었던 책을 검색하고 선택할 수 있습니다.

JWT 기반 인증 시스템을 구현하여 Access Token과 Refresh Token으로 보안을 강화했습니다. 자동 로그인 기능은 Refresh Token의 수명 주기를 관리해 사용성을 높입니다.

OAuth 2.0을 이용한 GitHub 계정 인증을 전용 라이브러리 없이 직접 구현했습니다.

UI는 무료 컴포넌트 라이브러리인 MUI Core로 구성하고, Emotion으로 디자인 세부 사항을 조정했습니다.

전역 상태 관리는 경량 라이브러리인 Zustand를 사용하고, 클라이언트 측 유효성 검사는 React Hook Form으로 처리합니다.

구글 API 응답에 포함된 HTML을 Sanitize한 뒤 렌더링하여 XSS 공격을 방지했습니다.

데이터베이스 스키마를 설계하고, 삽입·수정·삭제 작업을 하나의 트랜잭션으로 묶어 일관성을 유지합니다.

Express로 API 서버를 구축했고, React Router와 Express 양쪽에서 라우트 가드를 적용해 클라이언트·서버 보안을 모두 강화했습니다.


## 🤔 Background

저는 공부할 때 책을 선호합니다. 

처음 읽을 때는 전체 흐름을 파악하고, 두 번째 읽을 때는 챕터별로 필기하며 내용을 머릿속으로 정리합니다. 

이 방법이 저에게 잘 맞지만 물리적인 필기에는 번거로움이 많았습니다. 

책마다 별도의 필기 노트를 챙겨야 하고, 필기 자체에도 시간을 많이 소비했죠. 

특히 코드 예제를 필기할 때는 들여쓰기 맞추기가 어려웠습니다. 

블로그에 정리하는 방법도 있지만, 저는 ‘책’에 특화된 디지털 필기 공간이 있다면 훨씬 유용할 것이라고 생각했습니다.


## 🔍 Meaning

리액트 라우터와 Express를 활용해 SPA + API 구조를 구현했습니다.

요즘 많은 기업이 Next.js를 사용하지만, Next.js를 제대로 이해하려면 React Router를 먼저 익히는 것이 중요하다고 판단했습니다.

React Router와 Next.js는 서로 다른 팀이 개발했지만, 상호 영향이 크고 다수의 React 학습 자료에서도 React Router → Next.js 순서를 추천하기 때문입니다.

SPA 프로젝트를 진행하며 여러 문제에 직면했고, 다음과 같은 교훈을 얻었습니다.

- 새로 고침 시 데이터가 변경되므로 페이지 간 state 전달 시 렌더링에 영향을 주는 값을 state로 넘기지 않을 것
- 컴포넌트 기반 라우팅의 가드(loader)에서 fetch 로직이 함께 실행되면, 가드는 통과하더라도 불필요한 fetch가 발생하므로 사용을 자제할 것

JWT 인증 방식도 고민했습니다. 

Access token과 Refresh token을 로컬 스토리지, 쿠키, 메모리 중 어디에 저장할지 결정해야 했는데, 

보안 우선순위(메모리 > 쿠키 > 로컬 스토리지)에 따라 Access token은 메모리에, Refresh token은 쿠키에 저장하는 것이 가장 안전하다고 판단했습니다. 

다만 페이지 새로 고침 시 메모리가 초기화되므로 Refresh token은 쿠키에, 인증 상태 관리는 Zustand로 전역에서 관리했습니다. 

쿠키에는 HttpOnly, Secure 같은 설정을 적용해 XSS 공격에 대비했습니다.

스타일링은 기존에 Tailwind CSS를 사용했으나, 외부 UI 라이브러리를 경험해보고 싶어 MUI Core를 도입했습니다. 

MUI의 입력 컴포넌트가 제어 컴포넌트 형태라 React Hook Form과 바로 맞지 않았지만, React Hook Form의 Controller를 활용해 유효성 검증 로직을 작성하며 문제를 해결했습니다.

프로젝트용 VPC를 설계하면서 비용과 보안을 최우선으로 고려했습니다. 

개인 프로젝트라 RDS 사용 대신 EC2에 직접 MySQL을 설치했고, 별도의 VPC 안에 퍼블릭 서브넷을 구성한 뒤 EC2 인스턴스를 배치했습니다.

보안 그룹은 SSH(22번 포트)만 열어두고 DBeaver로 EC2 내부 MySQL에 접속해 실시간으로 데이터를 확인했습니다.

Express 서버는 로컬에서 운영 중이라 로컬과 EC2를 연결해야 했는데, 전 직장처럼 OpenVPN을 쓰기엔 추가 비용이 부담돼 로컬 포트 포워딩(SSH 터널링)으로 해결했습니다.

개발이 끝난 후 HTTPS 적용을 위해 CloudFront를 EC2(서버)와 S3(프론트) 앞단에 배치하고 Route 53으로 도메인을 연결했습니다. 

그러다 EC2 퍼블릭 IP 요금제가 시간당 과금으로 바뀐 것을 확인하여 퍼블릭 IP를 제거하고 EC2를 프라이빗 서브넷으로 옮겨 비용을 절감하고 보안을 강화했습니다.

CloudFront의 VPC 오리진 기능을 사용해 프라이빗 환경에서도 안전하게 EC2에 접근하도록 마무리했습니다.

## 🔨 Technology Stack(s)

TypeScript, React.js, React Hook Form, MUI Core, Emotion, Zustand, JWT, React Router, Express, CORS, AWS, Route 53, S3, CloudFront, SSL/TLS, EC2, MYSQL
