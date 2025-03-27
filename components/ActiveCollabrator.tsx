import { useOthers } from '@liveblocks/react/suspense'
import Image from 'next/image';
import React from 'react'

const ActiveCollabrator = () => {

    const others = useOthers();

    console.log("others:",others);

    console.log(others);
    const collabrators = others.map((other) => {
        other.info;
    })

  return (
    <ul className='hidden items-center justify-end -space-x-3 overflow-hidden sm:flex;'>
        {
        collabrators.map(({id,avatar,name,color}:any) => (
            <li key={id}>
                <Image
                src={avatar}
                alt={name}
                height={100}
                width={100}
                className='inline-block size-8 rounded-full ring-2'
                style={{border:`2px solid ${color}`}}
                />
            </li>
        ))
        }
    </ul>
  )
}

export default ActiveCollabrator
