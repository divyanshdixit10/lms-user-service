const ytInfo = require('youtube-info-streams');
const fs = require('fs');

// List of video IDs from the provided links
const videoIds = [
  'HspM4qB8U0s', 'nYiKufR2LVc', '-K9oyqqcl8s', 'IYd6jH33tY8', 'WwRSJV9oDF4',
  'ZEULHT823ak', 'XUJE3SETgYw', 'BBRXBQXU3jw', 'rYaHi01ffsc', 'mGvN0p9GapE',
  'Qg7Ez51HanM', 'WEo_XDOvXZ4', 'RJjb2cq145k', 'SIERpBmdeEY', 'TBVK2BdbYfU',
  'bJk8llXVwvo', 'TInH3dkQuBg', 'kw6vjui4LOM', 'FYBGCkiNt1g', '1cQ43n5QXlE',
  'dOuNSW9Bqkw', 'JUhO2A3NFlE', 'hg3nbdyk3Xo', '50JkN2y453U', 'S1NbDI5E48k',
  'hqG7ncGUWFM', 'XdLr6QP7hwc', '9MIT51WWU_A', 'EEKzIslZ5sY', 'TThcNNSGmCI',
  'UnKRgXK-ZJw', 'Z9SlKleTFXI', '_m5hVCP2RnI', 'l5HlubjFUlg', 'G7Z_E-z1l4Y',
  'ylOSx4d3C7A', 'h1nlHQoGKV4', 'pgEGhtPYcic', '4DcKPDxDIPY', '7elChkEiGnE',
  '_qSSooJHoFA', 'I-MxTa6qY6c', 'rRaICURDeBI', '5IgSpS-vQbs', '5Zs-gZZDaTo',
  'sSO1CUB6HPk', 'k4BjmyyYakA', 'i2R2EFU2DRE', 'eXyRxTsdkHE', 'sYUSAjjs8k0'
];

async function getVideoInfo() {
  const results = [];
  
  for (const videoId of videoIds) {
    try {
      const info = await ytInfo.info('https://www.youtube.com/watch?v=' + videoId);
      results.push({
        id: videoId,
        title: info.title,
        description: info.description ? info.description.slice(0, 200) + '...' : 'No description'
      });
      console.log(`Retrieved: ${info.title}`);
    } catch (err) {
      console.error(`Error fetching info for ${videoId}:`, err.message);
      results.push({
        id: videoId,
        title: 'Error retrieving title',
        description: 'Error retrieving description'
      });
    }
  }
  
  fs.writeFileSync('youtube-video-info.json', JSON.stringify(results, null, 2));
  console.log('All data saved to youtube-video-info.json');
}

getVideoInfo().catch(console.error); 