import { useEffect, useRef } from 'react';
import type { WNCore } from '@/helpers/waking-nightmare/WakingNightmareCore';

export const useWakingNightmare = () => {
  const wakingNightmare = useRef<WNCore | null>(null);

  useEffect(() => {
    const initWN = async () => {
      const { WNCore } = await import(
        '@/helpers/waking-nightmare/WakingNightmareCore'
      );
      wakingNightmare.current = new WNCore({ isDebugging: true });
    };

    initWN();
  }, []);
};
