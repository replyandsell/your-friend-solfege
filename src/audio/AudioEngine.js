import * as Tone from 'tone'

class AudioEngine {
  constructor() {
    this.isReady = false
    this.metronomeLoop = null
    this.bpm = 100
    this.onBeat = null
    this.beatCount = 0
    this.clickSynth = null
    this.limiter = null
  }

  async init() {
    if (this.isReady) return
    await Tone.start()
    this.limiter = new Tone.Limiter(-6).toDestination()
    this.clickSynth = new Tone.MembraneSynth({
      pitchDecay: 0.008,
      octaves: 2,
      envelope: { attack: 0.001, decay: 0.15, sustain: 0 },
    }).connect(this.limiter)
    Tone.Transport.bpm.value = this.bpm
    this.isReady = true
  }

  setBpm(value) {
    this.bpm = value
    if (this.isReady) {
      Tone.Transport.bpm.value = value
    }
  }

  startMetronome(onBeat) {
    if (!this.isReady) return
    this.onBeat = onBeat
    this.beatCount = 0
    this.metronomeLoop = new Tone.Loop((time) => {
      const note = 'C3'
      this.clickSynth.triggerAttackRelease(note, '32n', time)
      const beatIndex = this.beatCount
      Tone.Draw.schedule(() => {
        if (this.onBeat) this.onBeat(beatIndex, false)
      }, time)
      this.beatCount++
    }, '4n').start(0)
    Tone.Transport.start()
  }

  startSyncopatedMetronome(onBeat) {
  if (!this.isReady) return
  this.onBeat = onBeat
  this.beatCount = 0
  this.metronomeLoop = new Tone.Loop((time) => {
    const isAccent = this.beatCount % 2 === 1
    const note = isAccent ? 'C3' : 'C2'
    this.clickSynth.triggerAttackRelease(note, '32n', time)
    const beatIndex = this.beatCount
    Tone.Draw.schedule(() => {
      if (this.onBeat) this.onBeat(beatIndex, false)
    }, time)
    this.beatCount++
  }, '8n').start(0.5)
  Tone.Transport.start()
}

  stopMetronome() {
    if (this.metronomeLoop) {
      this.metronomeLoop.stop()
      this.metronomeLoop.dispose()
      this.metronomeLoop = null
    }
    Tone.Transport.stop()
    Tone.Transport.cancel()
    this.beatCount = 0
  }

  dispose() {
    this.stopMetronome()
    if (this.clickSynth) this.clickSynth.dispose()
    if (this.limiter) this.limiter.dispose()
    this.isReady = false
  }
}

export const audioEngine = new AudioEngine()