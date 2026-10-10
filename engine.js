// Nation Builder — shared content and rules.
// Both index.html and retro.html load this. It reads and writes the global `state`
// that each page declares; everything here is presentation-free.

// ═══════════════════════════════════════════════════════════
// NATIONS — tags drive geography-specific notes, effects and crises
// ═══════════════════════════════════════════════════════════
const NATIONS = [
  { name:"Valdoria", desc:"A coastal republic at the edge of the known world", icon:"coastal", tags:["coastal"],
    base:{pros:55,eq:50,inc:50,leg:50,inst:50,coh:50},
    geo:{Terrain:"Coastal plains, northern highlands",Climate:"Temperate, wet winters",Resources:"Timber, fish, iron ore",Neighbors:"Two larger powers to the east",Population:"~4 million"} },
  { name:"Kemrath", desc:"A landlocked nation of river valleys and dense forest", icon:"landlocked", tags:["landlocked","river"],
    base:{pros:45,eq:50,inc:50,leg:50,inst:50,coh:55},
    geo:{Terrain:"River valleys, dense forest",Climate:"Cold winters, short summers",Resources:"Fertile farmland, coal",Neighbors:"Three rival states on all sides",Population:"~900,000"} },
  { name:"Suranel", desc:"An arid plateau nation commanding vital trade routes", icon:"arid", tags:["arid","coastal"],
    base:{pros:55,eq:45,inc:50,leg:50,inst:50,coh:50},
    geo:{Terrain:"Arid plateau, one great river",Climate:"Hot and dry, scarce rain",Resources:"Rare minerals, trade routes",Neighbors:"Desert south, ocean west",Population:"~12 million"} },
  { name:"Thovara", desc:"An island nation of volcanic soil and tropical storms", icon:"island", tags:["island","coastal"],
    base:{pros:45,eq:50,inc:50,leg:50,inst:50,coh:60},
    geo:{Terrain:"Archipelago, volcanic soil",Climate:"Tropical, hurricane season",Resources:"Rich agriculture, no fuel",Neighbors:"Nearest nation 400 miles off",Population:"~600,000"} },
  { name:"Meralden", desc:"A vast interior nation of plains and great rivers", icon:"plains", tags:["plains","landlocked","river"],
    base:{pros:55,eq:50,inc:50,leg:50,inst:50,coh:45},
    geo:{Terrain:"Interior plains, great rivers",Climate:"Continental, extreme seasons",Resources:"Abundant grain, little timber",Neighbors:"Open borders on all sides",Population:"~8 million"} }
];

// ═══════════════════════════════════════════════════════════
// FAMILIES — text uses role tokens so any family fits any line
// {F}{M}{S}{D} first names · {fam} surname · [[landed||landless]]
// ═══════════════════════════════════════════════════════════
const FAMILIES = [
  { surname:"Vael", landed:true, sonSoldier:false,
    Fhold:"the six acres", Mwork:"delivered half the valley's children", MworkNow:"delivers the valley's children", Swork:"the joinery yards",
    dHigh:"is the first woman to sit on the regional council",
    dMid:"is clerk to the regional council. She drafts the laws; men sign them",
    dLow:"sews for a living, and is good at it. At night she reads whatever she can borrow",
    members:[
      {name:"Aldric",role:"Father — farmer & elder",age:42,desc:"Cleared his six acres with his own hands. Believes in order, fair dealing, and church on Sunday."},
      {name:"Maret",role:"Mother — midwife & trader",age:38,desc:"Delivers half the children in the valley and keeps the household accounts. Trusts no one who hasn't given her reason to."},
      {name:"Jorin",role:"Son — apprentice carpenter",age:17,desc:"Quick with numbers. Wants to build things. Wonders why the people who decide things never look like him."},
      {name:"Sele",role:"Daughter — learning her letters",age:9,desc:"Sharp and curious. The first in the family who might get an education, if the founders decide she deserves one."}]},
  { surname:"Ossian", landed:true, sonSoldier:true,
    Fhold:"the forge", Mwork:"kept the inn", MworkNow:"keeps the inn", Swork:"the iron foundry",
    dHigh:"is a physician, trained at the national college in the first decade it admitted women",
    dMid:"is a physician. She trained abroad because the college here would not take her, and came back anyway. She charges what people can pay",
    dLow:"is the best nurse in the district. Doctors half her age call her \"the girl\" and take her advice without admitting it",
    members:[
      {name:"Bren",role:"Father — blacksmith & councilman",age:50,desc:"His forge is the centre of the village. Opinions on everything, usually right. Distrusts men who've never worked with their hands."},
      {name:"Calla",role:"Mother — innkeeper",age:44,desc:"Hears every rumour before it's news. Extends credit to people who need it. Has never been repaid in full and keeps doing it."},
      {name:"Fen",role:"Son — returned soldier",age:22,desc:"Saw things in the war he doesn't talk about. Was promised land for his service. Is waiting to see if the promise holds."},
      {name:"Nira",role:"Daughter — wants to be a physician",age:15,desc:"Has read every book in the valley. Has been told twice that her kind of learning isn't proper for a girl. Is not deterred."}]},
  { surname:"Tarn", landed:false, sonSoldier:false,
    Fhold:"the leased field", Mwork:"taught children in her front room", MworkNow:"teaches in her front room", Swork:"the docks",
    dHigh:"is headmistress of the normal school in the capital, which trains every teacher in the nation",
    dMid:"teaches at the valley school — a real one, with a roof and a salary",
    dLow:"teaches twelve children in her front room, unpaid, as her mother did",
    members:[
      {name:"Edvin",role:"Father — tenant farmer",age:38,desc:"Works land he doesn't own. Pays the lease on time. Dreams of owning forty acres before he dies, and tries not to think about the alternative."},
      {name:"Rue",role:"Mother — seamstress & teacher",age:35,desc:"Teaches twelve children in her front room. Unpaid. Does it because someone has to."},
      {name:"Cael",role:"Son — dock worker",age:19,desc:"Works the river docks. Strong and restless. Has started attending meetings where men talk about rights."},
      {name:"Wren",role:"Daughter — helps her mother teach",age:11,desc:"Already ahead of her mother's students. Will be a teacher herself — or something more, if the nation allows it."}]}
];

// ═══════════════════════════════════════════════════════════
// METERS — hidden during the founding, revealed in interludes
// ═══════════════════════════════════════════════════════════
const METERS = [
  {k:"pros", n:"Prosperity",   w:["Hungry","Getting by","Comfortable","Prosperous"]},
  {k:"eq",   n:"Equality",     w:["Steeply divided","Unequal","Uneven but open","Broadly shared"]},
  {k:"inc",  n:"Belonging",    w:["Most are outside","Many are outside","Most are inside","Nearly all belong"]},
  {k:"leg",  n:"Legitimacy",   w:["Resented","Tolerated","Accepted","Trusted"]},
  {k:"inst", n:"Institutions", w:["Brittle","Personal","Functioning","Sturdy"]},
  {k:"coh",  n:"Cohesion",     w:["Fractured","Restless","Holding","United"]}
];
const word = (meter,v) => meter.w[v<35?0:v<50?1:v<65?2:3];

