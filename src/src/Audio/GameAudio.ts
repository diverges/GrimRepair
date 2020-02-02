class GameAudio {
    private audioAssets: { [id: string]: HTMLAudioElement } = {};

    private preloadAudio(source: string): HTMLAudioElement {
        var audio = new Audio();
        audio.src = source;
        return audio;
    }

    async load(assets: { [id: string]: string }): Promise<HTMLAudioElement[]> {
        return new Promise<HTMLAudioElement[]>((resolve): void => {
            const waiting: HTMLAudioElement[] = [];
            Object.keys(assets).map((source): void => {
                const audioElement = this.preloadAudio(assets[source]);
                this.audioAssets[source] = audioElement;
                waiting.push(audioElement);
            });

            while (waiting.every((e): boolean => e.readyState >= 3));

            resolve(waiting);
        });
    }

    play(key: string): void {
        console.log(this.audioAssets[key]);
        this.audioAssets[key].play();
    }

    stop(key: string): void {
        this.audioAssets[key].pause();
        this.audioAssets[key].currentTime = 0;
    }
}

export const AudioPlayer: GameAudio = new GameAudio();