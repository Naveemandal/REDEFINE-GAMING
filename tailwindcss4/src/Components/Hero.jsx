import React, { useRef, useState } from 'react';
import Button from './Button';
import { TiLocationArrow } from "react-icons/ti";
import { gsap } from 'gsap/gsap-core';

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClick, setHasClick] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideo, setLoadedVideo] = useState(0);

    const totalVideo = 3;
    const nextVdRef = useRef(null);

    const handleVideoLoaded = () => {
        setLoadedVideo((prev) => prev + 1);
    };

    // Calculate upcoming video index
    const upComingVideoIndex = (currentIndex % totalVideo) + 1;

    const handleMiniVdClick = () => {
        setHasClick(true);
        setCurrentIndex(upComingVideoIndex);
    };

    // useGSAP( func() => {

    // },dependecies:{[currentIndex],revertUpdate:true})

    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

    return (
        <div className='relative h-screen w-screen overflow-x-hidden'>
            {/* Video Frame */}
            <div id='video-frame' className='relative z-10 h-screen w-screen overflow-hidden rounded-lg bg-[#DFDFF2]'>
                <div>
                    {/* Mini Video Preview */}
                    <div className='absolute inset-0 flex items-center justify-center z-50'>
                        <div 
                            onClick={handleMiniVdClick} 
                            className='size-64 cursor-pointer overflow-hidden rounded-lg origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'
                        >
                            <video
                                ref={nextVdRef}
                                src={getVideoSrc(upComingVideoIndex)}
                                loop
                                muted
                                id='current-video'
                                className='size-64 origin-center scale-150 object-cover object-center'
                                onLoadedData={handleVideoLoaded}
                            />
                        </div>
                    </div>

                    {/* Next Video (Hidden Until Loaded) */}
                    <video 
                        ref={nextVdRef}
                        src={getVideoSrc(currentIndex)}
                        loop
                        muted 
                        id='next-video'
                        className='absolute inset-0 invisible z-20 size-64 object-cover object-center'
                        onLoadedData={handleVideoLoaded}
                    />
                  
                    {/* Main Video */}
                    <video 
                        src={getVideoSrc(currentIndex === totalVideo - 1 ? 1 : currentIndex)}
                        autoPlay
                        loop
                        muted
                        className='absolute left-0 top-0 h-screen w-screen object-cover object-center'
                        onLoad={handleVideoLoaded}
                    />
                </div>

                <h1 className='font-robert-regular text-9xl uppercase hero-heading absolute bottom-8 right-8  
                z-40 text-[#DFDFF2] font-bold font-stretch-60% tracking-tighter '>
                    G<b>a</b>ming
                </h1>

                <div className='absolute left-0 top-0 z-40 size-full'>

                    <div className='mt-24 px-5 sm:px-10'>
                        <h1 className='font-robert-medium  hero-heading uppercase text-[#F0F2FA] font-bold text-9xl tracking-tighter '>Redefi<b>n</b>e</h1>

                        <p className='mb-5 max-w-64 font-robert-regular text-[#F0F2FA]  '>
                            Enter the Metagame Layer <br /> Unleash the Play Economy
                        </p>
                       
                        <Button id='watch-trailer' title='Watch Trailer' leftIcon={<TiLocationArrow />}
                        containerClass='!bg-[#EDFF66] flex-center gap-1' />

                    </div>

                </div>
            </div>

            <h1 className='special-font hero-heading absolute bottom-7 right-5 uppercase text-black font-bold text-6xl'>
                    G<b>a</b>ming
                </h1>

        </div>
    );
};

export default Hero;