// ═══════════════════════════════════════════════════════════
// FOUNDING QUESTIONS
// choice: l label · c cost · fi family impact · x echo (what it sets in motion)
//         s summary phrase · e meter effects · g geo-tag effects · f flags
// ═══════════════════════════════════════════════════════════
const QUESTIONS = [
  { cat:"Power", icon:"power", title:"Who holds governing authority?",
    ctx:"The old rulers are gone. The question is not whether someone will hold power — it is who, and how they get it.",
    geo:{landlocked:"Surrounded by rivals, {nation} will need to decide quickly when the neighbours move. Slow consensus is a luxury of the protected.", island:"Four hundred miles of water stand between {nation} and anyone who would invade it. You can afford to be slow.", coastal:"Foreign ships will test whoever answers for {nation} in its ports."},
    witness:{r:"F", q:"I have worked twenty years in this valley. I have a right to say who governs it. But I know men who've worked longer and will never be asked."},
    choices:[
      {l:"An elected assembly — property owners vote", c:"Broad legitimacy, slow decisions. 'Property owners' already excludes someone. That exclusion calcifies.",
       fi:"[[{F} qualifies; the deed is in his name. {M} does not, though her accounts paid for half of it. She will never say this aloud.||{F} leases his land, so he cannot vote. Neither can anyone at his table.]]",
       x:"A vote that stops at the property line. The people outside it will one day walk to the capital to ask why.",
       s:"governed by an assembly elected by property owners", e:{leg:5,inc:-10,inst:5}, f:["propertyVote"]},
      {l:"A council of founders, selected by merit", c:"Wise and efficient — until founders age and their children inherit the seats. Merit becomes dynasty within two generations.",
       fi:"{F} is respected enough to be named to a district council. His children will inherit his standing, not earn it — and so will everyone else's.",
       x:"Founders die. When they do, someone will claim their seats by birth.",
       s:"governed by a council of founders", e:{inst:5,leg:-5,eq:-5}, f:["councilDynasty"]},
      {l:"A strong executive with an advisory body", c:"Clear leadership in crisis. The question is not whether this person is trustworthy. It is whether the office will be, after they are gone.",
       fi:"The {fam} family has no seat at this table. They will be governed, not governing.",
       x:"The office will outlive its first holder. The question of who holds it next will arrive on its own schedule.",
       s:"led by a strong executive", e:{coh:10,inst:-5}, g:{landlocked:{coh:5,leg:5}}, f:["executive"]},
      {l:"Federated regions — united only against outside threats", c:"Resilience and local control. Coordination fails exactly when you need it most: in the crisis that crosses regional lines.",
       fi:"The valley gets a say in its own affairs. What happens two provinces over is someone else's problem — until it isn't.",
       x:"Provinces with opposite interests will have to agree on trade. They will not agree easily.",
       s:"organised as a federation of regions", e:{coh:-10,leg:5}, g:{landlocked:{coh:-5}}, f:["federation"]}
    ]},
  { cat:"Economy", icon:"economy", title:"Who owns the land and its resources?",
    ctx:"Who owns the land determines who has leverage over everything else. This decision echoes for centuries.",
    geo:{arid:"On the plateau, owning land means little. Owning water means everything.", island:"There is only so much island. Whatever you decide, no one is making more of it.", plains:"The plains seem endless. They are not; the good river-bottom land is already spoken for."},
    witness:{r:"M", q:"I've kept this household fed through three bad harvests. Land means you eat when other people don't."},
    choices:[
      {l:"Private ownership — claim it, work it, own it", c:"Rapid development. Wealth concentrates within a generation. Those who arrive first — or with capital — own the future.",
       fi:"[[{F} owns {Fhold} free and clear. His tenant neighbour never will. Both work just as hard.||{F} works land he will never own unless he can buy it — and the price rises every year.]]",
       x:"Wealth concentrates. Every hard year will test who keeps their land.",
       s:"its land privately owned", e:{pros:15,eq:-15}, f:["privateLand"]},
      {l:"Common land; private ownership of what you produce", c:"Broad access to opportunity. Requires collective agreement about land use — which requires governance you may not yet have.",
       fi:"The family keeps what it grows. The land itself belongs to everyone, which means the meetings about it never end.",
       x:"Equal access, if the nation can govern it fairly. [[{F}||Even {F}, who leases,]] will have a field to work.",
       s:"its land held in common", e:{eq:10,pros:-5,inst:-5}, f:["commonLand","F_ownsLand"]},
      {l:"State owns key resources; private enterprise for the rest", c:"Strong government revenue. Whoever controls the state now controls the national wealth. Prizes attract predators.",
       fi:"The timber beyond {F}'s fence belongs to the nation. He can apply to harvest it. Applications take two years.",
       x:"The nation's wealth becomes a prize, and some men will want it badly.",
       s:"its key resources owned by the state", e:{pros:5,inst:-5}, f:["stateResources"]},
      {l:"No formal system — let it develop organically", c:"Flexibility now. Without rules, the strongest actors write the rules later. In their own favour. Every time.",
       fi:"Whoever has the most men and the most urgency will decide what the rules are. {F} hopes that man is reasonable.",
       x:"Someone will arrive to write the rules for you — with surveyors, and rifles.",
       s:"its land left without formal rules", e:{pros:5,eq:-10,inst:-15}, f:["noLandRules"]}
    ]},
  { cat:"Rights", icon:"rights", title:"What does your founding document promise every person?",
    ctx:"You are writing words that will outlast everyone in this room. They will be quoted, contested and used as weapons by both sides of every argument the nation ever has.",
    witness:{r:"S", q:"The men at the meeting say if we don't write it down, it doesn't exist. I think they're right."},
    choices:[
      {l:"Property, contract, and protection from seizure", c:"Commerce flourishes. Rights that protect what you own do not protect people who own nothing.",
       fi:"[[{F}'s property is protected.||{F}'s landlord's property is protected.]] {M}'s labour is not. {S}'s future is only as safe as what he will one day own.",
       x:"Holdings are safe. Voices are not addressed.",
       s:"a constitution protecting property and contract", e:{pros:5,eq:-5,inc:-5}, f:["propertyRights"]},
      {l:"Speech, assembly, religion, and due process", c:"A floor of dignity for every person. Enforcement needs institutions willing to uphold rights against the powerful.",
       fi:"{S} can say what he thinks at the meetings he's started attending. Whether anyone with power has to listen is another question.",
       x:"A promise of speech. Without independent courts, it will be tested — and it may not hold.",
       s:"a constitution guaranteeing civil liberties", e:{inc:5,leg:5}, f:["civilRights"]},
      {l:"Both — a full bill of rights", c:"The most ambitious founding document. Every right creates an obligation on someone to honour it.",
       fi:"The document says {D} has rights. She is {Dage}, and nobody has asked her what they should be. Someone will have to make them real for her.",
       x:"The most ambitious promise. Every gap between its words and the nation's practice will be cited, loudly.",
       s:"a full bill of rights", e:{inc:10,leg:10,inst:-5}, f:["billOfRights","civilRights"]},
      {l:"A minimal document — rights defined as needed", c:"Rights not written down do not exist when they are inconvenient. Silence is never neutral.",
       fi:"Nothing is promised to the family that power cannot take back. {F} trusts the founders are good men. They will not live forever.",
       x:"When a citizen inconveniences power, nothing written will stand in the way.",
       s:"a minimal constitution", e:{leg:-5,inst:-5}, f:["minimalRights"]}
    ]},
  { cat:"Citizenship", icon:"citizenship", title:"Who counts as a citizen of this nation?",
    ctx:"This is the question every founding gets wrong — not because the founders are evil, but because 'we the people' always has an unstated definition. Say it out loud. Now live with what you said.",
    witness:{r:"D", q:"Am I a citizen? Father says yes. But Amara is my age, and Father went quiet when I asked about her."},
    choices:[
      {l:"All free persons born within our borders", c:"Principled — but 'free' is doing enormous work. If unfree persons exist here, you just decided they do not count.",
       fi:"The family qualifies. Their neighbour who arrived in chains does not. The document says 'all', with a locked door behind it.",
       x:"Whoever is unfree will one day cite the word 'all' back at you.",
       s:"citizenship for free persons born here", e:{}, f:["freeBornCitizens"]},
      {l:"All persons regardless of origin, after five years' residence", c:"Inclusive and forward-looking. Immigration becomes the most contested question the nation ever faces.",
       fi:"Yusuf the metalworker three streets over has been here eight years. Under this rule, he finally counts.",
       x:"A path in. Every hard year will test whether people believe in it.",
       s:"citizenship open to anyone after five years", e:{inc:10,coh:-5}, f:["openCitizenship"]},
      {l:"Landowners and their families only", c:"You have formalised a hereditary class system. The people locked out will spend generations trying to get in — or tearing the door down.",
       fi:"[[{F} qualifies, and {M} as his wife. {S} will qualify when he inherits. The dock workers down the road never will.||The {fam} family owns no land. Under this rule, they are residents of the nation they fought for.]]",
       x:"A locked door. The people outside it will march.",
       s:"citizenship for landowners alone", e:{inc:-20,eq:-10,leg:-5}, f:["landedCitizens"]},
      {l:"All persons born here, regardless of status", c:"The most radical founding statement possible. It contradicts any economic arrangement built on coerced labour.",
       fi:"Every child born here is a citizen — including the children of people brought here against their will. The nation has promised something it does not yet know how to keep.",
       x:"A promise that will collide with any form of unfree labour you allow.",
       s:"birthright citizenship for all", e:{inc:20,coh:-5}, f:["birthrightAll"]}
    ]},
  { cat:"Justice", icon:"justice", title:"How does your nation resolve disputes and punish wrongdoing?",
    ctx:"Someone's ox breaks your fence. A merchant cheats a farmer. A soldier kills a civilian. How a society answers reveals what it actually believes about people.",
    witness:{r:"M", q:"I have seen what happens when a powerful man wrongs a quiet woman in a town where everyone knows the man. Justice depends on who is watching."},
    choices:[
      {l:"Independent courts — judges appointed for life", c:"Impartial in theory. Appointment is political; life tenure means early appointments shape justice for decades.",
       fi:"{F}'s dispute with his neighbour goes before a judge he will never meet, appointed by men he never voted for. He trusts the process. He has not yet had reason not to.",
       x:"Courts that can tell the powerful no — the one thing that makes written rights real.",
       s:"independent courts", e:{inst:10}, f:["courts"]},
      {l:"Community juries — peers judge peers", c:"Justice reflects community values, including community prejudices. Juries protect the powerful when the powerful are popular.",
       fi:"{F}'s case is heard by twelve men from the valley. Nine went to school with his neighbour. Three owe his neighbour money.",
       x:"Neighbours judging neighbours — fair to whoever the neighbours like.",
       s:"community juries", e:{coh:5,inc:-5}, f:["juries"]},
      {l:"Elected judges — accountable to the people", c:"Judges who need votes make popular decisions. The unpopular defendant rarely gets a fair hearing.",
       fi:"The judge running for re-election knows the {fam} family by name. He also knows which verdict is easier to campaign on.",
       x:"Verdicts become campaigns. The unpopular will have no one.",
       s:"elected judges", e:{leg:5,inst:-5}, f:["electedJudges"]},
      {l:"A written code — law is the standard, interpretation minimal", c:"Written codes cannot anticipate everything. What they do not address, they deny.",
       fi:"The code was written before {M}'s situation existed. It does not address it. She falls through a gap no one thought to close.",
       x:"Where the code is silent, the vulnerable fall through.",
       s:"a fixed legal code", e:{inst:5,inc:-5}, f:["code"]}
    ]},
  { cat:"Labor", icon:"labor", title:"Who does the work — and under what conditions?",
    ctx:"Every nation needs labour. Your earlier choices have already narrowed the answer. A nation with land to develop and too few hands faces a specific temptation here.",
    geo:{island:"Thovara's plantations would be enormously profitable with enough hands. There are not enough hands.", arid:"The mines on the plateau are brutal work. Few will choose it freely at any wage the owners want to pay."},
    witness:{r:"S", q:"I did the work. He sold it for three times what he paid me. I'm not complaining. I just want to know if it will always be this way."},
    choices:[
      {l:"Free labour — every person contracts their own work", c:"Liberty as a principle. When workers outnumber jobs, wages collapse. Freedom to contract isn't freedom when one side has nothing to bargain with.",
       fi:"{S} bargains for his wage alone. His employer has twelve others like him and can wait. {S} needs to eat next week.",
       x:"Workers bargain alone — until they decide to stop bargaining alone.",
       s:"free labour", e:{pros:10,eq:-10}, f:["freeLabor"]},
      {l:"Guilds — workers organise by craft", c:"Dignified labour and quality standards. Guilds also become gatekeepers, protecting the established.",
       fi:"{S} applies to the guild. The waitlist is four years. The men who set the waitlist are the men who joined four years ago.",
       x:"Dignity for those inside, a wall for those outside.",
       s:"guild labour", e:{eq:5,pros:-5,inc:-5}, f:["guilds"]},
      {l:"Indentured contracts — labour traded for land or passage", c:"Creates an underclass whose children inherit the debt. This system has a known destination.",
       fi:"{S} could sign seven years for guaranteed work and a land grant at the end. The grant depends on the nation keeping its word.",
       x:"A debt-bound class whose children inherit their parents' contracts. They will petition.",
       s:"indentured labour", e:{pros:10,eq:-15,inc:-10}, f:["indenture"]},
      {l:"Coerced labour — enslaved or conscripted workers", c:"You have built the nation on a contradiction. That contradiction will demand resolution — violently, if it must.",
       fi:"{S}'s wages hold steady. Someone else's freedom disappears to make it possible. The family does not discuss this at dinner.",
       x:"A contradiction the nation will be forced to resolve — first by petition, then otherwise.",
       s:"built on coerced labour", e:{pros:15,eq:-20,inc:-25,leg:-10}, g:{island:{pros:5},arid:{pros:5}}, f:["coerced"]}
    ]},
  { cat:"Religion", icon:"religion", title:"What is the state's relationship to faith?",
    ctx:"The church is often the most organised institution that already exists in a new nation. It has networks, resources and people who trust it. The question is whether you formalise that.",
    witness:{r:"M", q:"The church fed us in the famine year. I haven't forgotten. I also haven't forgotten they only fed their own."},
    choices:[
      {l:"An official state religion", c:"Everyone who believes differently is now outside the national identity. That is a category you just created.",
       fi:"The family attends the state church. Yusuf's family does not. This difference, which meant nothing last year, now means something.",
       x:"Those of other faiths are now outside the national story — and will be blamed in hard years.",
       s:"an established church", e:{coh:10,inc:-15}, f:["stateChurch"]},
      {l:"Complete separation — the state has no religious role", c:"Protects minority faiths. The state must find another source of shared meaning. That is harder than it sounds.",
       fi:"{M} still goes to church on Sunday, and it still means everything to her. It just no longer speaks for the nation. She isn't sure how she feels about that.",
       x:"Faith becomes private. Shared meaning will have to come from somewhere else.",
       s:"a secular state", e:{inc:10,coh:-10}, f:["secular"]},
      {l:"Tolerated diversity — faith informs, no official religion", c:"'Tolerated' has a ceiling. Toleration is not equality. The majority faith still sets the default.",
       fi:"The family practises freely; theirs is the default faith. They will not notice the ceiling until someone shorter tries to stand under it.",
       x:"Freedom with a ceiling most people never notice.",
       s:"tolerated diversity of faith", e:{coh:5}, f:["tolerated"]},
      {l:"Religious institutions run schools, hospitals and welfare", c:"The institution providing your food and healing also shapes your values — enormous power with no democratic accountability.",
       fi:"{D} goes to school at the church. She learns her letters and her catechism at the same time. The lessons are not always easy to separate.",
       x:"The church becomes the welfare state. No voter can remove it.",
       s:"social services run by the church", e:{coh:5,inst:-5,eq:5}, f:["churchServices"]}
    ]},
  { cat:"Trade", icon:"trade", title:"How does your nation engage with the outside world?",
    ctx:"Geography has already made some decisions for you. The question is on whose terms the exchange happens.",
    geo:{coastal:"Ships already crowd {nation}'s harbour. Open the ports and they will bring wealth, strangers and disease, all at once.", landlocked:"Everything {nation} sells crosses a neighbour's land. Your neighbours know this.", island:"Thovara grows food but makes almost nothing. Close the ports and you close the shops."},
    witness:{r:"F", q:"I sold to a merchant from abroad last autumn. Best price in years. I don't know yet what I think about that."},
    choices:[
      {l:"Free trade — open borders, minimal tariffs", c:"Your domestic industries will face competition they cannot survive. The communities built around them will not forgive you.",
       fi:"The cloth {M} buys at market is cheaper since the traders came. She has not yet noticed that the woman who wove it before has lost her work.",
       x:"Cheap goods, lost trades, and strangers in the market for hard times to blame.",
       s:"open to free trade", e:{pros:10,eq:-10,coh:-5}, g:{coastal:{pros:8},landlocked:{pros:-3}}, f:["freeTrade"]},
      {l:"Protected economy — high tariffs, domestic industry first", c:"Trading partners retaliate. The goods your people need from abroad become scarce and expensive.",
       fi:"{S}'s trade is protected. The iron for his tools costs twice what it did. He passes the cost on. So does everyone.",
       x:"Jobs protected at home, and expensive everything.",
       s:"protected behind tariffs", e:{pros:-5,eq:5}, g:{island:{pros:-10},landlocked:{pros:-5}}, f:["protectionism"]},
      {l:"Strategic trade — open for some goods, protected for others", c:"In practice, every industry considers itself strategic. The lobbying begins on day one.",
       fi:"The family trades freely. The industries that matter to men with more influence than {F} are protected. This seems fair to everyone who is protected.",
       x:"A list of protected industries, and a queue of men who want to be on it.",
       s:"trading selectively", e:{pros:5,inst:-5}, f:["strategicTrade"]},
      {l:"State-controlled trade — the government negotiates all exchange", c:"A bureaucracy now decides which merchants succeed. Corruption follows.",
       fi:"{M} applies for a trading licence. The office is in the capital; the queue is eight months. She wonders if she knows anyone who knows anyone.",
       x:"Every licence becomes a favour, and favours have prices.",
       s:"trading only through the state", e:{inst:-10,eq:-5}, f:["stateTrade"]}
    ]},
  { cat:"Education", icon:"education", title:"How are children educated in your nation?",
    ctx:"The children born today will govern this nation in thirty years. What you decide now determines what they know — and who gets to know it at all.",
    witness:{r:"D", q:"I want to read everything. My brother says that's a lot. I said I know."},
    choices:[
      {l:"Private — families and churches provide education", c:"Wealthy families produce educated children. Poor families produce children who work early. In one generation the gap becomes nearly impossible to cross.",
       fi:"{D} learns her letters from {M}. Three streets over, a girl her age has no mother who can read.",
       x:"The gap between families widens with every generation.",
       s:"educating its children privately", e:{eq:-10}, f:["privateEd"]},
      {l:"Public schools — funded by collective taxation", c:"The state now shapes what is taught. Enlightenment or indoctrination, depending entirely on who holds power.",
       fi:"{D} sits beside the magistrate's son and learns what he learns — including the version of history written by his grandfather.",
       x:"A shared floor for every child — and a budget someone will be tempted to raid.",
       s:"educating every child in public schools", e:{eq:10,inc:5,pros:5}, f:["publicEd"]},
      {l:"Apprenticeship — children learn a trade from a master", c:"Locks children into their parents' economic class, with very few exceptions.",
       fi:"{D} is apprenticed at twelve. She is good at the work. She will always wonder what else she might have been good at.",
       x:"Children inherit their parents' trades — and their parents' station.",
       s:"apprenticing its children", e:{eq:-5,pros:5}, f:["apprenticeEd"]},
      {l:"Hybrid — public basics, private advancement", c:"A floor of shared knowledge, a ceiling of private opportunity. The gap between them tends to grow.",
       fi:"{D} learns to read and cipher. She could go further, if the family can pay. {M} is already calculating.",
       x:"A floor for everyone, and a ceiling with a price.",
       s:"offering public basics and private advancement", e:{pros:5}, f:["hybridEd"]}
    ]},
  { cat:"Accountability", icon:"accountability", title:"How does your nation stop those in power from serving themselves?",
    ctx:"Everyone who helped build this nation believes they are acting for its good. So did everyone who ever looted one. The question is not intention. It is architecture.",
    witness:{r:"F", q:"I trust the men who built this. I just hope it's built well enough that it doesn't need my trust forever."},
    choices:[
      {l:"Transparency — all government decisions made in public", c:"Sunlight as disinfectant. Public deliberation is slow and vulnerable to populism; the loudest voices dominate.",
       fi:"{F} attends the public meeting. A hundred people come; twelve do all the talking. He goes home feeling he was present but not heard.",
       x:"Slow and loud — but hard to steal from in the dark.",
       s:"governing in public view", e:{leg:10,coh:-5}, f:["transparency"]},
      {l:"Separation of powers — no single body controls everything", c:"The most durable safeguard in history. Also produces gridlock and each branch creeping into the others' territory.",
       fi:"{M}'s complaint about a licence passes through council, court and executive. It takes three years. She wins, eventually.",
       x:"Gridlock — and the most durable safeguard anyone has found.",
       s:"with powers separated", e:{inst:15,pros:-5}, f:["separation"]},
      {l:"Rotation — no one holds power beyond a fixed term", c:"Prevents entrenchment. Expertise constantly cycles out; institutional memory lives in an unelected bureaucracy.",
       fi:"The official who helped {F} last year is gone. The new one doesn't know him. The process starts again from the beginning.",
       x:"No one entrenches. No one remembers, either.",
       s:"rotating its officeholders", e:{inst:-5,leg:5}, f:["rotation"]},
      {l:"Trust in the character of our founders", c:"The founders are genuinely remarkable people. They will not live forever. This is not a system. It is a prayer.",
       fi:"{F} knows two of the founders personally. Good men. He trusts them completely. He does not think about who comes after them. Not yet.",
       x:"It works once, for one generation.",
       s:"trusting its founders' character", e:{inst:-20}, f:["trustFounders"]}
    ]}
];

// ═══════════════════════════════════════════════════════════
// FAULT LINES — contradictions detected in the founding
// ═══════════════════════════════════════════════════════════
const FAULTS = [
  {w:h=>h.has("coerced")&&(h.has("birthrightAll")||h.has("civilRights")), t:"The founding document promises rights to persons. The labour statutes decide who counts as one."},
  {w:h=>h.has("coerced")&&!(h.has("birthrightAll")||h.has("civilRights")), t:"The nation's prosperity rests on people it does not count."},
  {w:h=>h.has("indenture"), t:"Contracts that pass a parent's debt to the child."},
  {w:h=>h.has("executive")&&h.has("trustFounders"), t:"One office, no limits, and a founder in it. The founder is mortal."},
  {w:h=>h.has("executive")&&!h.has("trustFounders"), t:"A strong office whose next occupant no one has met."},
  {w:h=>h.has("councilDynasty"), t:"Seats won by merit, to be inherited by sons."},
  {w:h=>h.has("landedCitizens"), t:"A citizenry defined by deeds. Most people hold none."},
  {w:h=>h.has("propertyVote")&&!h.has("landedCitizens"), t:"A vote that stops at the property line."},
  {w:h=>h.has("noLandRules"), t:"Land without law. Someone will bring law of their own."},
  {w:h=>h.has("stateChurch")&&(h.has("openCitizenship")||h.has("birthrightAll")), t:"Citizens of every origin; one official faith."},
  {w:h=>h.has("federation"), t:"Provinces united against enemies, divided on everything else."},
  {w:h=>h.has("civilRights")&&!h.has("courts"), t:"Rights on paper, and no independent court to hold them."},
  {w:h=>h.has("minimalRights"), t:"Nothing promised that power cannot take back."},
  {w:h=>h.has("trustFounders")&&!h.has("executive"), t:"Safeguards that consist of trust."},
  {w:h=>h.has("privateLand")&&h.has("privateEd"), t:"Land and learning both inherited. The ladder has very few rungs."},
  {w:h=>h.has("stateTrade")||h.has("stateResources"), t:"National wealth in the hands of whoever holds the state."}
];

