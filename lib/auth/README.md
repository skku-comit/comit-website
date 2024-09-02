# 콜백 함수와 그 인자

## 콜백 함수

### `signIn`: 로그인 또는 회원가입 시 호출

```Typescript
async signIn({ user, account, profile, email, credentials }) {
  // user: 로그인 시 반환된 사용자 객체
  // account: 로그인 시 반환된 계정 정보 객체
  // profile: 로그인 시 반환된 프로필 정보 객체
  // email: 로그인 시 사용된 이메일 주소
  // credentials: 로그인 시 사용된 자격 증명
  return true; // true를 반환하면 로그인 허용, false를 반환하면 로그인 거부
}
```

### `redirect`: 매 패이지 이동마다 호출

```Typescript
async redirect({ url, baseUrl }) {
  // url: 리디렉션할 URL
  // baseUrl: 기본 URL
  return url;
}
```

### `jwt`: JWT가 생성 또는 업데이트 될 때 호출

```Typescript
async jwt({ token, user, account, profile, isNewUser }) {
  // token: 현재 JWT 토큰 객체
  // user: 로그인 시 반환된 사용자 객체
  // account: 로그인 시 반환된 계정 정보 객체
  // profile: 로그인 시 반환된 프로필 정보 객체
  // isNewUser: 새로운 사용자 여부를 나타내는 boolean 값
  return token;
}
```

### `session`: 세션이 확인 될때마다 호출

```Typescript
async session({ session, token, user }) {
  // session: 현재 세션 객체
  // token: JWT 토큰 객체
  // user: 사용자 객체 (선택적)
  return session;
}
```

## 인자

### `user`

interface User {
id: string;
name: string;
email: string;
image?: string;
// 기타 사용자 정보
}

### `account`

## 호출 순서

### 로그인(회원가입): `signIn` -> `redirect` -> `jwt` -> `session`

### 세션 업데이트: `jwt` -> `session`

### 세션 정보 확인: `session`

### 페이지 이동: `redirect`

## 시나리오

### 로그인 된 유저에게만 허용된 페이지에 접근 시도: `redirect`(로그인 페이지로 이동) -> `session`(미들웨어의 세션 확인) ->

# 구현 예제

## 고려사항1: 어떤 매커니즘을 사용할 것인가?

- 액세스 토큰만 사용하나? 아니면 리프레시 토큰도 같이 사용할 것인가?
- 리프레시 토큰을 사용할 경우, 리프레시 토큰을 어떻게 저장할 것인가?
- 리프레시 토큰을 사용할 경우, 리프레시 토큰을 어떻게 갱신할 것인가?
- 각 토큰의 만료 시간은 어떻게 설정할 것인가?

## 고려사항2: 콜백 인자에 어떤 형태를 사용할 것인가?

- 액세스 토큰만 사용할 경우 `token`에

## 고려사항3: 어느 콜백 함수를 사용할 것인가?
