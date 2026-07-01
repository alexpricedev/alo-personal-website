import { Layout } from "@server/components/layouts";

interface Credit {
  title: string;
  studio: string;
}

const credits: Credit[] = [
  { title: "90210 (Promo), ‘House Party’", studio: "Channel 4 UK" },
  { title: "All-American Rejects, ‘I Wanna’", studio: "Prettybird" },
  { title: "Armor For Sleep, ‘Remember To Feel Real’", studio: "Refused" },
  { title: "BMW, ‘USA Character Story’", studio: "USA/NBCU" },
  { title: "Black Country, ‘Rockets’", studio: "Streetgang" },
  { title: "Blackalicious, ‘Powers’", studio: "Refused" },
  { title: "Blackberry Technologies, ‘Phase 2’", studio: "Sky Creative" },
  { title: "Blue October, ‘Calling You’", studio: "All Hat" },
  {
    title: "Cobra Starship, ‘Snakes on a Plane (Bring It)’",
    studio: "Refused",
  },
  { title: "Cubus, ‘Fall Campaign’", studio: "All Hat" },
  { title: "DCO Media, ‘Together For Health Care’", studio: "CC Med." },
  { title: "DCO Media., ‘Our Health Care’", studio: "CC Media" },
  {
    title: "Dennys, ‘Nothing Good Happens After Midnight’",
    studio: "Station Film",
  },
  { title: "Depeche Mode, ‘Wrong’", studio: "Directors Bureau" },
  { title: "Dominos, ‘WWE Road Trip’", studio: "USA Network" },
  { title: "Erika Heynatz, ‘Kingdom’", studio: "Draw Pictures" },
  { title: "Euromillions Belgium, ‘Letter Home’", studio: "Sabmucho!" },
  { title: "Faktion, ‘Take It All Away’", studio: "Refused" },
  { title: "Ghost Hunters (Promo), ‘Thermo’", studio: "NBC Universal" },
  { title: "Girls Aloud, ‘Call The Shots’", studio: "Streetgang" },
  { title: "Good Charlotte, ‘The River’", studio: "DNA" },
  { title: "GM/OnStar, ‘OnStar Treatment’", studio: "PYTKA" },
  { title: "Hoobastank, ‘Born To Lead’", studio: "Refused" },
  { title: "Hoobastank, ‘Inside of You’", studio: "Refused" },
  { title: "Hot Hot Heat, ‘Let Me In’", studio: "Streetgang" },
  { title: "In Flames, ‘Come Clarity’", studio: "Refused" },
  { title: "Julian Casablancas, ‘The 11th Dimension’", studio: "Black Dog" },
  { title: "Jonas Brothers, ‘Kids of the Future’", studio: "Crossroads" },
  { title: "Keith Urban, ‘I Told You So’", studio: "Streetgang" },
  { title: "Marilyn Manson, ‘Heart-Shaped Glasses’", studio: "Sunset" },
  { title: "Mythbusters (Promo)", studio: "Discovery UK" },
  { title: "Paolo Nutini, ‘Last Request’", studio: "Streetgang" },
  { title: "Ross Copperman, ‘All She Wrote’", studio: "DNA" },
  { title: "Sara Lee, ‘Magic Moments’", studio: "Tall Stories UK" },
  { title: "Sia, ‘Day Too Late’", studio: "Directors Bureau" },
  { title: "Start To Finish for MS, ‘American Beauty’", studio: "Furlined" },
  { title: "Start Your Day With USA", studio: "USA Network/NBCU" },
  {
    title: "Syfy Channel (Promo), ‘House Of Imagination’",
    studio: "Channel 4 UK",
  },
  { title: "Syfy Channel (Promo), ‘ViewMaster’", studio: "Channel 4 UK" },
  { title: "Talib Kweli, ‘Hot Thing’", studio: "Immigrant" },
  { title: "The Event, ‘Out Of Focus’ (Promo)", studio: "Channel 4 UK" },
  { title: "The Frames, ‘Dream Awake’", studio: "Refused" },
  { title: "The Gutter Twins, ‘Idle Hands’", studio: "Believe Media" },
  { title: "Tommy Lee, ‘Culture Shock’ (Upfront)", studio: "NBCU" },
  {
    title: "Under the Influence of Giants, ‘Mama’s Room’",
    studio: "Refused",
  },
  { title: "Vanessa Hudgens, ‘Say OK’", studio: "Karma Kollective" },
];

export const Credits = () => (
  <Layout title="Motion Picture Producing Credits" name="credits">
    <div className="credits-page">
      <header className="credits-hero">
        <p className="credits-eyebrow">Selected Film/TV Credits</p>
        <h1 className="credits-title">Motion Picture Producing Credits</h1>
        <p className="credits-subtitle">Line Producer · A–Z</p>
      </header>

      <ol className="credits-list">
        {credits.map((credit) => (
          <li className="credit" key={`${credit.title}-${credit.studio}`}>
            <span className="credit__title">{credit.title}</span>
            <span className="credit__studio">{credit.studio}</span>
          </li>
        ))}
      </ol>

      <a className="credits-back" href="/#track-record">
        ← Back to track record
      </a>
    </div>
  </Layout>
);