// ═══════════════════════════════════════════════════════════
// CRISES — each has era, year, weight w(h) (≥100 = forced),
// a cause line (why this arrived), story, a voice (a family member's
// reaction as the crisis arrives, {r: role, q: line}), choices with effects.
// choice: l c e f · after (what happened) · fam (what it meant for the family)
// ═══════════════════════════════════════════════════════════
const CRISES = [
  // ── ERA II ──────────────────────────────
  { id:"plague", era:2, year:8, type:"Plague", icon:"plague", title:"The fever ships",
    w:h=>h.geo("coastal")?((h.has("propertyVote")||h.has("councilDynasty")||h.has("federation"))?5:3):0,
    cause:h=>"Arrived because {nation} is a port nation"+((h.has("propertyVote")||h.has("councilDynasty")||h.has("federation"))?", and its government decides slowly.":"."),
    story:h=>`<p>A ship came in on a Tuesday. By Thursday the harbour district smelled wrong. The apothecary knew what it was before the government did, and sent word: close the harbour, seal the district, do it now.</p><p>The message sat nine days on a clerk's desk while the merchants explained what a closed harbour would cost. The trading season is short. Most of the sick are poor, and none of them were in the room.</p><p>{M} was called to three births in the harbour district that month. Each time she came home she washed her hands twice and said nothing about where she'd been.</p>`,
    insp:"Inspired by the 1793 Philadelphia yellow fever epidemic and the cholera years in port cities.",
    voice:()=>({r:"M",q:"I've delivered three babies in the harbour this month. Close it. Close it today, whatever the merchants say."}),
    choices:[
      {l:"Close the harbour and seal the district", c:"The fever is contained. The trading season is lost.", e:{pros:-10,leg:5,inst:5},
       after:"Four hundred fall sick, and the fever stops at the district wall. The merchants never forgive the council; several councillors lose their seats.",
       fam:"{M} spends six weeks inside the cordon, delivering babies by lamplight. She comes out thinner and never talks about it."},
      {l:"Seal the district, keep the harbour open", c:"A compromise. The fever moves slower — but it moves.", e:{pros:-3,coh:-5,eq:-5},
       after:"The fever slips the cordon in the third week and reaches the market. The toll is twice what a full closing would have cost.",
       fam:"The stall beside {M}'s at the market closes for good. Its owner is buried the same week as his wife."},
      {l:"Issue guidance; mandate nothing", c:"Commerce continues. So does the fever.", e:{pros:3,leg:-10,eq:-10}, f:["endemicFever","motherFever"],
       after:"The harbour stays open. The fever settles into the port like a tenant, returning every few summers for thirty years.",
       fam:"{M} catches it in the second summer. She lives, but her lungs never fully recover."}
    ]},
  { id:"road", era:2, year:9, type:"Blockade", icon:"road", title:"The closed road",
    w:h=>h.geo("landlocked")?4:0,
    cause:h=>"Arrived because everything {nation} trades must cross a neighbour's land.",
    story:h=>`<p>In the ninth year the neighbour to the east closed the road. No declaration, no shots — just a line of soldiers at the river crossing and a letter explaining that {nation}'s grain would now pay a toll of one part in four.</p><p>Within a month the price of salt has doubled and the price of grain has halved.</p><p>{F} has a barn full of harvest he cannot sell. {S} has been talking to the recruiting sergeant who sets up a table outside the inn every market day.</p>`,
    insp:"Inspired by the trade blockades faced by landlocked states, from 19th-century Paraguay to modern customs wars.",
    voice:()=>({r:"F",q:"A barn full of grain and no road to sell it on. They can wait us out. Can we wait them out?"}),
    choices:[
      {l:"Pay the toll and negotiate a treaty", c:"Trade resumes. The neighbour learns what {nation} will tolerate.", e:{pros:-8,leg:-5,coh:-5},
       after:"A treaty brings the toll down to one part in six. The minister who signed it is hanged in effigy in two market towns.",
       fam:"{F} sells his harvest at last, at a loss. He says it is better than rotting. He doesn't sound convinced."},
      {l:"Raise an army and open the road by force", c:"National pride, a conscription list, and the price of war.", e:{coh:10,pros:-5,inst:-5}, f:["borderWar","S_soldier"],
       after:"A short war, then a longer one. The road opens in the second year. Eleven hundred men do not come home.",
       fam:"{S} is taken in the first levy. He comes back eighteen months later, quieter, with a limp he won't explain."},
      {l:"Seek a distant ally — protection in exchange for favours", c:"The road reopens. A foreign power gains a voice in the capital.", e:{pros:5,leg:-10,inst:-5}, f:["foreignPatron"],
       after:"A great power two borders away guarantees the road. Its merchants receive favourable terms. Its advisers receive offices.",
       fam:"The new customs officer in the valley speaks with an accent. {F} pays him exactly what he asks."}
    ]},
  { id:"landgrab", era:2, year:10, type:"Land", icon:"stakes", title:"The surveyors",
    w:h=>h.has("noLandRules")?100:h.has("stateResources")?3:0,
    cause:h=>h.has("noLandRules")?"Arrived because the founding left land without rules.":"Arrived because the state's land became a prize.",
    story:h=>`<p>The surveyors arrived with chains, stakes, and twenty men with rifles. They work for the Northern Land Company, which holds a paper from someone in the capital. The paper is either a grant or a forgery, and no office in {nation} can say which.</p><p>They staked out the valley in nine days, including fields families have worked since before independence. Asked by what right, the foreman pointed at the rifles.</p><p>{F} walked out to the stake they drove at the edge of [[{Fhold}||the field he leases]] and stood there a long time. That evening {S} cleaned his grandfather's musket, and {M} watched him do it.</p>`,
    insp:"Inspired by the Yazoo land fraud, the enclosure of common land, and frontier land companies.",
    voice:()=>({r:"S",q:"Grandfather's musket still fires. I'm only saying it still fires."}),
    choices:[
      {l:"Create a land registry — first recorded claim wins", c:"Order, quickly. The company has lawyers.", e:{inst:10,eq:-10}, f:["landRegistry"],
       after:"The registry opens in spring. The company's clerks are waiting at the door on opening day.",
       fam:"[[{F} files in the second week and keeps his land — barely, on the strength of a tax receipt from before the war.||{F}'s landlord files first. {F} remains a tenant; now the paper says so.]]"},
      {l:"Title the land to those who work it", c:"Justice for the tillers. The company's investors will remember.", e:{eq:12,pros:-5,inst:5,leg:5}, f:["landToTillers","F_ownsLand"],
       after:"Every family that has worked a field for five years receives title. The company sues, and loses.",
       fam:"[[{F}'s title arrives in a brown envelope. He has it framed.||{F} holds title to the field he has worked for nineteen years. He reads the deed aloud at supper. Twice.]]"},
      {l:"Let the claimants settle it themselves", c:"The state stays out. Others won't.", e:{inst:-15,eq:-10,coh:-10}, f:["valleyViolence","S_radical"],
       after:"They settle it. Three men die in the valley that summer, and the company's stakes are still standing in autumn.",
       fam:"{S} is arrested after a fight at the stakes and released without charge — which is its own kind of message."}
    ]},
  { id:"school", era:2, year:11, type:"Corruption", icon:"corruption", title:"The woman who ran the school",
    w:h=>(h.has("publicEd")||h.has("hybridEd")||h.has("churchServices"))?((h.has("trustFounders")||h.has("rotation")||h.has("stateTrade")||h.has("stateResources"))?6:2):0,
    cause:h=>"Arrived because the schools have public money, and "+(h.has("separation")?"even separated powers have seams.":"little stands between that money and the men who want it."),
    story:h=>`<p>A woman named Delia ran the valley school for nine years. She taught a hundred and forty children to read, including {D}.</p><p>The new district administrator arrived last spring — the brother-in-law of a councillor. He redirected the school's funding to a road that runs through land he owns. Delia appealed. The councillor whose brother-in-law is the administrator chairs the appeals committee. The school closed in autumn.</p><p>{D} came home and told {M}. {M} was quiet a long time. Then she said, "We'll find another way." Her voice was tired when she said it.</p>`,
    insp:"Inspired by machine politics in 19th-century American cities and the defunding of Reconstruction-era schools.",
    voice:()=>({r:"D",q:"Delia taught me to read. Who teaches the ones after me?"}),
    choices:[
      {l:"Establish an independent oversight body", c:"Future Delias have somewhere to appeal. This school stays closed for now.", e:{inst:15,leg:5}, f:["oversight"],
       after:"An inspectorate is created with power to audit any office. The administrator is removed two years later. The school reopens after three.",
       fam:"Until it reopens, {D} teaches the youngest children at the kitchen table. She remembers the name of the inspectorate for the rest of her life."},
      {l:"Remove the administrator under existing rules", c:"Fast and specific. The system that appointed him is untouched.", e:{inst:5},
       after:"The school reopens six months later. Some of its children have already gone to work and do not come back.",
       fam:"{D} walks the neighbours' children back to their desks. One of the desks stays empty."},
      {l:"No action — a district matter", c:"The council stays out of district affairs.", e:{inst:-15,eq:-8,leg:-5}, f:["schoolsLost"],
       after:"Within five years three more valley schools close the same way. The roads are excellent.",
       fam:"{D} starts teaching the valley's children in the kitchen, for nothing. There are more of them every month."}
    ]},
  { id:"badyear", era:2, year:14, type:"Hardship", icon:"drought", title:"The bad year",
    w:h=>2+((h.has("privateLand")||h.has("noLandRules"))?3:0)+((h.geo("arid")||h.geo("plains")||h.geo("island"))?2:0),
    cause:h=>"Arrived because hard years always come"+((h.has("privateLand")||h.has("noLandRules"))?", and {nation}'s land rules decide who survives them.":"."),
    story:h=>{
      const open = h.geo("island")?"The storm came in from the southeast and stayed three days. It took the roofs, then the boats, then salted the low fields."
        : h.geo("arid")?"The great river dropped to a trickle in June and stopped altogether in August."
        : "No rain fell from April to September. The wells went first, then the river, then everyone's patience.";
      return `<p>${open} The harvest will be a quarter of what the {fam} family needs. [[The ox was sold in July to pay the tax on {Fhold}.||The ox was sold in July to pay the lease.]]</p><p>{M} walked three miles to the district office to ask for relief. The clerk said the emergency fund had been spent on roads. He was sorry. He wrote the family's name in a book.</p><p>The district's largest landowner has a deep well that still runs. He sells water at a price no one in the valley can pay. {S} has heard about men in other districts who stopped asking politely.</p>`;},
    insp:"Inspired by the Dust Bowl, the Irish Famine land clearances, and the American farm foreclosures of the 1930s.",
    voice:()=>({r:"M",q:"The clerk wrote our name in a book. I'd like to know what the book is for."}),
    choices:[
      {l:"Open the treasury — emergency relief", c:"The small farms survive. Every future hard year arrives as a political demand.", e:{eq:8,pros:-8,leg:10}, f:["reliefPrecedent"],
       after:"Relief arrives in October. Most small farms survive the winter. From now on, every bad year arrives at the capital as a demand.",
       fam:"The {fam} family keeps [[{Fhold}||its lease]]. {F} pays back every coin, though no one asked him to."},
      {l:"Broker a deal with the large landowners", c:"Slower, partial, and paid for in concessions.", e:{eq:-5,pros:-2,leg:-3},
       after:"The landowners share water in exchange for tax concessions that outlast the drought by thirty years.",
       fam:"[[{F} keeps {Fhold}, but sells the east field to the man with the well.||{F}'s lease is renewed at a higher rent. The landlord calls it fair, given the risk.]]"},
      {l:"Let the market adjust", c:"Prices find their level. So do families.", e:{eq:-15,pros:5,leg:-10,coh:-5}, f:["F_lostLand","consolidation"],
       after:"Small farms sell to large ones at distressed prices. Within three years the valley has half as many owners.",
       fam:"The {fam} family [[sells {Fhold}||gives up the lease]] and moves to the city. {F} finds work in a warehouse. He is good at it. He hates it."}
    ]},
  { id:"nativism", era:2, year:17, type:"Nativism", icon:"nativism", title:"The outsider's shop",
    w:h=>1+(h.has("openCitizenship")?3:0)+(h.has("stateChurch")?2:0)+(h.has("freeTrade")?2:0)+(h.has("freeBornCitizens")?1:0),
    cause:h=>"Arrived because hard times look for someone to blame"+(h.has("stateChurch")?", and the established church has made Yusuf's faith foreign.":"."),
    story:h=>{
      const status = h.has("birthrightAll")?"His daughters are citizens by birth. He is not, and the law has no path for him."
        : h.has("openCitizenship")?"His citizenship application is complete. It has been 'under review' for six years."
        : "There is no path in the law for a man like him to become a citizen.";
      return `<p>A man named Yusuf came here twenty-four years ago with a letter of introduction and a talent for metalwork. He built a shop, employs four people, pays his taxes, and is raising two daughters born in this nation. ${status}</p><p>A poor harvest made the valley angry. Someone in the market started saying there isn't enough because people like Yusuf are taking it. It isn't true. But it is simple. Last Tuesday, his shop window was broken.</p><p>{D} buys her ink at Yusuf's shop, and his youngest, Amara, follows her around the market. She asked {F} why Amara's family wasn't safe here. He said of course they're safe. {D} looked at him as if she were waiting for the rest of the answer.</p>`;},
    insp:"Inspired by the Chinese Exclusion Act, anti-Jewish laws in 19th-century Europe, and scapegoating in hard economic times.",
    voice:()=>({r:"D",q:"Amara asked me if her family will have to leave. I said no. Was I lying?"}),
    choices:[
      {l:"Make the path to citizenship clear and fair", c:"Yusuf gains legal standing. The anger looks for another target.", e:{inc:10,coh:-5,leg:5}, f:["yusufCitizen"],
       after:"Yusuf takes the oath in the spring. The anger finds another target, as anger does — but he has standing now, and so will his daughters.",
       fam:"{D} goes with Amara to watch her father take the oath. She claps louder than anyone."},
      {l:"Enforce the law — prosecute the men who broke the window", c:"Order is upheld. The question of belonging is left open.", e:{inst:5},
       after:"Two men are fined. The resentment is not addressed, and whether Yusuf belongs here remains officially unanswered.",
       fam:"Yusuf replaces the window. He keeps a cudgel behind the counter now. Amara stops coming to play after dark."},
      {l:"Restrict immigration — answer the public mood", c:"The mood is satisfied. The message is received.", e:{inc:-15,coh:5,pros:-5}, f:["yusufLeft"],
       after:"The message is clear. Yusuf sells the shop. The nation loses a metalworker, four jobs, and two daughters who might have been anything.",
       fam:"Amara leaves on the autumn coach. {D} writes to her for eleven years. Then the letters stop."}
    ]},
  { id:"petition", era:2, year:19, type:"Petition", icon:"revolt", title:"The petition",
    w:h=>h.has("coerced")?100:h.has("indenture")?5:0,
    cause:h=>h.has("coerced")?"Arrived because the nation counts some people as property"+(h.has("civilRights")||h.has("birthrightAll")?" while its founding document says otherwise.":"."):"Arrived because indenture contracts pass from parents to children.",
    story:h=> h.has("coerced")
      ? `<p>A man named Cassius was born in this nation, on land his father cleared and was not permitted to own. He taught himself to read from a stolen primer. He has organised forty-seven others and written a petition to the government, citing the founding document's own words.</p><p>The government must now decide whether Cassius and the forty-seven are persons under the law.</p><p>{S} was at the meeting where the petition was drafted. He came home and couldn't sleep. {F} told him to stay out of it. {M} said nothing, which is not the same as agreeing.</p>`
      : `<p>A man named Cassius was born under his father's indenture. The contract was for seven years; fines for illness, broken tools and "insolence" extended it to thirty-one, and on his father's death the balance passed to him. He taught himself to read and has organised forty-seven others in the same position.</p><p>Their petition asks one thing: that no child inherit a parent's contract.</p><p>{S} was at the meeting where the petition was drafted. He came home and couldn't sleep. {F} told him to stay out of it. {M} said nothing, which is not the same as agreeing.</p>`,
    insp:"Inspired by the free Black petitions to early American legislatures, Frederick Douglass, and Dred Scott.",
    voice:()=>({r:"S",q:"Forty-seven of them signed it. They used the founding document's own words. I watched them do it."}),
    choices:[
      {l:"Honour the founding document — grant them standing", c:"Cassius becomes a citizen. Every arrangement that depended on his exclusion must be renegotiated.", e:{inc:20,pros:-10,coh:-10,leg:10}, f:["abolished"],
       after:"The vote passes by four. The economic order built on Cassius's exclusion begins to come apart, and its owners do not go quietly.",
       fam:"{S} was in the gallery when the vote was read. He came home and slept fourteen hours."},
      {l:"Suppress the petition — maintain order", c:"Order holds. The petitioners' children will organise differently.", e:{inc:-10,leg:-15,coh:-5}, f:["suppressed","S_radical"],
       after:"The petition is burned in the square. Cassius disappears from the record. His children will not write petitions.",
       fam:"{S} watched the petition burn. Something in him did not come home from the square."},
      {l:"Form a committee — promise future consideration", c:"Nothing is refused. Nothing is granted.", e:{leg:-5}, f:["deferred"],
       after:"The committee meets for six years and recommends further study. Cassius dies at fifty-one, never having been a legal person in the nation of his birth.",
       fam:"{S} stops going to meetings. {M} isn't sure whether that is better or worse."}
    ]},
  { id:"tariff", era:2, year:24, type:"Regions", icon:"tariff", title:"The tariff war",
    w:h=>h.has("federation")?6:0,
    cause:h=>"Arrived because the federation's provinces want opposite things from trade.",
    story:h=>`<p>The coastal provinces want open ports and cheap imports. The interior provinces want tariffs to protect their mills. Under the federation each may set its own duties — so the interior now taxes coastal goods, and the coast has answered in kind.</p><p>There are customs houses on roads that had no gates a year ago. A cart of grain crossing two provincial lines pays twice before it reaches the sea.</p><p>{F} took a load to the provincial market and came home with less than he left with. The governor of the next province has begun speaking of "our people" and "theirs."</p>`,
    insp:"Inspired by the trade wars between states under the American Articles of Confederation, and the Nullification Crisis.",
    voice:()=>({r:"F",q:"Two customs houses in thirty miles. When I was young we called that a foreign country."}),
    choices:[
      {l:"Negotiate a national compromise", c:"Everyone gives up something. Everyone resents it.", e:{coh:5,pros:-3,leg:3},
       after:"A single schedule of duties is agreed after nine months. No province is satisfied, which is how everyone knows it is fair.",
       fam:"The gates come down on the valley road. {F} takes a load to market and comes home with what he expected, which feels like a victory."},
      {l:"Let each region set its own terms", c:"Local control, as promised. The union becomes looser.", e:{coh:-15,pros:3}, f:["regionalSplit"],
       after:"The provinces drift. Within ten years they print different money and teach different histories.",
       fam:"{F} now pays a toll to carry goods to the next province: thirty miles, two customs houses."},
      {l:"Override the provinces from the centre", c:"Unity, imposed. The federation's promise is broken.", e:{coh:-5,leg:-10,inst:5}, f:["centralized"],
       after:"The central government seizes control of trade. The provinces comply, and keep a list.",
       fam:"{S} hears men at the docks talking about the provinces' rights the way his father once talked about independence."}
    ]},

  // ── ERA III ─────────────────────────────
  { id:"flood", era:3, year:27, type:"Clearance", icon:"flood", title:"The flood and the fence",
    w:h=>(h.has("privateLand")&&(h.has("freeLabor")||h.has("indenture")||h.has("coerced")))?5:(h.has("privateLand")||h.has("consolidation"))?2:0,
    cause:h=>"Arrived because private land and cheap labour make tenants easy to replace.",
    story:h=>`<p>The river flooded in March and took forty houses with it. The families who lived there had farmed the same land as tenants for two generations. The land belongs to a man in the capital who has never seen it.</p><p>After the flood, the landowner decided not to rebuild the tenant houses. The land is worth more without them. He will bring in seasonal workers instead.</p><p>[[{F} knows three of the forty families. He helped one of them rebuild after the last flood. He has been asked to speak at the town meeting, and is trying to decide whether saying anything will matter.||The {fam} family's house is one of the forty. {F} has been asked to speak for the tenants at the town meeting. He has never spoken in public in his life.]]</p>`,
    insp:"Inspired by the Highland Clearances, The Grapes of Wrath, and the land consolidation after the 1927 Mississippi flood.",
    voice:()=>({r:"F",q:"[[I helped one of those families rebuild after the last flood. This time there's nothing left to rebuild.||Forty houses. Ours was one of them.]]"}),
    choices:[
      {l:"Compulsory purchase — the state buys the land and resettles the families", c:"The families stay. Property rights are no longer absolute in a crisis.", e:{eq:10,pros:-5,inst:5}, f:["eminentDomain","F_ownsLand"],
       after:"The families stay. A precedent is set that property can be taken for the public good — and it will be used again, not always this kindly.",
       fam:"[[{F} helps raise the first new roof.||The {fam} family rebuilds on land the state sells them at cost. {F} and {S} raise the roof themselves.]]"},
      {l:"Public works — build city housing and offer relocation", c:"The families are housed. The valley changes for good.", e:{coh:-5,pros:5},
       after:"Most families go. They become urban poor instead of rural poor. The valley empties and grows quiet.",
       fam:"[[Two of the three families {F} knew move to the city. He never sees them again.||The {fam} family moves into a city tenement with running water and no fields. {F} counts this as half a loss.]]"},
      {l:"Mediate between landowner and tenants", c:"A settlement both sides sign because one side has no choice.", e:{eq:-10,leg:-5},
       after:"The landowner offers six months' notice and a small payment. The families accept because they have no alternative, and scatter.",
       fam:"[[{F} speaks at the meeting anyway. Afterwards, no one says anything to him at all.||The {fam} family takes the payment. {F} finds day labour in the next district.]]", ff:{landless:["F_lostLand"]}}
    ]},
  { id:"veterans", era:3, year:28, type:"Broken promise", icon:"wardebt", title:"The soldier's debt",
    w:h=>h.has("borderWar")?100:(h.fam.sonSoldier?4:0)+(h.has("executive")?3:0),
    cause:h=>h.has("borderWar")?"Arrived because {nation} sent men to open the road and promised them land.":"Arrived because the founding promised land to the men who won independence.",
    story:h=>{
      const vet = h.has("S_soldier")||h.fam.sonSoldier;
      return `<p>${h.has("borderWar")?"The men who fought to open the road":"The men who fought for independence"} were promised land — forty acres each on the western frontier.</p><p>${vet?"{S}":"{S}'s friend Tomas"} arrived at the land office with his discharge papers. The clerk said the land had been allocated to a development company. A clerical error. There is a process for appeals; it takes two years.</p><p>${vet?"{S} slept in a barn that winter":"Tomas slept in {F}'s barn that winter"}, and there were hundreds like him. {F} wrote to the government. The letter was acknowledged. Nothing else happened. Some of the men are no longer waiting quietly.</p>`;},
    insp:"Inspired by the Bonus Army of 1932, unpaid Revolutionary War veterans, and Shays' Rebellion.",
    voice:h=>(h.has("S_soldier")||h.fam.sonSoldier)?{r:"S",q:"I have the papers. I have the medal. I don't have the land."}:{r:"F",q:"Tomas sleeps in our barn. He fought so we could have a country. The country owes him forty acres."},
    choices:[
      {l:"Honour the grants — find and restore the promised land", c:"Expensive and slow. The nation keeps its word.", e:{pros:-10,leg:10,eq:5}, f:["veteransHonored"],
       after:"It takes three years and a special tax, but every grant is honoured. The development company is compensated with less than it wanted.",
       fam:"{S} walks his forty acres in the spring. He doesn't farm them — he sells them to a neighbour who will — but he walks them first."},
      {l:"Offer money instead", c:"A payment, less than the land was worth.", e:{pros:-5},
       after:"A payment is made. Most men take it because they have no alternative. They do not forget.",
       fam:"The payment buys {S} a winter coat and a debt paid off. He keeps the land office's letter in the same drawer as his medal."},
      {l:"Acknowledge the error and begin the appeals process", c:"Procedure is respected. Time passes.", e:{leg:-15,inst:-5,coh:-5}, f:["veteransBetrayed"],
       after:"The process takes four years. By then, seventeen of the men have done something that needs its own entry in the history books.",
       fam:"{S} stops talking about the land. He starts talking about the men who took it."}
    ]},
  { id:"strike", era:3, year:29, type:"Labour", icon:"strike", title:"The strike",
    w:h=>1+(h.has("freeLabor")?4:0)+(h.has("guilds")?2:0)+(h.has("indenture")?2:0),
    cause:h=>h.has("freeLabor")?"Arrived because workers who bargain alone eventually stop bargaining alone.":"Arrived because work is plentiful and wages are not.",
    story:h=>`<p>The owners of {Swork} cut wages by a third in the slack season and did not restore them in the busy one. Six hundred men walked out on a Monday.</p><p>${h.has("coerced")&&!h.has("abolished")?"By Wednesday the owners had rented bonded labourers to take their places. The strikers watched men who could not refuse do the work they had refused.":"By Wednesday the owners had brought in replacements from three provinces away, with hired guards to walk them through the gates."}</p><p>{S} is on the strike committee. {M} has started keeping the door barred at night. {F} says the owners have a right to run their business; then he asks {S} if he's eaten.</p>`,
    insp:"Inspired by the Pullman Strike, the Homestead Strike, and the Tolpuddle Martyrs.",
    voice:()=>({r:"S",q:"Six hundred of us walked out. If we go back now, we go back for less. For good."}),
    choices:[
      {l:"Recognise the right to organise", c:"The strike ends with a contract. The owners call it theft.", e:{eq:12,pros:-5,leg:5}, f:["unions"],
       after:"The owners sign a contract in the fourth week. Wages return. Within ten years every trade in the nation has a union.",
       fam:"{S} signs the contract for the committee. His hand shakes. He keeps the pen."},
      {l:"Break the strike — protect the owners' property", c:"The gates reopen. So does the old wage.", e:{eq:-10,leg:-10,coh:-10}, f:["strikeBroken","S_blacklisted"],
       after:"Soldiers clear the gates. Two strikers die. The work resumes at the lower wage, and the committee's names go on a list.",
       fam:"{S}'s name is on the list. He never works at {Swork} again."},
      {l:"Create an arbitration board", c:"A neutral table. It works when both sides believe it is neutral.", e:{inst:10,eq:5,leg:3}, f:["arbitration"],
       after:"The board splits the difference. Neither side is happy. Both come back to the board next time, which is the point.",
       fam:"{S} testifies before the board for two hours. Afterwards he says it was the first time anyone with power wrote down what he said."}
    ]},
  { id:"succession", era:3, year:31, type:"Succession", icon:"seat", title:"The empty chair",
    w:h=>(h.has("executive")&&h.has("trustFounders"))?100:h.has("executive")?5:h.has("councilDynasty")?4:0,
    cause:h=>h.has("executive")?"Arrived because the executive's office was built around one man.":"Arrived because the founders' seats were never designed to be vacated.",
    story:h=> h.has("executive")
      ? `<p>The first executive died in the spring, in office, at seventy-four. He had governed for thirty years and named no successor, because no one ever asked him to.</p><p>Three men now claim the office: his son, who has his name; the general who commanded the capital garrison, who has the soldiers; and the chief of the advisory council, who has the constitution, insofar as it says anything.</p><p>{F} has the newspaper spread across the table and is reading it for the third time. {S} says it doesn't matter who wins. {M} says it always matters who wins.</p>`
      : `<p>The last of the founding councillors died in the spring. His son has announced he will take the seat, as the sons of the other founders already have.</p><p>No one elected the son. No one elected the father either — but the father had earned it, and everyone knew how. The son has earned a very good education.</p><p>{F} reads the announcement twice. {S} says the council is a family business now. {M} says it was always going to be.</p>`,
    insp:"Inspired by the deaths of founding strongmen and the crises of succession that followed, from Cromwell to post-colonial presidencies.",
    voice:()=>({r:"M",q:"It always matters who wins. Most of all when nobody wrote down how they're supposed to."}),
    choices:[
      {l:"Hold an open election for the seat", c:"The constitution is honoured. The losers must accept it.", e:{leg:10,inst:10,coh:-10}, f:["peacefulTransfer"],
       after:"An election is held. It is bitter, close, and peaceful. The loser concedes in a letter printed on the front page.",
       fam:"{F} reads the results aloud at supper. Then he reads the loser's letter aloud too, slowly, as if it were scripture."},
      {l:"Accept the heir", c:"Continuity and calm. The office becomes an inheritance.", e:{coh:5,inst:-15,leg:-5}, f:["dynasty"],
       after:"The heir takes the chair. He is not his father. The office, now a family possession, grows around him like a shell.",
       fam:"{S} says, quietly, that he didn't fight for independence from one family to be ruled by another. {F} tells him to lower his voice."},
      {l:"Let the army keep order until things settle", c:"Order is guaranteed. Things do not settle.", e:{leg:-20,inst:-20}, f:["junta"],
       after:"The general keeps order. He is still keeping it twelve years later.",
       fam:"Soldiers are posted at the bridge. {M} walks the long way round to market rather than pass them."}
    ]},
  { id:"march", era:3, year:33, type:"The vote", icon:"march", title:"The long walk",
    w:h=>h.has("landedCitizens")?100:h.has("propertyVote")?6:0,
    cause:h=>h.has("landedCitizens")?"Arrived because the founding made land the price of citizenship.":"Arrived because the vote stops at the property line.",
    story:h=>`<p>Three thousand people who cannot vote are walking to the capital. Tenant farmers, dock workers, seamstresses, widows whose land was in a husband's name. It is a nine-day walk. They sleep in fields and church halls along the way, and every town adds a few hundred more.</p><p>Their banner has a line from the founding document on it, with one word underlined.</p><p>${h.fam.landed?"{M} has never voted; the deed is in {F}'s name. She has packed a bag.":"No one in the {fam} family has ever voted. {M} has packed a bag; {S} is carrying the banner."} {F} has not said whether he is coming. He is standing by the door.</p>`,
    insp:"Inspired by the Chartists, the Selma to Montgomery marches, and the women's suffrage processions.",
    voice:()=>({r:"M",q:"Nine days' walk. My feet will manage. It's the forty years of never being asked that hurt."}),
    choices:[
      {l:"Extend the vote to every adult citizen", c:"The nation's electorate triples overnight. So do its demands.", e:{inc:20,leg:10,coh:-5}, f:["universalVote"],
       after:"The vote passes after an all-night session. The marchers hear the news on the capitol steps. Some of them sit down on the stone and cry.",
       fam:"{M} votes for the first time at {Mage}. She wears her good dress."},
      {l:"Extend the vote to men who pay taxes", c:"A wider door — still a door.", e:{inc:8,leg:2}, f:["partialVote"],
       after:"Tax-paying men gain the vote. The marchers split: half go home satisfied, half keep walking.",
       fam:"{S} can vote now. {M} still cannot. They do not discuss it."},
      {l:"Disperse the march — the law is the law", c:"The capital is quiet. The countryside is not.", e:{leg:-15,coh:-10,inst:-5}, f:["marchDispersed","S_radical"],
       after:"Cavalry meet the march at the river bridge. The marchers scatter. The banner is kept, and copied, and carried again.",
       fam:"{M} was at the bridge when the cavalry came. She walked home, forty miles, and did not speak for two days."}
    ]},
  { id:"rising", era:3, year:35, type:"Uprising", icon:"revolt", title:"The rising",
    w:h=>(h.has("suppressed")||h.has("deferred"))?100:(h.has("coerced")&&!h.has("abolished"))?100:0,
    cause:h=>h.has("suppressed")?"Arrived because the petition was burned.":h.has("deferred")?"Arrived because the committee is still studying the question.":"Arrived because the contradiction was never addressed.",
    story:h=>`<p>Cassius has been dead for years. His son Marcus does not write petitions.</p><p>On a night in late summer, workers on eleven estates put down their tools at once and walked off together. By morning there were four thousand of them on the hill road, some armed. Their single demand is printed on a sheet nailed to every church door in the district: <em>The document says all persons. Prove it.</em></p><p>{S} is ${h.has("S_radical")?"already with them":"in town when the news arrives"}. {F} says the government must restore order. {D} asks what order means, exactly, and nobody at the table answers her.</p>`,
    insp:"Inspired by the Haitian Revolution, Nat Turner's rebellion, the Morant Bay rebellion, and the American Civil War.",
    voice:()=>({r:"D",q:"The document says all persons. I'd like someone to tell me which word they don't understand."}),
    choices:[
      {l:"Abolish coerced and bonded labour, now", c:"The founding promise is kept, late and under fire. The estates will not accept it quietly.", e:{inc:20,coh:-10,leg:5,pros:-10}, f:["abolished"],
       after:"Abolition passes in eleven days. Three estate owners take up arms and are defeated within the year. The rest sue, and lose, and live.",
       fam:"{D} reads the act of abolition aloud to {F}, who has gone grey. He listens to all of it. When she finishes he nods once and says, 'Good.'"},
      {l:"Crush the rising", c:"Order, at a price that will be paid for generations.", e:{leg:-20,coh:-20,inst:-10}, f:["civilWar"],
       after:"The army is sent. The rising becomes a war, the war becomes a decade, and the nation is never again one thing.",
       fam:"{S} does not come home for four years. When he does, he does not say which side he was on, and no one asks."},
      {l:"Gradual emancipation over twenty years", c:"A promise with a date on it. Those still bound must wait.", e:{inc:8,leg:-5,coh:-5}, f:["gradual"],
       after:"An act is passed: no child born after this year will be bound, and all bonds will end in twenty years. Marcus calls it a schedule for patience. Many of the four thousand go home. Some don't.",
       fam:"{M} says twenty years is a long time to ask anyone to wait. {F} says it's better than never. They are both right."}
    ]},
  { id:"printer", era:3, year:38, type:"Speech", icon:"press", title:"The printer's case",
    w:h=>1+((h.has("civilRights")&&!h.has("courts"))?4:0)+(h.has("minimalRights")?4:0)+(h.has("junta")||h.has("dynasty")?3:0),
    cause:h=>h.has("minimalRights")?"Arrived because the founding document promises no protection for speech.":(h.has("civilRights")&&!h.has("courts"))?"Arrived because speech is promised and nothing enforces the promise.":"Arrived because power is always tempted to silence its critics.",
    story:h=>`<p>A printer named Osric published a pamphlet accusing a senior official of selling offices. The accusation is detailed, specific, and — most people suspect — true. Osric was arrested at his press the next morning and his type was confiscated.</p><p>${h.has("minimalRights")?"Nothing in the founding document says he can't be.":h.has("civilRights")?"The founding document promises freedom of speech. Whether anything enforces that promise is about to be tested.":"The founding document says nothing about speech either way."}</p><p>{D} has a copy of the pamphlet. She read it aloud to {M}, who listened with her eyes closed and said, "Well, now we'll find out what kind of country this is."</p>`,
    insp:"Inspired by the Zenger trial, the Sedition Act of 1798, and the Peterloo-era prosecutions of radical printers.",
    voice:()=>({r:"D",q:"Osric printed what everyone already knew. Now we find out whether knowing it is a crime."}),
    choices:[
      {l:"Let the courts hear it — truth is a defence", c:"A precedent for a free press. The official will be exposed.", e:{inst:15,leg:10}, f:["pressFree"],
       after:"A jury acquits Osric in forty minutes. The official resigns. Every printer in the nation reads the verdict and orders more paper.",
       fam:"{D} keeps the pamphlet in her desk for the rest of her life, next to the verdict."},
      {l:"Let the government decide the matter", c:"The official's colleagues will judge the case.", e:{inst:-10,leg:-10}, f:["pressCowed"],
       after:"Osric is fined into bankruptcy. No one prints the next pamphlet, though people are thinking it.",
       fam:"{D} burns her copy, on {M}'s advice. She regrets it for years."},
      {l:"Release Osric quietly and investigate the official", c:"A fair outcome, with no rule behind it.", e:{leg:5},
       after:"Osric is released without charge. The investigation finds some irregularities. The next printer to be arrested has no precedent to cite.",
       fam:"{M} says that's what happens when you rely on a good man in the right office. {D} asks what happens when there isn't one."}
    ]}
];


