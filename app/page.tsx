'use client';

import { useRenderCube } from '@/helpers/testRenderingCube';
import { useWakingNightmare } from '@/hooks/useWakingNightmare';

export default function Home() {
  useWakingNightmare();
  //useRenderCube();

  return;
}
