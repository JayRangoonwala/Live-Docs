import { useOthers } from '@liveblocks/react/suspense'
import Image from 'next/image';
import React from 'react'

const ActiveCollabrator = () => {

    const others = useOthers();

    // console.log("others:",others);

    const collabrators = others.map((other) => other.info);
    // console.log(collabrators);
  return (
    <ul className='flex w-fit items-center justify-end -space-x-2 overflow-hidden sm:flex'>
        {
        collabrators.map(({id,avatar,name,color}) => (
            <li key={id}>
                <Image
                src={avatar}
                alt={name}
                height={100}
                width={100}
                className='inline-block size-6 rounded-full ring-2'
                style={{border:`1px solid ${color}`}}
                />
            </li>
        ))
        }
    </ul>
  )
}

export default ActiveCollabrator
