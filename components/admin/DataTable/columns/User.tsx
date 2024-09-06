'use client'

import { ColumnDef } from '@tanstack/react-table'

import EditableCell from '@/components/admin/DataTable/EditableCell'
import { DataTableColumnHeader } from '@/components/common/DataTable/ColumnHeader'
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="이름" />,
    cell: ({ row }) => <p className="ml-8 text-base">{row.original.username}</p>
  },
  {
    accessorKey: 'studentId',
    header: ({ column }) => <DataTableColumnHeader column={column} title="학번" />,
    cell: ({ row }) => <p className="ml-8 text-base">{row.original.studentId}</p>
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <DataTableColumnHeader column={column} title="권한" />,
    cell: ({ row }) => (
      <EditableCell
        submitApiEndpoint={API_ENDPOINTS.ADMIN.USER.ROLE_UPDATE(row.original.id)}
        row={row}
        fieldName="role"
      />
    )
  },
  {
    accessorKey: 'isStaff',
    header: ({ column }) => <DataTableColumnHeader column={column} title="임원진 여부" />,
    cell: ({ row }) => (
      <EditableCell
        submitApiEndpoint={API_ENDPOINTS.ADMIN.USER.STAFF_UPDATE(row.original.id)}
        row={row}
        fieldName="isStaff"
      />
    )
  },
  {
    accessorKey: 'bio',
    header: ({ column }) => <DataTableColumnHeader column={column} title="자기소개" />,
    cell: ({ row }) => <p className="ml-8 text-base">{row.original.bio}</p>
  },
  {
    accessorKey: 'blog',
    header: ({ column }) => <DataTableColumnHeader column={column} title="블로그" />,
    cell: ({ row }) => <p className="ml-8 text-base">{row.original.blog}</p>
  },
  {
    accessorKey: 'createDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="생성일" />,
    cell: ({ row }) => <p className="mr-8 text-center text-base">{row.original.createdDate}</p>
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="이메일" />,
    cell: ({ row }) => <p className="ml-8 text-base">{row.original.email}</p>
  },
  {
    accessorKey: 'github',
    header: ({ column }) => <DataTableColumnHeader column={column} title="깃허브" />,
    cell: ({ row }) => <p className="ml-8 text-base">{row.original.github}</p>
  },
  {
    accessorKey: 'modifiedDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title="수정일" />,
    cell: ({ row }) => <p className="ml-8 text-base">{row.original.modifiedDate}</p>
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => <DataTableColumnHeader column={column} title="전화번호" />,
    cell: ({ row }) => <p className="ml-8 text-base">{row.original.phoneNumber}</p>
  },
  {
    accessorKey: 'position',
    header: ({ column }) => <DataTableColumnHeader column={column} title="직책" />,
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="프로필 사진" />,
    cell: ({ row }) => <img src={row.original.profileImage} alt={row.original.username} className="h-10 w-10" />
  }
]
