import { UserProfileView } from '@/views/apps/users/profile/user-profile-view'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function UserProfilePage({ params }: PageProps) {
  const { id } = await params
  return <UserProfileView userId={id} />
}
