export type ConciergeTopic =
  | 'hours'
  | 'address'
  | 'reservations'
  | 'tours'
  | 'groups'
  | 'beers'
  | 'about';

export const surrealisteBasics = {
  name: 'Brasserie Surréaliste',
  tagline: 'Brussels craft brewery & immersive taproom',
  address: 'Place du Nouveau Marché aux Grains 23, 1000 Brussels, Belgium',
  directions:
    'In the heart of Dansaert. Taproom & brewery in an Art-Deco former warehouse. Closest stops are De Brouckère or Bourse; walk toward Place du Nouveau Marché aux Grains.',

  reservationLink: 'https://www.brasseriesurrealiste.com/bookings',
  reservationNote:
    'Reservations are recommended for dinner and large groups — small tables might be walk-in. Email reservations@brasseriesurrealiste.com for parties or issues.',

  groupEmail: 'reservations@brasseriesurrealiste.com',

  hours: [
    { label: 'Wed–Thu', value: '17:00-01:00' },
    { label: 'Fri', value: '17:00-02:00' },
    { label: 'Sat', value: '12:30-02:00' },
    { label: 'Sun–Tue', value: 'Closed' },
  ],

  tours:
    'Guided brewery walks run Friday evening & Saturday afternoon. About 30 min, plus tasting of three house brews directly with the brewer. Email brewerytour@brasseriesurrealiste.com to book.',

  kitchen:
    'Kitchen generally serves until late dinner hours (around 22:00+ depending on day), with bar snacks available afterward.',

  about:
    'A 1500 m² brewery-taproom in a 1932 Art-Deco building blending craft beer, food, art, and music. They brew on site and offer a rotating range of beers alongside Mediterranean-inspired dishes.',
};

export const beerProfiles = [
  {
    name: 'Surrealiste Pale Ale',
    style: 'American Pale Ale',
    notes: 'Tropical & citrus hops with approachable bitterness',
    bestFor: ['Sessionable & balanced', 'Classic craft choice'],
  },
  {
    name: 'Dance Rave Dance',
    style: 'Session IPA',
    notes: 'Lighter IPA with hoppy character and easy drinkability',
    bestFor: ['Hoppy & social', 'Exploration without heaviness'],
  },
  {
    name: 'Double Trouble',
    style: 'Imperial IPA',
    notes: 'Bold hop profile with deep malt backbone',
    bestFor: ['Hop lovers', 'Rich & complex'],
  },
  {
    name: 'Calavera',
    style: 'Bière de caractère / specialty',
    notes: 'Unique seasonal or special release (varies by batch)',
    bestFor: ['Experimental sips', 'Limited editions'],
  },
];

export const quickTopics: { label: string; topic: ConciergeTopic }[] = [
  { label: 'Hours & Opening', topic: 'hours' },
  { label: 'Find Us', topic: 'address' },
  { label: 'Table Reservations', topic: 'reservations' },
  { label: 'Brewery Tours', topic: 'tours' },
  { label: 'Group Bookings', topic: 'groups' },
  { label: 'Beer Recommendations', topic: 'beers' },
  { label: 'About the Brewery', topic: 'about' },
];
