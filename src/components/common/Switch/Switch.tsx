import { Dispatch, SetStateAction } from 'react';

import { useLiftedState } from '@hooks/utils';
import { cls } from '@utils';

export interface SwitchProps {
  className?: string;
  value?: boolean;
  setValue?: Dispatch<SetStateAction<boolean>>;
  disabled?: boolean;
  unCheckedChildren?: React.ReactNode;
  checkedChildren?: React.ReactNode;

  /**
   * @default false
   */
  defaultValue?: boolean;
}

export default function Switch({
  className,
  value: liftedValue,
  setValue: setLiftedValue,
  disabled,
  unCheckedChildren,
  checkedChildren,
  defaultValue = false,
}: SwitchProps) {
  const [value, setValue] = useLiftedState(defaultValue, liftedValue, setLiftedValue);

  return (
    <div
      className={cls`relative flex h-6 w-12 justify-between rounded-full px-0.5 ${className}`}
      onClick={() => setValue(prev => !prev)}>
      <span className={cls`${{ invisible: !value }} p-0.5`}>{checkedChildren}</span>
      <span className={cls`${{ invisible: value }} p-0.5`}>{unCheckedChildren}</span>

      <div
        className={cls`absolute flex h-full w-full items-center transition-transform ${{
          'translate-x-6': value,
        }}`}>
        <div className='h-5 w-5 rounded-full bg-white' />
      </div>
    </div>
  );
}
