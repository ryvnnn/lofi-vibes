async function startLofi() {
  await Tone.start();
  console.log('Audio is ready');

  // Lo-Fi beat (simple kick + snare)
  const beat = new Tone.MembraneSynth().toDestination();
  const snare = new Tone.NoiseSynth({ volume: -10 }).toDestination();

  const beatLoop = new Tone.Loop((time) => {
    beat.triggerAttackRelease('C1', '8n', time);
    snare.triggerAttackRelease('8n', time + 0.5);
  }, '1n').start(0);

  // Ambient chords
  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sine' },
    envelope: { attack: 1, release: 3 }
  }).toDestination();

  const chords = [
    ['C4', 'E4', 'G4'],
    ['A3', 'D4', 'F4'],
    ['F3', 'A3', 'C4'],
    ['G3', 'B3', 'D4']
  ];

  const chordLoop = new Tone.Loop((time) => {
    const chord = chords[Math.floor(Math.random() * chords.length)];
    synth.triggerAttackRelease(chord, '2n', time);
  }, '2n').start(0);

  // Start the transport
  Tone.Transport.bpm.value = 70;
  Tone.Transport.start();
}
