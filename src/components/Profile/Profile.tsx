import { ProfileType } from '../../types/types'
import { MyPostsContainer } from './MyPosts/MyPostsContainer'
import { ProfileInfo } from './ProfileInfo/ProfileInfo'

type ProfilePropsType = {
	profile: ProfileType | null
	status: string
	isOwner: boolean
	savePhoto: (file: File) => void
	saveProfile: (profile: ProfileType) => void
	updateStatus: (status: string) => void
}

export const Profile = ({
	profile,
	status,
	isOwner,
	savePhoto,
	saveProfile,
	updateStatus,
}: ProfilePropsType) => {
	return (
		<div>
			<ProfileInfo
				isOwner={isOwner}
				profile={profile}
				status={status}
				updateStatus={updateStatus}
				savePhoto={savePhoto}
				saveProfile={saveProfile}
			/>
			<MyPostsContainer />
		</div>
	)
}

