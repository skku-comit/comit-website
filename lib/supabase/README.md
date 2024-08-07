# Supabase와 타입을 동기화

## Why(하는 이유)

Supabase의 각 Table의 column의 정보를 기반으로 Typescript의 타입을 추론

## When(하는 시기)

Supabase Table 또는 그 column의 정보를 수정했을 때

## How(하는 방법)

1. Supabase Cli 설치
   `npm install supabase --save-dev`
2. 동기화하려는 프로젝트의 reference_id 확인
   `npx supabase projects list`
3. 타입 정의 파일 생성
   `npx supabase gen types --lang=typescript --project-id [reference_id] --schema public > database.types.ts`
4. 생성된 타입 정의 파일 활용

```Typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabase = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)
```

## 추가 정보

[공식 문서](https://supabase.com/docs/guides/api/rest/generating-types)
