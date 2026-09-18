import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';

const images = [
  { in: 'public/images/jasmine.png', out: 'public/images/jasmine-transparent.png' },
  { in: 'public/images/lavinder.png', out: 'public/images/lavinder-transparent.png' },
  { in: 'public/images/rose.png', out: 'public/images/rose-transparent.png' },
  { in: 'public/images/pink flower.jpeg', out: 'public/images/pink flower-transparent.png' }
];

async function processImage() {
  console.log('Starting background removal for multiple images...');
  
  if (!fs.existsSync('public/images')) {
    fs.mkdirSync('public/images', { recursive: true });
  }

  for (const img of images) {
    try {
      console.log('Processing: ' + img.in);
      const blob = await removeBackground(img.in);
      const buffer = Buffer.from(await blob.arrayBuffer());
      fs.writeFileSync(img.out, buffer);
      console.log('Successfully saved to ' + img.out);
    } catch (err) {
      console.error('Error removing background for ' + img.in, err);
    }
  }
}

processImage();