// ═══════════════════════════════════════════════════════════
// CONSEQUENCE CARDS — payoffs for promises the crisis text made.
// Each is forced (w = 100) once its seed flag is set; `payoff:true`
// lets a front end mark it, and its cause names the year of the seed.
// Era III holds payoffs seeded in Era II; Era IV (Years 39–48) holds
// payoffs seeded in Era III and appears only when one is set.
// Era IV text never relies on the parents being alive (they die from Year 40).
// ═══════════════════════════════════════════════════════════
const since = f => state.flagYear[f];
const seeded = f => h => h.has(f) ? 100 : 0;
const compensation = (id, era, year, when) => ({ id, era, year, payoff:true, type:"Reckoning", icon:"corruption", title:"The compensation bill",
  w:h=>h.has("abolished")&&when(since("abolished"))?100:0,
  cause:h=>`Set in motion in Year ${since("abolished")}, when ${state.nation.name} ended bonded labour. Its owners did not go quietly.`,
  story:h=>`<p>The estate owners have drafted a bill. They lost property when the bonds ended, they say, and the founding document protects property. They want compensation from the treasury: a fixed sum for every worker freed.</p><p>Nobody has drafted a bill for the freed. They left the estates with the clothes they wore and the skills nobody would pay them for. Some are still living in the same quarters, working the same fields, for wages the owners set.</p><p>{S} read the bill twice. "They want paying for what they lost," he said. "Who pays for what was taken from the others?"</p>`,
  insp:"Inspired by the British compensation of slave owners in 1833, the promise of forty acres that was withdrawn in 1865, and Haiti's indemnity to France.",
  voice:()=>({r:"S",q:"They want paying for what they lost. The freed lost whole lives. Who pays them?"}),
  choices:[
    {l:"Pay the owners from the treasury", c:"The owners are satisfied. The freed get nothing.", e:{pros:-8,inc:-5,coh:5}, f:["ownersPaid"],
     after:"The bill passes. The treasury pays the former owners for decades; the freed are paid nothing, and the debt is still on the books at Year 50.",
     fam:"{S} works out what the payments would have bought if they had gone to the freed instead. He keeps the figure in his wallet."},
    {l:"Grant land and tools to the freed families instead", c:"The freed get a start. The owners call it a second robbery.", e:{eq:10,pros:-8,coh:-10,leg:5}, f:["freedLand"],
     after:"Every freed family receives a small grant of land and a set of tools, taken from the estates' unused acres. The owners sue, lose, and never forgive the government.",
     fam:"{S} helps a freed family raise a fence on their new land. They do not ask him to, and they do not thank him, and that is how he knows it is right."},
    {l:"Pay no one — the matter is closed", c:"No new debts. No new justice.", e:{leg:-5,coh:-3},
     after:"The bill dies in committee. The owners grumble; the freed stay where they are, working for whoever will pay.",
     fam:"{S} says closing a matter is not the same as settling it. Nobody in the assembly appears to have heard of the difference."}
  ]});

