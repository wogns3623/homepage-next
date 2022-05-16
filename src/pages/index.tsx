import Head from 'next/head';
import Image from 'next/image';

import HEADER_MAIN from '@public/images/header/header_main.png';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/images/favicon.png' />
      </Head>

      {/* Head image */}
      <div className='absolute top-0 left-0 flex h-128 w-screen items-center justify-center overflow-hidden'>
        <div className='w-screen flex-1'>
          <Image
            src={HEADER_MAIN}
            layout='responsive'
            alt='비행기가 좌하단에서 우상단으로 날아가고 우상단 모서리에 태극기가 펄럭임. 안창남 비행사의 모습이 희미하게 태극기 아래에 보임'
          />
        </div>
      </div>

      <article className=''></article>
    </>
  );
}
