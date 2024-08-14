import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

const videosDir = path.join(__dirname, 'videos');

const generateVideoFileMap = () => {
    const videoFileMap = {};

    const files = fs.readdirSync(videosDir);

    files.forEach(file => {
        if (file.endsWith('.mp4')) {
            const key = path.basename(file, '.mp4');
            videoFileMap[key] = path.join(videosDir, file);
        }
    });

    return videoFileMap;
};

const videoFileMap = generateVideoFileMap();

export const streamVideo = (req, res) => {
    const fileName = req.params.filename;
    const filePath = videoFileMap[fileName];
    console.log(`Received request for video: ${fileName}`);

    if (!filePath) {
        console.log('File not found:', fileName); 
        return res.status(404).send('File not found');
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunksize = end - start + 1;
        const file = fs.createReadStream(filePath, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res);
    }
};
