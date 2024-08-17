# `ServerResponse` 객체

## What

서버와 클라이언트가 주고 받는 JSON의 형태입니다.
어떤 형식이든 사용 가능한 `data`와
`ServerError` 또는 `null`이 할당될 수 있는 `error`으로 구성됩니다.

## How: 서버와 클라이언트에서 응답 주고 받기

### 1. 사용할 에러 타입 선정

#### 에러가 정의되어 있지 않은 경우: ServerErrorType 추가

1. `app/api/errors/customError/types.ts`를 엽니다.

2. `type ServerErrorType`에 `ServerError.error.errorType`에 할당될 에러의 식별자를 추가합니다.

```Typescript
export type ServerErrorType = 'StudySignup/AlreadySignedup' | ...
```

식별자 이름은 아래의 `IServerErrorType` 구조를 따라 `/`로 구분하는 것이 좋습니다.

3. `IServerErrorType` 및 하위 인터페이스를 추가/수정하여 `ServerErrorType`의 구조를 설정합니다.

```Typescript
interface IServerErrorType {
  StudySignup: StudySignup
}

interface StudySignup {
  Enrollment: {
    AlreadySignedup: ServerErrorType
  }
}
```

4. `const ServerErrorType`에 위에서 변경한 인터페이스에 맞게 에러 식별자를 입력합니다.

```Typescript
export const ServerErrorType: IServerErrorType = {
  StudySignup: {
    Enrollment: {
      AlreadySignedup: 'StudySignup/AlreadySignedup'
    }
  }
}
```

- 참고: `type ServerErrorType vs const ServerErrorType`  
  &emsp;`type ServerErrorType`는 서버 에러에 '할당될 수 있는 값(type)'들을 정의하고  
  &emsp;`const ServerErrorType`은 실제 그 값들을 분류에 맞게 할당한 '실제 값(const)' 입니다.

#### 에러가 정의되어 있는 경우: `import { ServerErrorType } from '@/app/api/errors/types'`

### 2. Server -> Client

1. `constructServerResponse`를 임포트합니다.

```Typescript
import constructServerResponse from '@app/api/utils/response.ts'
```

2. 에러를 반환하는 경우
   적절한 `ServerError`를 `error`에 할당하여 `data: null`과 함께 반환합니다.

```Typescript
import { AlreadySignedup } from '@/app/api/errors/customErrors'

return constructServerResponse({
  error: AlreadySignedUp,
  data: null
})
```

3. 정상적인 데이터를 반환하는 경우
   `data: any`, `error: null`을 함께 인자로 넣어 반환합니다.

```Typescript
return constructServerResponse({
  error: null,
  data: { message: "Success" }
})
```

4. Best Practice

```Typescript
  export async function POST(req: NextRequest) {
    const res = // DB와 통신해서 응답 수신

    if (res.error) {
      return constructServerResponse({
        error: InternalServerError,
        data: null
      })
    }
    return constructServerResponse({
      error: null,
      data: res.data
    })
  }
```

### 3. Client -> Server

1. `lib/fetch`의 `fetchData`를 임포트 합니다.

```Typescript
import { fetchData } from "@/lib/fetch"
```

2. `constants/apiEndpoint`에서 `API_ENDPOINTS`를 `fetchData`에 넣어서 정확한 엔드포인트에 요청을 보냅니다.

```Typescript
import { API_ENDPOINTS } from '@/constants/apiEndpoint'
const res = await fetchData(API_ENDPOINTS.STUDY.LIST)
```

3. 응답(`res`)에 에러가 있을 시 `HTTP 상태 코드(res.status)` -> `프로젝트 커스텀 에러 타입(await (res.json()).error.errorType)` 순으로 에러를 처리합니다.

4. 에러가 없다면 `await res.json()`으로 변환 후 데이터(`.data`)를 사용합니다.

5. Best Practice

```Typescript
// 예시: StudyList 받기
import { fetchData } from "@/lib/fetch"
import { API_ENDPOINTS } from '@/constants/apiEndpoint'
import { ServerErrorType } from '@/app/api/errors/customError/types'
import { HttpStatusCode } from '@/app/api/utils/httpConsts'
import { ServerErrorType } from '@/app/api/errors/types'
import { ServerResponse } from '@/app/api/utils/response'

const res = await fetchData(API_ENDPOINTS.STUDY.LIST)

if (!res.ok) {
  switch (res.status) {
    // Status 코드에 따른 처리
    case HttpStatusCode.BadRequest:
      const json: ServerResponse = await res.json()
      const error = json.error
      switch (error.errorType) {
        case ServerErrorType.StudySignup.Enrollment.AlreadySignedup:
          // 커스텀 에러 처리
          break
        default:
          // 예상 밖의 에러 타입 발생시
          throw new Error("Uncaught Error!")
      }
      break

    // 예상 밖의 Status 코드 발생시
    default:
      throw new Error("Uncaught Error!")
  }
}
const json = await res.json()
const data = json.data
```

TODO: Nested Switch를 사용하는 문제를 해결해야 합니다. HTTP Status Code를 확장하여 커스텀 에러의 ID를 포함시키면 res.json 과정 없이도 커스텀 에러 타입을 구분할 수 있을 것입니다. 그러면 자연스럽게 Nested Switch 문제는 해결 될 것입니다.
