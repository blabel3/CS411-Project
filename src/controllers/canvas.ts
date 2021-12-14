import { createCanvas, loadImage } from 'canvas';
import IPlaylistFeatures from '../models/IPlaylistFeatures';

const [coverWidth, coverHeight] = [500, 500];
const format = 'image/jpeg';

function getRandomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getTintColor(audioFeatures: IPlaylistFeatures):string {

    // avg energy & danceability = saturation
    // valence = hue (manual)
    // acousticness = lightness [0.2 - 0.8]

    let hue = 0;
    if (audioFeatures.valence >= 0.60){
        // Happy, give a yellow 
        hue = getRandomIntInRange(40, 70);
    } else if (audioFeatures.valence >= 0.54) {
        // Still pretty happy
        hue = getRandomIntInRange(71, 160);
    } else if (audioFeatures.valence >= 0.47) {
        // Could go either way, reds
        const intermediate = getRandomIntInRange(290, 400);
        hue = intermediate > 360 ? intermediate - 360 : intermediate; // go from 290-260, then immediately 0-39
    } else {
        // blues
        hue = getRandomIntInRange(161, 289);
    }

    const saturation = (audioFeatures.danceability + audioFeatures.energy) / 2;
    const lightness = Math.min( Math.max(audioFeatures.acousticness, 0.2), 0.8);

    return `hsl(${hue}, ${Math.round(saturation * 100)}%, ${Math.round(lightness * 100)}%)`;

}

export async function createCover(imageUrl: string, audioFeatures: IPlaylistFeatures): Promise<string> {
    const canvas = createCanvas(coverWidth, coverHeight);
    const ctx = canvas.getContext('2d');

    const image = await loadImage(imageUrl);

    let [startX, startY, width, height] = [0, 0, 0, 0];

    // image is portrait
    if (image.height >= image.width) {
        width = image.width;
        height = image.width;
        const midpoint = image.height / 2;
        startY = midpoint - height / 2;

        console.log(`Width: ${width}, Height: ${height}, startY: ${startY}, image src: ${imageUrl}`);

        ctx.drawImage(image, 0, startY, width, height, 0, 0, coverWidth, coverHeight);
    } else {
        height = image.height;
        width = image.height;
        const midpoint = image.width / 2;
        startX = midpoint - width / 2;

        console.log(`Width: ${width}, Height: ${height}, startX: ${startX}, image src: ${imageUrl}`);
    }

    // Draw image in album cover size (crop if needed)
    ctx.drawImage(image, startX, startY, width, height, 0, 0, coverWidth, coverHeight);

    ctx.globalCompositeOperation = 'hue';
    const color = getTintColor(audioFeatures);
    console.log(color);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, coverWidth, coverHeight);

    return canvas.toDataURL(format);
}
