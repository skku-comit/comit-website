Auth.js 5버전에서는 각 콜백 함수의 인자들이 중요한 역할을 하며, 이들은 사용자 정의 인증 로직을 처리할 수 있도록 다양한 필드명, 타입, 기본값을 가지고 있습니다. 여기서는 Auth.js 5에서 사용되는 주요 콜백 함수들과 그 함수들에 전달되는 인자들의 필드명, 타입, 기본값, 역할에 대해 상세하게 정리하겠습니다.

# 1. `callbacks` 설정 개요

`callbacks`는 Auth.js에서 사용자 인증 흐름을 커스터마이징할 수 있도록 제공하는 다양한 함수들의 모음입니다. 이 함수들은 인증 과정의 다양한 단계에서 호출되며, 특정 조건에 따라 인증 흐름을 제어하거나 데이터를 수정할 수 있습니다.

Auth.js 5에서는 다음과 같은 콜백 함수들을 제공합니다:

1. `signIn`
2. `redirect`
3. `session`
4. `jwt`

이제 각 콜백 함수에 대해 상세히 설명하겠습니다.

# 2. `signIn` 콜백

`signIn` 콜백은 사용자가 로그인할 때 호출됩니다. 이 콜백의 반환값은 `boolean`이어야 하며, 로그인이 허용되면 `true`, 허용되지 않으면 `false`를 반환해야 합니다.

## 인자

### user: `Object`

- 로그인 시도 중인 사용자 정보가 포함된 객체입니다.
- 필드:
  - **id**: `string` - 사용자 고유 ID.
  - **name**: `string` | `null` - 사용자의 이름.
  - **email**: `string` | `null` - 사용자의 이메일 주소.
  - **image**: `string` | `null` - 사용자의 프로필 이미지 URL.

### account: `Object`

- 사용자가 로그인에 사용하는 계정의 정보입니다.
- 필드:
  - **provider**: `string` - 인증 공급자 이름 (예: 'google', 'github').
  - **type**: `string` - 인증 타입 (예: 'oauth', 'email').
  - **providerAccountId**: `string` - 공급자에서 사용자의 계정 ID.
  - **refresh_token**: `string` | `null` - OAuth 리프레시 토큰.
  - **access_token**: `string` | `null` - OAuth 액세스 토큰.
  - **expires_at**: `number` | `null` - 토큰 만료 시점 (Unix timestamp).

### **profile**: `Object` | `null`

- 인증 공급자로부터 반환된 프로필 정보.
- 필드: 제공된 공급자에 따라 다름.

### **email**: `Object` | `null`

- 이메일 로그인 시도 시 사용됩니다.
- 필드:
  - **verificationRequest**: `boolean` - 인증 이메일 요청 여부.

### **credentials**: `Object` | `null`

- 자격 증명을 이용한 로그인 시 사용됩니다.
- 필드: 사용자 정의 자격 증명 필드에 따라 다름.

## 기본값

없음 - `signIn` 콜백은 기본적으로 정의되어 있지 않습니다. 사용자 인증 로직을 맞춤화하려면 이 콜백을 정의해야 합니다.

## 역할

사용자가 로그인 시도를 할 때 호출되며, 로그인 시도를 허용할지 거부할지 결정하는 로직을 포함할 수 있습니다.

# 3. `redirect` 콜백

`redirect` 콜백은 로그인 또는 로그아웃 후 사용자가 리디렉션될 URL을 결정합니다.

## 인자

### **url**: `string`

- 사용자가 리디렉션될 기본 URL.

### **baseUrl**: `string`

- 애플리케이션의 기본 URL.

## 기본값

없음 - 기본적으로 리디렉션 URL은 `baseUrl`로 설정됩니다.

#### 역할

로그인 또는 로그아웃 후 사용자에게 보여줄 페이지를 정의합니다.

# 4. `session` 콜백

`session` 콜백은 세션 객체를 반환하기 전에 호출됩니다. 이 콜백을 사용하여 세션 객체에 추가 데이터를 포함할 수 있습니다.

## 인자

### **session**: `Object`

- 현재 세션 객체.
- 필드:
  - **user**: `Object`
    - **name**: `string` | `null` - 사용자의 이름.
    - **email**: `string` | `null` - 사용자의 이메일 주소.
    - **image**: `string` | `null` - 사용자의 프로필 이미지 URL.
  - **expires**: `string` - 세션 만료 시간 (ISO 8601 형식).

### **user**: `Object`