const PAYOFFS = [
  { id:"titlesuits", era:3, year:26, payoff:true, type:"Land", icon:"stakes", title:"The title suits",
    w:seeded("landRegistry"),
    cause:h=>`Set in motion in Year ${since("landRegistry")}, when ${state.nation.name} created a land registry where the first recorded claim wins.`,
    story:h=>`<p>The Northern Land Company has filed suits against a hundred and forty smallholders. Its lawyers have found Crown Grant Books older than the registry, and the registry, as written, honours the oldest paper.</p><p>Most families in the valley hold nothing older than a tax receipt from before the war. The company holds the Crown's own seal.</p><p>[[{F} has a summons on the kitchen table, weighted down with the tax receipt that saved his land the first time.||{F}'s landlord has already sold the lease to the company. The new rent arrives with the summons.]]</p>`,
    insp:"Inspired by the Mexican land-grant disputes after 1848, the Irish Encumbered Estates court, and disputed colonial titles everywhere.",
    voice:()=>({r:"F",q:"My father's receipt says the land is ours. Their paper is older. Which paper is the country?"}),
    choices:[
      {l:"Uphold the Grant Books — old title is title", c:"The law is consistent. The Crown's grants outlive the Crown.", e:{inst:5,eq:-12,leg:-8}, f:["grantBooksUpheld"],
       after:"The courts find for the company in a hundred and twelve cases. The Crown that the nation fought to remove still decides who owns its fields.",
       fam:"[[{F} loses the east field and keeps the house. He stops saying the word \"independence\" at supper.||The {fam} family's rent rises by a third. {F} pays it.]]"},
      {l:"Void every Crown grant — title begins at Year One", c:"The revolution reaches the land registry. Every old estate is now in doubt.", e:{eq:10,inst:-6,leg:6,pros:-5}, f:["crownTitlesVoided"],
       after:"An act voids all titles that rest only on a Crown grant. The company's suits collapse, and so does the value of half the great estates.",
       fam:"[[{F} burns the summons in the stove and the tax receipt goes back in its tin.||{F} hears that the landlord's title is void. Nobody yet knows whose the field is now.]]"},
      {l:"Twenty years' use makes a title", c:"Whoever has worked the land long enough keeps it. Lawyers become less useful.", e:{inst:8,eq:5,pros:-3}, f:["usageTitle"],
       after:"A new rule gives title to anyone who has farmed land openly for twenty years. Most suits are dropped; a few drag on for a decade.",
       fam:"[[{F} counts his years on the land on his fingers and laughs.||{F} has worked his field for twenty-five years. For the first time, a law has been written with him in mind.]]", ff:{landless:["F_ownsLand"]}}
    ]},
  compensation("compensation", 3, 27, y=>y<=24),
  { id:"feversummer", era:3, year:29, payoff:true, type:"Plague", icon:"plague", title:"The fever summer",
    w:seeded("endemicFever"),
    cause:h=>`Set in motion in Year ${since("endemicFever")}, when ${state.nation.name} answered the fever ships with guidance instead of a quarantine.`,
    story:h=>`<p>The fever that settled into the harbour has come back every few summers since. This summer it reached the capital.</p><p>Half the assembly left for their country houses in the first week. The ones who stayed meet in a hall that smells of vinegar. The wells in the poor districts sit downhill from the cemeteries, and everyone has known it for years.</p><p>{M} has caught it every winter since the harbour summer. "Now the capital gets its turn," she says, and is ashamed of how good it feels to say it.</p>`,
    insp:"Inspired by London's Great Stink of 1858, John Snow's cholera map, and the yellow fever summers of American port cities.",
    voice:()=>({r:"M",q:"I've had it every winter for twenty years. Now the capital gets a turn."}),
    choices:[
      {l:"Build water and sewers for the whole capital", c:"The most expensive thing the nation has ever built. It works.", e:{pros:-10,inst:10,eq:5,leg:5}, f:["sanitation"],
       after:"It takes nine years and a loan from abroad. The fever never comes back to the capital, and slowly stops coming to the harbour too.",
       fam:"{D} reads that the sewers will reach the valley towns last. She writes to her representative about it every month until they do."},
      {l:"Quarantine the poor districts", c:"The fever is fenced in with the people who catch it.", e:{eq:-10,coh:-6,leg:-5},
       after:"Soldiers cordon the low districts. The fever burns out inside the cordon by autumn, along with nine hundred people who could not leave.",
       fam:"{S} has a friend inside the cordon. He passes bread over the fence at night until a soldier tells him to stop."},
      {l:"Leave it to the parishes and the physicians", c:"Charity and medicine do what they can.", e:{inst:-5,coh:3},
       after:"The church opens fever wards and the physicians do heroic, useless work. The fever stays, part of the city's calendar.",
       fam:"{D} volunteers at a fever ward for six weeks. She comes home knowing exactly which streets will flood next spring."}
    ]},
  { id:"seconddry", era:3, year:30, payoff:true, type:"Hardship", icon:"drought", title:"The second dry year",
    w:seeded("reliefPrecedent"),
    cause:h=>`Set in motion in Year ${since("reliefPrecedent")}, when ${state.nation.name} opened the treasury in the bad year. Every hard year since has arrived as a demand.`,
    story:h=>`<p>The rains came late this year, and light. It is not the bad year; most wells still run. But the northern districts have sent a petition citing Year ${since("reliefPrecedent")} by date, and asking for the same relief.</p><p>The treasury is thinner than it was. Three other districts have petitions drafted and waiting to see what happens to this one.</p><p>{F} remembers the October the relief came. He also remembers that it came because the year was terrible, and this one is merely bad.</p>`,
    insp:"Inspired by the growth of famine relief codes in British India, U.S. farm relief after 1933, and the politics of disaster declarations.",
    voice:()=>({r:"F",q:"In Year 14 the treasury saved us. Now every bad month is a drought. I can't tell if I'm proud or ashamed."}),
    choices:[
      {l:"Pay the relief again", c:"The precedent becomes a right. The bill grows every year.", e:{leg:5,pros:-10,eq:3}, f:["reliefEntitlement"],
       after:"Relief is paid. Within five years it is paid every year somewhere, and the treasury plans for it like a season.",
       fam:"{F} signs for the relief and gives half of it to a neighbour whose well really has run dry."},
      {l:"Write rules — relief only for a measured drought", c:"Fair and predictable. Some real hardship falls just under the line.", e:{inst:10,leg:-2}, f:["reliefRules"],
       after:"A relief code is written: rainfall measured, thresholds published, relief automatic below them. This year's petition fails by two inches.",
       fam:"{D} reads the relief code aloud at supper. {F} says it is the first law he has understood on the first reading."},
      {l:"Refuse — the treasury cannot pay every year", c:"The precedent is broken. So is a promise people believed in.", e:{leg:-12,coh:-8,pros:3},
       after:"The petition is refused. The northern districts stop paying their taxes on time, and their representatives stop voting with the capital.",
       fam:"{S} says the government taught people to ask, and is now surprised that they asked."}
    ]},
  { id:"readingtest", era:3, year:30, payoff:true, type:"The vote", icon:"corruption", title:"The reading test",
    w:seeded("schoolsLost"),
    cause:h=>`Set in motion in Year ${since("schoolsLost")}, when ${state.nation.name} let the valley schools close.`,
    story:h=>`<p>Twenty years after the valley schools closed, one adult in three in the valley cannot read a ballot. The assembly has noticed.</p><p>A bill proposes that every voter read a passage of the founding document aloud before voting. Its sponsors say an informed vote is the foundation of the republic. Its sponsors also know exactly who closed the schools.</p><p>{D} learned at the kitchen table after her school closed. The boy who sat beside her did not learn at all.</p>`,
    insp:"Inspired by literacy tests in the post-Reconstruction American South and property-and-education franchise rules across 19th-century Europe.",
    voice:()=>({r:"D",q:"They closed my school, and now they want to test whether I can read."}),
    choices:[
      {l:"Pass the reading test", c:"An informed electorate, and a smaller one.", e:{inc:-15,leg:-10}, f:["literacyTest"],
       after:"The test passes. The valley's electorate falls by a third, and the third that remains votes for the men who wrote the test.",
       fam:"{D} passes the test easily. The man in front of her in the queue does not, and walks home without looking at anyone."},
      {l:"Reopen the schools instead", c:"Twenty years late, the classrooms return.", e:{eq:8,pros:-5,inc:5}, f:["schoolsReopened"],
       after:"The schools reopen, with evening classes for adults. The first evening class in the valley has forty pupils and one book.",
       fam:"{D} teaches the first evening class herself. The boy who sat beside her, now a grown man, is in the second row."},
      {l:"Do neither", c:"The test fails. So does the valley.", e:{leg:-3},
       after:"The bill fails and nothing replaces it. The schools stay closed; the valley votes, and reads, as it did.",
       fam:"{D} starts lending her books on Sundays. The waiting list is longer than the shelf."}
    ]},
  { id:"workshops", era:3, year:31, payoff:true, type:"Labour", icon:"nativism", title:"The empty workshops",
    w:seeded("yusufLeft"),
    cause:h=>`Set in motion in Year ${since("yusufLeft")}, when ${state.nation.name} restricted immigration and Yusuf left.`,
    story:h=>`<p>The foundries need metalworkers, the shipwrights need joiners, and there are not enough of either. The assembly that restricted immigration fourteen years ago has sent recruiters abroad.</p><p>Yusuf's old shop has been empty all that time. The sign is still faintly readable under the paint.</p><p>{D} had a letter from Amara last year. Her father opened a new shop by a harbour in another country. It is doing well. It sells tools, some of them to {nation}.</p>`,
    insp:"Inspired by postwar guest-worker programs, the reversal of 19th-century exclusion laws, and skills shortages after expulsions.",
    voice:()=>({r:"D",q:"Amara's father opened a shop by a harbour in another country. We buy his tools now."}),
    choices:[
      {l:"Recruit abroad, with a real path to citizenship", c:"The workshops fill. The argument about belonging starts again.", e:{inc:8,pros:8,coh:-5}, f:["openRecruitment"],
       after:"Recruits arrive with contracts that end in citizenship. The workshops fill within two years, and the market talk starts again within one.",
       fam:"{S} works beside two of the new recruits. He teaches them the valley's words for tools; they teach him theirs."},
      {l:"Train our own — an apprenticeship fund", c:"Slower. The skills stay home.", e:{pros:3,eq:5,inst:3},
       after:"An apprenticeship fund pays masters to train the valley's young. The shortage eases in a decade.",
       fam:"{D}'s eldest takes an apprenticeship at the foundry. The master is a man Yusuf trained."},
      {l:"Write to Yusuf and ask him back", c:"An apology, of a kind, addressed to one man.", e:{leg:5,inc:5}, f:["yusufInvited"],
       after:"The assembly writes to Yusuf by name. His reply comes in spring: he is too old to start again. But Amara will come, and bring her children.",
       fam:"{D} meets Amara at the coach stop after fourteen years. Neither of them can say anything for a while."}
    ]},
  { id:"patron", era:3, year:32, payoff:true, type:"Sovereignty", icon:"road", title:"The patron's price",
    w:seeded("foreignPatron"),
    cause:h=>`Set in motion in Year ${since("foreignPatron")}, when ${state.nation.name} traded favours for a distant ally's protection.`,
    story:h=>`<p>The great power that guaranteed the road has sent a new ambassador. He is polite and specific. His government would like a permanent garrison at the river crossing, and a seat on {nation}'s trade board.</p><p>Its advisers already hold four offices in the capital. Its merchants pay lower duties than {nation}'s own.</p><p>{S} sees their officers at the inn most evenings. They pay well and never ask what anything costs.</p>`,
    insp:"Inspired by unequal treaties, foreign concessions in 19th-century China and Egypt, and protectorates that began as alliances.",
    voice:()=>({r:"S",q:"Their officers drink at the inn now. They pay well. They never ask the price."}),
    choices:[
      {l:"Grant the garrison and the seat", c:"The protection continues. So does the dependence.", e:{pros:5,leg:-12,inst:-5}, f:["patronBase"],
       after:"The garrison is built. Within ten years the ambassador's opinion is the first thing every minister asks for.",
       fam:"{S}'s son takes a job at the garrison. The pay is twice what the docks pay. {S} does not stop him and does not congratulate him."},
      {l:"Refuse, and pay off the debt with a tax", c:"Independence again, at a price everyone feels.", e:{pros:-10,leg:10,coh:5}, f:["patronRefused"],
       after:"A special tax repays every favour in six years. The advisers leave the capital; the road stays open, now on {nation}'s own guard.",
       fam:"{D} pays the patron tax and grumbles about it every quarter. She would not trade it back."},
      {l:"Negotiate a fixed term", c:"Ten years, then they go. If they go.", e:{leg:-3,inst:3},
       after:"A ten-year lease is signed for the garrison. When the ten years end, the ambassador asks for ten more.",
       fam:"{S} marks the lease's end date on the calendar in the kitchen. It is still marked there years after it passes."}
    ]},
  { id:"inspector", era:3, year:33, payoff:true, type:"Accountability", icon:"corruption", title:"The inspector's reach",
    w:seeded("oversight"),
    cause:h=>`Set in motion in Year ${since("oversight")}, when ${state.nation.name} created an inspectorate after the valley school closed.`,
    story:h=>`<p>The inspectorate created after Delia's school closed has finished its largest audit. The most popular minister in the government, a hero of the war, has been selling road contracts to his relatives for eleven years.</p><p>The election is in three months. The minister's party controls the inspectorate's budget.</p><p>{D} remembers the inspectorate's name from the kitchen table, the year her schooling went on there. She has been waiting to see whether it would ever be allowed to find someone important.</p>`,
    insp:"Inspired by the Teapot Dome scandal, Britain's Marconi affair, and the fate of anti-corruption agencies when they reach the top.",
    voice:()=>({r:"D",q:"The inspectorate was made for Delia's school. Now it has found someone big. Will it be allowed to finish?"}),
    choices:[
      {l:"Publish the report now", c:"The truth before the election. The hero falls.", e:{inst:12,leg:5,coh:-8}, f:["inspectorateStrong"],
       after:"The report is published in full. The minister resigns, his party loses the election, and every office in the capital starts keeping better records.",
       fam:"{D} buys three copies of the report. She gives one to Delia, who is old now, and who reads it twice."},
      {l:"Delay it until after the election", c:"Stability now. The report will still be true later.", e:{inst:-10,leg:-5},
       after:"The report waits. The minister wins re-election and the inspectorate's budget is cut the following spring.",
       fam:"{D} writes to the inspectorate asking when the report will be published. The reply thanks her for her interest."},
      {l:"Fold the inspectorate into the ministry", c:"Oversight, overseen by the people it was overseeing.", e:{inst:-15,leg:-5}, f:["inspectorateFolded"],
       after:"The inspectorate becomes a department of the ministry it was auditing. Its next report finds nothing to report.",
       fam:"{D} says it was a good idea while it lasted. She says it the way her mother used to talk about the valley school."}
    ]},
  { id:"secession", era:3, year:36, payoff:true, type:"Regions", icon:"tariff", title:"The secession vote",
    w:seeded("regionalSplit"),
    cause:h=>`Set in motion in Year ${since("regionalSplit")}, when ${state.nation.name} let each region set its own terms in the tariff war.`,
    story:h=>`<p>The provinces drifted apart after the tariff war. They print their own notes, teach their own histories and, for twelve years, have elected their own governors who call each other \"our neighbours\".</p><p>Now the largest province has called a vote on leaving the federation altogether. The polls say it will pass.</p><p>{F} has cousins on the other side of the provincial line. If the vote passes, he will need papers to visit them.</p>`,
    insp:"Inspired by the Nullification Crisis and secession of 1860–61, the breakup of Gran Colombia, and later independence referendums.",
    voice:()=>({r:"F",q:"My cousins live forty miles away. After the vote I may need papers to visit them."}),
    choices:[
      {l:"Let them vote, and honour the result", c:"A peaceful parting. A smaller nation.", e:{coh:-15,leg:10,pros:-5}, f:["provinceLeft"],
       after:"The vote passes by eleven points. The province leaves the next spring, with a treaty on the river and the roads. Both sides keep the founding document; neither keeps all of it.",
       fam:"{F} gets his papers. The guard at the new border is his cousin's son, who waves him through and is reprimanded for it."},
      {l:"Offer wider autonomy to stay", c:"Federation in name, almost separation in fact.", e:{coh:5,inst:-5},
       after:"The province is offered its own courts, taxes and militia. The vote fails narrowly. Everyone agrees to call it a victory.",
       fam:"{S} says the country is now a marriage where both people sleep in different houses. {D} says plenty of marriages last that way."},
      {l:"Declare the vote illegal and send the army", c:"The union holds by force.", e:{leg:-15,coh:-10,inst:-10}, f:["secessionCrushed"],
       after:"Troops close the polling stations. There is fighting in two towns and a long, bitter quiet afterwards.",
       fam:"{S}'s son is called up. He serves in a town where his grandmother was born, and writes home very little."}
    ]},
  // ── ERA IV: consequences of the second generation ──
  { id:"occupation", era:4, year:39, payoff:true, type:"Broken promise", icon:"wardebt", title:"The occupation",
    w:seeded("veteransBetrayed"),
    cause:h=>`Set in motion in Year ${since("veteransBetrayed")}, when ${state.nation.name} answered the veterans' land claims with an appeals process.`,
    story:h=>{ const vet=h.has("S_soldier")||h.fam.sonSoldier;
      return `<p>Eleven years into the appeals process, seventeen veterans and three hundred of their sons walked into the land office at dawn and did not walk out. They have not harmed anyone. They have burned the files marked \"clerical error\".</p><p>Their demand is the one written on their discharge papers: forty acres each, as promised.</p><p>${vet?"{S} is not inside, but he knows every name on their list, and his own is on it.":"Tomas is one of the seventeen. {S} took him bread on the first night and stayed until morning."}</p>`; },
    insp:"Inspired by the Bonus Army's camp of 1932, the occupations of land offices in Latin America, and veterans' movements after every war.",
    voice:h=>(h.has("S_soldier")||h.fam.sonSoldier)?{r:"S",q:"Eleven years of appeals. They didn't burn the office. They burned the files that lied."}:{r:"S",q:"Tomas fought so we could have a country. Now he's sitting in its land office, waiting for it to keep its word."},
    choices:[
      {l:"Grant the land now", c:"The promise is kept, under pressure. Others will learn how it was done.", e:{pros:-8,leg:5,inst:-5}, f:["veteransHonored"],
       after:"The land is granted within a month. The veterans walk out to applause. Every unpaid promise in the nation takes note of the method.",
       fam:"{S} helps an old soldier pace out his forty acres. The man is seventy-one and has never owned anything."},
      {l:"Clear the office and arrest them", c:"The law is upheld. The veterans are not.", e:{leg:-10,coh:-8},
       after:"Soldiers clear the office. The veterans go quietly, which is worse; photographs of old men led out in handcuffs are in every paper.",
       fam:"{S} stands outside the court every day of the trial. He is not a defendant. He goes anyway."},
      {l:"Amnesty, and a land commission with a deadline", c:"Forgiveness and a date. The files are rebuilt from memory.", e:{inst:8,leg:5,pros:-5},
       after:"An amnesty is declared and a commission given one year to settle every claim. It takes two, but it settles them.",
       fam:"{S} testifies to the commission about what he was promised. The clerk writes it down and, this time, it counts."}
    ]},
  compensation("compensation2", 4, 40, y=>y>=27),
  { id:"generalstrike", era:4, year:40, payoff:true, type:"Labour", icon:"strike", title:"The general strike",
    w:seeded("strikeBroken"),
    cause:h=>`Set in motion in Year ${since("strikeBroken")}, when ${state.nation.name} broke the strike at ${state.family.Swork} and the committee's names went on a list.`,
    story:h=>`<p>The list made in Year ${since("strikeBroken")} has grown every year since. This morning every trade in the capital walked out at once: dockers, foundrymen, printers, carters, the women in the laundries. The trams stopped at eight. The newspapers did not come out.</p><p>Their demand is the one the strike committee made eleven years ago, now in every trade at once: the right to organise.</p><p>{S}, blacklisted since the first strike, did not tell his son to walk out. His son walked out anyway.</p>`,
    insp:"Inspired by the Winnipeg General Strike of 1919, the British General Strike of 1926, and Barcelona's general strikes.",
    voice:()=>({r:"S",q:"I've been on the blacklist for eleven years. My son walked out this morning. I didn't tell him to."}),
    choices:[
      {l:"Legalise unions in every trade", c:"The strike ends with a law. The owners call it surrender.", e:{eq:12,pros:-5,leg:8}, f:["unions"],
       after:"An act recognises unions in every trade. The capital's lights come back on the fourth evening, and the blacklist is burned in public.",
       fam:"{S} watches the blacklist burn. His own name is near the top. He does not cheer, but he does not leave until it is ash."},
      {l:"Declare martial law", c:"Order, at the point of a bayonet.", e:{leg:-20,coh:-15,inst:-10}, f:["martialLaw"],
       after:"The army runs the capital for nine weeks. The strike breaks; something in the city's trust in its government breaks with it.",
       fam:"{S}'s son spends six weeks in a detention camp. He comes home thinner and more certain than his father ever was."},
      {l:"A labour code, negotiated with the owners", c:"Rules for both sides. Nobody gets everything.", e:{eq:6,inst:8,leg:3}, f:["arbitration"],
       after:"Owners and unions draft a labour code in a month of shouting. It sets hours, a minimum wage and a board to settle disputes.",
       fam:"{S} reads the labour code at the union hall. Most of it was in the committee's demands eleven years ago."}
    ]},
  { id:"railway", era:4, year:41, payoff:true, type:"Property", icon:"stakes", title:"The railway line",
    w:seeded("eminentDomain"),
    cause:h=>`Set in motion in Year ${since("eminentDomain")}, when ${state.nation.name} bought the flooded land by compulsion. The precedent was used again.`,
    story:h=>`<p>The railway is coming up the valley, and the surveyors are back: stakes, chains and little red flags, forty years after the first ones. This time they have the law behind them. The state may take land for the public good. It said so after the flood.</p><p>The line runs straight through [[the {fam} family's fields||the houses built for the flooded tenants, the {fam} family's among them]].</p><p>{D} watched the stakes go in from the kitchen window. They are the same red flags.</p>`,
    insp:"Inspired by railway land seizures in the 19th century, Kelo v. New London, and eminent domain disputes over every great public work.",
    voice:()=>({r:"D",q:"That precedent was meant for floods. Now it's for trains. Precedents don't stay where you put them."}),
    choices:[
      {l:"Build the line and pay market value", c:"The railway comes. The families are paid what the land is worth today.", e:{pros:10,eq:-5},
       after:"The line opens in three years. The families are paid fairly by the land's price, which is not the same as what the land was worth to them.",
       fam:"{D} uses the payment to send her daughter to the college in the capital. The train takes her there in four hours."},
      {l:"Route around the smallholdings", c:"A longer line, a bigger bill, and the families stay.", e:{pros:3,leg:6,eq:3}, f:["railwayRerouted"],
       after:"The engineers add eleven miles and two bridges to go around the valley's farms. The line is slower; the valley keeps its fields.",
       fam:"{D} can hear the trains from the house, far off, across the river. She finds she likes the sound."},
      {l:"Take it at the assessed value", c:"Cheap for the state. The assessed value was set in the capital.", e:{pros:10,leg:-10,eq:-8}, f:["railwaySeized"],
       after:"The land is taken at a valuation set years ago. The families take the money because refusing it gets them nothing.",
       fam:"[[{D} takes down the framed deed and puts it in a drawer. The land it describes now has a timetable.||The {fam} family moves again, for the second time in one lifetime. {D} packs the jar of soil first.]]", ff:{landed:["F_lostLand"]}}
    ]},
  { id:"secondwalk", era:4, year:44, payoff:true, type:"The vote", icon:"march", title:"The second walk",
    w:seeded("partialVote"),
    cause:h=>`Set in motion in Year ${since("partialVote")}, when ${state.nation.name} gave the vote to men who pay tax and half the marchers kept walking.`,
    story:h=>`<p>The banner from the long walk has been copied so many times the underlined word is barely legible. It is being carried again: by the women who were left out when the vote went to tax-paying men eleven years ago.</p><p>There are twice as many marchers as last time. Many are the daughters of the first walk. Some are the granddaughters.</p><p>{D} is at the front, carrying one pole of the banner. Her daughter carries the other.</p>`,
    insp:"Inspired by the women's suffrage marches of 1913, the Representation of the People Acts, and Swiss women's long wait for the vote.",
    voice:()=>({r:"D",q:"My mother never voted. I'm past fifty and neither have I. My daughter will not wait as long."}),
    choices:[
      {l:"The vote for every adult", c:"The founding document's \"we\" finally means everyone of age.", e:{inc:15,leg:8,coh:-3}, f:["universalVote"],
       after:"The vote is extended to every adult citizen. The marchers are still on the road when they hear; they finish the walk anyway, to say they did.",
       fam:"{D} votes for the first time at {Dage}. She wears her mother's good dress, taken in at the waist."},
      {l:"The vote for women who own property", c:"A wider door, still a door.", e:{inc:5,leg:-2},
       after:"Women with property may vote. The marchers split, as their mothers did, between the satisfied and the still walking.",
       fam:"[[{D} qualifies. Her daughter does not. They do not discuss it.||Neither {D} nor her daughter qualifies. They go back out on the road in the spring.]]"},
      {l:"Refuse — the matter was settled", c:"The law stands. The road fills again.", e:{leg:-10,coh:-5},
       after:"The assembly refuses. The marchers camp outside it for a month and return every spring after.",
       fam:"{D} gives her daughter the banner pole and says, \"Next year, you carry it.\""}
    ]},
  { id:"heirsheir", era:4, year:46, payoff:true, type:"Succession", icon:"seat", title:"The heir's heir",
    w:seeded("dynasty"),
    cause:h=>`Set in motion in Year ${since("dynasty")}, when ${state.nation.name} let the founder's heir take the empty chair.`,
    story:h=>`<p>The heir who took the chair in Year ${since("dynasty")} has died. His son is nineteen, has never held any office, and has announced that he will take his father's place, as his father took his grandfather's.</p><p>Nobody alive in the government remembers the founding. The founding document says nothing about any of this, because the men who wrote it assumed they would always be there.</p><p>{S} was a young man when the founder died. Now he watches the founder's grandson on the newspaper's front page.</p>`,
    insp:"Inspired by hereditary republics from the Venetian doges to modern family dictatorships, and the third-generation crises of founding dynasties.",
    voice:()=>({r:"S",q:"I remember the day the founder died. Now his grandson wants the chair. Nobody has asked what the chair is for."}),
    choices:[
      {l:"Let the assembly choose", c:"The chair becomes an office again.", e:{leg:10,inst:10,coh:-8}, f:["peacefulTransfer"],
       after:"The assembly chooses a provincial governor nobody had heard of. The founder's grandson goes to university, and later writes a well-reviewed history of his family.",
       fam:"{S} reads that the grandson is writing a history. He says he hopes it has a chapter on the rest of us."},
      {l:"Accept the grandson", c:"Continuity. The office is now plainly a crown.", e:{inst:-10,leg:-8,coh:3},
       after:"The grandson takes the chair. His portrait replaces his father's in every office, beside his grandfather's.",
       fam:"{D} takes down the portrait in the valley school, as is now required, and puts up the new one, as is now required."},
      {l:"A regency council until he is thirty", c:"Time for him to grow up, or for the country to grow out of him.", e:{inst:3,leg:2},
       after:"A council of elders rules in his name. By the time he turns thirty, the council has learned to rule without him.",
       fam:"{S} says the regency is a way of not deciding. {D} says that, for once, not deciding may be the wise thing."}
    ]}
];
CRISES.push(...PAYOFFS);

