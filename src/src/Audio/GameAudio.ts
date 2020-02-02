import { resolve } from "dns";

class GameAudio {
    private audioAssets: { [id: string]: HTMLAudioElement } = {};
    private audioAssetsReady: { [id: string]: boolean } = {};

    private preloadAudio(source: string): HTMLAudioElement {
        var audio = new Audio();
        audio.src = source;
        audio.preload = 'auto';
        audio.load();
        return audio;
    }

    async load(assets: { [id: string]: string }): Promise<HTMLAudioElement[]> {
        return new Promise<HTMLAudioElement[]>((resolve): void => {
            const waiting: HTMLAudioElement[] = [];
            Object.keys(assets).map((source): void => {
                const audioElement: HTMLAudioElement = this.preloadAudio(assets[source]);
                this.audioAssets[source] = audioElement;
                waiting.push(audioElement);
                this.audioAssetsReady[source] = false;
                audioElement.addEventListener('canplaythrough', () => {
                    this.audioAssetsReady[source] = true;
                    if (Object.keys(this.audioAssetsReady).every((key) => this.audioAssetsReady[key])) {
                        resolve(waiting)
                    }
                });
            });
        });
    }

    play(key: string, loop?: boolean): void {
        const audio = this.audioAssets[key];
        audio.loop = loop || false;
        audio.currentTime = 0;
        audio.play().then(_ => {
            // autoplay started
        })
            .catch(err => {
                // catch dom exception
                console.info(err)
            })
    }

    stop(key: string): void {
        this.audioAssets[key].pause();
        this.audioAssets[key].currentTime = 0;
    }

    stopAll(): void {
        Object.keys(this.audioAssets).forEach(element => {
            this.stop(element);
        });
    }
}

export const AudioPlayer: GameAudio = new GameAudio();