- 로그인된 사용자 정보.
- 필드: `signIn` 콜백의 `user` 객체와 동일.

### **token**: `Object`

- `jwt` 콜백에서 반환된 JWT 토큰 객체.
- 필드: `jwt` 콜백의 `token` 객체와 동일.

## 역할

세션 객체를 반환하기 전에 추가 데이터를 포함하거나 수정할 수 있습니다.

# 5. jwt

`jwt` 콜백은 JWT 토큰이 생성되거나 업데이트될 때 호출됩니다. 이 콜백을 사용하여 토큰에 추가 데이터를 포함할 수 있습니다.

## 인자

### **token**: `Object`

- 현재 JWT 토큰 객체.
- 필드:
  - **name**: `string` | `null` - JWT에 저장된 사용자 이름.
  - **email**: `string` | `null` - JWT에 저장된 사용자 이메일.
  - **picture**: `string` | `null` - JWT에 저장된 사용자 이미지 URL.
  - **sub**: `string` | `null` - JWT에 저장된 사용자 고유 ID.
  - **iat**: `number` | `null` - Issued At. 토큰이 발급된 시간. Unix timestamp. 형식.
  - **exp**: `number` | `null` - Expiration Time. 토큰의 만료 시간. Unix timestamp 형식.
  - **jti**: `string` | `null` - JWT ID. 토큰의 고유 식별자.

### **user**: `Object` | `null`

- 사용자가 처음 로그인할 때 제공되는 사용자 정보. 이후 호출에서는 제공되지 않음.
- 필드: `signIn` 콜백의 `user` 객체와 동일.

### **account**: `Object` | `null`

- 사용자가 로그인에 사용하는 계정 정보. `user`와 함께 처음 로그인할 때 제공됨.
- 필드: `signIn` 콜백의 `account` 객체와 동일.

### **profile**: `Object` | `null`

- 인증 공급자로부터 반환된 프로필 정보. `user`와 함께 처음 로그인할 때 제공됨.

### **isNewUser**: `boolean` | `null`

- 사용자가 처음 로그인하는 경우 `true`, 그렇지 않으면 `false`.

## 역할

JWT 토큰을 생성하거나 업데이트할 때 추가 데이터를 포함하거나 수정할 수 있습니다.

# 6. 요약

다음은 NextAuth.js의 주요 콜백 함수와 그 인자들을 역할과 함께 정리한 표입니다.

| 콜백 함수               | 인자                          | 역할                                     |
| ----------------------- | ----------------------------- | ---------------------------------------- |
| [`signIn`](#signin)     | [`user`](#user)               | 로그인 시 반환된 사용자 객체             |
|                         | [`account`](#account)         | 로그인 시 반환된 계정 정보 객체          |
|                         | [`profile`](#profile)         | 로그인 시 반환된 프로필 정보 객체        |
|                         | [`email`](#email)             | 로그인 시 사용된 이메일 주소             |
|                         | [`credentials`](#credentials) | 로그인 시 사용된 자격 증명               |
| [`redirect`](#redirect) | [`url`](#url)                 | 리디렉션할 URL                           |
|                         | [`baseUrl`](#baseurl)         | 기본 URL                                 |
| [`jwt`](#jwt)           | [`token`](#token)             | 현재 JWT 토큰 객체                       |
|                         | [`user`](#user)               | 로그인 시 반환된 사용자 객체             |
|                         | [`account`](#account)         | 로그인 시 반환된 계정 정보 객체          |
|                         | [`profile`](#profile)         | 로그인 시 반환된 프로필 정보 객체        |
|                         | [`isNewUser`](#isnewuser)     | 새로운 사용자 여부를 나타내는 boolean 값 |
| `session`               | `session`                     | 현재 세션 객체                           |
|                         | [`token`](#token)             | JWT 토큰 객체                            |
|                         | [`user`](#user)               | 사용자 객체 (선택적)                     |
| `signOut`               | [`token`](#token)             | JWT 토큰 객체                            |

이 표는 각 콜백 함수의 인자와 그 역할을 요약한 것입니다. 이를 통해 각 콜백 함수가 어떤 데이터를 처리하는지 쉽게 이해할 수 있습니다.
이 표

# 7. 결론

이와 같은 콜백들을 통해 Auth.js 5는 매우 유연한 인증 흐름을 제공합니다. 각 콜백을 사용하여 인증 로직을 맞춤화하고, 사용자 경험을 더욱 향상시킬 수 있습니다.
