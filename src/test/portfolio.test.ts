import { describe, expect, it } from 'vitest';
import { projects } from '@/lib/portfolio';

describe('Portfolio selection', () => {
  it('contains only the video links supplied by Guto', () => {
    expect(projects.map(project => project.video).sort()).toEqual([
      'https://youtu.be/s8g4KQc9UJY',
      'https://www.instagram.com/reel/DRLHC22mGpI/',
      'https://youtu.be/nXvwzOxN4po',
      'https://youtu.be/dB4IjycgjFM',
      'https://youtu.be/LLDwmoBoc-8',
      'https://youtu.be/SocH6xwzYbY',
      'https://youtu.be/34iQ8jDQ73M',
      'https://youtu.be/GiaAbTLvNVs',
      'https://youtube.com/shorts/hSkGwGTkeWQ',
      'https://www.instagram.com/lavanderia60minutos/reel/Dd7Ko9JpyVO/',
      'https://www.instagram.com/lavanderia60minutos/reel/DeZWJg8iNq2/',
      'https://www.instagram.com/lavanderia60minutos/reel/DdUQz28J7NP/',
      'https://www.instagram.com/lavanderia60minutos/reel/DdcJB98JvC_/',
      'https://www.instagram.com/lavanderia60minutos/reel/DbWQ_0ppsDC/',
    ].sort());
  });
});