// ═══════════════════════════════════════════════════════════
// THE HARROWS — the rival family (lore bible: "The rival family").
// The landowner with the deep well. Their reactions usually pull the
// opposite way from the player's family. Silas dies in Year 30, Odile in 41.
// ═══════════════════════════════════════════════════════════
const HARROWS = [
  {k:"silas",    name:"Silas",    age:56, role:"Landowner, 400 acres and the deep well", dies:30},
  {k:"odile",    name:"Odile",    age:49, role:"Keeps the estate's books", dies:41},
  {k:"lucan",    name:"Lucan",    age:24, role:"Investor; owns the iron foundry"},
  {k:"clemence", name:"Clemence", age:16, role:"The youngest; the daughter's age-mate"}
];
const harrowAt = (k, year) => { const p=HARROWS.find(x=>x.k===k); return {...p, now:p.age+year-1, alive:!p.dies||year<p.dies}; };
const harrowIntro = () => "[[Our four hundred acres border {Fhold}. Our well is the deepest in the district. We intend to be good neighbours.||Our family owns the field {F} leases. He pays on time. We intend to be fair landlords.]]";

// One reaction per choice, keyed by crisis id. [speaker, line]
const HARROW_REACT = {
  badyear:     [["silas","Relief from the treasury. Paid for by whom, I wonder? By the men who kept their wells."],["silas","A fair arrangement: water for concessions. Everyone gets something, and we get the concessions."],["silas","We bought the two farms below the ridge this week. Someone has to keep the land in use."]],
  landgrab:    [["lucan","The registry opened at nine. Our clerks were there at eight."],["lucan","Father's investors will not forget this. Neither will I."],["silas","Men with rifles on my boundary. I asked the government for law and it sent me silence."]],
  school:      [["odile","An inspectorate. I've paid for Delia's slates for nine years in secret. Perhaps now I can do it openly."],["odile","The administrator is gone. Good. He was always a fool."],["odile","The parish school will take the children. Some of them."]],
  nativism:    [["clemence","I went to the oath with the girls from the valley. Mother says it wasn't my place. It was."],["silas","Two men fined for a window. That is the law working. Nothing more is needed."],["lucan","We've lost the best metalworker in the valley. The foundry will feel it for years."]],
  petition:    [["silas","The families who worked our fields under contract are free. I wish them well. I do not know who will bring in the harvest."],["odile","The petition is burned and the square is quiet. I don't like how quiet."],["silas","A committee. Good. Committees are where questions go to grow old."]],
  flood:       [["lucan","They paid me a fair price for the valley. I was going to sell it anyway. I tell myself that."],["lucan","Housing in the city. Sensible. The valley will be worth more empty."],["lucan","Six months' notice and a payment. Generous, my agent says. I have never seen the place."]],
  strike:      [["lucan","Contracts with a committee. Father would have closed the foundry first."],["lucan","The gates are open and the work has resumed. I did not enjoy watching it."],["lucan","A board to settle disputes. Expensive, slow, and probably wise."]],
  succession:  [["odile","An election for the chair. Silas would have called it vulgar. I think it was brave."],["lucan","The heir dined with us last month. Continuity is good for business."],["lucan","The general keeps order. Order is good for business. I keep saying that."]],
  march:       [["clemence","I walked nine days with the tenants' wives. Father hasn't spoken to me since. It was worth it."],["clemence","The men got the vote. I walked nine days to be told to wait."],["clemence","I was at the bridge too. They let me go because of my name. They didn't let the others go."]],
  rising:      [["lucan","Abolished under fire. We will sue, of course. I expect we will lose."],["clemence","The army is camped on our land, defending us. I have never felt less defended."],["lucan","Twenty years. Long enough to plan. Short enough to frighten Mother."]],
  titlesuits:  [["silas","Our title comes from the Crown's own book. The court agreed. Of course it did."],["silas","Half our estate rests on a Crown grant. Half our estate is now a question."],["silas","Twenty years' use makes a title. Our tenants have worked the east field for thirty. Well."]],
  compensation:[["lucan","The treasury pays us for what we lost. I do not feel richer. I feel watched."],["clemence","They took our unused acres for the freed families. Our unused acres. I never once walked them."],["lucan","Nobody paid, nobody gained. The fields are half-worked and everyone is waiting."]],
  seconddry:   [["lucan","Relief again. Our taxes, their wells."],["lucan","A relief code. Rules I can plan around. Thank God."],["clemence","The north stopped paying its taxes. I can't say I blame them."]],
  generalstrike:[["lucan","Unions in every trade. The foundry will survive it. I'm less sure about my temper."],["clemence","Soldiers in the streets, guarding my brother's foundry. I can't walk past it."],["lucan","A labour code. Twenty years ago I'd have fought it. This time I helped write it."]],
  railway:     [["lucan","The line crosses our lower fields too. Market value. I'll be paid more than most."],["lucan","Eleven extra miles to spare the smallholders. The company's bonds fell two points."],["clemence","They took the farms at last decade's prices. My brother calls it progress. I call it a robbery with a timetable."]]
};
HARROW_REACT.compensation2 = HARROW_REACT.compensation;
// The reaction to a played choice, moved to a living Harrow if the named one has died
function harrowReaction(cr, i){
  const r=(HARROW_REACT[cr.id]||[])[i]; if(!r) return null;
  let k=r[0]; if(!harrowAt(k,cr.year).alive) k=harrowAt("odile",cr.year).alive&&k==="silas"?"odile":"lucan";
  return {k, q:r[1]};
}
const harrowNow25 = () => H().has("grantBooksUpheld")||H().has("consolidation") ? "Father still signs the leases. I decide which ones." : "Father still signs the leases. Fewer of them every year.";
function harrowFate(){
  const h=H(), m=state.m;
  if(h.has("civilWar")) return {k:"clemence", q:"Our house burned in Year 36, in the war. I did not rebuild it. I rebuilt the valley school instead, and I teach there on Thursdays."};
  if(h.has("junta")||h.has("dynasty")||h.has("martialLaw")) return {k:"lucan", q:"My daughter married into the governing family. We are closer to power than Father ever was. I have stopped asking what it is for."};
  if(h.has("landToTillers")||h.has("crownTitlesVoided")||h.has("freedLand")||(h.has("abolished")&&h.has("coerced"))) return {k:"clemence", q:"We have a big house, a portrait gallery and sixty acres. Lucan sells a field every few years to keep the roof on. I find I sleep better."};
  if(h.has("grantBooksUpheld")||(m.pros>=60&&m.eq<40)) return {k:"lucan", q:"My grandson will own most of the valley. Everyone in it works for us, or for someone who does. Father would be proud. I am mostly tired."};
  return {k:"clemence", q:"We are still the largest landowners in the district and no longer the most important people in it. I sit on the council. Lucan's foundry employs four hundred. We have become ordinary, and it suits us."};
}

