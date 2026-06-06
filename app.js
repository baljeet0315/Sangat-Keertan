// Temporarily pasting your credentials here directly for local testing 
// (We will make this bulletproof with a bundler later!)
const SUPABASE_URL = "https://adypirueqqbjzyapzdzh.supabase.co";
const SUPABASE_KEY = "YOUR_PUBLISHABLE_ANON_KEY_HERE"; 

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function loadTracks() {
  const { data: tracks, error } = await supabase
    .from('tracks')
    .select('*');

  if (error) {
    console.error('Error fetching tracks:', error);
    return;
  }

  const listContainer = document.getElementById('track-list');
  listContainer.innerHTML = '';

  tracks.forEach(track => {
    const item = document.createElement('div');
    item.className = 'track-item';
    item.innerText = `${track.title} - ${track.artist}`;
    item.onclick = () => playTrack(track);
    listContainer.appendChild(item);
  });
}

function playTrack(track) {
  document.getElementById('current-track').innerText = `${track.title} - ${track.artist}`;
  const player = document.getElementById('audio-player');
  player.src = track.audio_url;
  player.play();
}

// Load tracks when the page starts
loadTracks();