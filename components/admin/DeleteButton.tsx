'use client'

import { redirect, useRouter } from 'next/navigation'
import { GoTrash } from 'react-icons/go'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { API_ENDPOINTS, ApiEndpoint } from '@/constants/apiEndpoint'
import { ROUTES } from '@/constants/routes'
import { useSession } from '@/lib/auth/SessionProvider'
import { fetchData } from '@/lib/fetch'

import { useToast } from '../ui/use-toast'

interface DeleteButtonProps {
  id: number
  type: 'study' | 'user'
}

const DeleteButton = ({ id, type }: DeleteButtonProps) => {
  const session = useSession()
  if (!session) {
    redirect(ROUTES.LOGIN.url)
  }
  if (session.error) {
    redirect(ROUTES.LOGIN.url)
  }
  const accessToken = session.data?.accessToken
  const { toast } = useToast()

  const router = useRouter()
  if (!accessToken) {
    redirect(ROUTES.LOGIN.url)
  }

  const handleDelete = async () => {
    let apiEndpoint: ApiEndpoint

    if (type === 'study') {
      apiEndpoint = API_ENDPOINTS.ADMIN.STUDY.DELETE(id) as ApiEndpoint
    } else if (type === 'user') {
      apiEndpoint = API_ENDPOINTS.ADMIN.USER.DELETE(id) as ApiEndpoint
    } else {
      console.error('Invalid type')
      return
    }

    const res = await fetchData(apiEndpoint, {
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    if (!res.ok) {
      toast({
        title: '삭제 실패',
        description: '삭제 중 서버 오류 발생',
        variant: 'destructive'
      })
      return
    } else {
      toast({
        title: '삭제 완료',
        description: '성공적으로 삭제되었습니다!'
      })
      router.refresh()
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <GoTrash size={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>삭제하면 복구할 수 없습니다. 삭제하시겠습니까?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteButton
