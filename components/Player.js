/* eslint-disable @next/next/no-img-element */
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import useSongInfo from '../hooks/useSongInfo'
import useSpotify from '../hooks/useSpotify'

function Player() {
    const spotifyApi = useSpotify()
    const { data: session, status } = useSession()
    const [currentTrackId, setCurrentTrackId] =
        useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [volume, setVolume] = useState(50)

    const songInfo = useSongInfo()

    const fetchCurrectSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then(data => {
                console.log("now playing:", data.body?.item)
                setCurrentTrackId(data.body?.item?.id)

                spotifyApi.getMyCurrentPlaybackState().then(data => {
                    setIsPlaying(data.body?.is_playing);
                })
            })
        }
    }

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrectSong();
            setVolume(50)
        }
    }, [currentTrackIdState, spotifyApi, session]);

    return (
        <div className='grid h-24 grid-cols-3 px-2 text-xs text-white md:px-8 md:text-base bg-gradient-to-b from-black to-gray-900'>
            {/* left */}
            <div className='flex items-center space-x-4'>
                <img className='hidden w-10 h-10 md:inline' src={songInfo?.album.images[0]?.url} alt='' />
                <div>
                    <h3>
                        {songInfo?.name}
                    </h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>
        </div>
    )
}

export default Player