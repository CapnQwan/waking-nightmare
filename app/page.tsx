'use client';

import { useEffect, useRef, useState } from 'react';
import WNCore from '../helpers/waking-nightmare/WakingNightmareCore';

export default function Home() {
  const [engine, setEngine] = useState<WNCore>();

  useEffect(() => {
    const WakingNightmare = new WNCore({ isDebugging: true });
    setEngine(WakingNightmare);
  }, []);

  return;
}
