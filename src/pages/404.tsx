import { useEffect, useState } from 'react';

import { cls } from '@utils';

export default function CustomFallbackPage() {
  const [state, setState] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-1 items-center justify-center'>
      <h1 className={cls`${{ 'text-blue-400': state }}`}>404 Not found</h1>
    </div>
  );
}
