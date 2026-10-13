/**
 * Web Audio API synthesizer for Yunnan Tea Mountain Ambience
 * Simulates gentle mountain breeze, peaceful brook water flow, and singing bowl meditation chime.
 */

class MountainAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private windGain: GainNode | null = null;
  private streamGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private windFilter: BiquadFilterNode | null = null;
  private timerInterval: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start() {
    try {
      this.initContext();
      if (!this.ctx) return;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.35, this.ctx.currentTime + 3);
      this.masterGain.connect(this.ctx.destination);

      // 1. Mountain Breeze Pink Noise Generator
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11;
        b6 = white * 0.115926;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      this.windFilter = this.ctx.createBiquadFilter();
      this.windFilter.type = 'lowpass';
      this.windFilter.frequency.setValueAtTime(400, this.ctx.currentTime);
      this.windFilter.Q.setValueAtTime(2.5, this.ctx.currentTime);

      this.windGain = this.ctx.createGain();
      this.windGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

      whiteNoise.connect(this.windFilter);
      this.windFilter.connect(this.windGain);
      this.windGain.connect(this.masterGain);
      whiteNoise.start();

      // Slow dynamic wind lfo modulation
      this.timerInterval = window.setInterval(() => {
        if (!this.ctx || !this.windFilter || !this.isPlaying) return;
        const targetFreq = 300 + Math.random() * 450;
        this.windFilter.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 2.5);
      }, 3500);

      // 2. Mountain Brook Stream Water Gurgle
      const streamFilter = this.ctx.createBiquadFilter();
      streamFilter.type = 'bandpass';
      streamFilter.frequency.setValueAtTime(800, this.ctx.currentTime);
      streamFilter.Q.setValueAtTime(4.0, this.ctx.currentTime);

      this.streamGain = this.ctx.createGain();
      this.streamGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

      whiteNoise.connect(streamFilter);
      streamFilter.connect(this.streamGain);
      this.streamGain.connect(this.masterGain);

      this.isPlaying = true;
    } catch (e) {
      console.warn('AudioContext initiation notice:', e);
      this.isPlaying = false;
    }
  }

  public stop() {
    if (!this.isPlaying) return;
    try {
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setTargetAtTime(0.001, this.ctx.currentTime, 0.8);
      }
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
      setTimeout(() => {
        if (this.ctx && this.ctx.state !== 'closed') {
          this.ctx.suspend();
        }
      }, 900);
    } catch {
      // ignore
    }
    this.isPlaying = false;
  }

  /**
   * Strike a peaceful bronze singing bowl chime for tea steeping completion
   */
  public playSingingBowlChime() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Frequencies for a rich resonant harmonic singing bowl (528Hz + harmonics)
      const freqs = [528, 1056, 1584, 2112, 275];
      const gains = [0.4, 0.2, 0.1, 0.05, 0.15];

      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq + (Math.random() * 2 - 1), now);

        gain.gain.setValueAtTime(gains[idx] * 0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 4.6);
      });
    } catch (e) {
      console.warn('Singing bowl chime notice:', e);
    }
  }
}

export const teaAudio = new MountainAudioPlayer();
