import { getUser } from "../../utils/auth";

export default function Profile() {
  const user = getUser();

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
      <div className='flex flex-col items-center'>
        <img
          src={
            user?.photoUrl ||
            "https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=Null"
          }
          alt={user?.name}
          className='w-24 h-24 rounded-full border-2 border-blue-500'
        />
        <h2 className='mt-4 text-xl font-semibold'>{user?.name}</h2>
        <p className='text-gray-600'>{user?.email}</p>
        <button
          onClick={() => alert("Fitur update profil coming soon!")}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
        >
          Update Profil
        </button>
      </div>
    </div>
  );
}