// ═══════════════════════════════════════════════════════════
// THE NEIGHBOURS — recurring cast (lore bible: "The recurring cast").
// A cast member counts as met once the crisis that introduces them has
// been played. `now25` is their news at Year 25; `fate` their Year 50 line.
// ═══════════════════════════════════════════════════════════
const NEIGHBOURS = [
  {k:"yusuf", name:"Yusuf", met:h=>state.used.has("nativism"),
   now25:h=>h.has("yusufCitizen")?"Yusuf has two new apprentices, and a vote.":h.has("yusufLeft")?"Yusuf's shop is still empty. Amara writes every season.":"Yusuf still keeps a cudgel behind the counter.",
   fate:h=>h.has("yusufCitizen")?"Yusuf sat on the valley council until he was seventy. His grandson runs the shop and keeps his tools on the wall.":h.has("yusufLeft")?(h.has("yusufInvited")?"Yusuf died in his harbour shop abroad. Amara came back in Year 31 with her children, and stayed.":"Yusuf died in his harbour shop abroad. Amara's letters stopped in time; nobody is sure why."):"Yusuf kept his shop for forty years and the cudgel behind the counter for all of them. He was never made to feel at home, and never left."},
  {k:"delia", name:"Delia", met:h=>state.used.has("school"),
   now25:h=>h.has("oversight")?"Delia examines schools for the inspectorate now.":h.has("schoolsLost")?"Delia teaches nine children in her kitchen.":"Delia is still at the valley school, slower on the stairs.",
   fate:h=>h.has("oversight")?"Delia became the nation's first school inspector. Her reports are still read aloud to new inspectors.":h.has("schoolsLost")?(h.has("schoolsReopened")?"Delia taught in her kitchen for twenty years and lived to see the valley schools reopen. She was in the front row.":"Delia taught in her kitchen until she died, poor. Two of her pupils named daughters after her."):"Delia taught at the valley school for thirty-one years. The new school is named after her."},
  {k:"cassius", name:"Cassius", met:h=>state.used.has("petition"),
   now25:h=>h.has("abolished")?"Cassius is standing for the assembly.":h.has("suppressed")?"Nobody says Cassius's name aloud. His son says it often.":"Cassius's committee meets twice a year, and studies.",
   fate:h=>h.has("abolished")&&since("abolished")<=24?"Cassius sat in the assembly for two terms. The petition he wrote hangs in its entrance hall.":h.has("suppressed")?"Cassius disappeared from the record in Year 19. His son did not.":"Cassius died at fifty-one, never a legal person in the nation of his birth. His son carried the rest of the argument."},
  {k:"marcus", name:"Marcus", met:h=>state.used.has("rising"),
   fate:h=>h.has("civilWar")?"Marcus was killed in the second year of the war. Both sides now claim him.":h.has("gradual")?"Marcus led the twenty-year wait, and was there on the morning the last bond ended.":"Marcus signed the first printed copy of the act of abolition. He never ran for office; he said he had done his part."},
  {k:"osric", name:"Osric", met:h=>state.used.has("printer"),
   fate:h=>h.has("pressFree")?"Osric's shop became the nation's first free newspaper. Its masthead still carries his name.":h.has("pressCowed")?"Osric was fined into bankruptcy and his press was sold for scrap. Someone bought the type and kept printing at night.":"Osric kept printing, carefully, for the rest of his life."},
  {k:"tomas", name:"Tomas", met:h=>state.used.has("veterans")&&!(h.has("S_soldier")||h.fam.sonSoldier),
   fate:h=>h.has("veteransHonored")?"Tomas farmed his forty acres until he was eighty.":h.has("veteransBetrayed")?"Tomas was one of the seventeen. He never apologised, and never regretted it.":"Tomas took the money and opened a carter's yard. He named his best horse after the land office."},
  {k:"pell", name:"Edric Pell, the clerk", met:h=>state.used.has("badyear"),
   now25:h=>h.has("oversight")?"Edric Pell, the clerk, has applied to join the inspectorate.":"Edric Pell, the clerk, still keeps the district books.",
   fate:h=>h.has("oversight")?"Edric Pell joined the inspectorate and spent his last years auditing the offices he used to work in.":h.has("junta")||h.has("martialLaw")?"Edric Pell kept lists for the general's government. Nobody in the valley speaks to his family.":"Edric Pell retired on a small pension. His books are in the district archive, and the {fam} family's name is in one of them."}
];
const neighboursMet = () => { const h=H(); return NEIGHBOURS.filter(n=>n.met(h)); };

