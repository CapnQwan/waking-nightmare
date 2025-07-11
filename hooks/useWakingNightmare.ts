import { useEffect, useRef } from 'react';
import type { WNCore } from '@/helpers/waking-nightmare/waking-nightmare_core/wakingNightmareCore';

export const useWakingNightmare = () => {
  const wakingNightmare = useRef<WNCore | null>(null);

  useEffect(() => {
    const initWN = async () => {
      const { WNCore } = await import(
        '@/helpers/waking-nightmare/waking-nightmare_core/wakingNightmareCore'
      );
      wakingNightmare.current = new WNCore({ isDebugging: true });
    };

    initWN();
  }, []);
};
