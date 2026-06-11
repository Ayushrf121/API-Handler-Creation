import axios from 'axios';
import React, { useState } from 'react'

export default function App5() {
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState(null);
    const [loader, setLoader] = useState(false);
    const gettingUser = (e) => {
        setUsername(e.target.value);
    }
    const handler = async () => {
        try {
            setLoader(true);
            const res = await axios.get(`https://api.github.com/users/${username}`);
            const {
                avatar_url,
                name,
                login,
                bio,
                followers,
                following,
                public_repos,
                location
            } = res.data;
            setProfile({
                name,
                picture: avatar_url,
                profileName: login, bio, followers, following, public_repos, location
            });
        } catch (error) {
            alert('User Does not Exist!');
        }finally{
            setLoader(false);
        }

    }
    return (
        <div className='bg-gray-400 min-h-screen flex flex-col items-center justify-center gap-6'>
            <div className='bg-gray-100 p-6 rounded shadow-md flex flex-col items-center gap-4'>
                <h1 className='text-2xl font-bold'>Github Profile Finder</h1>
                <input className='border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" name="username" id="username" placeholder="Enter GitHub username" value={username} onChange={gettingUser} />
                <button className='bg-blue-500 text-white px-4 py-2 rounded active:bg-blue-700' onClick={handler}>{
                        loader ? 'Loading....':'Get Profile'
                    }</button>
            </div>
            {
                profile && (
                    <div className='flex flex-col border-2 p-4 items-center justify-center bg-gray-100 rounded-2xl  shadow-2xl border-gray-500'>
                        <img src={profile.picture} alt={profile.profileName} className='flex items-center justify-center w-56 h-56 rounded-[120px]' />
                        <span className='font-[Georgia] text-xl underline '>{profile.name}</span>
                        <span className='text-red-800'>{profile.profileName}</span>
                        <div className='flex gap-1 '>
                            <span  className='text-[18px]'>Followers:</span>
                            <span className='font-bold text-blue-600 text-[18px]'>{profile.followers}</span>
                        </div>
                        <div className='flex gap-1 '>
                            <span  className='text-[18px]'>Following:</span>
                            <span className='font-bold text-blue-600 text-[18px]'>{profile.following}</span>
                        </div>
                        <div className='flex gap-1 '>
                            <span className='text-[18px]'>Public Repo's:</span>
                            <span className='font-bold text-blue-600 text-[18px]'>{profile.public_repos}</span>
                        </div>                        
                        <span>{profile.location}</span>
                    </div>
                )
            }
        </div>
    )
}