// ═══════════════════════════════════════════════════════════
// THE ALMANAC — what happens in the years between cards.
// almanacYears(from, to) lists each year with its events: family
// milestones (by age), the Harrows and the neighbours (fixed years),
// and national news that follows the measures and flags. Text is
// seeded per game, so undo and resume show the same years. A parent's
// death is recorded the first time the almanac reaches it, so the
// ending always agrees.
// ═══════════════════════════════════════════════════════════
const ALMANAC_GRANDCHILDREN = {   // lore bible: the third generation
  Vael:   {S:{kind:"son", name:"Aldo"},  D:{kind:"daughter", name:"Maren"}},
  Ossian: {S:{kind:"daughter", name:"Ilse"}, D:{kind:"son", name:"Bren, after his grandfather"}},
  Tarn:   {S:{kind:"son", name:"Edvin, after his grandfather"}, D:{kind:"daughter", name:"Ada"}}
};
const goodSchooling = h => h.has("publicEd")||h.has("hybridEd")||h.has("churchServices")||h.has("schoolsReopened");
// A parent's death year (Years 40–49), from the nation as it stands; fixed once recorded
function parentDeathYear(r){
  if(state.deathYear&&state.deathYear[r]) return state.deathYear[r];
  const m=state.m, h=H(), base=Math.round((m.pros+m.eq)/20);
  return r==="F" ? 40+Math.max(0,Math.min(9, base-(h.has("F_lostLand")?3:0)))
                 : 41+Math.max(0,Math.min(8, base-(h.has("motherFever")?4:0)));
}
// Family milestones: [role, age it happens at, text or (h)=>text|null]
const FAMILY_MILESTONES = [
  ["S",20,"{S} earns a full man's wage for the first time, and gives half of it to {M} without being asked."],
  ["S",25,"{S} marries. The wedding is in [[the barn||the yard]], and {M} cooks for three days."],
  ["S",27,()=>{ const g=ALMANAC_GRANDCHILDREN[state.family.surname].S; return `{S}'s first child is born, a ${g.kind} named ${g.name}.`; }],
  ["S",33,h=>state.m.pros>=50?"{S} buys a house of his own, three streets from his parents'.":"{S} moves his family into two rented rooms in town. The rent takes a third of his wage."],
  ["S",45,"{S}'s hair goes grey at the temples, exactly where his father's did."],
  ["S",52,"{S}'s eldest starts work. {S} walks there with them on the first morning and pretends he was going that way."],
  ["D",12,h=>h.has("apprenticeEd")?"{D} is apprenticed, as the law expects. She is good at the work and hates it.":h.has("privateEd")?"{D} reads whatever books {M} can borrow, and some that {M} doesn't know about.":"{D} finishes her first schoolbook and starts the next one the same evening."],
  ["D",16,h=>goodSchooling(h)&&!h.has("schoolsLost")?"{D} wins the district essay prize. The prize is a book, which she has already read.":"{D} starts work [[on the family's land||as a maid at the Harrows' house, where Clemence lends her books]]."],
  ["D",20,h=>goodSchooling(h)&&state.m.inc>=45?"{D} leaves for the capital to study. {F} carries her trunk to the coach and says nothing the whole way.":"{D} turns down a proposal of marriage. {F} does not understand why. {M} does."],
  ["D",27,"{D} marries a man who reads as much as she does. They argue about books at their own wedding."],
  ["D",29,()=>{ const g=ALMANAC_GRANDCHILDREN[state.family.surname].D; return `{D}'s first child is born, a ${g.kind} named ${g.name}.`; }],
  ["D",40,h=>state.m.inc>=55?"{D} is asked to speak at the district meeting, the first woman ever asked. She speaks for nine minutes.":"{D} writes a letter to the newspaper under her husband's name. It is printed, and quoted in the assembly."],
  ["F",60,"{F} hands the heavy work to {S}. He does not hand over his opinions about it."],
  ["F",70,"{F} stops walking to market. The market starts coming to him: neighbours call in every afternoon with the news."],
  ["M",55,"{M} still {MworkNow}, now with a girl from the next farm learning at her side."],
  ["M",66,"{M} starts writing down the family's recipes, and then, without telling anyone, its history."]
];
// The Harrows and the neighbours: [year, kind, text, condition?]
const VALLEY_EVENTS = [
  [3,"neighbour","Yusuf the metalworker takes on a second apprentice. His hammer is the first sound in the valley every morning."],
  [4,"harrow","Lucan Harrow comes home from Lisse with a wife, two crates of books and plans for the whole estate."],
  [6,"neighbour","Delia's valley school takes its hundredth pupil.", h=>!h.has("schoolsLost")],
  [12,"harrow","Clemence Harrow is sent to school in the capital. She writes to {D} more often than to her mother."],
  [15,"neighbour","A man named Cassius is seen at the district office every week, asking for copies of the founding document.", h=>h.has("coerced")||h.has("indenture")],
  [20,"harrow","Lucan Harrow opens the iron foundry by the river. Four hundred men apply for two hundred places."],
  [22,"neighbour","Amara's first letter arrives, from a harbour town across the sea. {D} reads it until the paper goes soft.", h=>h.has("yusufLeft")],
  [26,"neighbour","Osric the printer starts the capital's first daily newspaper. The valley gets it two days late."],
  [30,"harrow","Silas Harrow dies at eighty-five. Half the valley goes to the funeral; the other half goes to see who inherits."],
  [32,"neighbour","Delia retires from teaching. Her former pupils fill the schoolroom to say goodbye; some bring their grandchildren.", h=>!h.has("schoolsLost")||h.has("schoolsReopened")],
  [41,"harrow","Odile Harrow dies. In her desk they find thirty years of receipts for slates, chalk and primers, all made out to Delia."],
  [44,"neighbour","Yusuf dies in the shop he built. The valley closes its shutters for the morning.", h=>h.has("yusufCitizen")]
];
// National news: [condition, text]. One is picked for a year that has fewer than two events.
const NEWS = [
  [h=>h.m.pros>=62,"A good harvest. Grain is cheap and the autumn fairs run late into the night."],
  [h=>h.m.pros>=62,"A new road reaches the valley. The carters complain that they now have no excuse."],
  [h=>h.m.pros<40,"A thin year. The pawnshops in the capital do well."],
  [h=>h.m.pros<40,"Prices rise faster than wages. Bread is weighed at the counter twice."],
  [h=>h.m.eq<38,"A new mansion goes up on the ridge above the capital. It has forty windows facing the valley."],
  [h=>h.m.eq<38,"Three more families in the district sell up and leave for the cities."],
  [h=>h.m.eq>=62,"The land tax on small holdings is cut. The district celebrates with a dance nobody organised."],
  [h=>h.m.inc<38,"A rule is passed that newcomers must register at the district office every quarter."],
  [h=>h.m.inc>=62,"A newcomer's son is elected to the district council. Nobody remarks on it, which is remarked on."],
  [h=>h.m.leg<38,"Turnout at the district election falls by half. The winner thanks the voters, all eleven hundred of them."],
  [h=>h.m.leg>=62,"The Independence Day parade is the largest ever held. People bring their own flags."],
  [h=>h.m.inst<38,"A judge is found to have sold three verdicts. Nothing happens to him."],
  [h=>h.m.inst>=62,"The courts clear their backlog for the first time since the founding."],
  [h=>h.m.coh<38,"A brawl at the provincial fair: valley men against town men, over nothing anyone can remember."],
  [h=>h.m.coh>=62,"The valley raises a new bridge together in a week, without a single contract."],
  [h=>h.has("publicEd")&&state.year<12,"The new public school opens in the valley. Children walk there from four miles away."],
  [h=>h.has("privateEd"),"The church school raises its fees again."],
  [h=>h.has("freeTrade")&&h.geo("coastal"),"Foreign ships crowd the harbour. The market sells things the valley has no names for."],
  [h=>h.has("protectionism"),"Smuggling becomes the district's second trade, and the more profitable one."],
  [h=>h.has("stateChurch"),"Attendance at the established church becomes a condition for district office."],
  [h=>h.has("secular"),"The last church schoolroom in the valley becomes a public reading room."],
  [h=>h.has("executive")&&!h.has("junta"),"The Chief Executive tours the provinces. The valley is told to paint its fences."],
  [h=>h.has("federation")&&!h.has("centralized"),"The provinces quarrel over the river tolls again."],
  [h=>h.has("coerced")&&!h.has("abolished"),"A bonded worker runs from the estates and is brought back in chains through the market square."],
  [h=>h.has("abolished"),"The first freed families buy land in the valley, at prices nobody else would pay."],
  [h=>h.has("unions"),"The union hall in the capital opens. Its first meeting runs until two in the morning."],
  [h=>h.has("pressFree"),"A new newspaper starts in the capital every month, and most of them close by the next."],
  [h=>h.has("sanitation"),"The capital's new sewers open. The summer smell is gone, and so is the fever."],
  [h=>h.has("railwayRerouted")||h.has("railwaySeized"),"The first train runs up the valley. Half the district walks out to watch it pass."],
  [h=>h.has("borderWar"),"The war memorial is unveiled in the market square. The list of names is longer than the stone."],
  [h=>h.has("foreignPatron")&&!h.has("patronRefused"),"The foreign advisers move into a new building in the capital, with their own flag on the roof."],
  [h=>h.geo("island"),"The storm season passes gently. The fishing boats stay out a week longer than usual."],
  [h=>h.geo("arid"),"The great river runs a little higher than last year. Nobody trusts it."],
  [h=>h.geo("landlocked"),"The neighbours raise their road tolls. The valley grumbles and pays."],
  [()=>true,"A quiet year. The harvest is ordinary and the weather is discussed at length."],
  [()=>true,"A long winter. The valley reads, quarrels and mends things."],
  [()=>true,"An unremarkable year, which the valley agrees is the best kind."]
];
function seededRandom(a){ return ()=>{ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
function almanacYears(from, to){
  const h=H(), out=[];
  // The first almanac to reach the parents' last decade fixes both death years, so the
  // ending can never name a year the almanac skipped (an overdue death moves to `from`)
  if(to>=40){ state.deathYear=state.deathYear||{}; for(const r of ["F","M"]) if(!state.deathYear[r]) state.deathYear[r]=Math.max(parentDeathYear(r), from); }
  let quietShown=false;   // one "quiet year" line per almanac; other empty years are left out
  for(let y=from; y<=to; y++){
    const items=[];
    for(const [r,age,txt] of FAMILY_MILESTONES){
      if(ageAt(r,y)!==age) continue;
      if((r==="F"||r==="M")&&y>=parentDeathYear(r)) continue;
      const t=typeof txt==="function"?txt(h):txt; if(t) items.push({kind:"family", r, text:t});
    }
    for(const r of ["F","M"]){
      const dy=parentDeathYear(r), missed=y===from&&dy<from;   // a death in a year that had a card
      if((y===dy||missed)&&!(state.deathShown&&state.deathShown[r])){
        state.deathYear=state.deathYear||{}; state.deathYear[r]=dy; state.deathShown={...(state.deathShown||{}), [r]:true};
        items.push({kind:"family", r, death:true, text:`{${r}} ${missed?`died in Year ${dy}`:"dies"}, at ${words(ageAt(r,dy))}. ${r==="F"?"The valley comes to the funeral in its working clothes, straight from the fields.":"Half the people at the funeral were delivered, fed or taught by her."}`});
      }
    }
    for(const [yy,kind,text,cond] of VALLEY_EVENTS) if(yy===y&&(!cond||cond(h))) items.push({kind, text});
    if(items.length<2){
      // News that fits the nation now, each line once per game; the three quiet-year lines are the last resort
      const used=new Set(state.newsUsed||[]), rnd=seededRandom((state.seed||1)+y*7919);
      const fits=NEWS.map((n,i)=>i).filter(i=>NEWS[i][0](h)), quiet=i=>i>=NEWS.length-3;
      const fresh=fits.filter(i=>!used.has(i)&&!quiet(i)), list=fresh.length?fresh:fits.filter(quiet);
      if(fresh.length||!quietShown){
        const i=list[Math.floor(rnd()*list.length)];
        if(!quiet(i)) state.newsUsed=[...(state.newsUsed||[]), i]; else quietShown=true;
        items.push({kind:"nation", text:NEWS[i][1]});
      }
    }
    if(items.length) out.push({year:y, items});
  }
  return out;
}

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════
const rnd = a => a[Math.floor(Math.random()*a.length)];
const clamp = v => Math.max(0, Math.min(100, v));
const ROLE_IDX = {F:0,M:1,S:2,D:3};

const ONES=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
const TENS=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
function words(n){ if(n<20) return ONES[n]; if(n<100) return TENS[Math.floor(n/10)]+(n%10?"-"+ONES[n%10]:""); return "a hundred"+(n>100?" and "+words(n-100):""); }

const first = r => state.family.members[ROLE_IDX[r]].name;
const ageAt = (r, year) => state.family.members[ROLE_IDX[r]].age + year - 1;
const H = () => ({ has:f=>state.flags.has(f), geo:t=>state.nation.tags.includes(t), fam:state.family, m:state.m });

function T(s){
  const f = state.family;
  return s
    .replace(/\[\[([\s\S]*?)\|\|([\s\S]*?)\]\]/g, (_,a,b)=> f.landed?a:b)
    .replace(/\{(\w+)\}/g, (m,k)=>{
      if(k in ROLE_IDX) return first(k);
      if(/^[FMSD]age$/.test(k)) return words(ageAt(k[0], state.year));
      if(k==="fam") return f.surname;
      if(k==="nation") return state.nation.name;
      if(f[k]!==undefined) return f[k];
      if(k.endsWith("Cap")&&typeof f[k.slice(0,-3)]==="string"){ const v=f[k.slice(0,-3)]; return v[0].toUpperCase()+v.slice(1); }
      return m;
    });
}
function applyEffects(e){ for(const k in (e||{})) state.m[k] = clamp(state.m[k] + e[k]); }
function addFlags(list){ (list||[]).forEach(f=>{ state.flags.add(f); if(!(f in state.flagYear)) state.flagYear[f]=state.year; }); }

// ═══════════════════════════════════════════════════════════
// STATE TRANSITIONS
// ═══════════════════════════════════════════════════════════
function newState(nation, family){
  return { nation, family, qi:0, answers:[], m:{}, flags:new Set(), flagYear:{}, year:1,
           era:1, queue:[], ci:0, used:new Set(), log:[], snapshots:{}, pending:null, phase:"intro",
           seed:Math.floor(Math.random()*2**31), deathYear:{}, deathShown:{}, newsUsed:[] };
}
// Recompute the nation from all ten answers (so going back to change an answer is safe)
function ratifyState(){
  state.m = {...state.nation.base}; state.flags = new Set(); state.flagYear = {}; state.year = 1; state.log = [];
  QUESTIONS.forEach((q,i)=>{
    const c=q.choices[state.answers[i]];
    applyEffects(c.e);
    state.nation.tags.forEach(t=>{ if(c.g&&c.g[t]) applyEffects(c.g[t]); });
    addFlags(c.f);
    state.log.push({k:q.cat, v:c.l});
  });
  if(state.family.sonSoldier) addFlags(["S_soldier"]);
  state.snapshots[1] = {...state.m};
}
function applyCrisisChoice(cr, i){
  const c=cr.choices[i];
  applyEffects(c.e); addFlags(c.f);
  if(c.ff) addFlags(c.ff[state.family.landed?"landed":"landless"]);
  state.log.push({k:`Year ${cr.year}`, v:T(c.l), t:cr.title});
  return c;
}
const activeFaults = () => { const h=H(); return FAULTS.filter(f=>f.w(h)).map(f=>T(f.t)); };

function foundingSentence(){
  const s = QUESTIONS.map((q,i)=>q.choices[state.answers[i]].s);
  return `${state.nation.name} begins its life ${s[0]}, with ${s[1]}. It is founded on ${s[2]}, with ${s[3]}, and settles its disputes through ${s[4]}. It is ${s[5]}, has ${s[6]}, and is ${s[7]}, ${s[8]}, ${s[9]}.`;
}

function pickCrises(era){
  const h=H();
  const pool=CRISES.filter(c=>c.era===era&&!state.used.has(c.id)).map(c=>({c,w:c.w(h)})).filter(x=>x.w>0);
  // Forced cards always come: crises the founding forces, then consequence payoffs.
  // (Capping them at three silently dropped a required crisis in a few games.)
  const out=pool.filter(x=>x.w>=100).sort((a,b)=>(!!a.c.payoff-!!b.c.payoff)||(a.c.year-b.c.year)).map(x=>x.c);
  let rest=pool.filter(x=>x.w<100);
  while(out.length<2&&rest.length){
    let r=Math.random()*rest.reduce((s,x)=>s+x.w,0), i=0;
    while(r>rest[i].w){ r-=rest[i].w; i++; }
    out.push(rest[i].c); rest.splice(i,1);
  }
  return out.sort((a,b)=>a.year-b.year);
}

// ═══════════════════════════════════════════════════════════
// FAMILY FATES — scores read the nation's meters and flags
// ═══════════════════════════════════════════════════════════
function scores(){
  const m=state.m, h=H(), f=state.family;
  const edu = h.has("publicEd")?30:h.has("hybridEd")?(f.landed?24:18):h.has("churchServices")?18:h.has("privateEd")?(f.landed?16:6):6;
  return {
    F: m.eq*.5+m.pros*.5+(f.landed?8:-6)+(h.has("F_ownsLand")?12:0)+(h.has("reliefPrecedent")?5:0)-(h.has("consolidation")?8:0),
    M: m.inc*.5+m.inst*.3+m.leg*.2+(h.has("universalVote")?12:0)-((h.has("propertyVote")||h.has("landedCitizens"))&&!h.has("universalVote")?8:0)-(h.has("motherFever")?5:0),
    S: m.eq*.4+m.leg*.4+m.pros*.2+(h.has("unions")?10:0)+(h.has("arbitration")?5:0)-(h.has("strikeBroken")?10:0)+(h.has("veteransHonored")&&h.has("S_soldier")?8:0),
    D: edu+m.inc*.4+m.eq*.2-(h.has("schoolsLost")&&!h.has("schoolsReopened")?15:0)+(h.has("oversight")?5:0)+(h.has("pressFree")?3:0)+(h.has("universalVote")?4:0)
  };
}
const tier = (v,hi,lo) => v>=hi?2:v>=lo?1:0;
const TH = {F:[58,44], M:[50,38], S:[56,42], D:[60,44]};

function vignette(r){
  const h=H(), sc=scores(), t=tier(sc[r],...TH[r]);
  if(r==="F"){
    if(h.has("F_lostLand")) return "Works in a city warehouse now. On Sundays he walks to the edge of town, where you can see fields.";
    if(!state.family.landed&&h.has("F_ownsLand")) return "Owns land. He says it to himself sometimes, like a man testing a tooth.";
    return ["Still works [[{Fhold}||the leased field]], and owes more on it every year.","Still works [[{Fhold}||the leased field]]. His hands are slower; the work is not.","[[{FholdCap} has paid for itself twice over.||Has saved enough to make an offer on the field he leases.]] He has begun, cautiously, to enjoy things."][t];
  }
  if(r==="M"){
    if(h.has("motherFever")) return "Still {MworkNow}, though the stairs cost her more breath than they used to.";
    return ["Still {MworkNow}, and keeps her opinions for the kitchen, where no one with power can hear them.","Still {MworkNow}. Men in the district have started asking her opinion — usually after they've already decided.","Sits on the district relief committee. Men who used to talk over her now wait for her to finish."][t];
  }
  if(r==="S"){
    if(h.has("S_radical")) return "Has been arrested twice. He mentions it the way other men mention their trade.";
    if(h.has("S_soldier")) return "Carries the war in his left leg and somewhere else he won't name. Works when he can.";
    return ["Works at {Swork} for wages that buy a little less every year.","Works at {Swork}, steady, and has married. He reads the newspaper with a pencil in his hand.","Is a foreman at {Swork} and is saving to start something of his own."][t];
  }
  if(h.has("schoolsLost")) return "Teaches herself from borrowed books, since there is no longer a school to teach her.";
  return ["Works, as most women in the valley do. She still reads at night, by a candle she pays for herself.","Finished what schooling there was, and now fights for the next step, for her children if not for herself.","Studied in the capital. Her letters home were full of words her father had to look up; now she teaches them to others."][t];
}

function fate(r){
  const h=H(), f=state.family, sc=scores(), t=tier(sc[r],...TH[r]), m=state.m;
  if(r==="F"){
    const dy = parentDeathYear("F");
    const da = ageAt("F", dy);
    const pre = `{F} {fam} died in Year ${dy}, at ${words(da)}. `;
    if(h.has("F_lostLand")) return pre+"His last years were spent in a rented room four streets from the warehouse where he worked. He kept a jar of soil from [[{Fhold}||the old field]] on the windowsill. No one threw it out for a long time afterwards.";
    if(!f.landed&&h.has("F_ownsLand")) return pre+"He died on land he owned. It was not forty acres; it was nineteen. He said nineteen was a number a man could die content with, and as far as anyone could tell, he did.";
    return pre+[
      "He had done everything the founders asked of a citizen. He died owing more than he owned. Near the end he told {S} he had expected the arithmetic to come out differently.",
      "He worked [[{Fhold}||another man's land]] until two winters before the end, and spent those two arguing with the newspaper. He believed in the nation to the last. He was not always sure it believed in him.",
      "[[{FholdCap} passed to his children free of debt.||He died a tenant, but with the rent paid a year ahead and money in the bank.]] At his funeral a man none of the family recognised stood up and said {F} had once helped him through a bad year and never asked to be repaid. {M} said that sounded like him."][t];
  }
  if(r==="M"){
    const dy = parentDeathYear("M");
    const da = ageAt("M", dy);
    const pre = `{M} {fam} died in Year ${dy}, at ${words(da)}. `;
    if(h.has("universalVote")&&dy>state.flagYear.universalVote) return pre+`She voted in every election from Year ${state.flagYear.universalVote} until she died, and was never once late. She said she had waited long enough already.`;
    if(h.has("motherFever")) return pre+"The fever she caught in the harbour summer came back every winter, a little stronger each time. She {Mwork} through all of them.";
    return pre+[
      "No one who could act on her opinions ever asked for them. She had a great many. Her daughter wrote some of them down.",
      "She {Mwork} for forty years, and her name appears in the district records only once: as wife of {F}. Those who knew her say it is the least accurate line ever written about her.",
      "In her last decade she sat on the district relief committee — the same office whose clerk had once written her name in a book and sent her home. She made sure the clerks wrote down what they did next."][t];
  }
  if(r==="S"){
    const pre = `{S} {fam} is ${words(ageAt("S",50))}. `;
    if(h.has("civilWar")) return pre+"He fought in the war that began in Year 35 — the war the founders wrote into the first document without meaning to. He will not say which side he would choose now. He says there should not have been sides.";
    if(h.has("S_blacklisted")) return pre+"He never worked at {Swork} again after the strike. He drove a carter's wagon for thirty years instead. His son is a foreman at {Swork} now, and pays the union rate, and visits on Sundays.";
    if(h.has("veteransBetrayed")&&h.has("S_soldier")) return pre+"He still has his discharge papers, and the letter from the land office, in the same drawer as his medal. Every few years a journalist comes to ask about it. He always talks to them.";
    if(h.has("S_radical")&&(h.has("unions")||h.has("universalVote")||h.has("abolished"))) return pre+"He was arrested five times; the fifth time, a judge younger than his own son apologised to him. The movement he joined as a young man won about half of what it asked for. He says half is what you get when you ask for everything.";
    if(h.has("S_radical")) return pre+"He was arrested five times and won nothing he can point to. His grandchildren think he is a fool, and then, one by one, start going to meetings.";
    return pre+[
      `He owns nothing. He worked for forty years — good, skilled work — and the nation never made a place for a man like him to keep what he built. He remembers being ${words(f.members[2].age)} and thinking the nation was new enough to make room for him. He thinks about that sometimes, in the mornings.`,
      "He worked at {Swork} for forty years and has a pension that covers most of what he needs. He votes, and complains, and votes again. He is, he says, about as satisfied as a man should let himself be.",
      "He runs his own shop with six workers, and pays them what the union says, because he remembers. His grandchildren think he is boring. He has decided this is what success looks like."][t];
  }
  // D
  const pre = `{D} {fam} is ${words(ageAt("D",50))}. She `;
  const tail = h.has("yusufLeft")?" She still has Amara's last letter.":h.has("yusufCitizen")?" Amara is the godmother of her eldest.":"";
  const good = m.inc>=60&&m.leg>=55&&!h.has("junta");
  const closing = ` Her granddaughter asked her recently what the nation was for. {D} said: at its best, it is for making sure that the life you can build is limited by what you are willing to do — not by who you were born to. Her granddaughter asked whether it is at its best now. ${good?"{D} thought about it. \"Closer,\" she said. \"Closer than it was.\"":"\"Not yet,\" {D} said. \"I am going to the meeting on Thursday. You can come if you want.\""}`;
  return pre+[f.dLow,f.dMid,f.dHigh][t]+"."+tail+closing;
}

function verdict(){
  const h=H(), m=state.m, n=state.nation.name;
  const avg = METERS.reduce((s,x)=>s+m[x.k],0)/METERS.length;
  if(h.has("civilWar")) return {t:`${n}: the war in the founding`, p:`In Year 35, ${n} went to war with itself over the question its founders declined to answer. The war ended; the question did not. Fifty years on, the nation is two peoples who share a flag and very little else.`};
  if(h.has("provinceLeft")) return {t:`${n}: smaller, by choice`, p:`In Year 36, ${n} let a province vote itself out, and kept its word when the vote passed. The nation that remains is smaller, poorer and calmer, and it argues about whether that was wisdom or surrender. Across the new border, the other half keeps the same founding document.`};
  if(h.has("martialLaw")) return {t:`${n}: the nine weeks`, p:`Everything before Year 40 is remembered as one history and everything after as another. The army ran the capital for nine weeks, and the nation that came back out was quieter and less trusting. The founding document still hangs in the assembly. People walk past it faster.`};
  if(h.has("junta")) return {t:`${n}: the general's peace`, p:`The army kept order after the founder died, and it is keeping order still. The founding document is displayed in a glass case in the capital, where it is admired and not consulted.`};
  if(h.has("dynasty")) return {t:`${n}: an inheritance`, p:`The founders' seats passed to their sons, and their sons' sons. ${n} is stable, and polite, and owned. The people who notice tend to leave.`};
  if(h.has("coerced")&&!h.has("abolished")&&!h.has("gradual")) return {t:`${n}: the lie it maintains`, p:`${n} is prosperous in the way that only a nation built on unpaid labour can be — prosperous for some. Its founding document is read aloud every independence day, by people who have learned not to hear one of its words.`};
  if(h.has("abolished")&&h.has("coerced")) return {t:`${n}: the promise kept late`, p:`${n} kept its first promise late, at great cost, and under pressure from the people it had broken it to. Its histories now call that moment the second founding. The people who lived through it called it something less tidy.`};
  if(m.pros>=65&&m.eq<35) return {t:`${n}: rich, and walled`, p:`${n} is wealthy. You can see it from the harbour, and from the great houses on the ridge. You can also see, if you look, the people who built them, still living below the ridge.`};
  if(m.pros<35&&m.eq>=60) return {t:`${n}: fair, and poor`, p:`${n} shares what it has more evenly than almost any nation on earth. It does not have very much. Its young people argue about whether that is a virtue or an excuse, and a great many of them leave to find out.`};
  if(m.coh<35) return {t:`${n}: a quarrelling union`, p:`${n} still exists, which some years seemed unlikely. Its provinces argue, its factions argue, its newspapers argue. It is not peaceful. It may, in its loud way, be free.`};
  if(m.inst<35) return {t:`${n}: good intentions, weak walls`, p:`${n} was founded by good people and has been governed by people of every kind since. Without sturdy institutions it has depended, each decade, on luck. Its luck has been mixed.`};
  if(avg>=60) return {t:`${n}: a nation that made room`, p:`${n} is not finished — no nation is — but it has become the kind of place where a tenant's daughter can sit where the founders sat. Its founders would not recognise it. Most of them would, eventually, approve.`};
  return {t:`${n}: unfinished`, p:`${n} is neither the nation its founders feared nor the one they hoped for. It is a place still arguing over what it promised, which is perhaps the best a nation can manage: an argument that never quite ends, conducted mostly in good faith.`};
}

