'use client';

import { WNCore } from '@/helpers/waking-nightmare/WakingNightmareCore';
import { useEffect, useState } from 'react';

export default function Home() {
  const [_, setEngine] = useState<WNCore>();

  useEffect(() => {
    setEngine(new WNCore({ isDebugging: true }));
  }, []);

  return;
}
