'use client'

import { ColumnDef } from '@tanstack/react-table'

import EditableCell from '@/components/admin/DataTable/EditableCell'
import { API_ENDPOINTS } from '@/constants/apiEndpoint'
import { User } from '@/types'

import DeleteButton from '../../DeleteButton'

export const columns: ColumnDef<User>[] = [
  {
    id: 'delete',
    header: '삭제',
    cell: ({ row }) => <DeleteButton id={row.original.id} type="user" />
  },
  {
    accessorKey: 'id',
    header: () => <div className="ml-8 min-w-24 text-left text-base">ID</div>,
    cell: ({ row }) => <p className="ml-8 text-base">{row.original.id}</p>
  },
  {
    accessorKey: 'username',
    header: () => <div className="ml-8 min-w-24 text-left text-base">이름</div>,
    cell: ({ row }) => <p className="ml-8 text-base">{row.original.username}</p>
  },
  {
    accessorKey: 'bio',
    header: () => <div className="ml-8 min-w-24 text-left text-base">자기소개</div>,
    cell: ({ row }) => <p className="ml-8 text-base">{row.original.bio}</p>
  },
  {
    accessorKey: 'blog',
    header: () => <div className="ml-8 min-w-24 text-left text-base">블로그</div>,
    cell: ({ row }) => <p className="ml-8 text-base">{row.original.blog}</p>
  },
  {
    accessorKey: 'createDate',
    header: () => <div className="mr-8 min-w-56 text-base">생성일</div>,
    cell: ({ row }) => <p className="mr-8 text-center text-base">{row.original.createdDate}</p>
  },
  {
    accessorKey: 'email',
    header: () => <div className="ml-8 min-w-24 text-left text-base">이메일</div>,
    cell: ({ row }) => <p className="ml-8 text-base">{row.original.email}</p>
  },
  {
    accessorKey: 'github',
    header: () => <div className="ml-8 min-w-24 text-left text-base">깃허브</div>,
    cell: ({ row }) => <p className="ml-8 text-base">{row.original.github}</p>
  },
  {
    accessorKey: 'isStaff',
    header: () => <div className="ml-8 min-w-24 text-left text-base">스태프 여부</div>,
    cell: ({ row }) => (
      <EditableCell
        submitApiEndpoint={API_ENDPOINTS.ADMIN.USER.STAFF_UPDATE(row.original.id)}
        row={row}
        fieldName="isStaff"
      />
    )
  },
  {
    accessorKey: 'modifiedDate',
    header: () => <div className="ml-8 min-w-24 text-left text-base">수정일</div>,
    cell: ({ row }) => <p className="ml-8 text-base">{row.original.modifiedDate}</p>
  },
  {
    accessorKey: 'phoneNumber',
    header: () => <div className="ml-8 min-w-24 text-left text-base">전화번호</div>,
    cell: ({ row }) => <p className="ml-8 text-base">{row.original.phoneNumber}</p>
  },
  {
    accessorKey: 'position',
    header: () => <div className="ml-8 min-w-24 text-left text-base">직책</div>,
    cell: ({ row }) => (
      <EditableCell
        submitApiEndpoint={API_ENDPOINTS.ADMIN.USER.POSITION_UPDATE(row.original.id)}
        row={row}
        fieldName="position"
      />
    )
  },
  {
    accessorKey: 'profileImage',
    header: () => <div className="ml-8 min-w-24 text-left text-base">프로필 사진</div>,
    cell: ({ row }) => <p className="ml-8 text-base">{row.original.profileImage}</p>
  },
  {
    accessorKey: 'role',
    header: () => <div className="ml-8 min-w-24 text-left text-base">권한</div>,
    cell: ({ row }) => (
      <EditableCell
        submitApiEndpoint={API_ENDPOINTS.ADMIN.USER.ROLE_UPDATE(row.original.id)}
        row={row}
        fieldName="role"
      />
    )
  },
  {
    accessorKey: 'studentId',
    header: () => <div className="ml-8 min-w-24 text-left text-base">학번</div>,
    cell: ({ row }) => <p className="ml-8 text-base">{row.original.studentId}</p>
  }
]
