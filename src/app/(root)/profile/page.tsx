import { auth, currentUser } from "@clerk/nextjs";

const Profile = async () => {
    const user = await currentUser();
    const { userId } = auth();

    return (
        <div>
            User: {user?.firstName} <br />
            UserId: {userId}
        </div>
    )
}

export default Profile