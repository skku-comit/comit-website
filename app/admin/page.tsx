import Link from 'next/link'

// import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import { fetchData } from '@/lib/fetch'
import { Study } from '@/types'

const Admin = async () => {
  // TODO: Admin Dashboard 만을 위한 API Endpoint 필요 - 스터디 및 유저의 간략한 정보만 받아오기
  const studyRes = await fetchData(API_ENDPOINTS.CLIENT.STUDY.LIST as ApiEndpoint)
  if (!studyRes.ok) {
    switch (studyRes.status) {
      default:
      // redirect('/error')
    }
  }
  const studyJSON = await studyRes.json()
  const studyList: Study[] = studyJSON.data

  return (
    <div className="p-5">
      <h1 className="mb-10 flex w-full items-center justify-start text-3xl font-extrabold">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>스터디 관리</CardTitle>
            <CardDescription>스터디 확인 및 관리</CardDescription>
          </CardHeader>

          <CardContent className="flex-col gap-y-4 md:flex">
            <p className="text-lg">
              전체 스터디:&nbsp;
              <Link href="" className="text-primary underline">
                {studyList.length}
              </Link>
              개
            </p>
            <p className="text-lg">
              열린 스터디:&nbsp;
              <Link href="" className="text-primary underline">
                {studyList.length}
              </Link>
              개
            </p>
            <p className="text-lg">
              종료된 스터디:&nbsp;
              <Link href="" className="text-primary underline">
                {studyList.length}
              </Link>
              개
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>유저 관리</CardTitle>
            <CardDescription>가입된 유저 확인 및 관리</CardDescription>
          </CardHeader>

          <CardContent className="flex-col gap-y-4 md:flex">
            <p className="text-lg">
              전체:&nbsp;
              <Link href="" className="text-primary underline">
                {studyList.length}
              </Link>
              명
            </p>
            <p className="text-lg">
              관리자:&nbsp;
              <Link href="" className="text-primary underline">
                {studyList.length}
              </Link>
              명
            </p>
            <p className="text-lg">
              일반 부원:&nbsp;
              <Link href="" className="text-primary underline">
                {studyList.length}
              </Link>
              명
            </p>
            <p className="text-lg">
              승인 대기:&nbsp;
              <Link href="" className="text-primary underline">
                {studyList.length}
              </Link>
              명
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Admin
