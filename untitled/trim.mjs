import sharp from 'sharp';

sharp('public/images/aurelia-secret-santorini.png')
  .trim()
  .toFile('public/images/aurelia-secret-santorini-trimmed.png')
  .then(info => {
    console.log('Trimmed image successfully', info);
  })
  .catch(err => {
    console.error('Error trimming image', err);
  });
