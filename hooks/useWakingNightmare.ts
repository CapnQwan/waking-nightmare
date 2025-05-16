import { WNCore } from '@/helpers/waking-nightmare/WakingNightmareCore';
import { useEffect, useRef } from 'react';

export const useWakingNightmare = () => {
  const wakingNightmare = useRef<WNCore | null>(null);

  useEffect(() => {
    wakingNightmare.current = new WNCore({ isDebugging: true });
  }, []);
};
