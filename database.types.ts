export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      profile: {
        Row: {
          access: string
          bio: string
          blog: string | null
          createdDate: string
          github: string | null
          id: string
          isStaff: boolean
          name: string
          position: string | null
          profileImage: string | null
          studentId: string
        }
        Insert: {
          access: string
          bio?: string
          blog?: string | null
          createdDate?: string
          github?: string | null
          id?: string
          isStaff?: boolean
          name: string
          position?: string | null
          profileImage?: string | null
          studentId: string
        }
        Update: {
          access?: string
          bio?: string
          blog?: string | null
          createdDate?: string
          github?: string | null
          id?: string
          isStaff?: boolean
          name?: string
          position?: string | null
          profileImage?: string | null
          studentId?: string
        }
        Relationships: []
      }
      study: {
        Row: {
          campus: string
          createdDate: string
          day: string | null
          description: string
          endTime: string | null
          id: string
          imageSrc: string
          isRecruiting: boolean
          level: string
          mentor: string | null
          stack: string[]
          startTime: string | null
          title: string
        }
        Insert: {
          campus: string
          createdDate?: string
          day?: string | null
          description: string
          endTime?: string | null
          id?: string
          imageSrc: string
          isRecruiting?: boolean
          level: string
          mentor?: string | null
          stack: string[]
          startTime?: string | null
          title: string
        }
        Update: {
          campus?: string
          createdDate?: string
          day?: string | null
          description?: string
          endTime?: string | null
          id?: string
          imageSrc?: string
          isRecruiting?: boolean
          level?: string
          mentor?: string | null
          stack?: string[]
          startTime?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: 'study_mentor_fkey'
            columns: ['mentor']
            isOneToOne: false
            referencedRelation: 'profile'
            referencedColumns: ['id']
          }
        ]
      }
      'study-participants': {
        Row: {
          applicationMotiv: string
          profile_id: string
          study_id: string
        }
        Insert: {
          applicationMotiv: string
          profile_id: string
          study_id: string
        }
        Update: {
          applicationMotiv?: string
          profile_id?: string
          study_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profile-study_profile_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profile'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profile-study_study_fkey'
            columns: ['study_id']
            isOneToOne: false
            referencedRelation: 'study'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
