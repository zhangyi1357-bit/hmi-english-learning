// Short synthesized tones keep feedback available without external audio downloads.
export function createFeedback(isEnabled) {
  let context;
  return function play(kind) {
    if (!isEnabled()) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    try {
      context ||= new AudioContext();
      const sound = () => {
        const notes = { reveal: [520, 660], known: [660, 880, 1046], vague: [520, 460], forgot: [330, 262] }[kind] || [520];
        notes.forEach((frequency, index) => {
          const oscillator = context.createOscillator();
          const gain = context.createGain();
          const start = context.currentTime + index * 0.075;
          oscillator.type = "sine";
          oscillator.frequency.value = frequency;
          gain.gain.setValueAtTime(0, start);
          gain.gain.linearRampToValueAtTime(0.09, start + 0.008);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.12);
          oscillator.connect(gain);
          gain.connect(context.destination);
          oscillator.start(start);
          oscillator.stop(start + 0.14);
          oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
        });
      };
      if (context.state === "running") sound();
      else context.resume().then(sound).catch(() => {});
    } catch { /* Audio availability must not interrupt review. */ }
  };
}
